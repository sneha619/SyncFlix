import express from "express";
import http from "http"; 
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ MongoDB Connection Fix
mongoose.connect("mongodb+srv://sneha1995sarkar25:ikumIuurDQeho5W9@cluster0.9djvu.mongodb.net/SyncFlix?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(error => console.error("❌ MongoDB Connection Error:", error));

// ✅ Fixed Test MongoDB Route
app.get("/test-db", async (req, res) => {
  try {
    const dbStatus = await mongoose.connection.db.admin().ping();
    res.json({ message: "Connected to MongoDB", dbStatus });
  } catch (error) {
    res.status(500).json({ message: "Error connecting to MongoDB", error });
  }
});

// ✅ WebSocket Event Handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sync-movie", (data) => {
    io.emit("sync-movie", data);
  });

  socket.on("send-message", (message) => {
    io.emit("receive-message", message);
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

// ✅ Dynamic PORT Handling
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
