const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { validateProjects } = require("../validation/projects");
const {
  addProjects,
  updateProjects,
  fetchProjects,
  deleteProject,
} = require("../controller/projects");

// route 1
router.post("/addprojects", validateProjects, authenticate, addProjects);

//route 2
router.put("/updateprojects/:id", authenticate, updateProjects);

//route 3
router.get("/getprojects", fetchProjects);

//route 4

router.delete("/deleteprojects/:id", authenticate, deleteProject);

module.exports = router;
