const app = require("express");
const router = app.Router();
const authenticate = require("../middleware/auth");
const {
  addAboutMe,
  deleteAboutMe,
  fetchAboutMe,
  updateAboutMe,
} = require("../controller/aboutme");
const { validateAboutMe } = require("../validation/aboutme");

//route 1
router.post("/createaboutme", validateAboutMe, authenticate, addAboutMe);

//route 2
router.get("/getaboutme",fetchAboutMe);

//route 3
router.put("/updateaboutme/:id", authenticate, updateAboutMe);

//route 4
router.delete("/deleteaboutme/:id", authenticate, deleteAboutMe);

module.exports = router;
