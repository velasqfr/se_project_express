# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

# Technologies & Techniques Used:

- VS Code: Open-source editor used for writing and manging our code
- Express.JS: A popular server-side web framework used to handle HTTP requests and define our API routes
- MongoDB: NoSQL database used to store our application data — in this case, clothingItems and users
- MongoDB Compass: GUI tool used to create, view, and manage our MongoDB databases and their contents.
- Mongoose: ODM library tool that allowed us to define schemas and manage interactions with our MongoDB database using JavaScript objects
- Nodemon: Development Dependency server tool used for hot reloading
- JSON Web Tokens: For authentication & authorization by securely transmitting information between parties in JSON format
- EsLint: Code linting tool used with Airbnb style guide to enforce consistent code styling and improving overall code quality.
- Error Handling: Logs error for developers, prevents app crashes, and provides useful feedback to users
  - Example: middleware was used, a function used to catch and handle errors during the request–response cycle.
- Input Validation: Integrated validator.js to ensure data integrity in our user input code before procesing it

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
