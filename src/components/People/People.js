import React from "react"
import Person from "@bbstan/person"
import SelectBox from "@bbstan/selectbox"

const People = props => {
  const type = props.type
  const peopleSubset = props.people

  return (
    <div className="people">
      {peopleSubset.map((person, key) => {
        const disabled = "is_evicted" in person

        return (
          <div className="houseguest-outer" key={key}>
            <Person type={type} voters={props.voters} person={person}>
              <SelectBox
                type={type}
                person={person}
                disabled={disabled}
                onChange={props.onChange}
                houseguests={props.houseguests}
                nominees={props.nominees}
                hoh={props.hoh}
                voters={props.voters}
                optionKey={key}
              />
            </Person>
          </div>
        )
      })}
    </div>
  )
}

export default People
