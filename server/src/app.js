import cors from "cors";
import express from "express";

import router from "./routes/main.route.js";

import logger from "./middlewares/logger.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

// Initializing express
const app = express();

// CORS setup
app.use(cors({
   origin: ["http://localhost:5173", "https://tasks-mern.onrender.com"], // Allowed origin
   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
   credentials: true, // Allow cookies and authorization headers
}));
app.options("*", cors({
   origin: ["http://localhost:5173", "https://tasks-mern.onrender.com"],
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use("/api", router);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
