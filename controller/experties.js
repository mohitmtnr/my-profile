const { validationResult } = require("express-validator");
const Experties = require("../models/Experties");

//add
exports.addExperties = async (req, res) => {
  try {
    const valid = validationResult(res);
    if (valid.notEmpty) {
      return res.status(422).json({ error: valid.array() });
    }

    const v = ({
      title,
      description,
      WebTechnologyFontAwesomeTag,
      experience,
      highlightTopics,
      referralLinks,
    } = req.body);

    const newExperties = await Experties.create({
      user: req.user.id,
      title,
      description,
      WebTechnologyFontAwesomeTag,
      experience,
      highlightTopics,
      referralLinks,
    });

    if (newExperties) {
      return res.status(200).json({ success: "Data added successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

// update

exports.updateExperties = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    if (!userId || !id || userId == "" || id == "") {
      return res.status(404).json({ error: "Data can not be found!" });
    }

    const newExperties = ({
      title,
      description,
      WebTechnologyFontAwesomeTag,
      experience,
      highlightTopics,
      referralLinks,
    } = req.body);

    const updateExperties = await Experties.findByIdAndUpdate(
      id,
      { $set: newExperties },
      { new: true }
    );

    if (updateExperties) {
      return res.status(200).json({ success: "Data updated successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something  went wrong!" });
  }
};

// get
exports.fetchExperties = async (req, res) => {
  try {
    const data = await Experties.find({});
    if (!data) {
      return res.status(400).json({ error: "Data can not be found!" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

//delete
exports.deleteExperties = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    if (!userId || !id || userId == "" || id == "") {
      return res.status(404).json({ error: "Data can not be found!" });
    }

    const findExperties = await Experties.findById(id);
    if (!findExperties) {
      return res.status(404).json({ error: "Data can not be found!" });
    }

    if (userId != findExperties.user.toString()) {
      return res.status(401).json({ error: "You are not authorized!" });
    }

    const deleteQuery = await Experties.findOneAndDelete({ _id: id });
    if (deleteQuery) {
      res
        .status(200)
        .json({ success: "Data deleted successfully!", deleteQuery });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something  went wrong!" });
  }
};
