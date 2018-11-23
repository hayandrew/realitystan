import React from "react"
import evictionMessages from "./data"

const Overlay = props => {
  const overlay = props.overlay

  function renderPerson(person) {
    return (
      <div className="houseguest-outer" key={person.firstName}>
        <div className="houseguest">
          <div className="houseguest-details">
            <div>{person.firstName}</div>
            <div
              className="houseguest-image"
              style={{
                backgroundImage: `url(images/cast/${person.image}`
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  function renderEvictedOverlay() {
    const evictedPerson = props.evictedPerson
    const votesAgainst = props.people.filter(
      person => person.voteId === evictedPerson.id
    )

    return (
      <div className="overlay-inner">
        <div className="overlay-header">
          <h2>{evictedPerson.firstName} has been evicted.</h2>
          <h3>{evictionMessages[0]}</h3>

          <div className="people">{renderPerson(evictedPerson)}</div>
        </div>

        <h4>Votes Against:</h4>
        <div className="people overlay-votes-against">
          {votesAgainst.map((person, key) => renderPerson(person))}
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={props.toggleOverlay.bind(this, null)}
      className={"overlay " + (props.overlay ? " overlay--active" : "")}
    >
      <button
        onClick={props.toggleOverlay.bind(this, null)}
        className="overlay--close"
      >
        Close
      </button>
      {overlay === "evicted" ? renderEvictedOverlay() : ""}
    </div>
  )
}
export default Overlay
