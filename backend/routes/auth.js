
const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile
} = require("../controllers/authController");
const auth= require("../middleware/auth");

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);
// Get Profile
router.get("/profile", auth, getProfile);

// Update Profile
router.put("/profile", auth, updateProfile);


module.exports = router;