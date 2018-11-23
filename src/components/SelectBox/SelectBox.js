import React from "react"
import Select from "react-select"
import "./SelectBox.css"
//https://github.com/JedWatson/react-select

const SelectBox = props => {
  function peopleFilter(houseguest, personId, type) {
    if (type === "hoh") {
      return (
        (!("notEvictable" in houseguest) &&
          !("is_evicted" in houseguest) &&
          !("is_nominee" in houseguest)) ||
        ("is_" in houseguest && houseguest.id === personId)
      )
    }
    if (type === "nominee") {
      return (
        (!("notEvictable" in houseguest) &&
          !("is_safe" in houseguest) &&
          !("is_evicted" in houseguest) &&
          !("is_hoh" in houseguest) &&
          !("is_nominee" in houseguest)) ||
        ("is_nominee" in houseguest && houseguest.id === personId)
      )
    }
  }

  const type = props.type

  if (type === "evicted") return

  const thisPerson = props.person
  const optionKey = props.optionKey
  const nominees = props.houseguests.filter(person => "is_nominee" in person)
  const onChange = props.onChange

  let defaultValue = ""
  let options = []

  if (type === "voter") {
    defaultValue = thisPerson.vote

    nominees.map((evictee, key) => {
      return options.push({
        value: key,
        id: evictee.id,
        label: evictee.firstName,
        personId: thisPerson.id
      })
    })
  } else {
    defaultValue = thisPerson.id

    props.houseguests.map(houseguest => {
      if (
        peopleFilter(houseguest, thisPerson.id, type) &&
        !("empty" in houseguest)
      ) {
        return options.push({
          value: houseguest.id,
          label: houseguest.firstName,
          type: type
        })
      } else {
        return null
      }
    })
  }

  return (
    <Select
      disabled={props.disabled}
      value={defaultValue}
      options={options}
      clearable={false}
      onChange={onChange.bind(this, optionKey)}
    />
  )
}

export default SelectBox
