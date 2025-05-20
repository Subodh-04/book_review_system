# 📚 Book Review System – Backend

A lightweight yet robust REST API built using **Node.js** and **Express**, aimed at powering a Book Review platform where users can register, explore books, and share their reviews in an authenticated and structured way. This project demonstrates a solid grasp of backend fundamentals, token-based authentication, and clean API architecture.

---

## 🚀 What This System Offers

- Secure user registration and login system using **JWT**
- Authenticated users can add books and leave one review per book
- Pagination support for both books and reviews
- Filter books by **genre** or **author**
- Search functionality with **case-insensitive partial match** on title or author
- Users can **edit** or **delete** their own reviews
- All endpoints follow REST principles for clarity and scalability

---

## 🧰 Tech Stack

- **Node.js** – Event-driven runtime environment
- **Express.js** – Web framework for routing and middleware
- **MongoDB** with **Mongoose** – NoSQL database with schema modeling
- **JWT (JSON Web Tokens)** – Stateless user authentication
- **bcrypt.js** – Secure password hashing
- **dotenv** – For managing environment variables

---

## 🗂️ Database Schema Design

**Users Collection**
| Field       | Type                    | Description                        |
|-------------|-------------------------|------------------------------------|
| userId      | ObjectId                |  Unique User Identifier            |
| username    | String                  |  User's display name               |
| email       | String                  |  User's unique email               |
| password    | String                  |  Hashed password                   |

**Books Collection**
| Field       | Type                    | Description                        |
|-------------|-------------------------|------------------------------------|
| bookId      | ObjectId                |  Unique Book Identifier            |
| title       | String                  |  Book title                        |
| author      | String                  |  Author's name                     |
| genre       | String                  |  Book genre                        |
| description | String                  |  (Optional)Book description        |

**Reviews Collection**
| Field       | Type          | Description                                |
| ----------- | ------------- | ------------------------------------------ |
| reviewId    | ObjectId (PK) | Unique review identifier                   |
| bookId      | ObjectId (FK) | Reference to the reviewed book             |
| userId      | ObjectId (FK) | Reference to the user who wrote the review |
| rating      | Number (1-5)  | Rating given by the user                   |
| comment     | String        | Review text                                |

**Notes:**
-Each user can submit only one review per book (enforced by a unique index on userId and bookId in reviews).
-Average book ratings are calculated dynamically based on reviews.
-Passwords are stored securely with hashing.
-JWT tokens are used for authentication and protected routes.
-Pagination and filtering are supported on book and review listings.

---

## 🔐 Authentication Routes

| Method | Endpoint     | Purpose                  |
|--------|--------------|--------------------------|
| POST   | `/signup`    | Register a new user      |
| POST   | `/login`     | Log in and receive token |

Passwords are securely hashed and tokens are signed using a secret key stored in the environment.

---

## 📘 Book Routes

| Method | Endpoint              | Description                                           |
|--------|------------------------|-------------------------------------------------------|
| POST   | `/books`              | Add a new book (Authenticated only)                  |
| GET    | `/books`              | Retrieve books with pagination and filter support    |
| GET    | `/books/:id`          | Get detailed info including average rating & reviews |
| GET    | `/books/search`       | Search by book title or author (partial & insensitive) |

---

## ✍️ Review Routes

| Method | Endpoint              | Description                               |
|--------|------------------------|-------------------------------------------|
| POST   | `/books/:id/reviews`  | Submit one review per book (Authenticated)|
| PUT    | `/reviews/:id`        | Update your own review                    |
| DELETE | `/reviews/:id`        | Delete your own review                    |

---

## ⚙️ Setting It Up Locally

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

2. **Clone the Repository**
```bash
npm install
```

3. **Environment Configuration**
Create a .env file and include the following:
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_very_secret_key
```

4. **Start the Server**
```bash
npm start
```

## 📬 Sample API Usage (Postman-friendly)
➕ Register a New User

```http
POST /signup
Content-Type: application/json

{
  "username": "adduser",
  "email": "add@example.com",
  "password": "securepassword"
}
```

🔑 Login
```http
POST /login
{
  "email": "sumed@example.com",
  "password": "securepassword"
}
```

📚 Add a Book
```http
POST /books
Authorization: Bearer <your_token_here>

{
  "title": "Deep Work",
  "author": "Cal Newport",
  "genre": "Productivity",
  "description": "Rules for focused success in a distracted world."
}
```
---------------------------------------------------------------------------------

## ✉️ Contact
Developed by Subodh Surwade
📧 Email: [subodhsurwade04@example.com]
🔗 GitHub: https://github.com/Subodh-04
