const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
    minLength: 1,
  },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
  },
  description: {
    type: String,
    minLength: 5,
  },
  deadline: Date,
  status: String,
});

const projectSchema = new Schema({
  user: {
    type: Object,
    username: {
      type: String,
      required: true,
    },
    git_id: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  projectName: {
    type: String,
    required: true,
  },
  cards: [cardSchema],
});
Project = mongoose.model("Project", projectSchema, "Project");
Card = mongoose.model("Card", cardSchema);
module.exports = { Project, Card };
