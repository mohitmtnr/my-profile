const Projects = require("../models/Projects");
const { validationResult } = require("express-validator");

//add projects

exports.addProjects = async (req, res) => {
  try {
    const valid = validationResult(res);
    if (valid.notEmpty) {
      return res.status(422).json({ error: valid.array() });
    }
    const {
      title,
      description,
      company,
      websiteLink,
      usedWebTechnologies,
      startDate,
      endDate,
      WebTechnologyFontAwesomeTag,
      experienceGained,
    } = req.body;
    const newProject = await Projects.create({
      user: req.user.id,
      title,
      description,
      company,
      websiteLink,
      usedWebTechnologies,
      startDate,
      endDate,
      WebTechnologyFontAwesomeTag,
      experienceGained,
    });

    if (newProject) {
      return res.json({ success: "Project  added successfully!" });
    } else {
      return res.json({ error: "Project add action failed!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.updateProjects = async (req, res) => {
  const id = req.params.id.trim();
  const userId = req.user.id;

  if (id.isempty) {
    return res.status(404).json({ error: "Project id can not be empty!" });
  }
  try {
    const { title, description } = req.body;
    let updateData = {
      title,
      description,
      company,
      websiteLink,
      usedWebTechnologies,
      startDate,
      endDate,
      WebTechnologyFontAwesomeTag,
      experienceGained,
    };

    //find  project
    const findproject = await Projects.findById(id);
    if (!findproject) {
      return res.status(404).json({ error: "Project can not be found!" });
    }

    //check if the currect user is updating data
    if (userId !== findproject.user.toString()) {
      return res
        .status(401)
        .json({ error: "This is not an authorized action!" });
    }

    const updateProjects = await Projects.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      { new: true }
    );
    return res.json(updateProjects);
  } catch (error) {
    return res.json(error);
  }
};

// fetch all projects

exports.fetchProjects = async (req, res) => {
  try {
    const data = await Projects.find({});
    if (!data) {
      return res.status(400).json({ error: "Data cannot be found!" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

//delete project

exports.deleteProject = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const userId = req.user.id;

    if (!id || id == "") {
      return res.status(400).json({ error: "Bad request!" });
    }

    const findProject = await Projects.findById(id);

    if (!findProject) {
      return res.status(404).json({ error: "Data can not be found!" });
    }

    if (userId !== findProject.user.toString()) {
      //check if the currect user is updating data
      return res.status(401).json({ error: "You are not authorized!" });
    }

    // find project and delete
    const queryStatus = await Projects.findOneAndDelete({ _id: id });
    return res
      .status(200)
      .json({ success: "Data successfully deleted!", queryStatus });
  } catch (error) {
    return res.status(500).json({ error: "Something  went wrong!" });
  }
};
