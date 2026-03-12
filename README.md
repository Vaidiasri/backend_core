# Backend Core - Authentication & User Management

A robust, secure, and production-ready backend core built with Node.js, Express, and MongoDB. This project provides a solid foundation for user registration, authentication using JWT tokens, and secure session management via HTTP-only cookies.

## 🚀 Features

-   **User Authentication**: Complete registration flow with data validation.
-   **Security**: Password hashing using `bcrypt`.
-   **JWT Integration**: Token-based authentication for stateless communication.
-   **Cookie-Based Storage**: Secure storage of JWT tokens in `HTTP-only` and `SameSite: Strict` cookies to prevent XSS and CSRF attacks.
-   **Structured Codebase**: Clean and scalable MVC-like architecture.
-   **Database Interaction**: Seamless MongoDB integration with Mongoose schemas.
-   **Environment Configuration**: Centralized configuration using `.env` files.

## 🛠 Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB
-   **ODM**: Mongoose
-   **Authentication**: JSON Web Tokens (JWT)
-   **Cryptography**: bcrypt
-   **Utility**: cookie-parser, dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas instance)

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vaidiasri/backend_core.git
   cd backend_core
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=24h
   ```

4. **Run the application**:
   - For development: `npm run dev`
   - For production: `npm start`

## 🛣 API Endpoints

### Authentication

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user and receive a JWT cookie. |

## 📁 Project Structure

```text
backend_core/
├── src/
│   ├── config/         # Configuration files (DB, etc.)
│   ├── controllers/    # Request handling logic
│   ├── models/         # Database schemas & models
│   ├── routes/         # API route definitions
│   ├── app.js          # Express app configuration
│   └── server.js       # Server entry point
├── .env                # Sensitive local configuration
├── .gitignore          # Files to be excluded from Git
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [ISC License](LICENSE).
