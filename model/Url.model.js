const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const urlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    require: true,
  },
  short_url: {
    type: String,
    require: true,
    default: nanoid(7),
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("UrlShrinker", urlSchema);
