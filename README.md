# Application Setup and Launch Guide

Welcome to the setup guide for our application. Follow these instructions to get your environment ready and launch the application using Docker.

## Prerequisites

* **Docker Desktop**: Ensure Docker Desktop is installed on your machine. Visit the [official Docker website]([url](https://www.docker.com/products/docker-desktop/)) for download and installation instructions.

## Running the Application

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


> [!NOTE]
> Note: If the website does not work despite any fixes, try hard reloading the website by holding the refresh button --> Hard Reload (i.e. clear cache)
