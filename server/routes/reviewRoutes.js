const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { updateReview, deleteReview } = require("../controllers/reviewController");

const router = express.Router();

router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
