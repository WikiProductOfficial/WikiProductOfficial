# threading for thread safety in singleton pattern
import threading

# os for env variables
import os

# chromadb imports
import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions


# A singleton class for ChromaDB to make sure there is one instance of the class
class ChromaDB:
    # Private variables
    __instance= None
    __lock = threading.Lock()
    __collections= {}
    
    # Private constants
    __CHROMA_CLIENT= None
    
    # Constructor
    def __new__(cls):
        if cls.__instance is None:
            with cls.__lock:
                if cls.__instance is None:
                    # constructing an new instance of the class
                    cls.__instance = super(ChromaDB, cls).__new__(cls)
                    
                    # constructing a new instance of the constants
                    cls.__CHROMA_SETTINGS = Settings(
                        allow_reset=True,
                        anonymized_telemetry=False,
                        chroma_client_auth_credentials= os.environ.get("CHROMA_SERVER_AUTHN_CREDENTIALS"),
                        chroma_client_auth_provider= os.environ.get("CHROMA_CLIENT_AUTHN_PROVIDER"),
                    )
                    cls.__CHROMA_CLIENT = CHROMA_CLIENT = chromadb.HttpClient(
                        host=os.environ.get('CHROMA_HOST_NAME'),  # Replace with 'localhost' for development
                        port=os.environ.get('CHROMA_HOST_PORT'),
                        headers= {
                            os.environ.get("CHROMA_AUTH_TOKEN_TRANSPORT_HEADER"):os.environ.get("CHROMA_SERVER_AUTHN_CREDENTIALS"),
                        },
                        settings= cls.__CHROMA_SETTINGS
                    )
                    
                    # Creating collections
                    cls.__create_collections(cls)
        
        return cls.__instance
    
    # Public Functions
    # Getting the client (Need on instance of it)
    def get_client(self):
        return self.__CHROMA_CLIENT
    
    # Getting the items collection
    def get_items_collection(self):
        print(self.__collections["items"])
        return self.__collections["items"]
    
    
    # Private Functions
    # Creating the collections
    def __create_collections(self) -> None:
        self.__create_items_collection(self)
    
    # Creating the items collection
    def __create_items_collection(self):
        embedding_function= self.__get_embedding_function(self)
        collection = self.__CHROMA_CLIENT.get_or_create_collection(
            name="items",
            metadata={"hnsw:space": "cosine"},
            embedding_function= embedding_function,
        )
        self.__collections["items"] = collection
    
    
    # Getting the embedding function
    ## Option 1: means using Sentence Transformers. (Free option)
    ## Option 2: means using another's service e.g. OpenAI. (Paid option)
    ## Option 3: means using default embedding function. (all-MiniLM-L6-v2)
    def __get_embedding_function(self):
        model= os.environ.get("EMBEDDING_MODEL_NAME")
        option= int(os.environ.get("EMBEDDING_OPTION"))
        
        if not model:
            option= 3
        
        
        # Choosing which approach to go through
        elif option == 1:
            temp=self.__get_embedding_service(model)
            embedding= temp
            print(f"Embedding_function 1: {embedding}")
        else:
            embedding= embedding_functions.DefaultEmbeddingFunction()
            print(f"Embedding_function 2: {embedding}")
        
        print(f"Embedding_function:{embedding}")
        return embedding


    # Getting other services embedding function
    def __get_embedding_service(model_name:str):
        embedding_service= int(os.environ.get("EMBEDDING_SERVICE"))
        
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