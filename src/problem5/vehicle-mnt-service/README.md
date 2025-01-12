# Vehicle Management Service

## Overview

Vehicle Management Service is a backend application built with Express and TypeORM, designed to manage vehicle data efficiently. It provides RESTful APIs for creating, reading, updating, and deleting vehicle entries, ensuring seamless integration with frontend applications.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete vehicles.
- **Database Integration**: Utilizes PostgreSQL for reliable data storage.
- **Authentication**: Secure endpoints with JWT authentication (if implemented).
- **Rate Limiting**: Prevents abuse by limiting the number of requests.
- **Error Handling**: Comprehensive error responses for better debugging.
- **Delay Middleware**: Simulates network latency for testing purposes.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KioNguyen/99techteam-code-challenge.git
   cd src/problem5/vehicle-mnt-service
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add:

   ```
   PORT=3000
   DB_HOST=your_db_host
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=vehicle-mnt
   DB_LOGGING=true
   ```

4. **Run the application**

   ```bash
   npm run dev
   ```

## API Endpoints

### Create a Vehicle

- **URL:** `/vehicles`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "type": "string",
    "make": "string",
    "model": "string",
    "year": integer
  }
  ```
- **Responses:**
  - `201 Created`: Vehicle created successfully.
  - `500 Internal Server Error`: Failed to create vehicle.

### List Vehicles

- **URL:** `/vehicles`
- **Method:** `GET`
- **Query Parameters:**
  - `searchKey` (optional): Filter vehicles by search key.
- **Responses:**
  - `200 OK`: Returns a list of vehicles.
  - `500 Internal Server Error`: Failed to fetch vehicles.

### Get Vehicle Details

- **URL:** `/vehicles/:id`
- **Method:** `GET`
- **Responses:**
  - `200 OK`: Returns vehicle details.
  - `404 Not Found`: Vehicle not found.
  - `500 Internal Server Error`: Failed to fetch vehicle.

### Update a Vehicle

- **URL:** `/vehicles/:id`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "type": "string",
    "make": "string",
    "model": "string",
    "year": integer
  }
  ```
- **Responses:**
  - `200 OK`: Vehicle updated successfully.
  - `500 Internal Server Error`: Failed to update vehicle.

### Delete a Vehicle

- **URL:** `/vehicles/:id`
- **Method:** `DELETE`
- **Responses:**
  - `204 No Content`: Vehicle deleted successfully.
  - `404 Not Found`: Vehicle not found.
  - `500 Internal Server Error`: Failed to delete vehicle.

## Technologies Used

- **Node.js** & **Express** for server-side development.
- **TypeScript** for type safety.
- **TypeORM** for ORM and database interactions.
- **PostgreSQL** as the database.
- **dotenv** for environment variable management.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.