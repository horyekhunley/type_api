# type_api

Basic REST API using typescript
This is a basic REST API that allows you to create, read, update, and delete patient data.

Installation
To install the dependencies for this project, run the following command:

yarn

Usage
To start the server, run the following commands:
    "start:build": "tsc -p .",
    "start:dev": "nodemon --exec ts-node src/index.ts",
    "start:prod": "tsc -p . && NODE_ENV=prod node dist/index.js"

yarn start:dev
This will start the development server on port 3000.

API Endpoints
The following endpoints are available for this API:

GET /api/patients
Returns a list of all resources.

POST /api/patients
Creates a new patient entry

e.g

{
    "first_name": "Mahbub",
    "last_name": "Bello",
    "email": "mahbubbello@gmail.com",
    "home_address": "Hull",
    "diagnosis": "Short sightedness",
    "phone": "122-345-678",
    "status": "discharged",
    "image_url": "bycqvtcyqvcq6t76y9817u"
}

GET /api/patients/:id
Returns a single resource with the specified ID.

PUT /resources/:id
Updates an existing resource with the specified ID.

DELETE /resources/:id
Deletes the resource with the specified ID.

Response Format
All API responses are in JSON format.
