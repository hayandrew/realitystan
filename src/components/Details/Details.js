import React from "react"
import ReactTooltip from "react-tooltip"

class Details extends React.Component {
  renderInfo(person) {
    return (
      <div className="float-left">
        <div className="info-name">
          <label>Name: </label>
          {person.firstName} {person.lastName}
        </div>
        <div className="info-age">
          <label>Age: </label>
          {person.age}
        </div>
        {person.dob ? (
          <div className="info-dob">
            <label>Birthday: </label>
            {person.dob}
          </div>
        ) : (
          ""
        )}
        <div className="info-hometown">
          <label>Hometown: </label>
          {person.hometown}
        </div>
        <div className="info-residence">
          <label>Residence: </label>
          {person.residence}
        </div>
        <div className="info-occupation">
          <label>Occupation: </label>
          {person.occupation}
        </div>
      </div>
    )
  }

  renderStats(person) {
    if (!person.stats) return

    return (
      <div className="float-left">
        {/* <div className="stats-fitness"><label>fitness: </label>{stats.fitness}</div>
        <div className="stats-extroversion"><label>extroversion: </label>{stats.extroversion}</div>
        <div className="stats-IQ"><label>IQ: </label>{stats.IQ}</div>
        <div className="stats-humor"><label>humor: </label>{stats.humor}</div>
        <div className="stats-EQ"><label>EQ: </label>{stats.EQ}</div>
        <div className="stats-charm"><label>charm: </label>{stats.charm}</div>
        <div className="stats-cunning"><label>cunning: </label>{stats.cunning}</div> */}
      </div>
    )
  }

  renderName(type, person) {
    if (type === "voter") {
      return (
        <button
          className="detail-hover"
          data-tip
          data-for={person.name + "details"}
        >
          {person.firstName}
        </button>
      )
    }
  }

  render() {
    const person = this.props.person

    return (
      <div>
        {this.renderName(this.props.type, person)}
        <ReactTooltip id={person.firstName} aria-haspopup="true">
          {this.renderInfo(person)}
          {this.renderStats(person)}
        </ReactTooltip>
      </div>
    )
  }
}
export default Details
