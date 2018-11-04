import React, { Component } from "react"
import Button from "@material-ui/core/Button"

export default class Venue extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // not required as this component has no forms or user entry
  // isValidated() {}

  render() {
    const model = {
      key: "venue",
      label: "Venue",
      type: "input",
      props: {
        type: "text",
        id: "venue",
        required: true
      }
    }

    return (
      <div className="step step1">
        <Button>hello</Button>
        <h2>{this.props.title}</h2>
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <h3>
                      This example uses this custom config (which overwrites the
                      default config):
                    </h3>
                    <code>
                      preventEnterSubmission=true
                      <br />
                      nextTextOnFinalActionStep="Save"
                      <br />
                      hocValidationAppliedTo=[3]
                      <br />
                      startAtStep=window.sessionStorage.getItem('step') ?
                      parseFloat(window.sessionStorage.getItem('step')) : 0
                      <br />
                      onStepChange=(step) =>
                      window.sessionStorage.setItem('step', step)
                    </code>
                  </div>
                  <div className="col-md-6">
                    <h3>The default config settings are...</h3>
                    <code>
                      showSteps=true
                      <br />
                      showNavigation=true
                      <br />
                      stepsNavigation=true
                      <br />
                      prevBtnOnLastStep=true
                      <br />
                      dontValidate=false
                      <br />
                      preventEnterSubmission=false
                      <br />
                      startAtStep=0
                      <br />
                      nextButtonText='Next'
                      <br />
                      backButtonText='Previous'
                      <br />
                      nextButtonCls='btn btn-prev btn-primary btn-lg pull-right'
                      <br />
                      backButtonCls='btn btn-next btn-primary btn-lg pull-left'
                      <br />
                      nextTextOnFinalActionStep='[default value of
                      nextButtonText]'
                      <br />
                      hocValidationAppliedTo: []
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
