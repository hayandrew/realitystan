import React from "react"
import Person from "@bbstan/person"
import SelectBox from "@bbstan/selectbox"
import "./People.css"

const People = props => {
  const { type, people, title } = props

  return (
    <div className={type}>
      <h3>{title}</h3>
      <div className={`${type}-inner`}>
        <div className="people">
          {people.map((person, key) => {
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
      </div>
    </div>
  )
}

export default People
