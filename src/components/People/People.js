import React from "react"
import Person from "@bbstan/person"
import SelectBox from "@bbstan/selectbox"
import "./People.css"

const get = require("lodash/get")

const People = props => {
  const {
    type,
    people,
    title,
    voters,
    onChange,
    nominees,
    toggleEviction
  } = props

  /**
   * Render a person container with select box
   * @param {obj} person a person object
   * @param {number} key the array key
   * @returns {void}
   */
  function renderPerson(person, key) {
    const is_evicted = get(person, "is_evicted", false)
    return (
      <Person
        type={type}
        voters={voters}
        person={person}
        key={key}
        toggleEviction={toggleEviction}
      >
        <SelectBox
          type={type}
          person={person}
          disabled={is_evicted}
          onChange={onChange}
          nominees={nominees}
          voters={voters}
          optionKey={key}
        />
      </Person>
    )
  }

  return (
    <div className={type}>
      <h3>{title}</h3>
      <div className={`${type}-inner`}>
        <div className="people">
          {people.map((person, key) => renderPerson(person, key))}
        </div>
      </div>
    </div>
  )
}

export default People
