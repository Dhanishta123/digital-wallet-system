# Digital Wallet System

This project is a backend API for a digital wallet system with cash management and basic fraud detection.

## Features

### Core
- User registration and login (JWT-based)
- Deposit, Withdraw, and Transfer virtual funds
- Transaction history per user
- Fraud detection (large withdrawal, rapid transfers)
- Admin reports (flagged transactions, top users, total balance)

### Bonus
- Daily fraud scan using `node-cron`

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Postman for API testing

## API Endpoints

### Auth
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive JWT

### Wallet
- `POST /api/wallet/deposit` — add funds
- `POST /api/wallet/withdraw` — remove funds
- `POST /api/wallet/transfer` — send to another user
- `GET /api/wallet/balance` — view balance
- `GET /api/wallet/transactions` — view transaction history

### Admin
- `GET /api/admin/flagged` — view flagged transactions
- `GET /api/admin/top-users` — view top 5 users
- `GET /api/admin/total-balance` — total balance in system
"# digital-wallet-system" 
