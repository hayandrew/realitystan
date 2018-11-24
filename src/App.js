import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"

import Header from "@bbstan/header"
import Footer from "@bbstan/footer"
import Overlay from "@bbstan/overlay"
import People from "@bbstan/people"

import data from "./data"

import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)

    this.people = data.people
    this.show = data.show
    this.hohData = data.hoh
    this.nomineeData = data.nominees

    this.state = {
      nominees: [],
      hoh: [],
      voters: [],
      overlay: false
    }
    this.documentKeyDown = this.documentKeyDown.bind(this)
  }

  componentDidMount() {
    const hoh = this.people.filter(person => this.hohData.includes(person.id))
    const nominees = this.people.filter(person =>
      this.nomineeData.includes(person.id)
    )
    const voters = this.people.filter(
      person =>
        !this.nomineeData.includes(person.id) &&
        !this.hohData.includes(person.id)
    )
    this.setState({
      nominees: nominees,
      hoh: hoh,
      voters: voters
    })
    document.addEventListener("keydown", this.documentKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.documentKeyDown)
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

    /* Update the voters to add previous and remove new */
    this.updateVoters(id, prev)

    /* Add new person to group */
    group[key] = this.people.find(obj => obj.id === id)

    this.setState({
      [type]: group
    })
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

    /* Reset votes on previous person */
    voters.forEach(person => {
      if (person.voteId === prevPerson.id) {
        delete person.vote
        delete person.voteId
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
    let maxCount = this.state.voters.length / 2

    /* TODO: Set even vote */
    let isEvenCount = maxCount % 1 === 0
    if (!isEvenCount) {
      maxCount = Math.ceil(maxCount)
    }

    /* Return nominee with maxCount */
    return nominees.find(nominee => nominee.voteCount >= maxCount)
  }

  /**
   * Update vote count
   * @param {number} key of current voter
   * @param {obj} event contains event values
   * @returns {void}
   */
  updateVote = (key, event) => {
    let { nominees, voters } = this.state
    let evictedPerson = null

    /* Add vote to current voter */
    voters.forEach(person => {
      if (person.id === event.personId) {
        person.vote = event.value
        person.voteId = event.id
      }
    })

    /* Count vote and add to nominee */
    nominees.forEach(nominee => {
      nominee.voteCount = voters.filter(
        person => person.voteId === nominee.id
      ).length
    })

    /* Set evicted person */
    evictedPerson = this.compareVotes(nominees)

    /* Update evicted person and toggle overlay */
    this.setState({
      evictedPerson: evictedPerson,
      overlay: evictedPerson
    })
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
          show={this.show}
        />

        <Header />
        <div className="board">
          <div className="board-leaderboard">
            {hoh.length && (
              <People
                title={this.show.leaderTitle}
                type="hoh"
                people={hoh}
                nominees={nominees}
                onChange={this.updateGroup}
                houseguests={this.people}
              />
            )}
            {nominees.length && (
              <People
                title={this.show.nomineesTitle}
                type="nominees"
                people={nominees}
                hoh={hoh}
                onChange={this.updateGroup}
                houseguests={this.people}
                voters={this.state.voters}
              />
            )}
          </div>

          <div className="board-people">
            {voters.length && (
              <People
                title={this.show.peopleTitle}
                type="voters"
                people={voters}
                onChange={this.updateVote}
                houseguests={this.people}
                nominees={this.state.nominees}
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
