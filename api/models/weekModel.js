var mongoose = require("mongoose")
var Schema = mongoose.Schema

var WeekSchema = new Schema({
  showId: {
    type: String,
    trim: true
  },
  startDate: {
    type: String,
    required: true,
    trim: true
  },
  endDate: {
    type: String,
    required: true,
    trim: true
  },
  nominees: {
    type: Array,
    trim: true
  },
  hoh: {
    type: Array,
    trim: true
  },
  evicted: {
    type: Array,
    trim: true
  }
})

module.exports = mongoose.model("Week", WeekSchema)
