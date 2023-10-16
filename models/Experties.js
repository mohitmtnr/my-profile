const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExpertiesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: { type: String },
  description: { type: String },
  WebTechnologyFontAwesomeTag: { type: String },
  experience: { type: Number },
  highlightTopics: { type: [String] },
  referralLinks: { type: [String] },
  date: { type: Date, default: Date.now() },
});

const Experties = mongoose.model("Experties", ExpertiesSchema);
module.exports = Experties;
