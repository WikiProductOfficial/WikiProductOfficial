from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import (
    PostgresChatMessageHistory,
)
import os

DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')
DB_USER = os.environ.get('DB_USER')
DB_PASS = os.environ.get('DB_PASS')
DB_PORT = os.environ.get('DB_PORT')

# Constructing the connection URL
connection = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


class Agent:
    def __init__(self, tools, session_id):
        self.connection = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        self.tools = tools
        self.session_id = session_id
        
        # The Brain
        llm = ChatOpenAI(
            temperature=0,
            streaming=True,
            api_key=os.getenv("OPENAI_API_KEY"),
            callbacks=[StreamingStdOutCallbackHandler()]
        )

    
        # The Intent
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", """
                You are a ProductWiki Specialized Warehouse bot. You work in ProductWiki Warehouse system. you try to \
                serve and assist the warehouse customers by referring them to items they need and utilize tools prepared \
                for you to provide the maximum assistance. Here are general RULES YOU HAVE TO FOLLOW:
                - REPLY IN Mark Down format whenver possible.
                - When you get details of an item, only respond in what the user actually needs in 2 paragraphs at maximum. \
                    if there is more than 1 item, talk generally about items and what the user needs.


                Your answers should be brief, helpful, and short."""),
                MessagesPlaceholder("chat_history", optional=True),
                ("human", "{input}"),
                MessagesPlaceholder("agent_scratchpad"),
            ]
        )

        agent = create_openai_tools_agent(llm, self.tools, prompt)
        agent_executor = AgentExecutor(agent=agent, tools=self.tools, verbose=True)

        memory = PostgresChatMessageHistory(
            connection_string=self.connection,
            session_id=self.session_id,
            table_name="chat_history"
        )

        completed_agent = RunnableWithMessageHistory(
            agent_executor,
            lambda session_id: memory,
            input_messages_key="input",
            history_messages_key="chat_history",
        )

        self.agent = completed_agent

    def ask(self, query):
        try:
            return self.agent.invoke({"input": query}, config={"configurable": {"session_id": self.session_id}})['output']
        except Exception as e:
            return f"AgentError: {str(e)}"