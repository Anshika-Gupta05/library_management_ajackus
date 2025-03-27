import axios from "axios";

const API_URL = `${backend_url}/librarians`;

export const registerLibrarian = async (librarianData) => {
  return await axios.post(`${API_URL}/register`, librarianData);
};

export const loginLibrarian = async (librarianData) => {
  return await axios.post(`${API_URL}/login`, librarianData);
};
