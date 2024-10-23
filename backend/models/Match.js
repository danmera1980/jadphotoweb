const mongoose = require("mongoose");

const { Schema } = mongoose;

// Match Schema
const matchSchema = new Schema(
  {
    matchName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // You can change this to a Date type if you prefer
      required: true,
    },
    category: {
      type: Number,
      enum: [9, 11, 13, 15, 17, 19],
      required: true,
    },
    mainImagePath: {
      type: String
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo", // Reference to the Photo model
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Match model
const Match = mongoose.model("Match", matchSchema);

module.exports =  {Match};
