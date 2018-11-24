import React from "react"
import Person from "@bbstan/person"
import SelectBox from "@bbstan/selectbox"
import "./People.css"

const People = props => {
  const {
    type,
    people,
    title,
    voters,
    onChange,
    nominees,
    hoh,
    houseguests
  } = props

  /**
   * Render a person container with select box
   * @param {obj} person a person object
   * @param {number} key the array key
   * @returns {void}
   */
  function renderPerson(person, key) {
    return (
      <div className="houseguest-outer" key={key}>
        <Person type={type} voters={voters} person={person}>
          <SelectBox
            type={type}
            person={person}
            disabled={"is_evicted" in person}
            onChange={onChange}
            houseguests={houseguests}
            nominees={nominees}
            hoh={hoh}
            voters={voters}
            optionKey={key}
          />
        </Person>
      </div>
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
