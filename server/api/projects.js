// Include
const express = require("express");
const router = express.Router();

const { Project, Card } = require("../models/projectSchema.js");
const User = require("../models/userSchema");
const mongoose = require("mongoose");
// Routes

// Projects
router.get("/all", async (req, res) => {
  id = req.body.git_id;
  try {
    const proj = await Project.find();
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(proj, null, 2));
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:projectId", async (req, res) => {
  try {
    const proj = await Project.findById(req.params.projectId);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(proj, null, 2));
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
});

// all projects of a user
router.get("/u/:userId", async (req, res) => {
  try {
    const projs = await Project.find({ "user._id": req.params.userId });
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(projs), null, 2);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Creating new Project
router.post("/", async (req, res) => {
  const proj = req.body;
  const newProj = new Project(proj);
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

// cards of a project

router.get("/c/:projectId", async (req, res) => {
  try {
    const proj = await Project.findById(req.params.projectId);
    const cards = proj.cards;
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(cards, null, 2));
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/c/:projectId", async (req, res) => {
  try {
    const card = new Card(req.body);
    Project.findByIdAndUpdate(
      { _id: req.params.projectId },
      { $push: { cards: card } }
    ).then(() => {
      res.header("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          message: "Added card successfully",
          data: card,
        }),
        null,
        2
      );
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

router.put("/c/:projectId", async (req, res) => {
  try {
    Project.find({ "": req.params.cardId })
      .then((project) => {
        const card = project.cards.id(req.params.cardId);
        card.set(req.body);
        return project.save();
      })
      .then((project) => {
        res.header("Content-Type", "application/json");
        res.send(JSON.stringify(project), null, 2);
      });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
