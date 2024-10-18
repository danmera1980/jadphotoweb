const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Match } = require("../models/Match");
const { Photo } = require("../models/Photo");
const sharp = require("sharp");
const mongoose = require("mongoose");

// Define the path to the frontend uploads directory
const frontendUploadsPath = path.join(__dirname, "../../frontend/uploads");

// Ensure the frontend uploads directory exists
if (!fs.existsSync(frontendUploadsPath)) {
  fs.mkdirSync(frontendUploadsPath, { recursive: true });
}

// Multer storage configuration (no longer saving original files)
const storage = multer.memoryStorage(); // Use memory storage to avoid saving original files

// Multer file filter for images
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).array("photos", 10); // Expecting an array of photos

const createMatch = async (req, res) => {
  try {
    // Parse the match JSON from the "match" field
    const matchData = JSON.parse(req.body.matchData);
    const newMatch = new Match(matchData);

    await newMatch.save();

    res
      .status(201)
      .json({ message: "Match created successfully!", match: newMatch });
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({ message: "Error creating match" });
  }
};

const uploadPhotos = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    console.log("Uploaded files:", req.files); // Log the uploaded files

    try {
      // Parse the match JSON from the "match" field
      const matchId = JSON.parse(req.body.matchId);
      const match = 

      const photoIds = await Promise.all(
        req.files.map(async (file) => {
          const photo = new Photo({
            filename: `sample_${file.originalname}`, // Update the filename to reflect the watermarked version
            match: matchId,
          });

          await photo.save();

          // Save image and create a sample with watermark
          const watermark = path.join(__dirname, "../assets/watermark.png");

          const samplePath = path.join(
            frontendUploadsPath,
            `sample_${file.originalname}` // Save the watermarked image
          );

          // Resize image and add watermark using sharp
          await sharp(file.buffer) // Use the buffer from multer memory storage
            .resize(900) // Resize to 900px width
            .composite([
              {
                input: watermark,
                tile: true,
                gravity: "southeast",
                blend: "overlay",
              },
            ])
            .toFile(samplePath)
            .catch((sharpError) => {
              console.error("Error processing image with sharp:", sharpError);
              throw new Error("Image processing failed");
            });

          return photo._id;
        })
      );

      newMatch.photos = photoIds; // Ensure photos array exists in your Match schema
      await newMatch.save();

      res
        .status(201)
        .json({ message: "Match created successfully!", match: newMatch });
    } catch (error) {
      console.error("Error creating match:", error);
      res.status(500).json({ message: "Error creating match" });
    }
  });
};

const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ date: -1, time: -1 });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches" });
  }
};

const getImagesByMatch = async (req, res) => {
  try {
    const { matchId } = req.query;
    // Convert matchId to ObjectId
    const objectId = new mongoose.Types.ObjectId(matchId);

    const match = await Match.findById(objectId);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    console.log(match);
    // Query for photos that match the given match ID
    const photos = await Photo.find({ match: objectId });
    const photosUrl = photos.map((photo) => {
      return {
        id: photo.filename,
        src: `/uploads/${photo.filename}`,
        alt: photo.filename.split(".")[0].split("_")[1],
        title: photo.filename.split(".")[0].split("_")[1],
      };
    }); // Use the updated filename

    res.status(200).json({
      matchName: match.matchName,
      date: match.date.toISOString().split("T")[0],
      time: match.time,
      photos: photosUrl,
    }); // Return URLs of watermarked images
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error: error });
  }
};

module.exports = { createMatch, getAllMatches, getImagesByMatch, uploadPhotos };
