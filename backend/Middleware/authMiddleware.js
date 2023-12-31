const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const User = require("../Modals/userModal");

const protect = asynchandler(async (req, res, next) => {
  let tokken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      tokken = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(tokken, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!tokken) {
    res.status(401).json({
      message: "Not Authorized , No Tokken",
    });
  }
});

module.exports = { protect };
