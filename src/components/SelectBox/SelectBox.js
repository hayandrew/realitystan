import React from "react"
import Select from "react-select"
import "./SelectBox.css"

const SelectBox = props => {
  const {
    person: thisPerson,
    type,
    optionKey,
    nominees,
    onChange,
    houseguests
  } = props

  /* If person is evicted, don't render a select */
  if (type === "evicted") {
    return false
  }

  /**
   * Filter people
   * TODO: add filter
   * @param {obj} person a person object
   * @returns {void}
   */
  function filterPerson(person) {
    if (type === "hoh") {
    } else if (type === "nominees") {
    }
  }

  /**
   * Gets the dropdown options
   * @returns {obj} an object of options
   */
  function getOptions() {
    let options = []
    if (type === "voters") {
      nominees.forEach((person, key) => {
        options.push({
          value: key,
          id: person.id,
          label: person.firstName,
          personId: thisPerson.id
        })
      })
    } else {
      houseguests.forEach(houseguest => {
        filterPerson(houseguest)
        options.push({
          value: houseguest.id,
          label: houseguest.firstName,
          type: type
        })
      })
    }
    return options
  }

  /**
   * Gets the dropdown default value
   * @returns {number} the id of the default value
   */
  function getDefaultValue() {
    let defaultValue = ""
    if (type === "voters") {
      defaultValue = thisPerson.vote
    } else {
      defaultValue = thisPerson.id
    }
    return defaultValue
  }

  return (
    <Select
      disabled={props.disabled}
      value={getDefaultValue()}
      options={getOptions()}
      clearable={false}
      onChange={onChange.bind(this, optionKey)}
    />
  )
}

export default SelectBox
