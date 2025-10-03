// server.js (ESM style)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://mongo:27017/notely", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Add a new note
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
