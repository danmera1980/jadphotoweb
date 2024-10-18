const mongoose = require("mongoose");

const { Schema } = mongoose;

// Photo Schema
const photoSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match", // Reference to the Match model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Photo model
const Photo = mongoose.model("Photo", photoSchema);

module.exports = {Photo};
