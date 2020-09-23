// Include
const express = require("express");
const router = express.Router();

// Routes
const projects = require("./projects");
const user = require("./user");

// /api
router.get("/", (req, res) => {
  res.json("Hi!, This is Api here");
});

router.use("/projects", projects);
router.use("/user", user);

module.exports = router;
