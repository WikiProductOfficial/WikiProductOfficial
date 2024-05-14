<p align="center">
  <a href="https://wikiproduct.up.railway.app/"><img src="https://github.com/WikiProductOfficial/WikiProductOfficial/assets/130275283/84e08fc1-b327-4442-b67e-9269dfeb60f3" alt="Logo" width="584.5" height="250"/></a>
</p>

## Setting up embedding options
> [!NOTE]
> Note: There is an explanation in the is provided in the **.env** "*after changing the .env-sample*". This part will explain it in more detail.

* Modifying the following lines or variables in the ```.env``` ***(that should be from ".env-sample)*** file

    ```EMBEDDING_OPTION```
    * Where the "EMBEDDING_OPTION" **must be** an ***"integer"*** that is **1** or **2**. 
    * For example, If the choice is **2**, then this will take the default embedding function used by *chromadb*
    * Also, this will render the next changes below useless.

    ```EMBEDDING_MODEL_NAME``` & ```EMBEDDING_SERVICE```
    * These two values are applied only if the value of ```EMBEDDING_OPTION``` is **1**.

    * Where the "EMBEDDING_MODEL_NAME" **must be** ***" a correct model name"*** that represents a provided service for the mentioned services below. For more details, visit [chroma's website](https://docs.trychroma.com/)

    * Where the "EMBEDDING_SERVICE" **must be** ***"integer"*** **0** or **1** that represent a weather to use **HuggingFace** or **OpenAI** embedding model.
    * For example, **"sentence-transformers/all-MiniLM-L6-v2"** & **"0"** as **"EMBEDDING_MODEL_NAME"** & **"EMBEDDING_SERVICE"**, signifies that the model name will be used that is provided by **HuggingFace**.
  > [!NOTE]
  > Note: this is the default model for chroma at the time


    ### The examples above are shown below
    ```
    # Embedding options
    #   1: means using another's service e.g. OpenAI. (Paid option)
    #   2: means using default embedding function. (all-MiniLM-L6-v2)
    EMBEDDING_OPTION=1
    ```
    ```
    # Embedding options
    #   1: means using another's service e.g. OpenAI. (Paid option)
    #   2: means using default embedding function. (all-MiniLM-L6-v2)
    EMBEDDING_OPTION=1
    # Embedding model name
    #   For option 1, it depends on which service to use. (the available OpenAI, HuggingFace)
    #   For more details check Chromadb's official website.
    EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
    # Embidding service for option 1
    #   0: HuggingFace
    #   1: OpenAI
    EMBEDDING_SERVICE=0
    ```