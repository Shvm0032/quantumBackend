import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./libs/db.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Parse allowed origins from .env
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : [];

app.use(express.json());

// middlware to cors policy
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, server-to-server, curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS: Origin not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

// DB Connect
dbConnect();

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running");
});

//*******************Route not Found ***************************//
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// ********************Middlewares Error Handling**********************//
app.use(errorHandler);

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
