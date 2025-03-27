import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../App";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [librarian, setLibrarian] = useState(
    localStorage.getItem("librarian")
      ? JSON.parse(localStorage.getItem("librarian"))
      : null
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${backend_url}/librarians/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "librarian",
        JSON.stringify(response.data.librarian)
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setLibrarian(response.data.librarian);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post(`${backend_url}/librarians/register`, {
        name,
        email,
        password,
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("librarian");
    delete axios.defaults.headers.common["Authorization"];
    setLibrarian(null);
    window.location.href = "/login"; // Redirect to login on logout
  };

  return (
    <AuthContext.Provider value={{ librarian, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
