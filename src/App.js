import React, { Component } from "react"
import ReactDOM from "react-dom"

import axios from "axios"
import Header from "components/Header.jsx"
import Overlay from "components/Overlay.jsx"
import Person from "components/Person.jsx"
import People from "components/People.jsx"
import SelectBox from "components/SelectBox.jsx"
import DatePicker from "react-datepicker"
import moment from "moment"
import PropTypes from "prop-types"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      apiUrl: "http://localhost:8000/api/showData/read.php?show_id="
    }
  }

  componentDidMount() {
    this.getState()
  }

  /*
   * Get Date Range Array, add moment()
   *
   */
  getDateRangeArray(dateRanges) {
    const dateRangeArr = []

    for (var i = 0, len = dateRanges.length; i < len; i++) {
      dateRangeArr.push(moment(dateRanges[i]))
    }
    return dateRangeArr
  }

  /*
   * Get State of game board
   *
   */
  getState(show_id, date, weekId) {
    // TODO: default values moment() !!
    if (!show_id) show_id = 1
    if (!weekId) weekId = 1
    if (!date) date = moment("2017-06-21")

    const newDate = encodeURI(date.format("YYYY-MM-DD"))

    axios
      .get(
        this.state.apiUrl + show_id + "&weekId=" + weekId + "&date=" + newDate
      )
      .then(showData => {
        const data = showData.data

        this.setState({
          loading: false,
          houseguests: data.people,
          show: data.show,
          shows: data.shows,
          startDate: date,
          weeks: data.weeks,
          week: data.week,
          dateRange: this.getDateRangeArray(data.dateRange),
          gameStats: data.stats,
          siteName: "realityStan",
          evictionMessages: [
            "Sorry, not sorry. GUESTNAME is done.",
            "GUESTNAME better get to steppin'.",
            "GUESTNAME just couldn't get it together.",
            "This is Big Brother, not Big Baby, GUESTNAME.",
            "GUESTNAME... Girl, bye.",
            "Evicted!  GUESTNAME is a fruitloop dingus.",
            "GUESTNAME has no beast mode.  Buh-bye!",
            "It's all friendship, GUESTNAME. Get lost.",
            "Don't let the door hit ya, GUESTNAME.",
            "But first! GUESTNAME is evicted."
          ]
        })
        this.renderLoadedView()
      })
  }

  /*
   * Update People Object
   *
   */
  updatePeople = (key, event) => {
    //if (event.value == 'empty') return

    const filterType = event.type
    const statName = "is_" + filterType
    const keyType = filterType + "_key"
    const people = this.state.houseguests
    const subset = people.filter(person => statName in person)
    const val = event.value
    const match = subset.some(person => person.id === event.value)
    const prevPerson = subset.filter(person => person[keyType] === key)[0]

    if (!match) {
      const replacementPerson = people.filter(item => item.id === val)[0]

      if (prevPerson) {
        delete prevPerson[statName]
        delete prevPerson[keyType]

        people.filter(person => {
          if (person.voteId === prevPerson.id) {
            delete person.vote
            delete person.voteId
          }
        })
      }

      if (replacementPerson) {
        delete replacementPerson.vote
        delete replacementPerson.voteId

        replacementPerson[statName] = true
        replacementPerson[keyType] = key
      }

      this.setState({
        houseguests: people
      })
    }
  }

  /*
   * Compare Votes
   *
   */
  compareVotes(nominees, people) {
    let voters = people.filter(
      person =>
        !("is_evicted" in person) &&
        !("is_nominee" in person) &&
        !("is_hoh" in person)
    )
    // TODO: divide by week nominee count
    let maxCount = voters.length / 2
    let isEvenCount = maxCount % 1 === 0
    let evictedPerson = null

    if (!isEvenCount) {
      maxCount = Math.ceil(maxCount)
    }

    // TODO: remove this after debug
    maxCount = 3

    // check whether either nominee has maxCount
    for (var i = 0, len = nominees.length; i < len; i++) {
      if (nominees[i].voteCount >= maxCount) {
        evictedPerson = nominees[i]
        break
      }
    }
    return evictedPerson
  }

  /*
   * Update Vote
   *
   */
  updateVote = (key, event) => {
    let voteId = event.id
    let people = this.state.houseguests
    let nominees = people.filter(person => "is_nominee" in person)
    let currentNominee = nominees.some(person => person.nominee_key === voteId)
    let evictedPerson = null

    // set vote
    for (var i = 0, len = people.length; i < len; i++) {
      if (people[i].id === event.personId) {
        people[i].vote = parseInt(event.value)
        people[i].voteId = parseInt(event.id)
      }
    }

    // count vote
    for (var i = 0, len = nominees.length; i < len; i++) {
      let voteCount = people.filter(person => person.voteId === nominees[i].id)
        .length
      nominees[i].voteCount = voteCount
    }

    // set evicted person
    evictedPerson = this.compareVotes(nominees, people)

    this.setState({
      houseguests: people,
      evictedPerson: evictedPerson,
      overlay: evictedPerson ? "evicted" : null
    })
  }

  /*
   * Change Show
   *
   */
  changeShow = key => {
    const showId = key.key
    const date = moment("2017-06-28")
    this.getState(showId, date)
    //console.log('TODO: changeShow')
  }

  /*
   * Click Today Button
   *
   */
  onClickToday = () => {
    let dateRange = this.state.dateRange
    let date = moment()

    if (date.isAfter(dateRange[1])) {
      date = dateRange[1]
    }
    this.setState({
      startDate: date
    })
    this.changeDate(date)
  }

  /*
   * Change Date
   *
   */
  changeDate = date => {
    const newDate = moment(date.format("YYYY-MM-DD"))
    const weeks = this.state.weeks

    let weekId = false

    for (var i = 0, len = weeks.length; i < len; i++) {
      let startDate = moment(weeks[i].startDate)
      let endDate = moment(weeks[i].endDate)

      if (date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate)) {
        weekId = weeks[i].name
      }
    }
    // Swap all data with new show
    this.getState(this.state.show.id, newDate, weekId)
  }

  /*
   * Click First Button
   *
   */
  onClickFirst = () => {
    const date = moment(this.state.weeks[0].startDate)

    this.setState({
      startDate: date
    })
    this.changeDate(date)
  }

  /*
   * Click Prev Button
   * TODO: Refactor into single function with Next
   *
   */
  clickPrevDate = () => {
    // TODO: create week_id
    const week = this.state.weeks.filter(
      week => parseInt(week.name) === parseInt(this.state.week.name) - 1
    )[0]

    if (week) {
      const date = moment(week.startDate)

      this.setState({
        startDate: date
      })
      this.changeDate(date)
    }
  }

  /*
   * Click Next Button
   * TODO: Refactor into single function with Prev
   *
   */
  clickNextDate = () => {
    // TODO: create week_id
    const week = this.state.weeks.filter(
      week => parseInt(week.name) === parseInt(this.state.week.name) + 1
    )[0]

    if (week) {
      const date = moment(week.startDate)
      this.setState({
        startDate: date
      })
      this.changeDate(date)
    }
  }

  /*
   * Toggle Overlay
   *
   */
  toggleOverlay = key => {
    this.setState({
      overlay: key
    })
  }

  /*
   * Render Loaded View
   *
   */
  renderLoadedView() {
    let hohs = this.state.houseguests
      .filter(person => "is_hoh" in person)
      .sort((a, b) => a.hoh_key - b.hoh_key)
    let nominees = this.state.houseguests
      .filter(person => "is_nominee" in person)
      .sort((a, b) => a.nominee_key - b.nominee_key)
    let voters = this.state.houseguests.filter(
      person =>
        !("is_nominee" in person) &&
        !("is_hoh" in person) &&
        !("empty" in person)
    )
    let finalists = this.state.houseguests.filter(
      person => "is_finalist" in person
    )

    return (
      <div className="main-container">
        <Overlay
          evictedPerson={this.state.evictedPerson}
          overlay={this.state.overlay}
          toggleOverlay={this.toggleOverlay}
          people={this.state.houseguests}
          show={this.state.show}
          evictionMessages={this.state.evictionMessages}
        />

        <Header
          shows={this.state.shows}
          show={this.state.show}
          onChangeShow={this.changeShow}
          onClickLogin={this.toggleOverlay.bind(this, "login")}
          siteName={this.state.siteName}
        >
          <div className="game-filter">
            <DatePicker
              todayButton={"Today"}
              placeholderText="Select a date"
              minDate={this.state.dateRange[0]}
              maxDate={this.state.dateRange[1]}
              selected={this.state.startDate}
              onChange={this.changeDate.bind(this)}
            />
            <div className="date-sort">
              <a onClick={this.clickPrevDate.bind(this, event)}>Prev</a>
              <a onClick={this.clickNextDate.bind(this, event)}>Next</a>
              <span>Week: {this.state.week.week_name}</span>
              <a onClick={this.onClickFirst.bind(this, event)}>First</a>
              <a onClick={this.onClickToday.bind(this, event)}>Last</a>
              <a>Clear All</a>
            </div>
          </div>
        </Header>

        <div className="board">
          <div className="board-leaderboard">
            {hohs.length ? (
              <div className="hoh">
                <h3>{this.state.show.leaderTitle}</h3>
                <People
                  type="hoh"
                  people={hohs}
                  week={this.state.week}
                  onChange={this.updatePeople}
                  houseguests={this.state.houseguests}
                />
              </div>
            ) : (
              ""
            )}
            {nominees.length ? (
              <div className="nominees">
                <h3>{this.state.show.nomineesTitle}</h3>
                <div className="nominees-inner">
                  <People
                    type="nominee"
                    people={nominees}
                    week={this.state.week}
                    onChange={this.updatePeople}
                    houseguests={this.state.houseguests}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {finalists.length ? (
              <div className="nominees">
                <h3>{this.state.show.finalistsTitle}</h3>
                <div className="nominees-inner">
                  <People
                    type="finalists"
                    people={finalists}
                    week={this.state.week}
                    onChange={this.updatePeople}
                    houseguests={this.state.houseguests}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="board-people">
            <h3>{this.state.show.peopleTitle}</h3>
            <div className="voters">
              <People
                type="voter"
                people={voters}
                week={this.state.week}
                onChange={this.updateVote}
                houseguests={this.state.houseguests}
              />
            </div>
          </div>
          {/* <Zergnet /> */}
        </div>

        <footer>
          <a href="#">Privacy Policy</a>
          <a href="#">About</a>
          <div className="copyright">&copy; Copyright 2017. Andy Hay</div>
        </footer>
      </div>
    )
  }

  /*
   * Render Loading View
   *
   */
  renderLoadingView = () => <div>Loading....</div>

  /*
   * Render App
   *
   */
  render = () =>
    this.state.loading ? this.renderLoadingView() : this.renderLoadedView()
}

export default App
