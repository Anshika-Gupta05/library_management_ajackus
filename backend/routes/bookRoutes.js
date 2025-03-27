const express = require("express");
const {
  addBook,
  getBooks,
  searchBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const router = express.Router();

router.post("/add", addBook);
router.get("/", getBooks);
router.get("/search/:query", searchBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
