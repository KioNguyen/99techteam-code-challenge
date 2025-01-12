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

## Postgres DB with Docker Compose

1. **Run Containers**:

    ```bash
    docker-compose up -d
    ```

2. **Verify the Deployment**:

    Visit `http://localhost:3000` to ensure the server is running and connected to the database.

## Postgres DB with Supabase

1. **Create a Supabase Account**:

   Visit [Supabase](https://supabase.com/) and sign up for a free account.

2. **Create a New Project**:

   - Click on "New Project".
   - Enter your project details and select a region closest to you.
   - Click "Create Project".

3. **Retrieve the Database Connection String**:

   - Once the project is created, navigate to the project dashboard.
   - Go to the "Settings" > "Database" section.
   - Copy the `Connection string` (you will use this in your application).

4. **Configure Environment Variables**:

   - Create a `.env` file in your project root if it doesn't exist.
   - Add the following line, replacing `<your-connection-string>` with the one you copied:

     ```env
     DATABASE_URL=<your-connection-string>
     ```

5. **Start the Server**:

   ```bash
   yarn dev
   ```

6. **Verify the Deployment**:

   Visit `http://localhost:3000` to ensure the server is running and connected to the Supabase database.

## API Endpoints

- `POST /vehicles` - Create a vehicle.
- `GET /vehicles` - List vehicles (with optional make filter).
- `GET /vehicles/:id` - Get vehicle details.
- `PUT /vehicles/:id` - Update vehicle.
- `DELETE /vehicles/:id` - Delete vehicle.

## Notes

- This service uses Prisma for ORM and SQLite as the database. You can customize the database provider in `prisma/schema.prisma`.