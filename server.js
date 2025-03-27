const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for frontend access

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library_db', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
   console.log('Connected to MongoDB');
});

// Define a Mongoose model for the "Books" collection
const Book = mongoose.model('Books', {
   title: String,
   author: String,
   category: String,
   ISBN: String,
   totalCopies: Number,
   availableCopies: Number,
});

// API Endpoints

// Add a new book
app.post('/Books', async (req, res) => {
   try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).send(book);
   } catch (error) {
      res.status(400).send(error);
   }
});

// Get all books
app.get('/books', async (req, res) => {
   try {
      const books = await Book.find();
      res.send(books);
   } catch (error) {
      res.status(500).send(error);
   }
});

// Get a single book by ID
app.get('/books/:id', async (req, res) => {
   try {
      const book = await Book.findById(req.params.id);
      if (!book) {
         return res.status(404).send({ error: 'Book not found' });
      }
      res.send(book);
   } catch (error) {
      res.status(500).send(error);
   }
});

// Update a book by ID
app.patch('/books/:id', async (req, res) => {
   try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });
      if (!book) {
         return res.status(404).send({ error: 'Book not found' });
      }
      res.send(book);
   } catch (error) {
      res.status(400).send(error);
   }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
   try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
         return res.status(404).send({ error: 'Book not found' });
      }
      res.send(book);
   } catch (error) {
      res.status(500).send(error);
   }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});