# os for env variables
import os

# chromadb imports
import chromadb
from chromadb.config import Settings

CHROMA_SETTINGS = Settings(
    allow_reset=True,
    anonymized_telemetry=False,
)

CHROMA_CLIENT = chromadb.HttpClient(
    host=os.environ.get('CHROMA_HOST_NAME'),  # Replace with 'localhost' for development
    port=os.environ.get('CHROMA_HOST_PORT'),
    settings=CHROMA_SETTINGS
)

def get_client():
    return CHROMA_CLIENT

def get_items_collection():
    collection = CHROMA_CLIENT.get_or_create_collection(
        name="items",
        metadata={"hnsw:space": "cosine"}
    )
    return collection