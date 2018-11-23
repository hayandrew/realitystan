import React from "react"
import Details from "@bbstan/details"

import AnimateOnChange from "react-animate-on-change"

class Person extends React.Component {
  renderVotes(nominee) {
    let voteCount = this.props.houseguests.filter(
      person => person.voteId === nominee.id
    ).length

    return (
      <div className="evictee-votes">
        <span className="evictee-votes--label">Votes</span>
        <span className="evictee-votes--count">
          <AnimateOnChange
            baseClassName="vote"
            animationClassName="vote-change"
            animate={true}
          >
            {voteCount}
          </AnimateOnChange>
        </span>
      </div>
    )
  }

  getStatusIcons(person) {
    return Object.keys(person).map(key => {
      if (key.match(/is_/)) {
        return (
          <div
            key={key}
            className={"houseguest-stats-icon houseguest-stats-icon--" + key}
          />
        )
      }
    })
  }

  getPersonClass(person, type) {
    if (!type) {
      type = "plain"
    }
    if (!person) {
      person = {
        voteId: null
      }
    }

    let personClass = "houseguest houseguest-" + type
    let inputActive = !person.voteId && type === "voter"

    if ("is_evicted" in person) personClass += " is_evicted"
    if (inputActive) personClass += " houseguest--input-active"
    if ("is_nominee_evicted" in person) personClass += " is_nominee_evicted"

    return personClass
  }

  render() {
    const type = this.props.type
    const person = this.props.person
    const personName = person.firstName

    return (
      <div className={this.getPersonClass(person, type)} key={personName}>
        <div className="houseguest-details">
          <Details person={person} type={type} />
          {!(type === "voter") ? this.props.children : ""}
          <div
            className="houseguest-image"
            style={{
              backgroundImage: "url(images/cast/" + person.image
            }}
          >
            <div className="houseguest-stats">
              {this.getStatusIcons(person)}
            </div>
          </div>
          {type === "voter" ? this.props.children : ""}
        </div>
        {type === "nominee" ? this.renderVotes(person) : ""}
      </div>
    )
  }
}
export default Person
