# Tasks Manager (MERN Stack)

This project is desined for users to store their tasks which should be accessible from everywhere.

## Technologies used
Following technologies are used for this web application:
- [MongoDB](https://www.mongodb.com/)
- [Node Js](https://nodejs.org/en)
- [Express Js](https://expressjs.com/)
- [React Js](https://react.dev/)

Node packages used: 
- For frontend:
  - Axios
  - React Icons
  - React Router Dom
- For backend:
  - Bcrypt
  - Chalk
  - Cors
  - Dotenv
  - Mongoose
  - JSON web token
  - Nodemon
  
## Features

### Authentication
This project uses Json web tokens for authentication which makes it easier to access 

## Getting Started

To run the project, clone the git repository: 
```bash
git clone https://github.com/Muhammad-Dawood-Nasaryab/Tasks-Manager-MERN.git
```

Then enter the backend and frontend direcroties from different terminals: 
```bash
cd server
```

and for frontend:
```bash
cd client
```

In both terminals, run the command: 
```bash 
npm install
```

### For backend
Create a new mongodb cluster with 2 databases. Then create a `.env` file in the `server` directory and create a variable named `USERS_URI` for storing users and `TASKS_URI` for storing tasks. Also add a variable named `JWT_SECRET` and `JWT_REFRESH_SECRET` which should contain a key which should be used to verify the tokens that user sends with the request. Also add a `PORT` variable.
After that, run the backend with this command in the backend terminal: 
```bash
npm run dev
```

### For frontend
Add a `.env` file in the client directory as well and it should contain variable named `VITE_API` which should contain the url of the backend.
After that, run this command in the frontend terminal to run:
``` bash
npm run dev
```

