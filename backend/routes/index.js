const { Router } = require("express");
const { createMatch, getAllMatches, getImagesByMatch } = require("../controllers/match.controller"); // Destructure after requiring the file

const router = Router();

router.get("/getAllMatches", getAllMatches);
router.post("/createMatch", createMatch);
router.get("/getImagesByMatch", getImagesByMatch);

module.exports = router;
