import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"

import Overlay from "@bbstan/overlay"
import Header from "@bbstan/header"
import People from "@bbstan/people"
import Footer from "@bbstan/footer"

import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)

    this.showApi = "/api/show"
    this.showId = "5c040f9c3090cc98f4822a21"

    /* Set initial state */
    this.state = {
      show: {},
      nominees: [],
      hoh: [],
      voters: [],
      overlay: false
    }

    /* Bind functions to this */
    this.documentKeyDown = this.documentKeyDown.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount() {
    /* Get data from API */
    this.fetchData().then(data => {
      this.setState({
        show: data.show,
        nominees: data.nominees,
        hoh: data.hoh,
        voters: data.voters
      })
    })
    /* Add event listeners */
    document.addEventListener("keydown", this.documentKeyDown, false)
  }

  componentWillUnmount() {
    /* Remove event listeners */
    document.removeEventListener("keydown", this.documentKeyDown)
  }

  /**
   * Fetches data from the API
   * @param {week} number the week number
   * @returns {Promise} data from the API
   */
  fetchData(week = 1) {
    return fetch(`${this.showApi}/${this.showId}/${week}`)
      .then(resp => resp.json())
      .then(function(newData) {
        return newData
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  /**
   * Close overlay if ESC is pressed
   * @param {obj} e a keydown event object
   * @returns {void}
   */
  documentKeyDown(e) {
    if (this.state.overlay && e.keyCode === 27) {
      this.toggleOverlay()
    }
  }

  /**
   * Toggle the overlay state
   * @returns {void}
   */
  toggleOverlay = () => {
    this.setState({
      overlay: !this.state.overlay
    })
  }

  /**
   * Removes vote from person object
   * @param {obj} person a person object
   * @returns {obj} updated person object
   */
  deleteVote(person) {
    delete person.vote
    delete person.voteId
    return person
  }

  /**
   * Update nominees / hoh
   * @param {string} key key of the array
   * @param {obj} e an event object
   * @returns {void}
   */
  updateGroup = (key, e) => {
    const type = e.type
    const id = e.value
    const group = this.state[type]
    const prev = group[key]

    /* Check that person is not a voter */
    if (!this.state.voters.find(person => person.id === id)) {
      return false
    }

    /* Add new person to group */
    group[key] = this.state.voters.find(obj => obj.id === id)

    /* Remove vote from previous person */
    this.deleteVote(prev)

    /* Update the voters to add previous and remove new */
    this.updateVoters(id, prev)

    /* Set the state and recount the votes */
    this.setState(
      {
        [type]: group
      },
      () => this.countVotes()
    )
  }

  /**
   * Update voters
   * @param {string} id of the person to remove
   * @param {obj} prevPerson person to add
   * @returns {void}
   */
  updateVoters(id, prevPerson) {
    const voters = this.state.voters

    /* Add previous person to voters array and remove new person */
    voters.push(prevPerson)
    voters.splice(voters.findIndex(person => person.id === id), 1)
    voters.sort((a, b) => a.id - b.id)

    /* Remove voter votes on previous person */
    voters.forEach(person => {
      if (person.voteId === prevPerson.id) {
        this.deleteVote(person)
      }
    })

    this.setState({
      voters: voters
    })
  }

  /**
   * Compare votes on nominees
   * @param {string} id of the person to remove
   * @param {obj} prevPerson person to add
   * @returns {void}
   */
  compareVotes(nominees) {
    const voters = this.state.voters.filter(person => !person.is_evicted)
    let maxCount = voters.length / 2 + 1

    /* Check if maxCount is decimal and round down */
    maxCount = !(maxCount % 1 === 0) ? Math.floor(maxCount) : maxCount

    /* Return nominee with more than maxCount */
    return nominees.find(nominee => nominee.voteCount >= maxCount)
  }

  /**
   * Count nominee votes
   * @param {number} key of current voter
   * @param {obj} event contains event values
   * @returns {void}
   */
  countVotes() {
    let { nominees, voters } = this.state
    let evictee = null

    /* Count vote and add to nominee */
    nominees.forEach(nominee => {
      nominee.voteCount = voters.filter(
        person => person.voteId === nominee.id && !person.is_evicted
      ).length
    })

    /* Set evicted person */
    evictee = this.compareVotes(nominees)

    /* Update evicted person and toggle overlay */
    this.setState({
      evictedPerson: evictee,
      overlay: evictee
    })
  }

  /**
   * Update votes
   * @param {number} key of current voter
   * @param {obj} event contains event values
   * @returns {void}
   */
  updateVote = (key, event) => {
    let { voters } = this.state

    /* Add vote to current voter */
    voters.forEach(person => {
      if (person.id === event.personId) {
        person.vote = event.value
        person.voteId = event.id
      }
    })
    this.countVotes()
  }

  /**
   * Toggle eviction status
   * @param {number} key of current voter
   * @param {obj} event contains event values
   * @returns {void}
   */
  toggleEviction = e => {
    const { voters } = this.state
    voters.forEach(voter => {
      if (voter.id === parseInt(e.target.name, 10)) {
        voter.is_evicted = !voter.is_evicted
        delete voter.vote
        delete voter.voteId
      }
    })
    this.setState(
      {
        voters: voters
      },
      () => this.countVotes()
    )
  }

  render() {
    const { hoh, nominees, voters } = this.state

    return (
      <Fragment>
        <Overlay
          evictedPerson={this.state.evictedPerson}
          overlay={this.state.overlay}
          toggleOverlay={this.toggleOverlay}
          people={this.state.voters}
          show={this.state.show}
        />

        <Header />
        <div className="board">
          <div className="board-leaderboard">
            {hoh.length && (
              <People
                title={this.state.show.leaderTitle}
                type="hoh"
                people={hoh}
                nominees={nominees}
                onChange={this.updateGroup}
                voters={this.state.voters}
              />
            )}
            {nominees.length && (
              <People
                title={this.state.show.nomineesTitle}
                type="nominees"
                people={nominees}
                hoh={hoh}
                onChange={this.updateGroup}
                voters={this.state.voters}
              />
            )}
          </div>

          <div className="board-people">
            {voters.length && (
              <People
                title={this.state.show.peopleTitle}
                type="voters"
                people={voters}
                onChange={this.updateVote}
                nominees={this.state.nominees}
                toggleEviction={this.toggleEviction}
              />
            )}
          </div>
        </div>
        <Footer />
      </Fragment>
    )
  }
}

App.propTypes = {
  nominees: PropTypes.array,
  hoh: PropTypes.array,
  voters: PropTypes.array,
  overlay: PropTypes.bool
}

export default App
