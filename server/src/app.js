import cors from "cors";
import express from "express";

import router from "./routes/main.route.js";

import logger from "./middlewares/logger.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

// Initializing express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use("/api", router);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
