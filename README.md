#  Finance Dashboard Backend

##  Overview

This project is a backend system for managing financial transactions with **role-based access control** and **dashboard analytics**.
It enables users to track income and expenses, while providing powerful insights through summarized financial data.

---

##  Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

##  Roles & Permissions

* **Viewer** → Can only view transactions and dashboard
* **Analyst** → Can view + create transactions
* **Admin** → Full access (create, update, delete, manage users)

---

##  Features

*  User Authentication (Register/Login with JWT)
*  Role-based Authorization
*  Transaction CRUD APIs
*  Filtering (type, category, date)
*  Pagination support

###  Dashboard Analytics

* Total Income
* Total Expenses
* Net Balance
* Category-wise totals
* Monthly trends
* Recent transactions

---

##  Live API

https://finance-dashboard-backend-1cp6.onrender.com

---

##  API Endpoints

###  Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

###  Transactions

* POST `/api/transactions`
* GET `/api/transactions`
* PUT `/api/transactions/:id`
* DELETE `/api/transactions/:id`

###  Dashboard

* GET `/api/dashboard/summary`
* GET `/api/dashboard/category-wise`
* GET `/api/dashboard/recent`
* GET `/api/dashboard/trends`

---

##  Setup Instructions

```bash
git clone <your-repo-link>
cd finance-dashboard-backend
npm install
npm run dev
```

---

##  Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

##  Assumptions

* Each user can access only their own transactions
* Role-based access is strictly enforced
* Admin has full system control

---

##  Future Improvements

* Swagger API Documentation
* Unit Testing
* Rate Limiting
* Frontend Integration
* Performance Optimization

---

##  Author

**Saurabh Verma**
