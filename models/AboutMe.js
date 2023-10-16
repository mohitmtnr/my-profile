const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AboutMeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  degree: { type: String },
  institution: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  percentageObtained: { type: Number },
  subjectStudied: [{ type: String, trim: true }],
  boardOfEducation: { type: String },
  date: { type: Date, default: Date.now() },
});

const AboutMe = mongoose.model("AboutMe", AboutMeSchema);
module.exports = AboutMe;
