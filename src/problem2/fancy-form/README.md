# Currency Swap App

A Vite-powered React application for swapping currencies with real-time exchange rates.

## Features

- **Real-Time Rates**: Fetches up-to-date currency prices.
- **Async Select**: Search and select currencies using async dropdowns.
- **Swap Functionality**: Easily swap between different currencies.
- **Responsive Design**: User-friendly interface for all devices.

## Installation

1. **Clone the repository**

  ```bash
  git clone https://github.com/yourusername/99techteam-code-challenge.git
  ```

2. **Navigate to the project directory**

  ```bash
  cd 99techteam-code-challenge/problem2/fancy-form
  ```

3. **Install dependencies**

  ```bash
  yarn
  ```

4. **Set up environment variables**

  Create a `.env.local` file in the root directory and add:

  ```
  VITE_TOKEN_ICONS_URL=your_token_icons_url
  VITE_PRICE_API_URL=your_price_api_url
  ```

5. **Run the application**

  ```bash
  yarn dev
  ```

## Usage

1. **Select 'From' Currency**: Choose the currency you want to swap from.
2. **Select 'To' Currency**: Choose the currency you want to swap to.
3. **Search Token**: Input to search for tokens on the server.
4. **Enter Amount**: Input the amount you wish to exchange.
5. **View Exchange Rate**: The app will display the converted amount and the current exchange rate.
6. **Swap Currencies**: Click the "Swap" button to switch currencies.

## Technologies Used

- **React** with TypeScript
- **Vite** for fast development
- **Axios** for API requests
- **react-select** for enhanced select inputs

## License

This project is licensed under the MIT License.
