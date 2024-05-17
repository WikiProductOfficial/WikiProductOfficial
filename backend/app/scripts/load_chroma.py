import time
# import the data singleton class
from .data import Data

# import chromadb singelton class
from vectorDB.chroma_db import ChromaDB

# instantiating ChromaDB
chromadb = ChromaDB()

# instantiating Data
data = Data()

def run(*args):
    start = time.time()
    
    # getting the data
    df = data.get_df()
    
    # Getting the chromadb items collection
    items_collection = chromadb.get_items_collection()
    
    # Filter rows based on provided arguments
    if len(args) == 2:
        # TODO: make error pruned
        start_index = max(int(args[0]) * 100, 0)
        end_index = min(int(args[1]) * 100, len(df))
        df = df.iloc[start_index:end_index]
    
    for i, row in df.iterrows():
        ## For Debugging
        # if(i < 50):
        #     print(row)
        #     print(f"{str(i + 1)}", type(i))
        
        # Insert item to chromadb
        items_collection.upsert(
            ids= str(i + 1),
            embeddings= row["embedding"],
            documents= row['summary'],
            # metadatas= row["details"], # TODO: For now, we wil add this for the comparison of items
        )
    
    print("Chromadb Loading finished")

    end = time.time()
    print(f"Time taken for chromadb: {end-start} seconds")