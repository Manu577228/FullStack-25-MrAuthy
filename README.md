<p align="center">
  <img src="https://raw.githubusercontent.com/Manu577228/github-assets/main/auth-demo.gif" width="100%" />
</p>

<h1 align="center">🔐 MrAuthy</h1>

<p align="center">
  <b>Enterprise-Grade Full Stack Authentication System</b><br>
  <i>Secure • Scalable • Production-Ready</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-brightgreen?style=for-the-badge">
  <img src="https://img.shields.io/badge/Security-Spring%20Security-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Frontend-React-61dafb?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge">
</p>

<hr>

<h2>🚀 Project Overview</h2>

<b>MrAuthy</b> is a <b>real-world, enterprise-style authentication system</b> built using  
<b>Spring Boot</b> for backend security and <b>React</b> for frontend state management.

This project is designed to mirror how authentication systems are built in <b>actual production environments</b> — focusing on clean architecture, security best practices, scalability, and maintainability.

<hr>

<h2>🎯 Key Objectives</h2>

<ul>
  <li>Implement secure JWT-based authentication from scratch</li>
  <li>Understand Spring Security internals & filter chains</li>
  <li>Build stateless backend authentication</li>
  <li>Design clean layered backend architecture</li>
  <li>Manage authentication state correctly on frontend</li>
</ul>

<hr>

<h2>🧰 Technology Stack</h2>

<table>
<tr><th align="left">Layer</th><th align="left">Technologies</th></tr>
<tr><td>Backend</td><td>Java 21, Spring Boot, Spring Security, JWT, Hibernate/JPA, Maven</td></tr>
<tr><td>Database</td><td>MySQL / PostgreSQL (Configurable)</td></tr>
<tr><td>Frontend</td><td>React-19(Vite), Context API, Axios, CSS</td></tr>
<tr><td>Security</td><td>JWT Tokens, Password Hashing, Role-Based Access Control</td></tr>
</table>

<hr>

<h2>🏗️ Backend Architecture</h2>

<pre>
auth
└── src/main/java/in/bharadwaj/auth
    ├── Service        → Business logic layer
    ├── config         → Spring Security & app configuration
    ├── controller     → REST API endpoints
    ├── entity         → JPA entities
    ├── filter         → JWT authentication filter
    ├── io             → Request / Response DTOs
    ├── repository    → Database access layer
    ├── util           → Utility helpers
    └── AuthApplication.java
</pre>

<b>Architecture Highlights:</b>
<ul>
  <li>Strict separation of concerns</li>
  <li>Controller → Service → Repository flow</li>
  <li>Stateless security using filters</li>
  <li>DTO-based API communication</li>
</ul>

<hr>

<h2>🎨 Frontend Architecture</h2>

<pre>
client
├── assets
├── components        → Reusable UI components
├── context           → Global authentication state
├── pages             → Application pages
├── util              → Helpers & API utilities
├── App.jsx
├── main.jsx
└── index.css
</pre>

<b>Frontend Highlights:</b>
<ul>
  <li>Context API for global auth state</li>
  <li>Centralized API handling using Axios</li>
  <li>Clean component-based UI structure</li>
</ul>

<hr>

<h2>✨ Core Features</h2>

<h3>🔐 Authentication</h3>
<ul>
  <li>User Registration</li>
  <li>Secure Login</li>
  <li>Password Encryption</li>
  <li>JWT Token Generation</li>
</ul>

<h3>🛡️ Authorization</h3>
<ul>
  <li>Role-Based Access Control (RBAC)</li>
  <li>Protected Endpoints</li>
  <li>Stateless Authentication Model</li>
</ul>

<h3>🌐 Frontend</h3>
<ul>
  <li>Global Auth Context</li>
  <li>Secure API Communication</li>
  <li>Axios Interceptors</li>
  <li>Clean UI State Handling</li>
</ul>

<hr>

<h2>🔄 Authentication Flow</h2>

<pre>
Client → Login / Register
      → Backend Validates Credentials
      → JWT Token Generated
      → Token Returned to Client
      → Token Attached to API Requests
      → JWT Filter Intercepts Request
      → Access Granted / Denied
</pre>

<hr>

<h2>▶️ Run Locally</h2>

<b>Backend</b>
<pre>
cd auth
mvn clean install
mvn spring-boot:run
</pre>

<b>Frontend</b>
<pre>
cd client
npm install
npm run dev
</pre>

<hr>

<h2>🔑 Authorization Header</h2>

<pre>
Authorization: Bearer &lt;JWT_TOKEN&gt;
</pre>

<hr>

<h2>⚙️ Environment Variables</h2>

<pre>
JWT_SECRET=your_secret_key
JWT_EXPIRATION=86400000
DB_URL=jdbc:mysql://localhost:3306/db_name
DB_USERNAME=root
DB_PASSWORD=yourdbpassword
</pre>

<hr>

<h2>📚 What This Project Demonstrates</h2>

<ul>
  <li>Deep understanding of Spring Security</li>
  <li>JWT filter implementation in real systems</li>
  <li>Stateless backend authentication</li>
  <li>Clean, scalable backend architecture</li>
  <li>Full-stack authentication lifecycle</li>
  <li>Production-grade project structuring</li>
</ul>

<hr>

<h2>🚀 Planned Enhancements</h2>

<ul>
  <li>Refresh Token Support</li>
  <li>OAuth Login (Google / GitHub)</li>
  <li>Email Verification</li>
  <li>Password Reset Flow</li>
  <li>Dockerization</li>
  <li>CI/CD Pipeline</li>
</ul>

<hr>

<h2>👨‍💻 Author</h2>

<b>Bharadwaj (Manu577228)</b><br>
🎥 YouTube: https://youtube.com/@code-with-Bharadwaj<br>
💻 GitHub: https://github.com/Manu577228<br>
🌐 Portfolio: https://manu-bharadwaj-portfolio.vercel.app/portfolio

<p align="center">
  ⭐ Star • 🍴 Fork • 🚀 Build • 🎯 Learn
</p>

<p align="center">
  <b>Built with ❤️ and a real-world backend engineering mindset</b>
</p>
