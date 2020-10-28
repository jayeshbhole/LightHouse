// Include
const express = require("express");
const router = express.Router();
const auth = require("./auth");

// router.use(auth);
// Routes
const projects = require("./projects");
const user = require("./user");

// /api
router.get("/", (req, res) => {
  res.json("Hello!, This is Project-Flow Api here");
});

router.use("/projects", projects);
router.use("/users", user);

module.exports = router;
