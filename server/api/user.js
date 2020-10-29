// Include
const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

// Routes
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(users, null, 2));
  } catch (error) {
    res.json({ message: error });
  }
});

// Get user by ID
router.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(user, null, 2));
  } catch (error) {
    res.json({ message: error });
  }
});

// New user
router.post("/", (req, res) => {
  const { name, username, git_id, git_token } = req.body;
  const newUser = new User({
    name: name,
    username: username,
    git_id: git_id,
    git_token: git_token,
  });

  newUser
    .save()
    .then((data) =>
      res.json({
        message: "Created account successfully",
        data: data,
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating account",
      })
    );
});

module.exports = router;
