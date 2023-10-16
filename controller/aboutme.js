const AboutMe = require("../models/AboutMe");
const { validationResult } = require("express-validator");

//create
exports.addAboutMe = async (req, res) => {
  try {
    const valid = validationResult(res);

    if (valid.notEmpty) {
      res.status(422).json({ error: valid.array() });
    }

    const {
      degree,
      institution,
      startDate,
      endDate,
      percentageObtained,
      subjectStudied,
      boardOfEducation,
    } = req.body;
    const newAboutMe = await AboutMe.create({
      user: req.user.id,
      degree,
      institution,
      startDate,
      endDate,
      percentageObtained,
      subjectStudied,
      boardOfEducation,
    });

    if (newAboutMe) {
      res.json({ success: "Data  added successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// get
exports.fetchAboutMe = async (req, res) => {
  try {
    const data = await AboutMe.find({});
    if (!data) {
      return res.status(400).json({ error: "Data cannot be found!" });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

//update
exports.updateAboutMe = async (req, res) => {
  try {
    id = req.params.id.trim();
    userId = req.user.id;

    if (!id || id == "") {
      res.status(400).json({ error: "Bad request!" });
    }

    const findAboutMe = await AboutMe.findById(id);

    if (!findAboutMe) {
      res.status(404).json({ error: "Data can not be found!" });
    }

    if (userId != findAboutMe.user.toString()) {
      res.status(401).json({ error: "You are not authorized!" });
    }

    const {
      degree,
      institution,
      startDate,
      endDate,
      percentageObtained,
      subjectStudied,
      boardOfEducation,
    } = req.body;

    let updateData = {
      degree,
      institution,
      startDate,
      endDate,
      percentageObtained,
      subjectStudied,
      boardOfEducation,
    };
    const updateQuery = await AboutMe.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    console.log(updateQuery);

    if (updateQuery) {
      res
        .status(200)
        .json({ success: "Data Successsfully updated!", updateQuery });
    } else {
      res.status(404).json({ error: "Data can not be found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// delete
exports.deleteAboutMe = async (req, res) => {
  try {
    if (!req.user.id || req.user.id == "") {
      return res.status(404).json({ error: "Data can not be found!" });
    }

    if (!req.params.id || req.params.id == "") {
      return res.status(400).json({ error: "Bad request!" });
    }

    id = req.params.id.trim();
    userId = req.user.id;

    const findAboutMe = await AboutMe.findById(id);
    if (!findAboutMe) {
      return res.status(404).json({ error: "Data can not be found!" });
    }

    if (userId != findAboutMe.user.toString()) {
      return res.status(401).json({ error: "You are not authorized!" });
    }

    const deleteQuery = await AboutMe.findOneAndDelete({ _id: id });
    if (deleteQuery) {
      return res
        .status(200)
        .json({ success: "Data Successsfully deleted!", deleteQuery });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
