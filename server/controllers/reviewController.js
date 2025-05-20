const Book = require("../models/bookModel");
const Review = require("../models/reviewModel");

const updateReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if (!review || review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;
    await review.save();

    const reviews = await Review.find({ book: review.book });
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Book.findByIdAndUpdate(review.book, {
      averageRating: avgRating,
      totalReviews: reviews.length,
    });

    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: "Failed to update the review", error });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review || review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();

    const reviews = await Review.find({ book: review.book });
    let avgRating = 0;
    if (reviews.length > 0) {
      avgRating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    }

    await Book.findByIdAndUpdate(review.book, {
      averageRating: avgRating,
      totalReviews: reviews.length,
    });

    res.status(200).json({ message: "Review deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update the review", error });
  }
};

module.exports = { updateReview, deleteReview };
