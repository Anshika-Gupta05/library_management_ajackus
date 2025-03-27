const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  availabilityStatus: {
    type: String,
    enum: ["Available", "Checked Out"],
    default: "Available",
  },
});

module.exports = mongoose.model("Book", bookSchema);
