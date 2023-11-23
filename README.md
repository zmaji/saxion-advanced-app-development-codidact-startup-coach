# Codidact Startup Coach

## Introduction
Welcome to the Codidact Startup Coach project! This project serves as the complete stack for the Codidact Startup Coach application.

## Prerequisites
Before running the project, make sure you have the following prerequisites installed on your system:
1. [Docker](https://www.docker.com/)
2. [Docker Compose](https://docs.docker.com/compose/)

## Setup for local development

Follow the steps below to set up and run the project:

1. Clone this repository to your local machine:

   ```bash
   git clone https://gitlab.com/saxion.nl/hbo-ict/aad/project/09.git
   ```
2. Ensure that port 3000 is available on your machine, as the API will be exposed on this port.
3. Ensure that port 27017 is available on your machine, as the MongoDB will be exposed on this port.
4. Ensure that port 8080 is available on your machine, as the UI will be exposed on this port.
5. Run the following command to start the project using Docker Compose:
   ```bash
   docker-compose -f ./docker-compose.build.yml -f ./docker-compose.dev.yml up -d --build
   ```
    This command will build the necessary Docker images and start the project in detached mode.

6. Access the API at http://localhost:3000.
7. Access the MongoDB at http://localhost:27017.
8. Access the UI at http://localhost:8080.

## Usage
Once the API is up and running, you can interact with it using the defined endpoints. Refer to the API documentation for details on available endpoints and their functionalities.

## Docker Compose Configuration
- The docker-compose.build.yml file is used to build the Docker images required for the project.
- The docker-compose.dev.yml file is used for development purposes.