const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Match } = require("../models/Match");
const { Photo } = require("../models/Photo");
const sharp = require("sharp");
const mongoose = require("mongoose");

// Define the path to the frontend uploads directory
const frontendUploadsPath = path.join(__dirname, "../uploads");

// Ensure the frontend uploads directory exists
if (!fs.existsSync(frontendUploadsPath)) {
  fs.mkdirSync(frontendUploadsPath, { recursive: true });
}

// Multer storage configuration (no longer saving original files)
const storage = multer.memoryStorage(); // Use memory storage to avoid saving original files

// Multer file filter for images (can be reused)
const imageFileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only!")); // Pass error as Error object
  }
};

// Function to create a Multer instance with options
const createUploader = (fieldName, maxCount) => {
  return multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB
    fileFilter: imageFileFilter,
  }).array(fieldName, maxCount);
};

// Create separate uploaders for single and multiple files
const uploadMainImage = createUploader('image', 1); // For single "image" field
const uploadMultiplePhotos = createUploader('photos', 1000); // For multiple "photos" field


const createMatch = async (req, res) => {
  try {
    uploadMainImage(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(400).json({ message: err });
      }

      const imageFile = req.files[0]; // Access the single file from req.file
      const matchData = JSON.parse(req.body.matchData);

      // Generate a unique filename for the image
      const imageName = `match-${Date.now()}-${imageFile.originalname}`;

      // Create the path to save the image in the frontend uploads directory
      const imagePath = path.join(frontendUploadsPath, imageName);

      try {
        // Save the image data to the file system
        await sharp(imageFile.buffer)
          .resize(900) // Optional: Resize the image if needed
          .toFile(imagePath);
      } catch (sharpError) {
        console.error("Error saving image:", sharpError);
        return res.status(500).json({ message: "Image upload failed" });
      }

      // Create the new match object with the correct image path
      const newMatch = new Match({
        ...matchData,
        mainImagePath: imageName, // Save the image name in the database
      });

      await newMatch.save();

      res.status(201).json({
        message: "Match created successfully!",
        match: newMatch,
      });
    });
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({ message: "Error creating match" });
  }
};


const uploadPhotos = async (req, res) => {
  uploadMultiplePhotos(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    console.log("Uploaded files:", req.files); // Log the uploaded files

    try {
      // Parse the match JSON from the "match" field
      const matchId = JSON.parse(req.body.matchId);

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

      await Match.findByIdAndUpdate(matchId, {
        $push: { photos: { $each: photoIds } },
      });

      res
        .status(201)
        .json({ message: "Images uploaded successfully!" });
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
      category: match.category,
      photos: photosUrl,
    }); // Return URLs of watermarked images
  } catch (error) {
    res.status(401).json({ message: "Error fetching images", error: error });
  }
};

const getMatchInformation = async (req, res) => {
  try {
    const { matchId } = req.query;
    const objectId = new mongoose.Types.ObjectId(matchId);
    const match = await Match.findById(objectId);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json(match)
  } catch (error) {
    res
      .status(401)
      .json({ message: "Error fetching match information", error: error });
  }
};

const getPhotoById = async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const imageData = fs.readFileSync(path.join(frontendUploadsPath, photoId));
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageData);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image");
  }
}

module.exports = {
  createMatch,
  getAllMatches,
  getImagesByMatch,
  uploadPhotos,
  getMatchInformation,
  getPhotoById
};
