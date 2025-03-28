require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const librarianRoutes = require("./routes/librarianRoutes");
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
const allowedOrigins = [
  "https://library-management-ajackus-frontend.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// API Routes
app.get("/", (req, res) => {
  res.send("✅ Library Management System API is running...");
});

app.use("/books", bookRoutes);
app.use("/librarians", librarianRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started", port));
