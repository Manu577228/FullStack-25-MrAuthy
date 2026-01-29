# 🔐 Java Full Stack Authentication – JWT & OTP Based Secure Login System

This project is a **Java Full Stack Authentication application** built using **Spring Boot + Spring Security (JWT)** on the backend and **React (Vite)** on the frontend.

It demonstrates how **real-world authentication systems** handle **secure login, OTP-based password recovery, and stateless JWT authorization**.

It supports:
- ✅ Secure JWT-based authentication
- ✅ OTP-based password reset flow
- ✅ Fully stateless backend security
- ✅ React-based frontend routing

---

## ✨ Features

- 🔐 Authentication – Login and registration using JWT
- 🔑 OTP Verification – Secure OTP-based password reset
- 👤 User Management – Encrypted password storage using BCrypt
- 🛡️ Authorization – Protected APIs using JWT validation
- 🚫 Stateless Security – No HTTP sessions used
- 🌐 Frontend Routing – React Router based navigation

---

## 🏗️ Tech Stack

### Frontend (React)
- React (Vite)
- React Router DOM
- Axios for API calls
- React Toastify for notifications

### Backend (Spring Boot)
- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- BCrypt Password Encoder
- Hibernate / JPA
- MySQL
- Stateless Security Filters

---

## 🚀 Project Setup

### Clone the Repository
    git clone <your-repository-url>
    cd project-root

### Backend Setup (Spring Boot)
    cd auth
    mvn clean install
    mvn spring-boot:run

Backend runs at:
    http://localhost:8080

### Frontend Setup (React)
    cd client
    npm install
    npm run dev

Frontend runs at:
    http://localhost:5173

---

## 🔓 Public Backend APIs (No JWT Required)

These routes are **explicitly permitted** in Spring Security configuration:

    /login
    /register
    /send-reset-otp
    /reset-password
    /logout

### Purpose of Each Endpoint

- `/login`  
  Authenticates user credentials and issues a JWT token.

- `/register`  
  Registers a new user with encrypted password storage.

- `/send-reset-otp`  
  Generates and sends a **one-time password (OTP)** to the user  
  for secure password recovery.

- `/reset-password`  
  Validates the OTP and allows the user to set a new password.

- `/logout`  
  Stateless logout handled on the client side.

---

## 🔑 OTP-Based Password Reset Flow (Important)

This project uses a **secure OTP-based password recovery mechanism**.

### Actual Flow

1. User opens **Email Verify** page (`/email-verify`)
2. User enters registered email
3. Frontend calls:
       /send-reset-otp
4. Backend generates a **time-bound OTP**
5. OTP is sent to the user's email
6. User enters OTP and new password
7. Frontend calls:
       /reset-password
8. Backend verifies OTP
9. Password is securely updated using BCrypt

✔ OTP endpoints are **public**  
✔ OTP verification happens **server-side**  
✔ No JWT is required during password reset

---

## 🔐 Protected Backend APIs

    Any endpoint NOT listed above requires JWT authentication

Behavior:
- Missing JWT → 401 Unauthorized
- Invalid JWT → 401 Unauthorized
- Valid JWT → Access granted

---

## 🔑 Authentication Header Format

All protected requests must include:

    Authorization: Bearer <JWT_TOKEN>

---

## 🧠 JWT Security Flow (Backend)

1. User logs in using `/login`
2. Backend validates credentials
3. JWT token is generated
4. Token is returned to client
5. Client sends JWT in Authorization header
6. JWT filter validates token
7. Request is allowed or rejected

---

## 🌐 Frontend Routes (React Router)

These routes exist **only on the frontend**:

    /
    /login
    /email-verify
    /reset-password

### Important Clarification

- These are **UI routes**, not backend APIs
- Spring Security does **not** intercept these paths
- Backend security applies only to API requests

---

## 🌍 CORS Configuration

Backend allows requests only from:

    http://localhost:5173

This ensures:
- Frontend access is allowed
- Unauthorized origins are blocked

---

## 📚 What This Project Demonstrates

- Stateless JWT authentication
- OTP-based password recovery
- Secure credential handling with BCrypt
- Spring Security filter chain usage
- Clean frontend–backend separation
- Production-style authentication design

---

## 👨‍💻 Author

Manu Bharadwaj

YouTube: https://youtube.com/@code-with-Bharadwaj  
GitHub: https://github.com/Manu577228  
Portfolio: https://manu-bharadwaj-portfolio.vercel.app/portfolio  

The Authentic JS/Java/Python CodeBuff
