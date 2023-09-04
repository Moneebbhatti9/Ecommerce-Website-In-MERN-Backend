const express = require("express");
const {
  userLogin,
  userRegister,
  authUser,
} = require("../Controllers/userController");
const router = express.Router();
const { protect } = require("../Middleware/authMiddleware");

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/authUser", protect, authUser);

module.exports = router;
