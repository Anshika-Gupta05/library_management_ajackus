import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookForm from "../Components/BookForm";
import { backend_url } from "../App";
export default function UpdateBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`${backend_url}/books/search/${id}`)
      .then((response) => setBook(response.data[0]))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold p-5">Update Book</h2>
      {book && <BookForm bookData={book} />}
    </div>
  );
}
