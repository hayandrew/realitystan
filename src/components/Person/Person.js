import React from "react"
import classnames from "classnames"
import Details from "@bbstan/details"
import "./Person.css"

const Person = props => {
  const { children, firstName, person, type } = props

  /**
   * Filter people
   * @param {obj} person a person object
   * @returns {void}
   */
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

  /**
   * Add status icons
   * TODO: fix this
   * @param {obj} person a person object
   * @returns {void}
   */
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

  /**
   * Get the classnames for the person
   * @param {obj} person a person object
   * @returns {void}
   */
  function getPersonClass(person) {
    if (!person) {
      person = {
        voteId: null
      }
    }
    return classnames(
      `houseguest houseguest-${type}`,
      "is_evicted" in person && "is_evicted",
      !person.voteId && type === "voters" && "houseguest--input-active",
      "is_nominee_evicted" in person && "is_nominee_evicted"
    )
  }

  return (
    <div className="houseguest-outer">
      <div className={getPersonClass(person, type)} key={firstName}>
        <div className="houseguest-details">
          {/* TODO: Add details */}
          <Details person={person} type={type} />
          {!(type === "voters") && children}
          <div
            className="houseguest-image"
            style={{
              backgroundImage: `url(images/cast/${person.image}`
            }}
          >
            <div className="houseguest-stats">{getStatusIcons(person)}</div>
          </div>
          {type === "voters" && children}
        </div>
        {type === "nominees" && renderVotes(person)}
        {type === "overlay" && (
          <div className="evictee-voter-name">{firstName}</div>
        )}
      </div>
    </div>
  )
}
export default Person
