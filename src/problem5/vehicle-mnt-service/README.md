# ExpressJS Vehicle CRUD API with TypeScript

## Prerequisites

- Node.js (>=14.x)
- npm or yarn
- Docker (for database setup)

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup the database:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

## Docker Compose

1. **Run Containers**:

    ```bash
    docker-compose up -d
    ```

2. **Verify the Deployment**:

    Visit `http://localhost:3000` to ensure the server is running and connected to the database.

## API Endpoints

- `POST /vehicles` - Create a vehicle.
- `GET /vehicles` - List vehicles (with optional make filter).
- `GET /vehicles/:id` - Get vehicle details.
- `PUT /vehicles/:id` - Update vehicle.
- `DELETE /vehicles/:id` - Delete vehicle.

## Notes

- This service uses Prisma for ORM and SQLite as the database. You can customize the database provider in `prisma/schema.prisma`.