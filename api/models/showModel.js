var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ShowSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  shortId: {
    type: String,
    required: true,
    trim: true
  },
  nomineesTitle: {
    type: String,
    required: true,
    trim: true
  },
  peopleTitle: {
    type: String,
    required: true
  },
  leaderTitle: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model("Show", ShowSchema)
