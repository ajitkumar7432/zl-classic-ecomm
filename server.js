import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Configure environment variables
dotenv.config();

// Database connection
try {
  connectDB();
  console.log("✅ Database connected successfully!".green);
} catch (error) {
  console.error(`❌ Database connection error: ${error.message}`.red);
  process.exit(1);
}

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increase payload limit for cart data
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Welcome to ZL-Classic - An E-commerce App</h1>");
  });
}

// Define PORT
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`.bgCyan.white
  );
});
