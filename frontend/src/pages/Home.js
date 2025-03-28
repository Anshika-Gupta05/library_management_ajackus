// import { useState } from "react";
// import BookList from "../Components/BookList";

// export default function Home() {
//   const [search, setSearch] = useState("");
//   const [showBooks, setShowBooks] = useState(false);
//   const [showAll, setShowAll] = useState(false);

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl text-cyan-950 font-bold mb-4">Search Books</h2>

//       {/* Search Bar with Show All Books Button */}
//       <div className="mb-4 flex justify-between items-center">
//         <div className="flex">
//           <input
//             type="text"
//             placeholder="Search by title or ID..."
//             className="border border-cyan-950 p-2 w-64"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button
//             onClick={() => {
//               setShowBooks(true);
//               setShowAll(false);
//             }}
//             className="bg-cyan-950 text-white px-4 py-2 ml-2"
//           >
//             Search
//           </button>
//         </div>
//         <button
//           onClick={() => {
//             setShowBooks(true);
//             setShowAll(true);
//           }}
//           className="bg-cyan-950 text-white px-4 py-2"
//         >
//           All Books
//         </button>
//       </div>

//       {/* Display Books in Table Format */}
//       {showBooks && <BookList searchQuery={search} showAll={showAll} />}
//     </div>
//   );
// }
import { useState } from "react";
import BookList from "../Components/BookList";

export default function Home() {
  const [search, setSearch] = useState("");
  const [showBooks, setShowBooks] = useState(false);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="p-5">
      {/* Responsive Search Bar with Show All Books Button */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
        {/* Show All Books Button (Moves above input when screen < 499px) */}
        <button
          onClick={() => {
            setShowBooks(true);
            setShowAll(true);
          }}
          className="bg-cyan-950 text-white px-4 py-2 w-full sm:w-auto"
        >
          All Books
        </button>

        {/* Search Bar */}
        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by title or ID..."
            className="border border-cyan-950 p-2 w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setShowBooks(true);
              setShowAll(false);
            }}
            className="bg-cyan-950 text-white px-4 py-2 ml-2"
          >
            Search
          </button>
        </div>
      </div>

      {/* Display Books in Table Format */}
      {showBooks && <BookList searchQuery={search} showAll={showAll} />}
    </div>
  );
}
