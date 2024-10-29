import express from "express";
import dotenv from "dotenv";
import routesAuth from "./routes/routesAuth";
import routesS3 from "./routes/routesS3";

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

// Routes
app.use("/auth", routesAuth);
app.use("/s3", routesS3);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
