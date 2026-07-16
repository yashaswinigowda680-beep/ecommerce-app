# Intern E-Commerce Application

I made a full-stack e-commerce web application when I was an intern. This application lets users register log in look at products add products to their cart place orders and see their order history.

---

## Tech Stack

### Frontend

- I used Next.js for the frontend

- React was used to make the user interface

- TypeScript was used for type checking

- Tailwind CSS was used for styling

- Zustand was used to manage the state

- Axios was used to make API requests

### Backend

- I used NestJS for the backend

- TypeScript was used for type checking

- Prisma ORM was used to interact with the database

- PostgreSQL was used as the database

- JWT Authentication was used to secure the application

- Passport.js was used for authentication

- Bcrypt was used to hash passwords

### Database

- I used PostgreSQL as the database

---

# Features

- Users can register

- Users can log in with JWT Authentication

- Users can browse products from the DummyJSON API

- Users can see product details

- Users can add products to their cart using Zustand

- Users can checkout

- Users can place orders

- Users can see their order history

- Protected APIs use JWT Guard

- Prisma is used to interact with the database

- Unit tests are written for the AuthService using Jest

---

# Project Structure

```

intern-ecommerce/

├── frontend/

│ ├── app/

│ ├── components/

│ ├── store/

│ └── lib/

│

├── backend/

│ ├── auth/

│ ├── order/

│ ├── prisma/

│ └── src/

│

└── README.md

```

---

# Prerequisites

You need to install these things before you can run the project:

- Node.js version 20 or later

- pnpm

- PostgreSQL

- Git

---

# Backend Setup

## 1. Go to the backend folder

```bash

cd backend

```

## 2. Install the dependencies

```bash

pnpm install

```

## 3. Make a.env file

```env

DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"

JWT_SECRET=your_secret_key

```

Replace the database credentials with your PostgreSQL credentials.

---

## 4. Run Prisma Migration

```bash

pnpm prisma migrate dev

```

---

## 5. Generate Prisma Client

```bash

pnpm prisma generate

```

---

## 6. Start the backend

```bash

pnpm start:dev

```

The Intern E-Commerce Application backend runs on

```

http://localhost:3002

```

---

# Frontend Setup

## 1. Go to the frontend folder

```bash

cd frontend

```

## 2. Install the dependencies

```bash

pnpm install

```

## 3. Start the frontend

```bash

pnpm dev

```

The Intern E-Commerce Application frontend runs on

```

http://localhost:3000

```

---

# Application Flow

Here is how the Intern E-Commerce Application works:

1. Register for an account.

2. Log in using the registered credentials.

3. Browse the products.

4. Look at the product details.

5. Add products to the cart.

6. Go to the checkout.

7. Place the order.

8. Look at the order history.

---

# Authentication

I used JWT Authentication with:

- Passport JWT

- NestJS Guards

- JwtStrategy

- JwtService

The Intern E-Commerce Application protected APIs need a JWT token.

---

# Testing

I used Jest for unit testing.

To run the tests:

```bash

cd backend

pnpm test

```

---

# Type Checking

For the backend:

```bash

pnpm tsc --noEmit

```

For the frontend:

```bash

pnpm tsc --noEmit

```

---

# Lint

For the backend:

```bash

pnpm lint

```

For the frontend:

```bash

pnpm lint

```

---

# Known Issues

There are some issues with the Intern E-Commerce Application:

- Products are fetched from the DummyJSON API of a local database.

- Product management is not implemented.

- Cart data is stored locally using Zustand.

---

# Future Enhancements

I want to add these features to the Intern E-Commerce Application:

- Admin Dashboard

- Product CRUD

- Payment Gateway Integration

- Wishlist

- Product Search & Filters

- Email Verification

- Password Reset

- User Profile Management

---

# Author

I am Yashaswini S. I have a Masters, in Computer Applications. I was an intern. Worked as a Full Stack Developer.