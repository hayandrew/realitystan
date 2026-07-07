module.exports = function(app) {
  const person = require("../controllers/personController")
  const show = require("../controllers/showController")
  const apiRoute = "/api"

  app
    .route(apiRoute + "/show")
    .get(show.list_all_shows)
    .post(show.create_a_show)

  app.route(apiRoute + "/show/:showId/:currentWeek").get(show.list_show_persons)

  // People API
  app
    .route(apiRoute + "/person")
    .get(person.list_all_persons)
    .post(person.create_a_person)

  app
    .route(apiRoute + "/person/:personId")
    .get(person.read_a_person)
    .put(person.update_a_person)
    .delete(person.delete_a_person)
}
