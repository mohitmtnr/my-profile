const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  companyName: { type: String, default: "none" },

  websiteLink: {
    type: String,
    default: "none",
  },
  usedWebTechnologies: [{ type: String, default: "none" }],
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  WebTechnologyFontAwesomeTag: { type: String, default: "none" },
  experienceGained: { type: String, default: "none" },
  date: { type: Date },
});

const Projects = mongoose.model("Projects", ProjectsSchema);
module.exports = Projects;
