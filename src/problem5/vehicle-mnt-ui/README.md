
# Vehicle Management UI

## Overview

Vehicle Management UI is a React-based application designed to manage vehicle data efficiently. It offers functionalities to create, view, update, and delete vehicle entries with a user-friendly interface.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete vehicles.
- **Responsive Design**: Built with Ant Design for a polished and responsive user interface.
- **Real-Time Data Fetching**: Utilizes React Query for efficient data management and caching.
- **State Management**: Managed using Zustand for scalable and easy state handling.
- **Async Select**: Implements asynchronous dropdowns for searching and selecting tokens.
- **TypeScript**: Ensures type safety and enhances development experience.

## Installation

1. **Clone the repository**

  ```bash
  git clone https://github.com/yourusername/vehicle-mnt-ui.git
  cd vehicle-mnt-ui
  ```

2. **Install dependencies**

  ```bash
  yarn
  ```

3. **Set up environment variables**

  Create a `.env` file in the root directory and add:

  ```
  VITE_PORT=5173
  VITE_SERVICE_HOST=http://localhost:3000
  ```

4. **Run the application**

  ```bash
  yarn dev
  ```

## Usage

- **Create Vehicle**: Click on the "Create Vehicle" button to add a new vehicle.
- **Search**: Use the search bar to filter vehicles based on make, model, or year.
- **Edit Vehicle**: Click the edit icon next to a vehicle to update its details.
- **Delete Vehicle**: Click the delete icon and confirm to remove a vehicle.

## Technologies Used

- **React** with TypeScript
- **Vite** for fast development and build
- **Ant Design** for UI components
- **Axios** for API requests
- **React Query** for data fetching and caching
- **Zustand** for state management

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
