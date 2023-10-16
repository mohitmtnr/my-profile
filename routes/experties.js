const app = require("express");
const router = app.Router();
const authenticate = require("../middleware/auth");
const { validateExperties } = require("../validation/experties");
const {
  addExperties,
  updateExperties,
  fetchExperties,
  deleteExperties,
} = require("../controller/experties");

// route 1
router.post("/createexperties", validateExperties, authenticate, addExperties);

// route 2
router.put("/updateexperties/:id", authenticate, updateExperties);

//route 3
router.get("/getexperties",fetchExperties);

// route 4
router.delete("/deleteexperties/:id", authenticate, deleteExperties);

module.exports = router;
