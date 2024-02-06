# Backend

# Local Server Setup Instructions

This document provides instructions on how to build and run local servers for development and production environments using Docker Compose.

## Development Environment

### Building the Development Local Server

To build the development local server, use the following command:

`docker-compose -f docker-compose.yml build`


### Running the Development Local Server

To run the development local server, use the following command:

`docker-compose -f docker-compose.yml up`

## Production Environment

### Building the Production Local Server

To build the production local server, use the following command:

`docker-compose -f docker-compose-deploy.yml build`

### Running the Production Local Server

To build the production local server, use the following command:

`docker-compose -f docker-compose-deploy.yml up`
