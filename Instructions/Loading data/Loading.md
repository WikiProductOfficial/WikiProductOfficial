<p align="center">
  <a href="https://wikiproduct.up.railway.app/"><img src="https://github.com/WikiProductOfficial/WikiProductOfficial/assets/130275283/84e08fc1-b327-4442-b67e-9269dfeb60f3" alt="Logo" width="584.5" height="250"/></a>
</p>

## Loading  Sample Data
> [!NOTE]
> Note: The data can be loaded in ranges as it will be shown below.
> 
> Note: The sample data is 500 rows
> 
> Note the range could only integers

* Modifying the following lines or variables in the ```.env``` ***(that should be from ".env-sample)*** file
  
    ```LOAD_START``` & ```LOAD_END```
   * Where the "LOAD_START" & "LOAD_END" **must be** ***"integers"*** that represent a range of entries to add which are multiple of hundreds.
   * For example, **"0"** & **"10"** as **"LOAD_START"** & **"LOAD_END"**, signifies the range from **0** to **1000** ***"exclusive"***.
    
    ```LOAD_PG``` & ```LOAD_CHROMA```
   * Where the "LOAD_PG" & "LOAD_CHROMA" **must be** ***"boolean"*** that represent a weather to to loaded in Postgres & Chromadb databases, respectively.
   * For example, **"false"** & **"true"** as **"LOAD_PG"** & **"LOAD_CHROMA"**, signifies that the range of data to be load, mentioned above, will be loaded **in *Chromadb*** & **not *Postgres*** database.
   * This is done to enable synchronization between databases.

    ### The examples above are shown below
    ```
    # Loading range arg
    LOAD_PG=false # true to load the data, false to not load the data. (For, PostgreSQL)
    LOAD_CHROMA=true # true to load the data, false to not load the data. (For, chromadb)
    LOAD_START=0
    LOAD_END=10
    ```