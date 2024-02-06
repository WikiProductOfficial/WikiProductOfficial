# Application Setup and Launch Guide

Welcome to the setup guide for our application. Follow these instructions to get your environment ready and launch the application using Docker.

## Prerequisites

* **Docker Desktop**: Ensure Docker Desktop is installed on your machine. Visit the official Docker website for download and installation instructions.

## Running the Application

### Development Environment

1 - **Build the Containers**
Open a terminal and navigate to your project's root directory. Build the Docker containers with the following command:

`docker-compose -f docker-compose.yml build`

2 - **Start the Containers**
After the build completes, launch the containers with:

`docker-compose -f docker-compose.yml up`

This will start all services defined in your docker-compose.yml file.

3 - **Accessing the Application**
    * Frontend: http://localhost:4200 or http://127.0.0.1:4200
    * Backend (Development): http://localhost:8000 or http://127.0.0.1:8000

### Production Environment

1 - **Build the Containers**
To build your containers for production, run:

`docker-compose -f docker-compose-deploy.yml build`

2 - **Run the Containers**
Start your application in production mode with:

`docker-compose -f docker-compose-deploy.yml up`

3 - **Accessing the Application**
    * Frontend: The frontend URL remains the same as in the development environment.
    * Backend (Production): http://localhost or http://127.0.0.1

*Note: for production create a file in the root directory called `.env` and copy paste `.env.sample`*