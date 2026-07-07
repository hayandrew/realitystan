var express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  mongoose = require("mongoose"),
  Person = require("./models/personModel"),
  Show = require("./models/showModel"),
  Week = require("./models/weekModel"),
  bodyParser = require("body-parser")

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/bbstan")

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var routes = require("./routes/apiRoutes") //importing route
routes(app) //register the route

app.listen(port)

console.log("todo list RESTful API server started on: " + port)

// Global routes
app.use(function(req, res, next) {
  res.status(404).send({ url: req.originalUrl + " not found" })
})
