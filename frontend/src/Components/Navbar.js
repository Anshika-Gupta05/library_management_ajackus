import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import logo from "../assets/logo.png";
export default function Navbar() {
  const { librarian, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to exit?");
    if (confirmLogout) {
      logout(); // Call logout function from context
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <nav className="border-b border-cyan-950 p-4 text-cyan-950">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide flex items-center space-x-2"
        >
          <img className="w-10 h-10" src={logo} alt="Library Logo" />
          <span>Library Management System</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {librarian && (
            <Link
              to="/"
              className="hover:bg-cyan-950 hover:text-gray-50 px-4 py-2 rounded-md transition duration-300"
            >
              Home
            </Link>
          )}

          {/* Show "Add Book" only if user is logged in */}
          {librarian && (
            <Link
              to="/add"
              className="hover:bg-cyan-950 hover:text-gray-50 px-4 py-2 rounded-md transition duration-300"
            >
              Add Book
            </Link>
          )}

          {/* Authentication Links */}
          {librarian ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
            >
              Exit
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:bg-cyan-950 hover:text-gray-50 px-4 py-2 rounded-md transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:bg-cyan-950 hover:text-gray-50 px-4 py-2 rounded-md transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-cyan-950 focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-2 mt-5 px-5 md:hidden text-cyan-950 py-2 flex flex-col items-center">
          {librarian && (
            <Link
              to="/"
              className="px-4 py-2 rounded inline-block hover:bg-cyan-950 hover:text-white text-center"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          )}

          {/* Show "Add Book" only if user is logged in */}
          {librarian && (
            <Link
              to="/add"
              className="px-4 py-2 rounded inline-block hover:bg-cyan-950 hover:text-white text-center"
              onClick={() => setMenuOpen(false)}
            >
              Add Book
            </Link>
          )}

          {/* Authentication Links */}
          {librarian ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded inline-block text-center"
            >
              Exit
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded inline-block hover:bg-cyan-950 hover:text-white text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded inline-block hover:bg-cyan-950 hover:text-white text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
