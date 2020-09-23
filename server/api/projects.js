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

// Project Cards

router.post("/:projId", async (req, res) => {
  const card = req.body;

  const proj = await Project.findById(req.params.projId);
  proj.cards = [...proj.cards, card];
  proj
    .save()
    .then((data) =>
      res.json({
        message: "posted card successfully",
        data: data,
      })
    )
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating card",
      })
    );
});

router.patch("/:projId/:cardId", async (req, res) => {
  const data = req.body;
  const card = {
    title: data.title,
    priority: data.priority,
    description: data.description,
    deadline: data.deadline,
    status: data.status,
    nextTasks: data.nextTasks,
  };
});

module.exports = router;
