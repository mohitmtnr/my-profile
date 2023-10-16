const connectToMongo = require("./connect-db");
const express = require("express");
const cors = require("cors");
require("dotenv").config(__dirname, ".env.local");

connectToMongo(); //calling the function to connect with the database

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available routes
app.use("/profile/auth", require("./routes/auth"));
app.use("/profile/aboutme", require("./routes/aboutme"));
app.use("/profile/experties", require("./routes/experties"));
app.use("/profile/projects", require("./routes/projects"));
app.use("/profile/developer", require("./routes/developer"));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
