import React from "react"
import Select from "react-select"
import "./SelectBox.css"
//https://github.com/JedWatson/react-select

const SelectBox = props => {
  const type = props.type
  if (type === "evicted") {
    return false
  }

  const {
    person: thisPerson,
    optionKey,
    nominees,
    onChange,
    houseguests
  } = props

  function filterPerson(person) {
    if (type === "hoh") {
    } else if (type === "nominees") {
    }
  }

  function getOptions() {
    let options = []
    if (type === "voter") {
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
        if (!("empty" in houseguest)) {
          options.push({
            value: houseguest.id,
            label: houseguest.firstName,
            type: type
          })
        } else {
          return null
        }
      })
    }
    return options
  }

  function getDefaultValue() {
    let defaultValue = ""
    if (type === "voter") {
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
