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
    voters
  } = props

  /* If person is evicted, don't render a select */
  if (type === "evicted") {
    return false
  }

  /**
   * Get group of houseguests for options
   * @returns {void}
   */
  function getGroup() {
    if (voters) {
      return [thisPerson, ...voters]
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
      const group = getGroup()
      if (group.length) {
        group.forEach(person => {
          options.push({
            value: person.id,
            label: person.firstName,
            type: type
          })
        })
      }
    }
    return options
  }

  /**
   * Gets the dropdown default value
   * @returns {number} the id of the default value
   */
  function getDefaultValue() {
    return type === "voters" ? thisPerson.vote : thisPerson.id
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
