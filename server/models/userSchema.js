const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  git_id: {
    type: String,
    required: true,
  },
  git_token: {
    type: String,
  },
  projects: {
    type: Array,
    default: null,
    project: {
      type: Object,
      required: true,
      default: {},
      projectName: {
        type: String,
        required: true,
      },
      projectId: {
        type: String,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("Users", userSchema, "users");
