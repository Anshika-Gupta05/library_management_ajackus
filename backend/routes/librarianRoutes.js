const express = require("express");
const {
  registerLibrarian,
  loginLibrarian,
} = require("../controllers/librarianController");

const router = express.Router();

// Route to register a librarian
router.post("/register", registerLibrarian);

// Route to login a librarian
router.post("/login", loginLibrarian);

module.exports = router;
