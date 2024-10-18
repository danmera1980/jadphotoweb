const express = require("express"); // Replace import with require
const mongoose = require("mongoose"); // Replace import with require
const cors = require("cors"); // Replace import with require
const bodyParser = require("body-parser"); // Replace import with require
const routes = require("./routes"); // Replace import with require
const multer = require("multer");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGODB_URI;


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", routes);
app.use("../frontend/uploads", express.static("uploads")); // Serve uploaded files
app.use("../frontend/uploads/samples", express.static("samples")); // Serve uploaded files

// MongoDB connection
mongoose
  .connect(MONGOURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start server
app.listen(PORT, (error) => {
  if (error) throw new Error(error);
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}/`);
});
