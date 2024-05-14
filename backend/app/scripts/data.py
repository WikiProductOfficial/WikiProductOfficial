# threading for thread safety in singleton pattern
from threading import Lock

import pandas as pd
import numpy as np

# Meta Class
class SingletonMeta(type):
    _instances = {}
    _lock: Lock = Lock()
    
    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
        return cls._instances[cls]

# Singleton pattern is implemented to make sure the data is read once by pandas lib
class Data(metaclass=SingletonMeta):
    __df = None
    # Constructor
    def __init__(self) -> None:
        self.__set_df()
    
    # Setting up the data
    def __set_df(self)  -> None:
        self.__df = pd.read_pickle("./scripts/clean_warehouse.pkl")
        
        # Filling NaN values
        self.__df['reviews'] = self.__df['reviews'].fillna('') # Replace NaN with empty string because when in the use it becomes a float type
        self.__df['star_count'] = self.__df['star_count'].fillna(0) #Replace  NaN with zero
        self.__df['description'] = self.__df['description'].fillna(np.nan).replace([np.nan], [None]) # Replace NaN with Null
        self.__df['stars'] = self.__df['stars'].fillna(np.nan).replace([np.nan], [None]) # Replace NaN with Null
        self.__df['summary'] = self.__df['summary'].fillna(np.nan).replace([np.nan], [None]) # Replace NaN with Null
        self.__df['details'] = self.__df['details'].fillna(np.nan).replace([np.nan], [{}]) # Replace NaN with empty dictionary

    
    def get_df(self):
        return self.__df