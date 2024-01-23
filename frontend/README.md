# Codidact Startup Coach Frontend

## Introduction
Welcome to the Codidact Startup Coach project! This readme serves as a guide to run the front-end the Codidact Startup Coach application.


Before running the project, make sure you have the following prerequisites installed on your system:

1. [Node.js](https://nodejs.org/en) If you don't have Node installed, you can install it by following the instructions at Node.js's official website.
With this you can install the application dependencies and run the tests.

## Setup for local development
Follow the steps below to set up and run the project:

1. Clone this repository to your local machine:
   ```bash
   git clone https://gitlab.com/saxion.nl/hbo-ict/aad/project/09.git
   ```
2. Navigate to the ```frontend``` directory.
3. If necessary, create a ```.env``` file in the backend. There is a .env.example available for this purpose. ```In case of reviewing this project as a teacher, the .env file will be provided.```
4. Ensure that port 8080 is available on your machine, as the UI will be exposed on this port.
5. Run the following command to install all dependencies:
   ```npm i```
6. Run the following command to start the project using Docker Compose:
   ```npm run dev```

## Running tests
The project includes  tests to ensure the API endpoints work as expected. To run these tests, use the following command:
```test:unit```

## Linting
To check the code for errors and fix possible problems, use the following command: ```lint```.   
