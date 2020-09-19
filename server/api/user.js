// Include
const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

// Routes
router.get("/", (req, res) => {
  res.json(User.find());
});

// Get user by ID
router.get("/:userId", (req, res) => {
  const id = req.params.projectId;
  console.log(id);
  User.findById(id);
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
