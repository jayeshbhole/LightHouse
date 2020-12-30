// Include
const express = require("express");
const router = express.Router();

const { Project, Card } = require("../models/projectSchema.js");
const User = require("../models/userSchema");

// All Projects [Only for Debugging]
router.get("/all", async (req, res) => {
	id = req.body.git_id;
	try {
		const proj = await Project.find();
		res.header("Content-Type", "application/json");
		res.send(JSON.stringify(proj, null, 2));
	} catch (error) {
		res.send({ message: error });
	}
});

// Project by ID
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

// Delete Project
router.delete("/:projectId", async (req, res) => {
	try {
		res.header("Content-Type", "application/json");
		await Project.deleteOne({ _id: req.params.projectId }, function (err) {
			if (err) {
				console.log(err);
				res.send({ message: "Error", error: err });
				return;
			}
			console.log("Successful deletion");
			res.send({ message: "Successfully deleted the project." });
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error });
	}
});

// Projects of User
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
			const p = {
				projectName: projdata.projectName,
				projectId: projdata._id,
			};
			User.findByIdAndUpdate(
				{ _id: userId },
				{ $push: { projects: p } }
			).then(() => {
				res.send({
					message: "Added project successfully",
					data: projdata,
				});
			});
		})
		.catch((err) =>
			res.status(400).json({
				error: err,
				message: "Error creating project. Try again.",
			})
		);
});

// Cards API
// Project Cards
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

// Create Card
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

// Update Card
router.put("/c/:projectId/:cardId", async (req, res) => {
	try {
		Project.findById(req.params.projectId)
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

// Delete Card
router.delete("/c/:projectId/:cardId", async (req, res) => {
	try {
		res.header("Content-Type", "application/json");
		Project.findByIdAndUpdate(
			{ _id: req.params.projectId },
			{ $pull: { cards: { _id: req.params.cardId } } },
			{ new: true },
			function (err, doc) {
				if (err) {
					console.log(err);
					res.send({ message: "Error", error: err });
					return;
				}
				res.send(JSON.stringify(doc), null, 2);
			}
		);
	} catch (error) {
		res.status(400).send({ message: error });
	}
});

module.exports = router;
