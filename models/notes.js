const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  public: Boolean,
  Meta: {
    favs: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model("Note", noteSchema);
