const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const userRoutes = require("./routes/userRoutes");

app.use(cors());

const connectDB = require("./Database/dbConnection");
connectDB();
const PORT = 5000;

// routes
app.use("/user", userRoutes);

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
