import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import edit from "../assets/edit.png";
import del from "../assets/delete.png";
import available from "../assets/available.png";
import checked_out from "../assets/checked-out.png";
import { backend_url } from "../App";

export default function BookList({ searchQuery, showAll }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteBook = async (id) => {
    try {
      await axios.delete(`${backend_url}/books/delete/${id}`);
      fetchBooks(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, [searchQuery, showAll]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const url = showAll
        ? `${backend_url}/books`
        : `${backend_url}/books/search/${searchQuery}`;
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : books.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-cyan-900">
            <thead>
              <tr className="bg-cyan-950">
                <th className="border border-cyan-900 text-gray-50 px-4 py-2">
                  Book ID
                </th>
                <th className="border border-cyan-900 text-gray-50 px-4 py-2">
                  Title
                </th>
                <th className="border border-cyan-900 text-gray-50 px-4 py-2">
                  Author
                </th>
                <th className="border border-cyan-900 text-gray-50 px-4 py-2">
                  Genre
                </th>
                <th className="border border-cyan-900 text-gray-50 px-4 py-2">
                  Availability
                </th>
                <th className="border border-cyan-900 text-gray-50 px-4 py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookId} className="text-center">
                  <td className="border border-cyan-900 px-4 py-2">
                    {book.bookId}
                  </td>
                  <td className="border border-cyan-900 px-4 py-2">
                    {book.title}
                  </td>
                  <td className="border border-cyan-900 px-4 py-2">
                    {book.author}
                  </td>
                  <td className="border border-cyan-900 px-4 py-2">
                    {book.genre}
                  </td>
                  <td className="border border-cyan-900 px-4 py-2 ">
                    <div className="flex items-center justify-evenly gap-2">
                      {book.availabilityStatus === "Available" ? (
                        <>
                          <img src={available} alt="Available" />
                        </>
                      ) : (
                        <>
                          <img src={checked_out} alt="Checked Out" />
                        </>
                      )}
                    </div>
                  </td>

                  <td className="border border-cyan-900 px-4 py-2">
                    <div className="flex items-center justify-evenly">
                      <Link to={`/update/${book.bookId}`}>
                        <img src={edit} alt="Edit Book" />
                      </Link>
                      <button
                        onClick={() => deleteBook(book.bookId)}
                        className="text-red-500"
                      >
                        <img src={del} alt="Delete Book" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}
