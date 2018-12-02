var mongoose = require("mongoose"),
  show = mongoose.model("Show"),
  person = mongoose.model("Person"),
  week = mongoose.model("Week")

exports.list_all_shows = function(req, res) {
  show.find({}, function(err, show) {
    if (err) res.send(err)
    res.json(show)
  })
}

function applyData(res, showData, personData, weekData, currentWeek) {
  const nominees = personData.filter(person =>
    currentWeek.nominees.includes(person.id)
  )
  const hoh = personData.filter(person => currentWeek.hoh.includes(person.id))

  const voters = personData.filter(
    person =>
      !currentWeek.nominees.includes(person.id) &&
      !currentWeek.hoh.includes(person.id)
  )

  res.json({
    show: showData,
    currentWeek,
    hoh,
    nominees,
    voters,
    people: personData,
    weeks: weekData
  })
}

exports.list_show_persons = function(req, res) {
  let showData = {}
  let personData = {}
  let weekData = {}
  let currentWeek = 0
  show
    .findById(req.params.showId, function(err, show) {
      if (err) res.send(err)
      showData = show
    })
    .then(
      person.find({ showId: req.params.showId }, function(err, person) {
        if (err) res.send(err)
        personData = person
      })
    )
    .then(
      week.find({ showId: req.params.showId }, function(err, week) {
        weekData = week
        currentWeek = weekData[req.params.weekId || currentWeek]
        applyData(res, showData, personData, weekData, currentWeek)
      })
    )
}

exports.create_a_show = function(req, res) {
  var new_show = new show(req.body)
  new_show.save(function(err, show) {
    if (err) res.send(err)
    res.json(show)
  })
}

exports.read_a_show = function(req, res) {
  show.findById(req.params.showId, function(err, show) {
    if (err) res.send(err)
    res.json(show)
  })
}

exports.update_a_show = function(req, res) {
  show.findOneAndUpdate(
    { _id: req.params.showId },
    req.body,
    { new: true },
    function(err, show) {
      if (err) res.send(err)
      res.json(show)
    }
  )
}

exports.delete_a_show = function(req, res) {
  show.remove(
    {
      _id: req.params.showId
    },
    function(err, show) {
      if (err) res.send(err)
      res.json({ message: "show successfully deleted" })
    }
  )
}
