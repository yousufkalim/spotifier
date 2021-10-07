// Init
const router = require("express").Router();
const { getAlbums } = require("../controllers/spotify");

// Routes
router.get("/getAlbums", getAlbums);

// Export
module.exports = router;
