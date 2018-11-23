import React from "react"
import evictionMessages from "./data"

class Overlay extends React.Component {
  onClickChild = e => {
    e.stopPropagation()
  }

  onClickOverlayClose = e => {
    e.stopPropagation()
    if (this.props.callback) this.props.callback()
  }

  renderPerson(person) {
    return (
      <div className="houseguest-outer">
        <div className="houseguest" key={person.firstName}>
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

  renderEvictedOverlay() {
    const evictedPerson = this.props.evictedPerson
    const votesAgainst = this.props.people.filter(
      person => person.voteId === evictedPerson.id
    )

    return (
      <div className="overlay-inner">
        <div className="overlay-header">
          <h2>{evictedPerson.firstName} has been evicted.</h2>
          <h3>{evictionMessages[0]}</h3>

          <div className="people">{this.renderPerson(evictedPerson)}</div>
        </div>

        <h4>Votes Against:</h4>
        <div className="people overlay-votes-against">
          {votesAgainst.map((person, key) => this.renderPerson(person))}
        </div>
      </div>
    )
  }

  render() {
    const overlay = this.props.overlay

    return (
      <div
        onClick={this.props.toggleOverlay.bind(this, null)}
        className={"overlay " + (this.props.overlay ? " overlay--active" : "")}
      >
        <button
          onClick={this.props.toggleOverlay.bind(this, null)}
          className="overlay--close"
        >
          Close
        </button>
        {overlay === "evicted" ? this.renderEvictedOverlay() : ""}
      </div>
    )
  }
}
export default Overlay
