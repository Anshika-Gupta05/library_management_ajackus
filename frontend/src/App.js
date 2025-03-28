import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./Context/AuthContext"; // Ensure correct path
export const backend_url =
  "https://library-management-ajackus-backend.onrender.com";
const ProtectedRoute = ({ children }) => {
  const { librarian } = useContext(AuthContext);
  return librarian ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen mx-2 sm:mx-[5%]">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateBook />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  );
}
