import React, { Component } from "react"

import Header from "@bbstan/header"
import Overlay from "@bbstan/overlay"
import People from "@bbstan/people"
import "./App.css"
import data from "./data"

class App extends Component {
  constructor(props) {
    super(props)

    this.people = data.people

    this.state = {
      people: data.people,
      show: data.show,
      nominees: [],
      hoh: [],
      voters: []
    }
  }

  componentDidMount() {
    this.setState({
      nominees: this.getNominees(),
      hoh: this.getHoh(),
      voters: this.getVoters()
    })
  }

  getVoters() {
    return this.state.people.filter(
      person =>
        !("is_nominee" in person) &&
        !("is_hoh" in person) &&
        !("empty" in person)
    )
  }

  getHoh() {
    return this.state.people
      .filter(person => "is_hoh" in person)
      .sort((a, b) => a.hoh_key - b.hoh_key)
  }

  getNominees() {
    return this.state.people
      .filter(person => "is_nominee" in person)
      .sort((a, b) => a.nominee_key - b.nominee_key)
  }

  updatePeople = (key, event) => {
    const filterType = event.type
    const statName = "is_" + filterType
    const keyType = filterType + "_key"
    const people = this.state.people
    const subset = people.filter(person => statName in person)
    const val = event.value
    const match = subset.some(person => person.id === event.value)
    const prevPerson = subset.filter(person => person[keyType] === key)[0]

    if (!match) {
      const replacementPerson = people.filter(item => item.id === val)[0]

      if (prevPerson) {
        delete prevPerson[statName]
        delete prevPerson[keyType]

        people.forEach(person => {
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

  compareVotes(nominees) {
    let voters = this.getVoters()
    let maxCount = voters.length / 2
    let isEvenCount = maxCount % 1 === 0
    let evictedPerson = null

    if (!isEvenCount) {
      maxCount = Math.ceil(maxCount)
    }

    // check whether either nominee has maxCount
    for (var i = 0, len = nominees.length; i < len; i++) {
      if (nominees[i].voteCount >= maxCount) {
        evictedPerson = nominees[i]
        break
      }
    }
    return evictedPerson
  }

  updateVote = (key, event) => {
    let people = this.state.people
    let nominees = people.filter(person => "is_nominee" in person)
    let evictedPerson = null

    // set vote
    people.forEach(person => {
      if (person.id === event.personId) {
        person.vote = parseInt(event.value, 10)
        person.voteId = parseInt(event.id, 10)
      }
    })

    // count vote
    nominees.forEach(nominee => {
      let voteCount = people.filter(person => person.voteId === nominee.id)
        .length
      nominee.voteCount = voteCount
    })

    // set evicted person
    evictedPerson = this.compareVotes(nominees, people)

    this.setState({
      houseguests: people,
      evictedPerson: evictedPerson,
      overlay: evictedPerson ? "evicted" : null
    })
  }

  toggleOverlay = key => {
    this.setState({
      overlay: key
    })
  }

  /*
   * Render App
   *
   */
  render() {
    let hohs = this.getHoh()
    let nominees = this.getNominees()
    let voters = this.getVoters()

    console.log(this.state)

    return (
      <div className="main-container">
        <Overlay
          evictedPerson={this.state.evictedPerson}
          overlay={this.state.overlay}
          toggleOverlay={this.toggleOverlay}
          people={this.state.people}
          show={this.state.show}
        />

        <Header />

        <div className="board">
          <div className="board-leaderboard">
            {hohs.length && (
              <div className="hoh">
                <h3>{this.state.show.leaderTitle}</h3>
                <People
                  type="hoh"
                  people={hohs}
                  onChange={this.updatePeople}
                  houseguests={this.state.people}
                />
              </div>
            )}
            {nominees.length && (
              <div className="nominees">
                <h3>{this.state.show.nomineesTitle}</h3>
                <div className="nominees-inner">
                  <People
                    type="nominee"
                    people={nominees}
                    onChange={this.updatePeople}
                    houseguests={this.state.people}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="board-people">
            <h3>{this.state.show.peopleTitle}</h3>
            <div className="voters">
              <People
                type="voter"
                people={voters}
                onChange={this.updateVote}
                houseguests={this.state.people}
              />
            </div>
          </div>
        </div>

        <footer>
          <div className="copyright">&copy; Copyright 2017. Andy Hay</div>
        </footer>
      </div>
    )
  }
}

export default App
