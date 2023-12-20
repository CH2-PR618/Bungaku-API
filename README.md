# Bungaku API Documentation

**Bungaku** is a mobile app designed to enrich knowledge about local flowers by providing flower identification and educational content for each recognized flower. The app utilizes advanced image recognition technology and an extensive botanical database to offer users a comprehensive learning experience.

## Table of Contents
- [Overview](#overview)
- [API Endpoints](#api-endpoints)
  - [1. Get All Flowers](#1-get-all-flowers)
  - [2. Get Flower Data by Name](#2-get-flower-data-by-name)
  - [3. User Authentication](#3-user-authentication)
    - [3.1 Login](#31-login)
    - [3.2 Register](#32-register)
    - [3.3 Logout](#33-logout)
  - [4. User Profile Management](#4-user-profile-management)
    - [4.1 Get User Detail](#41-get-user-detail)
    - [4.2 Update User Profile](#42-update-user-profile)
- [Authentication and Authorization](#authentication-and-authorization)
- [Dependencies](#dependencies)
- [Local Deployment](#local-deployment)
- [Contributing](#contributing)

# Overview

This API serves as the backend for the Bungaku mobile app, providing endpoints for retrieving flower information, user authentication, and user profile management.

# API Endpoints

### 1. Get All Flowers

```
curl -X GET http://localhost:3000/flowers
```

Retrieve information about all available flowers.

***Example:***
```
curl -X GET localhost:3000/flowers
```

### 2. Get Flower Data by Name

```
curl -X GET http://localhost:3000/flower/{flower-name}
```

Retrieve detailed information about a specific flower by providing its name with dual language support (Indonesian and English).

***Example:***

```
curl -X GET localhost:3000/flower/sunflower
```

### 3. User Authentication

#### 3.1 Login

```
curl -X POST http://localhost:3000/login
```

Authenticate a user with their email and password.

***Example:***
```json
{
    "email": "testing@gmail.com",
    "password": "1234567890"
}
```

#### 3.2 Register

```
curl -X POST http://localhost:3000/register
```

Register a new user with their name, email, and password.

***Example:***
```json
{
    "name": "testing",
    "email": "testing@gmail.com",
    "password": "1234567890",
    "confPassword": "1234567890"
}
```

#### 3.3 Logout

```
curl -X DELETE http://localhost:3000/logout
```

Logout the currently authenticated user.

### 4. User Profile Management

#### 4.1 Get User Detail

```
curl -X GET http://localhost:3000/user/me
```

Retrieve details of the currently authenticated user.

#### 4.2 Update User Profile

```
curl -X PUT http://localhost:3000/user/update
```

Update user profile information. Use one of the provided examples based on the field you want to update.

***Example:***

- **Update Name:**
  ```json
  {
      "name": "New Name"
  }
  ```

- **Update Email:**
  ```json
  {
      "email": "newemail@example.com",
      "currentPassword": "current_password"
  }
  ```

- **Update Password:**
  ```json
  {
      "newPassword": "new_password",
      "currentPassword": "current_password"
  }
  ```

## Authentication and Authorization

Authentication and Authorization is handled using the `express-session` middleware, creating sessions for authenticated users.


# Dependencies

- **Express**: Web application framework for Node.js.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **Express Session**: Middleware for handling user sessions.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **Sequelize**: An ORM (Object-Relational Mapping) library for Node.js.
- **Connect-Session-Sequelize**: A Sequelize session store for Express Session.
- **Argon2**: A secure and efficient password hashing library.

# Local Deployment

1. Install dependencies:

```
npm install express cors express-session dotenv sequelize connect-session-sequelize argon2
```

2. Set up your `.env` file with appropriate values.

3. Run your application:

```
node index.js
```

Now, your Bungaku API should be running locally on `http://localhost:3000`. Test the API using tools like `curl` or Postman.

# Contributing

Feel free to contribute to the development of Bungaku API by submitting issues, suggesting improvements, or opening pull requests. We welcome your ideas and collaboration to make this project even better!
