# Codidact Startup Coach Backend

## Introduction
Welcome to the Codidact Startup Coach project! This readme serves as a guide to run the back-end the Codidact Startup Coach application.

## Prerequisites
Before running the project, make sure you have the following prerequisites installed on your system:

1. [Node.js](https://nodejs.org/en) If you don't have Node installed, you can install it by following the instructions at Node.js's official website.
With this you can install the application dependencies and run the tests.

2. (Optional) [Postman](https://www.postman.com/): To test the API endpoints, you can install Postman. Postman is optional, but it
makes testing easier. See also API specifications document.

## Setup for local development

Follow the steps below to set up and run the project:

1. Clone this repository to your local machine:
   ```bash
   git clone https://gitlab.com/saxion.nl/hbo-ict/aad/project/09.git
   ```
2. Navigate to the ```backend``` directory.
3. If necessary, create a ```.env``` file in the backend. There is a .env.example available for this purpose. ```In case of reviewing this project as a teacher, the .env file will be provided.```
4. Ensure that port 3000 is available on your machine, as the API will be exposed on this port.
5. Run the following command to install all dependencies:
   ```npm i```
6. Run the following command to start the project using Docker Compose:
   ```npm run start:dev```
7. Access the API at http://localhost:3000.

## Sample credentials for Postman

For testing purposes using Postman, you could request a user token from the ```/credentials``` endpoint with the following credentials (see also API specifications document):

**userName**: Zikria  
**password**: Zikria123

## Running tests
The project includes  tests to ensure the API endpoints work as expected. To run these tests, use the following command:
```test:unit```

To generate test coverage, use following command: ```npm run test:coverage```.
 This will generate a test report in the coverage directory in the root. 

## Linting
To check the code for errors, use the following command: ```npm run lint```.   
To fix any possible problems, use ```npm run lint:fix```.
