const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema for an Idea
const IdeaSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Idea = mongoose.model("idea", IdeaSchema);
