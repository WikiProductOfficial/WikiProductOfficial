# Backend

# Local Server Setup Instructions

This document provides instructions on how to build and run local servers for development and production environments using Docker Compose.

## Development Environment

### Building the Development Local Server

To build the development local server, use the following command:

docker-compose -f docker-compose.yml build

This command uses `docker-compose.yml` to build the development server based on the configurations defined within.

### Running the Development Local Server

After building the server, you can run it with the following command:

docker-compose -f docker-compose.yml up

This command starts up the development server, making it accessible for testing and development purposes.

## Production Environment

### Building the Production Local Server

For deploying in a production environment, the server needs to be built using a different configuration file. Use the following command:

docker-compose -f docker-compose-deploy.yml build

This command uses `docker-compose-deploy.yml` to build the production server with the appropriate settings for deployment.

### Running the Production Local Server

To run the production server, execute the following command:

docker-compose -f docker-compose-deploy.yml up

This will start the production server, ready for handling live traffic.
