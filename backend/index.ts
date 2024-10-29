import express from "express";
import dotenv from "dotenv";
import s3Routes from "./routes/s3.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/", (req, res) => {
  res.status(200).send("Healthcheck");
});

// AWS
app.use("/s3", s3Routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
