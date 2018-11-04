import React, { Component, Fragment } from "react"
import EventForm from "@boozer/event-form"
import "./App.css"
import { data } from "./data"

class App extends Component {
  render() {
    return (
      <Fragment>
        <EventForm type="Edit" title="Event" data={data} />
      </Fragment>
    )
  }
}

export default App
