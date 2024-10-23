const { Router } = require("express");
const {
  createMatch,
  getAllMatches,
  getImagesByMatch,
  getMatchInformation,
  uploadPhotos,
} = require("../controllers/match.controller"); // Destructure after requiring the file

const router = Router();

router.get("/getAllMatches", getAllMatches);
router.post("/createMatch", createMatch);
router.post("/uploadPhotos", uploadPhotos);
router.get("/getImagesByMatch", getImagesByMatch);
router.get("/getMatchInformation", getMatchInformation);

module.exports = router;
