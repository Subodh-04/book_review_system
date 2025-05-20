const express = require("express");
const {
  addBook,
  getBook,
  getBookByIdDetails,
  addReview,
  searchBooks,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addBook);
router.get("/", getBook);
router.get("/search",searchBooks);
router.get("/:id", getBookByIdDetails);
router.post("/:id/reviews", authMiddleware, addReview);


module.exports = router;
