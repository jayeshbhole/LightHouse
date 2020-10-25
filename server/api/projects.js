// Include
const express = require("express");
const router = express.Router();

const Projects = require("../models/projectSchema.js");
const User = require("../models/userSchema");

// Routes
router.get("/all", async (req, res) => {
  try {
    const proj = await Projects.find();
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(proj, null, 2));
  } catch (error) {
    res.json({ message: error });
  }
});

// /api/projects
router.get("/", async (req, res) => {
  id = req.body.git_id;
  try {
    const proj = await Projects.find({ "user._id": id });
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(proj, null, 2));
  } catch (error) {
    res.json({ message: error });
  }
});

// Creating new Project

router.post("/", async (req, res) => {
  const proj = req.body;
  const newProj = new Projects(proj);
  const userId = req.body.user._id;
  var projdata = null;
  res.header("Content-Type", "application/json");

  newProj
    .save()
    .then((data) => {
      projdata = data;
      const p = { projectName: projdata.projectName, projectId: projdata._id };

      User.findByIdAndUpdate({ _id: userId }, { $push: { projects: p } }).then(
        () => {
          res.send({
            message: "Added project successfully",
            data: projdata,
          });
        }
      );
    })
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating project. Try again.",
      })
    );
});

// /api/:projectId
router.get("/:projectId", async (req, res) => {
  const proj = await Projects.findById(req.params.projectId);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(proj, null, 2));
});

router.get("/:user/all", async (req, res) => {
  const user = req.params.user;
  const proj = await Projects.find({ "user._id": user });
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(proj, null, 2));
});

module.exports = router;
