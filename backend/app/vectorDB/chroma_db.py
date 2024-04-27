# threading for thread safety in singleton pattern
from threading import Lock

# os for env variables
import os

# chromadb imports
from app.settings import CHROMA_CLIENT
from chromadb.utils import embedding_functions

# Meta Class
class SingletonMeta(type):
    """
    This is a thread-safe implementation of Singleton.
    """

    _instances = {}

    _lock: Lock = Lock()
    """
    We now have a lock object that will be used to synchronize threads during
    first access to the Singleton.
    """

    def __call__(cls, *args, **kwargs):
        """
        Possible changes to the value of the `__init__` argument do not affect
        the returned instance.
        """
        # Now, imagine that the program has just been launched. Since there's no
        # Singleton instance yet, multiple threads can simultaneously pass the
        # previous conditional and reach this point almost at the same time. The
        # first of them will acquire lock and will proceed further, while the
        # rest will wait here.
        with cls._lock:
            # The first thread to acquire the lock, reaches this conditional,
            # goes inside and creates the Singleton instance. Once it leaves the
            # lock block, a thread that might have been waiting for the lock
            # release may then enter this section. But since the Singleton field
            # is already initialized, the thread won't create a new object.
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
        return cls._instances[cls]



# A singleton class for ChromaDB to make sure there is one instance of the class
class ChromaDB(metaclass=SingletonMeta):
    # Private variables
    # __instance= None
    # __lock = threading.Lock()
    __collections= {}
    
    # Private constants
    __CHROMA_CLIENT= None
    
    # Constructor
    def __init__(self) -> None:
        self.__CHROMA_CLIENT = CHROMA_CLIENT
        self.__create_collections()
    
    # Public Functions
    # Getting the client (Need on instance of it)
    def get_client(self):
        return self.__CHROMA_CLIENT
    
    # Getting the items collection
    def get_items_collection(self):
        return self.__collections["items"]
    
    
    # Private Functions
    # Creating the collections
    def __create_collections(self) -> None:
        self.__create_items_collection()
    
    # Creating the items collection
    def __create_items_collection(self):
        embedding_function= self.__get_embedding_function()
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
            embedding= self.__get_embedding_service(model)
        else:
            embedding= embedding_functions.DefaultEmbeddingFunction()
        
        return embedding


    # Getting other services embedding function
    def __get_embedding_service(self, model_name:str):
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