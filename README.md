# Backend

## Local Server Setup Instructions

This document provides instructions on how to build and run local servers for development and production environments using Docker Compose.

### Development Environment

#### Building the Development Local Server

To build the development local server, use the following command:

`docker-compose -f docker-compose.yml build`


#### Running the Development Local Server

To run the development local server, use the following command:

`docker-compose -f docker-compose.yml up`

### Production Environment

#### Building the Production Local Server

To build the production local server, use the following command:

`docker-compose -f docker-compose-deploy.yml build`

#### Running the Production Local Server

To build the production local server, use the following command:

`docker-compose -f docker-compose-deploy.yml up`


# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
