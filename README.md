
# BizEasy

BizEasy is a modern accounting management system for small and medium businesses, built with Node.js, Express, and MongoDB.

## Main Features

- Manage suppliers, customers, categories, expenses, and incomes
- Manage payments for incomes
- Manage user and business settings
- File upload (invoices/receipts) using Multer
- Full REST API for all entities
- Data validation and integrity checks
- MongoDB integration with Mongoose

## Project Structure

```
src/
  config/           // Configuration files (DB)
  controllers/      // API logic for each entity
  middleware/       // Middlewares (Multer, validation)
  models/           // Mongoose schemas for each entity
  routes/           // Express routes for each entity
  services/         // Service logic (DB)
```

## Installation & Running

1. Install dependencies:
  ```bash
  npm install
  ```

2. Create a `.env` file with the following variables (if needed):

  ```
  MONGO_URI=mongodb://localhost:27017/minibiz
  PORT=5000
  ```

3. Run the development server:
  ```bash
  npm run dev
  ```

## API Usage

All entities are available under `/api`:

- `/api/suppliers` — Suppliers management
- `/api/customers` — Customers management
- `/api/categories` — Categories management
- `/api/expenses` — Expenses management
- `/api/incomes` — Incomes management
- `/api/incomePayments` — Payments management
- `/api/user-settings` — User settings

### Example: Create a Supplier

```http
POST /api/suppliers/create
Content-Type: application/json

{
  "name": "Example Supplier",
  "email": "supplier@example.com",
  "phone": "050-1234567",
  "address": "1 Example St",
  "companyNum": 123456789
}
```

## Main Technologies

- Node.js, Express
- TypeScript
- MongoDB, Mongoose
- Multer (file uploads)
- dotenv (environment variables)
- Jest (testing)

## Contributing

Feel free to open Issues and Pull Requests.