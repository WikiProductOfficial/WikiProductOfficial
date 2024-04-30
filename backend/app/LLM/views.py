from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.http import HttpResponse, StreamingHttpResponse
from langchain import hub
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.prompts import ChatPromptTemplate
from langchain.memory import ConversationSummaryBufferMemory
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from pydantic import BaseModel, Field
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain.memory import ChatMessageHistory
from langchain_community.chat_message_histories import (
    PostgresChatMessageHistory,
)
import os
import time
import requests
import markdown
import json
import uuid
from .llm_tools import tools, shopping_cart
# from django.db import connection
from django.conf import settings


def ask_model(agent, query, session_id):
    for chunk in agent.stream({"input": query}, config={"configurable": {"session_id": session_id}}):
        # Agent Action
        if "actions" in chunk:
            for action in chunk["actions"]:
                print (f"Calling Tool: `{action.tool}` with input `{action.tool_input}`")
                    
        # Observation
        elif "steps" in chunk:
            for step in chunk["steps"]:
                print (f"Tool Result: `{step.observation}`")
                
        # Final result
        elif "output" in chunk:
            return chunk["output"]


def initialize_agent(session_id):
    
    # The Brain
    llm = ChatOpenAI(
        temperature=0.2,
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

    # The Actions
    agent = create_openai_tools_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

    # Retrieve PostgreSQL connection settings from Django settings
    # DATABASES = settings.DATABASES
    # db_settings = DATABASES['default']

    # # Connect to the PostgreSQL database
    # connection = psycopg2.connect(
    #     dbname=db_settings['NAME'],
    #     user=db_settings['USER'],
    #     password=db_settings['PASSWORD'],
    #     host=db_settings['HOST'],
    #     port=db_settings['PORT']
    # )
    
    DB_HOST = os.environ.get('DB_HOST')
    DB_NAME = os.environ.get('DB_NAME')
    DB_USER = os.environ.get('DB_USER')
    DB_PASS = os.environ.get('DB_PASS')
    DB_PORT = os.environ.get('DB_PORT')

    # Constructing the connection URL
    connection = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    
    # print(f"Connection:{connection.info}")
    
    # The Memory
    table_name = "chat_history"
    
    memory = PostgresChatMessageHistory(
        connection_string=connection,
        session_id=session_id,
        table_name=table_name
    )

    print("Connection completed")
    # Initialize the chat history manager
    # memory = PostgresChatMessageHistory(
    #     table_name,
    #     session_id,
    #     sync_connection=connection
    # )


    # The Fully-Assembled Agent
    completed_agent = RunnableWithMessageHistory(
        agent_executor,
        lambda session_id: memory,
        input_messages_key="input",
        history_messages_key="chat_history",
    )
    
    return completed_agent

# Views
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'query': openapi.Schema(
                type=openapi.TYPE_STRING,
            )
        },
        required=['query']
    )
)
@api_view(['POST'])
def query(request):
    query = request.data.get('query')

    # Get the Session_id if it exists else initialize it.
    request.session['session_id'] = request.session.get('session_id', uuid.uuid4())
    print(f"Session ID: {request.session['session_id']}")
    
    # Initialize the agent for that user.
    agent = initialize_agent(request.session['session_id'])
    
    # Clean the items list to prepare a new message.
    shopping_cart.clear()
    
    # Ask the model and structure the response
    result = ask_model(agent, query, request.session['session_id'])
    
    res = {
        'items': shopping_cart,
        'response': markdown.markdown(result)
    }
    
    response = StreamingHttpResponse(json.dumps(res), content_type='text/plain')
    return response