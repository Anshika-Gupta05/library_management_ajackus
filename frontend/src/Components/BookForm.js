import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../App";

export default function BookForm({ bookData }) {
  const [book, setBook] = useState(
    bookData || {
      bookId: "",
      title: "",
      author: "",
      genre: "",
      availabilityStatus: "Available",
    }
  );
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.bookId || !book.title || !book.author) {
      setError("Book ID, Title, and Author are required");
      return;
    }

    try {
      const url = bookData
        ? `${backend_url}/books/update/${book.bookId}`
        : `${backend_url}/books/add`;
      const method = bookData ? axios.put : axios.post;
      await method(url, book);
      navigate("/");
    } catch (error) {
      setError("Error saving book");
    }
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="bookId"
        value={book.bookId}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        placeholder="Book ID"
        required
      />
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="author"
        value={book.author}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        placeholder="Author"
        required
      />
      <input
        type="text"
        name="genre"
        value={book.genre}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        placeholder="Genre"
      />
      <select
        name="availabilityStatus"
        value={book.availabilityStatus}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      >
        <option value="Available">Available</option>
        <option value="Checked Out">Checked Out</option>
      </select>
      <button type="submit" className="bg-cyan-950 text-white p-2 w-full">
        {bookData ? "Update" : "Add"} Book
      </button>
    </form>
  );
}
