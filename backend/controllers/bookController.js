const Book = require("../models/Book");

// Add Book
exports.addBook = async (req, res) => {
  try {
    const { bookId, title, author, genre, availabilityStatus } = req.body;
    const book = new Book({ bookId, title, author, genre, availabilityStatus });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: "Error adding book" });
  }
};

// Get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: "Error fetching books" });
  }
};

// Search Book
exports.searchBook = async (req, res) => {
  try {
    const { query } = req.params;
    const books = await Book.find({
      $or: [{ bookId: query }, { title: new RegExp(query, "i") }],
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: "Error searching books" });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { bookId: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: "Error updating book" });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findOneAndDelete({ bookId: req.params.id });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting book" });
  }
};
