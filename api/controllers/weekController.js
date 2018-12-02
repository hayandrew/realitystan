var mongoose = require("mongoose"),
  week = mongoose.model("Week"),
  person = mongoose.model("Person")

exports.list_all_weeks = function(req, res) {
  week.find({}, function(err, week) {
    if (err) res.send(err)
    res.json(week)
  })
}

exports.list_by_show = function(req, res) {
  week.find({}, function(err, week) {
    if (err) res.send(err)
    res.json(week)
  })
}

exports.list_week_persons = function(req, res) {
  let weekData = {}
  let personData = {}
  let weekData = {}
  week
    .findById(req.params.weekId, function(err, week) {
      if (err) res.send(err)
      weekData = week
    })
    .then(
      person.find({ weekId: req.params.weekId }, function(err, person) {
        if (err) res.send(err)
        personData = person
        res.json({
          weekData,
          personData
        })
      })
    )
    .then(week.find({ weekId: req.params.weekId }, function(err, week) {}))
}

exports.create_a_week = function(req, res) {
  var new_week = new week(req.body)
  new_week.save(function(err, week) {
    if (err) res.send(err)
    res.json(week)
  })
}

exports.read_a_week = function(req, res) {
  week.findById(req.params.weekId, function(err, week) {
    if (err) res.send(err)
    res.json(week)
  })
}

exports.update_a_week = function(req, res) {
  week.findOneAndUpdate(
    { _id: req.params.weekId },
    req.body,
    { new: true },
    function(err, week) {
      if (err) res.send(err)
      res.json(week)
    }
  )
}

exports.delete_a_week = function(req, res) {
  week.remove(
    {
      _id: req.params.weekId
    },
    function(err, week) {
      if (err) res.send(err)
      res.json({ message: "week successfully deleted" })
    }
  )
}
