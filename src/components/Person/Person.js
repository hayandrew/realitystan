import React from "react"
import Details from "@bbstan/details"
import "./Person.css"

const Person = props => {
  const type = props.type
  const person = props.person
  const personName = person.firstName

  function renderVotes(nominee) {
    let voteCount = props.voters.filter(person => person.voteId === nominee.id)
      .length

    return (
      <div className="evictee-votes">
        <span className="evictee-votes--label">Votes</span>
        <span className="evictee-votes--count">{voteCount}</span>
      </div>
    )
  }

  function getStatusIcons(person) {
    Object.keys(person).forEach(key => {
      if (key.match(/is_/)) {
        return (
          <div
            key={key}
            className={`houseguest-stats-icon houseguest-stats-icon--${key}`}
          />
        )
      }
    })
  }

  function getPersonClass(person, type) {
    if (!type) {
      type = "plain"
    }
    if (!person) {
      person = {
        voteId: null
      }
    }

    let personClass = `houseguest houseguest-${type}`
    let inputActive = !person.voteId && type === "voters"

    if ("is_evicted" in person) personClass += " is_evicted"
    if (inputActive) personClass += " houseguest--input-active"
    if ("is_nominee_evicted" in person) personClass += " is_nominee_evicted"

    return personClass
  }

  return (
    <div className={getPersonClass(person, type)} key={personName}>
      <div className="houseguest-details">
        <Details person={person} type={type} />
        {!(type === "voters") ? props.children : ""}
        <div
          className="houseguest-image"
          style={{
            backgroundImage: "url(images/cast/" + person.image
          }}
        >
          <div className="houseguest-stats">{getStatusIcons(person)}</div>
        </div>
        {type === "voters" ? props.children : ""}
      </div>
      {type === "nominees" ? renderVotes(person) : ""}
    </div>
  )
}
export default Person
