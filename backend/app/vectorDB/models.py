# os for env variables
import os

# chromadb imports
import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions

CHROMA_SETTINGS = Settings(
    allow_reset=True,
    anonymized_telemetry=False,
    chroma_client_auth_credentials= os.environ.get("CHROMA_SERVER_AUTHN_CREDENTIALS"),
    chroma_client_auth_provider= os.environ.get("CHROMA_CLIENT_AUTHN_PROVIDER"),
)

CHROMA_CLIENT = chromadb.HttpClient(
    host=os.environ.get('CHROMA_HOST_NAME'),  # Replace with 'localhost' for development
    port=os.environ.get('CHROMA_HOST_PORT'),
    # ssl= True,
    headers= {
        os.environ.get("CHROMA_AUTH_TOKEN_TRANSPORT_HEADER"):os.environ.get("CHROMA_SERVER_AUTHN_CREDENTIALS"),
    },
    settings=CHROMA_SETTINGS
)

# Getting the client (Need on instance of it)
def get_client():
    return CHROMA_CLIENT

# Getting the items collection
def get_items_collection():
    embedding_function= get_embedding_function()
    collection = CHROMA_CLIENT.get_or_create_collection(
        name="items",
        metadata={"hnsw:space": "cosine"},
        embedding_function= embedding_function,
    )
    return collection

# Getting the embedding function
## Option 1: means using Sentence Transformers. (Free option)
## Option 2: means using another's service e.g. OpenAI. (Paid option)
## Option 3: means using default embedding function. (all-MiniLM-L6-v2)
def get_embedding_function():
    model= os.environ.get("EMBEDDING_MODEL_NAME")
    option= int(os.environ.get("EMBEDDING_OPTION"))
    
    if not model:
        option= 3
    
    
    # Choosing which approach to go through
    if option == 1:
        embedding= embedding_functions.SentenceTransformerEmbeddingFunction(model_name= model)
        print(f"Embedding_function 1: {embedding}")
    elif option == 2:
        embedding= get_embedding_service(model)
        print(f"Embedding_function 2: {embedding}")
    else:
        embedding= embedding_functions.DefaultEmbeddingFunction()
        print(f"Embedding_function 3: {embedding}")
    
    return embedding


# Getting other services embedding function
def get_embedding_service(model_name):
    # TODO: Add other services
    embedding_service= os.environ.get("EMBEDDING_SERVICE")
    
    if embedding_service == 0:
        embedding= embedding_functions.HuggingFaceEmbeddingFunction(
            api_key=os.environ.get("HUGGING_FACE_API_KEY"),
            model_name=model_name
        )
    elif embedding_service == 1:
        embedding= embedding_functions.OpenAIEmbeddingFunction(
            api_key= os.environ.get("OPENAI_API_KEY"),
            model_name=model_name
        )
    
    return embedding