import React from "react"
import evictionMessages from "./data"
import "./Overlay.css"

const Overlay = props => {
  const { overlay, toggleOverlay, evictedPerson, people } = props

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
    const votesAgainst = people.filter(
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
          {votesAgainst.map(person => renderPerson(person))}
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={toggleOverlay}
      className={"overlay " + (overlay ? " overlay--active" : "")}
    >
      <button onClick={toggleOverlay} className="overlay--close">
        Close
      </button>
      {overlay && renderEvictedOverlay()}
    </div>
  )
}
export default Overlay
