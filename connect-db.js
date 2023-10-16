const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017/my-profile";

const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectToMongo;
