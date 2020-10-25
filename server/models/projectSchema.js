const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const card = new Schema({
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
  nextTasks: {
    type: Array,
    task: {
      type: Object,
      task_id: String,
    },
  },
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
    _id: String,
  },
  projectName: {
    type: String,
    required: true,
  },
  cards: [card],
});

module.exports = mongoose.model("Project", projectSchema, "Project");
