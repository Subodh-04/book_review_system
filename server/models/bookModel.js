const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    author: { type: String, required: true, index: true },
    genre: { type: String, required: true, index: true },
    description: { type: String },
    
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
