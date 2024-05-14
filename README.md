
<p align="center">
  <a href="https://wikiproduct.up.railway.app/"><img src="https://github.com/WikiProductOfficial/WikiProductOfficial/assets/130275283/84e08fc1-b327-4442-b67e-9269dfeb60f3" alt="Logo" width="584.5" height="250"/></a>
</p>
<p align="center">
    <b>WikiProduct</b> <br />
    An <b>AI-powered</b> digital <b>warehouse</b> system and web archive showcasing <br> diverse internet products with personalized shopping recommendations.
</p>

## Features
* Comprehensive archive
* **AI-powered** smart search
* Integrated **AI** assistant

## Application Setup and Launch Guide

Welcome to the setup guide for our application. Follow these instructions to get your environment ready and launch the application using Docker.

### Prerequisites

* **Docker Desktop**: Ensure Docker Desktop is installed on your machine. Visit the [official Docker website]([url](https://www.docker.com/products/docker-desktop/)) for download and installation instructions.

### Setting up the Application
This section is all about editing the environment variables
1. Change the ```.env-sample``` file name to .env
2. Edit the parts relating ```CHROMA_SERVER_AUTHN_CREDENTIALS```,```OPENAI_API_KEY``` , &  ```HUGGING_FACE_API_KEY```. For more details [here]().
3. Setting the embedding options is [here]().
4. Setting up the data loading is [here](Instructions/Loading%20data/Loading.md).

Here is a tutorial of how to set up and run the application locally.


### Running the Application

### Development Environment

1. **Build & Run the Containers**
   
Open a terminal and navigate to your project's root directory. Build the Docker containers with the following command:

```docker-compose -f docker-compose.yml up --build```

This will start all services defined in your docker-compose.yml file.

2. **Accessing the Application**
   
    - Frontend: [http://localhost:4200]([url](http://localhost:4200)) or [http://127.0.0.1:4200]([url](http://127.0.0.1:4200))
    - Backend (Development): [http://localhost:8000]([url](http://localhost:8000)) or [http://127.0.0.1:8000]([url](http://127.0.0.1:8000))

### Production Environment

1. **Build & Run the Containers**
   
To build your containers for production, run:

```docker-compose -f docker-compose-deploy.yml up --build```

2. **Accessing the Application**
   
    - Server: [http://localhost]([url](http://localhost))

### Development Environment
* The changes will be done in the **"docker-compose.yaml"** file in the root directory

### Production Environment
* The changes will be done in the **"backend/scripts/run.sh"** file

> [!NOTE]
> Note: If the website does not work despite any fixes, try hard reloading the website by holding the refresh button --> Hard Reload (i.e. clear cache)

## Technologies

<p align="center"> 
    <a href="https://primeng.org/" target="_blank" rel="noreferrer"> <img src="https://github.com/WikiProductOfficial/WikiProductOfficial/assets/130275283/686aa3a8-8e5b-4094-9e59-b670b871465d" alt="PrimeNG" width="60" height="60"/> </a>
    <a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" alt="angular" width="60" height="60"/> </a>
    <a href="https://www.nginx.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" alt="Nginx" width="60" height="60"/> </a>
    <a href="https://swagger.io/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" alt="swagger" width="60" height="60"/> </a>
    <a href="https://www.python.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" width="60" height="60"/> </a>
    <a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer"> <img src=https://github.com/WikiProductOfficial/WikiProductOfficial/assets/130275283/ed700ca2-9f6c-456d-8551-aad5c8c8f268" alt="Django" width="60" height="60"/> </a>
    <a href="https://docs.trychroma.com/" target="_blank" rel="noreferrer"> <img src="https://docs.trychroma.com/img/chroma.svg" alt="Chromadb" width="60" height="60"/> </a>
    <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="Postgres" width="60" height="60"/> </a>
    <a href="https://www.docker.com" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" width="60" height="60"/> </a>
    <a href="https://www.docker.com" target="_blank" rel="noreferrer"> <img src="https://github.com/WikiProductOfficial/WikiProductOfficial/assets/130275283/ae531b4f-fad7-440d-a223-750f32cf9862" alt="LangChain" width="80" height="40"/> </a>
</p>
