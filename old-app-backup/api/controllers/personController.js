var mongoose = require("mongoose"),
  person = mongoose.model("Person")

exports.list_all_persons = function(req, res) {
  person.find({}, function(err, person) {
    if (err) res.send(err)
    res.json(person)
  })
}

exports.create_a_person = function(req, res) {
  var new_person = new person(req.body)
  new_person.save(function(err, person) {
    if (err) res.send(err)
    res.json(person)
  })
}

exports.read_a_person = function(req, res) {
  person.findById(req.params.personId, function(err, person) {
    if (err) res.send(err)
    res.json(person)
  })
}

exports.update_a_person = function(req, res) {
  person.findOneAndUpdate(
    { _id: req.params.personId },
    req.body,
    { new: true },
    function(err, person) {
      if (err) res.send(err)
      res.json(person)
    }
  )
}

exports.delete_a_person = function(req, res) {
  person.remove(
    {
      _id: req.params.personId
    },
    function(err, person) {
      if (err) res.send(err)
      res.json({ message: "person successfully deleted" })
    }
  )
}
