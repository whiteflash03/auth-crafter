````markdown
# 🔐 Auth Crafter

A lightweight, reusable auth token utility package for Node.js projects. Easily generate, verify, and rotate access and refresh tokens — compatible with any backend framework including Hapi.js, Express.js, Fastify, and more.

---

## 🚀 Features

- Generate **Access Tokens** and **Refresh Tokens**  
- Securely **verify** tokens  
- Seamlessly **rotate refresh tokens**  
- Framework-agnostic  
- Production-ready and simple to integrate  

---

## 📦 Installation

```bash
npm install auth-crafter
````

or

```bash
yarn add auth-crafter
```

---

## 🔧 Usage

```js
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  rotateRefreshToken
} from 'auth-crafter';

const secret = 'your-very-secure-secret';

const user = {
  id: 'user123',
  role: 'admin',
  email: 'admin@example.com'
};

// Create tokens
const accessToken = createAccessToken(user, secret);           // Valid for 1 day
const refreshToken = createRefreshToken(user, secret);         // Valid for 7 days

// Verify access token
const payload = verifyToken(accessToken, secret);

// Rotate refresh token (when access token expires)
const { accessToken: newAccess, refreshToken: newRefresh } = await rotateRefreshToken(
  refreshToken,
  refreshToken, // This should come from secure DB/session store
  secret
);
```
