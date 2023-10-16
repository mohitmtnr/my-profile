const express = require("express");
const authenticate = require("../middleware/auth")
const router = express.Router();
const { updateDeveloper, fetchDeveloper } = require("../controller/developer");

// route 1
router.put("/updatedeveloper/:name",authenticate ,updateDeveloper);

// route 2
router.get("/getdeveloper", fetchDeveloper);

module.exports = router;
