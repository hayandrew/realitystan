import React, { Component, Fragment } from "react"
import StepZilla from "@boozer/react-stepzilla" // https://github.com/newbreedofgeek/react-stepzilla
import Venue from "./steps/Venue"
import Occurence from "./steps/Occurence"
import Details from "./steps/Details"
import Description from "./steps/Description"
import Review from "./steps/Review"
import Save from "./steps/Save"

import "./EventForm.css"

const get = require("lodash/get")

export default class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.sampleStore = {
      email: "",
      gender: "",
      venue: "",
      start_time: "",
      end_time: "",
      event_type: "",
      specials: "",
      title: "",
      desc: "",
      savedToCloud: false
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getStore() {
    return this.sampleStore
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update
    }
  }

  getSessionStep() {
    const storedStep = get(window, "sessionStorage.step")
    return storedStep ? parseFloat(storedStep) : 0
  }

  render() {
    const steps = [
      {
        name: "Venue",
        component: (
          <Venue
            title="Venue"
            getStore={() => this.getStore()}
            updateStore={u => {
              this.updateStore(u)
            }}
          />
        )
      },
      {
        name: "Occurence",
        component: (
          <Occurence
            title="Occurence"
            getStore={() => this.getStore()}
            updateStore={u => {
              this.updateStore(u)
            }}
          />
        )
      },
      {
        name: "Details",
        component: (
          <Details
            title="Details"
            getStore={() => this.getStore()}
            updateStore={u => {
              this.updateStore(u)
            }}
          />
        )
      },
      {
        name: "Description",
        component: (
          <Description
            title="Description"
            getStore={() => this.getStore()}
            updateStore={u => {
              this.updateStore(u)
            }}
          />
        )
      },
      {
        name: "Review",
        component: (
          <Review
            title="Review"
            getStore={() => this.getStore()}
            updateStore={u => {
              this.updateStore(u)
            }}
          />
        )
      },
      {
        name: "Save",
        showSteps: false,
        component: (
          <Save
            title="Save"
            getStore={() => this.getStore()}
            updateStore={u => {
              this.updateStore(u)
            }}
          />
        )
      }
    ]

    return (
      <Fragment>
        <div className="step-progress">
          <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            nextTextOnFinalActionStep={"Save"}
            hocValidationAppliedTo={[3]}
            startAtStep={this.getSessionStep()}
            prevBtnOnLastStep={false}
            onStepChange={step => window.sessionStorage.setItem("step", step)}
          />
        </div>
      </Fragment>
    )
  }
}
