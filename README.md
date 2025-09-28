## WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## 🛠️ Technical Stack

- Node.Js
- Express.js
- MongoDb
- Mongoose
- JSON Web Tokens (JWT)
- Celebrate / Joi & Validator.js

## 🛠 Technologies & Techniques Used

- VS Code: Open-source editor used for writing and managing our code
- Express.JS: A popular server-side web framework used to handle HTTP requests and define our API routes
- MongoDB: NoSQL database used to store our application data — in this case, clothingItems and users
- MongoDB Compass: GUI tool used to create, view, and manage our MongoDB databases and their contents.
- Mongoose: ODM library tool that allowed us to define schemas and manage interactions with our MongoDB database using JavaScript objects
- Nodemon: Development Dependency server tool used for hot reloading
- JSON Web Tokens: For authentication & authorization by securely transmitting information between parties in JSON format
- EsLint: Code linting tool used with Airbnb style guide to enforce consistent code styling and improving overall code quality.
- Validator.js and Celebrate/Joi: Integrated for robust input validation and request data integrity.
- Helmet: Middleware to add essential security headers to HTTP responses.
- Winston: Logging library for capturing requests and errors.
- Error Handling: Logs error for developers, prevents app crashes, and provides useful feedback to users
  - Example: middleware was implemented to catch and handle errors during the request–response cycle.
- Postman: An API platform used for testing and managing our APIs, particularly passing all of our potential errors

## 🌐 Deployment

- Live Domain: https://wtwr-96.mine.bz

- Frontend Repository: https://github.com/velasqfr/se_project_react.git

## 📦 Project Overview – Back End Features

- Setting up the server using Express.js
- Connecting to MongoDB using Mongoose for data modeling
- Creating API endpoints to handle CRUD functionality
- Implementing user actions such as adding, deleting, liking, and unliking
- Performing input validation and structured error handling
- Preparing the server for deployment on a remote environment

## 💻 Running the Project Locally

1. Install MongoDB:

- Ensure MongoDB is installed on your machine. [Download MongoDB here](https://www.mongodb.com/try/download/community) if needed.

2. Start the MongoDB:

- Start the MongoDB service so the server can connect to the database.
  - 📝 Note: The database and collections will be created automatically on first use of the API.

3. Install Dependencies:

- Run the following command to install all project dependencies:

npm install

4. Start the Server:

- For production mode - launch the server

npm run start

- For development mode (with hot reloading via Nodemon) – launch the server with:

npm run dev

## 🔗 API Endpoints

- 🧢 Clothing Items:
  | Method | Endpoint | Description |
  |---------|-------------------------|--------------------------------|
  | POST | `/items` | Create a new clothing item |
  | GET | `/items` | Retrieve all clothing items |
  | PUT | `/items/:itemId` | Update a clothing item's image URL |
  | DELETE | `/items/:itemId` | Delete a clothing item |
  | PUT | `/items/:itemId/likes` | Like a clothing item |
  | DELETE | `/items/:itemId/likes` | Unlike a clothing item |

## ✅ Key Features

- **Robust Data Modeling & Validation**  
  Mongoose schemas with built-in validation, supplemented by validator.js and Celebrate/Joi for request validation.

- **User Authentication & Authorization**  
  Secure signup/login with JWT tokens and authorization middleware to protect sensitive routes.

- **Full CRUD Operations with Access Control**  
  Complete create, read, update, and delete endpoints for clothing items, enforcing ownership permissions on sensitive actions.

- **Like/Unlike Functionality**  
  Users can like or unlike clothing items, with unique user tracking to prevent duplicate likes.

- **Centralized & Structured Error Handling**  
  Custom error classes and global middleware ensure consistent, clear error responses with proper HTTP status codes.

- **Security Enhancements**  
  Helmet middleware adds essential security headers to HTTP responses.

- **Request & Error Logging**  
  Winston-based logging captures all requests and errors for easier debugging and monitoring.

- **Modular Codebase**  
  Well-organized folder structure separating concerns: routes, controllers, models, middlewares.
