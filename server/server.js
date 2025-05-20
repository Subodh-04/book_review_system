const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);



app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
