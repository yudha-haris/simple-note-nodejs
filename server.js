const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for notes
let notes = [
  { id: 1, title: "Welcome", content: "Welcome to your notes app!" },
  { id: 2, title: "How to use", content: "Create, view, and delete notes using the API." }
];
let nextId = 3;

// GET all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// GET a specific note
app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(note => note.id === id);
  
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

// CREATE a new note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  
  const newNote = {
    id: nextId++,
    title,
    content
  };
  
  notes.push(newNote);
  res.status(201).json(newNote);
});

// DELETE a note
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = notes.length;
  
  notes = notes.filter(note => note.id !== id);
  
  if (notes.length < initialLength) {
    res.json({ message: "Note deleted successfully" });
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});