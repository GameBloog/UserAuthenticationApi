# User Authentication API

Welcome to the User Authentication API. This API allows you to create new users, authenticate, manage notes and tags, update profile information, and upload avatars. Below, you will find detailed information about the endpoints and how to use them.

## Overview

This API was developed in Node.js and aims to create new users in the database, authenticate existing users on the platform, and provide functionality related to notes and tags. It supports the HTTP methods GET, POST, PUT, and DELETE.

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the API in production mode using [PM2](https://pm2.io/). Make sure you have configured your ecosystem in `ecosystem.config.js`.


### `npm start`

Starts the API in development mode using Nodemon.

### `npm run dev`

Runs the latest database migration using Knex.

### `npm run migrate`

Launches the test runner Jest in watch mode.

### `npm run test`

## Authentication

To access protected endpoints, you need to provide a valid authentication token in the authorization header (`Authorization: Bearer authentication_token`). You can obtain the token by logging in using the `/api/sessions` endpoint.

## Available Endpoints

Below are the available endpoints in this API:

### 1. Create a New User

- **HTTP Method**: POST
- **Endpoint**: `/api/users`
- **Description**: Creates a new user in the system.
- **Request Parameters**:
  - `name` (string, required): User's name.
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Success Response**:
  - Status Code: 201 (Created)
- **Error Response**:
  - It may return a 400 (Bad Request) error code if the request is missing mandatory information or if the email is already in use.

#### Example Request:
```http
POST /api/users
Authorization: Bearer authentication_token
Content-Type: application/json

{
  "name": "User's Name",
  "email": "user@example.com",
  "password": "secure_password"
}
```

### 2. Update User Profile Information

- **HTTP Method**: PUT
- **Endpoint**: `/api/users`
- **Description**: Allows an authenticated user to update their profile, including name, email, and password.
- **Request Parameters**:
  - `name` (string, optional): New user's name.
  - `email` (string, optional): New user's email address.
  - `password` (string, optional): New user's password.
  - `old_password` (string, required if a new password is provided): User's old password.
- **Authentication Header**:
  - `Authorization` (string, required): Valid user authentication token.
- **Success Response**:
  - Status Code: 200 (OK)
- **Error Response**:
  - It may return a 401 (Unauthorized) error code if the authentication token is invalid.
  - It may return a 400 (Bad Request) error code if the request is missing mandatory information or if the provided email is already in use.
  - It may return a 404 (Not Found) error code if the user is not found.
  - It may return a 422 (Unprocessable Entity) error code if the old password does not match the current password or if the new password is the same as the old password.

#### Example Request:
```http
PUT /api/users
Authorization: Bearer authentication_token
Content-Type: application/json

{
  "name": "New Name",
  "email": "new_email@example.com",
  "password": "new_secure_password",
  "old_password": "current_password"
}
```

### 3. Create a New Note

- **HTTP Method**: POST
- **Endpoint**: `/api/notes`
- **Description**: Creates a new note in the database.
- **Request Parameters**:
  - `title` (string, required): Note title.
  - `description` (string, optional): Note description.
  - `tags` (array of strings, optional): List of tags associated with the note.
  - `links` (array of strings, optional): List of links related to the note.
- **Authentication Header**:
  - `Authorization` (string, required): Valid user authentication token.
- **Success Response**:
  - Status Code: 200 (OK)
- **Error Response**:
  - It may return a 401 (Unauthorized) error code if the authentication token is invalid or a 400 (Bad Request) if the request is missing mandatory information.

#### Example Request:
```http
POST /api/notes
Authorization: Bearer authentication_token
Content-Type: application/json

{
  "title": "My New Note",
  "description": "Note description",
  "tags": ["tag1", "tag2"],
  "links": ["https://link1.com", "https://link2.com"]
}
```

### 4. Get Note Details

- **HTTP Method**: GET
- **Endpoint**: `/api/notes/:id`
- **Description**: Returns details of a specific note based on the provided ID in the URL.
- **Request Parameters**:
  - `id` (string, required): Unique ID of the note.
- **Authentication Header**:
  - `Authorization` (string, required): Valid user authentication token.
- **Success Response**:
  - Status Code: 200 (OK)
- **Error Response**:
  - It may return a 401 (Unauthorized) error code if the authentication token is invalid or a 404 (Not Found) if the note
```
