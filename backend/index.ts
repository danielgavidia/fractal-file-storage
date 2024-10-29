import express from "express";

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Routes will go here
app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
