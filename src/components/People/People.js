import React from "react"

import Person from "@bbstan/person"
import SelectBox from "@bbstan/selectbox"

class People extends React.Component {
  render() {
    const type = this.props.type
    const peopleSubset = this.props.people

    return (
      <div className="people">
        {peopleSubset.map((person, key) => {
          const disabled = "is_evicted" in person

          return (
            <div className="houseguest-outer" key={key}>
              <Person
                type={type}
                person={person}
                houseguests={this.props.houseguests}
              >
                <SelectBox
                  type={type}
                  person={person}
                  disabled={disabled}
                  onChange={this.props.onChange}
                  houseguests={this.props.houseguests}
                  optionKey={key}
                />
              </Person>
            </div>
          )
        })}
      </div>
    )
  }
}
export default People
