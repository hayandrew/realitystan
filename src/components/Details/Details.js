import React, { Fragment } from "react"
import ReactTooltip from "react-tooltip"

const Details = props => {
  const { type } = props
  const {
    name,
    firstName,
    lastName,
    age,
    dob,
    hometown,
    residence,
    occupation,
    stats
  } = props.person

  /**
   * Renders info for tooltip
   * @returns {string} HTML markup for tooltip
   */
  function renderInfo() {
    return (
      <div className="float-left">
        <div className="info-name">
          <label>Name: </label>
          {firstName} {lastName}
        </div>
        <div className="info-age">
          <label>Age: </label>
          {age}
        </div>
        {dob && (
          <div className="info-dob">
            <label>Birthday: </label>
            {dob}
          </div>
        )}
        <div className="info-hometown">
          <label>Hometown: </label>
          {hometown}
        </div>
        <div className="info-residence">
          <label>Residence: </label>
          {residence}
        </div>
        <div className="info-occupation">
          <label>Occupation: </label>
          {occupation}
        </div>
      </div>
    )
  }

  /**
   * Renders stats for tooltip
   * @returns {string} HTML markup for tooltip
   */
  function renderStats() {
    if (!stats) return

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

  /**
   * Renders name for tooltip
   * @returns {string} HTML markup for tooltip
   */
  function renderName() {
    if (type === "voters") {
      return (
        <button className="detail-hover" data-tip data-for={`${name}details`}>
          {firstName}
        </button>
      )
    }
  }

  return (
    <Fragment>
      {renderName()}
      <ReactTooltip id={firstName} aria-haspopup="true">
        {renderInfo()}
        {renderStats()}
      </ReactTooltip>
    </Fragment>
  )
}
export default Details
