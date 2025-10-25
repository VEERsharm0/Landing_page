# Landing Page Backend Server

This is the backend server for the landing page application, built with Express.js and MongoDB.

## Features

- User registration API
- MongoDB integration
- CORS enabled
- Error handling

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev  # For development with nodemon
   # or
   npm start    # For production
   ```

## API Endpoints

### POST /api/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "company": "ABC College",
  "role": "Student",
  "experience": "2 years"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "company": "ABC College",
    "role": "Student",
    "experience": "2 years",
    "_id": "...",
    "createdAt": "...",
    "__v": 0
  }
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "Server is running"
}
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## Technologies Used

- Express.js
- MongoDB with Mongoose
- CORS
- dotenv
