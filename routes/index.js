// Init
const router = require("express").Router();

// All Routes
router.use("/spotify", require("./spotify"));

// Export
module.exports = router;
