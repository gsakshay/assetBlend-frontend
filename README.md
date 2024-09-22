# AssetBlend Frontend

AssetBlend is a comprehensive Portfolio Tracker application built with React, providing an intuitive interface for tracking, analyzing, and making informed decisions about stocks and cryptocurrencies.

## 🚀 Features

- **User Roles**: Supports Guest, Registered User, Financial Advisor, and Admin roles
- **Dynamic Home Screen**: Tailored content for both anonymous and logged-in users
- **Holdings Management**: Easy entry and selection of holdings for registered users and advisors
- **Advanced Search**: Powerful search functionality for stocks and cryptocurrencies
- **Real-time Data**: Integration with Tingo API for up-to-date market information
- **Responsive Design**: Built with MUI components for a sleek, mobile-friendly interface

## 🛠️ Tech Stack

- React
- Redux for state management
- Material-UI (MUI) for UI components
- Axios for API calls

## 🚦 Getting Started

1. Clone the repository and navigate to source.

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables: (Checkout [assetBlend-backend](https://github.com/gsakshay/assetBlend-backend) for the backend implementation)
   Create a `.env` file in the root directory and add:
   ```
   REACT_APP_API_URL=your_backend_api_url
   ```

4. Start the development server:
   ```
   npm start
   ```

## 🔐 Authentication

The app uses role-based access control. Certain pages and features are restricted based on the user's role.
