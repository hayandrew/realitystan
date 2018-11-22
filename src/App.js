import React, { Component } from "react"
import "./App.css"
import Letter from "@disney/letter"
import Data from "./data"

class App extends Component {
  render() {
    return (
      <div className="letters-container">
        {Data.map(icon => (
          <Letter key={icon.path} icon={icon} />
        ))}
      </div>
    )
  }
}

export default App
