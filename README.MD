# TypeScript Express Shell

A boilerplate project for building scalable and maintainable Node.js applications using TypeScript and Express. This shell includes a structured folder layout, essential configurations, and commonly used tools to kickstart your development.

## Features

- **TypeScript**: Strongly typed JavaScript for better development experience.
- **Express**: Fast and minimalist web framework.
- **Winston**: Logging with support for multiple transports.
- **Jest**: Testing framework for unit and end-to-end tests.
- **Environment Configuration**: Manage environment variables with `env-var`.
- **Middleware**: Pre-configured error handling and logging middleware.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd node-ts-express-shell
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and define your environment variables. Example:

```env
PORT=3000
NODE_ENV=development
```

### 4. Run the Development Server

Start the server in development mode with hot-reloading:

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

### 5. Build for Production

Compile the TypeScript code to JavaScript:

```bash
npm run build
```

### 6. Start the Production Server

Run the compiled code:

```bash
npm start
```

## Project Structure

```plaintext
src/
├── app/                # Application setup
├── config/             # Configuration files
│   ├── envs.ts         # Environment variables
│   └── plugins/        # Plugins (e.g., logger)
├── controllers/        # Route controllers
├── data/               # Data access layer
├── middlewares/        # Custom middleware
├── models/             # Data models
├── routes/             # API routes
├── services/           # Business logic
└── main.ts             # Entry point
tests/
├── e2e/                # End-to-end tests
```

## Logging

The project uses `winston` for logging. Logs are stored in the `logs/` directory:

- `logs/combined.log`: All logs.
- `logs/error.log`: Error logs.

## Testing

Run tests using Jest:

```bash
npm test
```

### End-to-End Tests

End-to-end tests are located in the `tests/e2e/` directory. Example:

```bash
npm test
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the [ISC License](LICENSE).

## Author

[Andres Contreras](https://github.com/XavyA1990)

---

Feel free to customize this README to suit your project's specific needs.

