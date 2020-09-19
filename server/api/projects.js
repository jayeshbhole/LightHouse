// Include
const express = require("express");
const router = express.Router();

const Project = require("../models/projectSchema.js");

// Routes
// /api/projects
router.get("/", async (req, res) => {
  try {
    const proj = await Project.find();
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(proj, null, 2));
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", (req, res) => {
  const proj = req.body;
  const newProj = new Project(proj);
  newProj
    .save()
    .then((data) =>
      res.json({
        message: "Created project successfully",
        data: data,
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating proj",
      })
    );
});

// /api/projects:id
router.get("/:projectId", async (req, res) => {
  const proj = await Project.findById(req.params.projectId);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(proj, null, 2));
});

module.exports = router;
