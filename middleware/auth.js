const jwt = require("jsonwebtoken");
const JWT_SECTRET = process.env.JWT_SECRET || "Mohitmtnr@TeXeDi";
const authenticate = (req, res, next) => {
  //get the user from jwt and add id to req object
  try {
    const token = req.header("authToken");
    if (!token) {
      return res
        .status(401)
        .json({ errror: "Authenticate using a valid token!" });
    }
    const userData = jwt.verify(token, JWT_SECTRET);

    if (!userData) {
      return res.json({ error: "Token does not match!" });
    }
    req.user = userData.user;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = authenticate;
