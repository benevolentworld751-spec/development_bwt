import express from "express";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import packageRoute from "./routes/package.route.js";
import ratingRoute from "./routes/rating.route.js";
import bookingRoute from "./routes/booking.route.js";
import paymentRoutes from "./routes/payment.route.js";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();
const __dirname = path.resolve();

connectDB();

// ✅ FIXED CORS
app.use(
  cors({
    origin: [ "http://localhost:5173",
      "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Serve uploads
app.use("/images", express.static("uploads"));

// API routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/package", packageRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;

// 🚀 PRODUCTION MODE (Render)
if (
  process.env.NODE_ENV_CUSTOM === "production"
) {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  // ❗ Express 5 fix → "*" breaks; must use "/*"
  // ✅ Fix: Use "*" for wildcard (matches everything)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to travel and tourism app");
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
