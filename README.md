# myapp
Minimal full-stack MERN app with authentication using passport and JWTs.

This project uses the following technologies:
MERN -  MongoDB, Express, React, Node

## Configuration

```javascript
module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret"
};
```

## Quick Start

```javascript
// Install dependencies for server & client
npm install && npm run client-install

// Run client & server with concurrently
npm run dev

// Server runs on http://localhost:3001 and client on http://localhost:3000
```