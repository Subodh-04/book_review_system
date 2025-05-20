const Book = require("../models/bookModel");
const Review = require("../models/reviewModel");

const addBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      genre,
      description,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

const getBook = async (req, res) => {
  const { author, genre, page = 1, limit = 5 } = req.query;
  const filter = {};

  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  try {
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Book.countDocuments(filter);
    res
      .status(200)
      .json({ books, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Books", error });
  }
};

const getBookByIdDetails = async (req, res) => {
  const { id } = req.params;
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({ message: "Book Not Found." });
    }

    const totalreviews = await Review.countDocuments({ book: id });
    const reviews = await Review.find({ book: id })
      .populate("user", "username email")
      .skip((page - 1) * limit)
      .limit(limit);

    const allReviews = await Review.find({ book: id });
    const averageRating =
      allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;

    res.status(200).json({
      book,
      reviews,
      pagination: {
        totalreviews,
        currentPage: page,
        totalPages: Math.ceil(totalreviews / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;

  try {
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      book: bookId,
    });
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this book" });
    }

    const review = await Review.create({
      user: req.user._id,
      book: bookId,
      rating,
      comment,
    });

    const reviews = await Review.find({ book: bookId });
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Book.findByIdAndUpdate(bookId, {
      averageRating: avgRating,
      totalReviews: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
};

const searchBooks = async (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(query, "i");

  try {
    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};

module.exports = {
  addBook,
  getBook,
  getBookByIdDetails,
  addReview,
  searchBooks,
};
