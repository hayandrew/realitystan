import React from "react"
import Select from "react-select"
//https://github.com/JedWatson/react-select

class SelectBox extends React.Component {
  peopleFilter(houseguest, personId, type) {
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

  render() {
    const type = this.props.type

    if (type === "evicted") return

    const thisPerson = this.props.person
    const optionKey = this.props.optionKey
    const nominees = this.props.houseguests.filter(
      person => "is_nominee" in person
    )
    const onChange = this.props.onChange

    let defaultValue = ""
    let options = []

    if (type === "voter") {
      defaultValue = thisPerson.vote

      nominees.map((evictee, key) => {
        options.push({
          value: key,
          id: evictee.id,
          label: evictee.firstName,
          personId: thisPerson.id
        })
      })
    } else {
      defaultValue = thisPerson.id

      this.props.houseguests.map(houseguest => {
        if (
          this.peopleFilter(houseguest, thisPerson.id, type) &&
          !("empty" in houseguest)
        ) {
          options.push({
            value: houseguest.id,
            label: houseguest.firstName,
            type: type
          })
        }
      })
    }

    return (
      <Select
        clearable={false}
        disabled={this.props.disabled}
        value={defaultValue}
        options={options}
        onChange={onChange.bind(this, optionKey)}
      />
    )
  }
}
export default SelectBox
