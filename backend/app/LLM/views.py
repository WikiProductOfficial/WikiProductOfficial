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
import os
import time
import requests
import markdown
import json
from .llm_tools import tools, shopping_cart


def ask_model(query: str):
    for chunk in agent_executor.stream({"input": query}):
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

# Initializing Agent
llm = ChatOpenAI(
    temperature=0,
    streaming=True,
    api_key=os.getenv("OPENAI_API_KEY"),
    callbacks=[StreamingStdOutCallbackHandler()]
)

# TODO: Try Arabic prompt (more aesthetic)
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", """
        You are a ProductWiki Specialized Warehouse bot. You work in ProductWiki Warehouse system. you try to \
        serve and assist the warehouse customers by referring them to items they need and utilize tools prepared \
        for you to provide the maximum assistance. Here are general RULES YOU HAVE TO FOLLOW:
        - REPLY IN MD format whenver possible.
        - When you get details of an item, only respond in what the user actually needs in 2 paragraphs at maximum. \
            if there is more than 1 item, talk generally about items and what the user needs.


        Your answers should be brief, helpful, and short."""),
        MessagesPlaceholder("chat_history", optional=True),
        ("human", "{input}"),
        MessagesPlaceholder("agent_scratchpad"),
    ]
)

agent = create_openai_tools_agent(
    llm, tools, prompt
)

# TODO Set seperate memories using session_id
memory = ConversationSummaryBufferMemory(   # Memory to save previous messages
    return_messages=True,
    llm=llm,
    max_token_limit=1000,   # Maximum saved tokens in memory buffer
    output_key="output"
)
agent_executor = AgentExecutor(agent=agent, tools=tools, memory=memory, verbose=True)

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

    print(f"Session Key: {request.session.session_key}")
    
    shopping_cart.clear()
    result = ask_model(query)
    
    res = {
        'items': shopping_cart,
        'response': markdown.markdown(result)
    }
    
    response = StreamingHttpResponse(json.dumps(res), content_type='text/plain')
    return response