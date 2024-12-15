const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Assuming you have a User model defined

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if the user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    // Check if the username already exists
    const uniqueUsername = await User.findOne({ username });

    if (uniqueUsername) {
      return res.status(400).json({
        message: "Username already exists please choose another",
        success: false,
      });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const profilePhoto = `https://avatar.iran.liara.run/public/girl`;

    await User.create({
      name: name,
      email: email,
      password: hashPass,
      username: username,
      profilePhoto: profilePhoto,
    });
    return res.status(200).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ message: "Incorrect email or password", success: false });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res
        .status(401)
        .json({ message: "Incorrect email or password", success: false });

    return res
      .status(200)
      .json({
        message: `${user.fullname} logged in successfully.`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:user_id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: "User Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
