var mongoose = require("mongoose")
var Schema = mongoose.Schema

var PersonSchema = new Schema({
  id: {
    type: Number,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  showId: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model("Person", PersonSchema)
