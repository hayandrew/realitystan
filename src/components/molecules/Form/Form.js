import React, { Component } from 'react'
import RenderVerify from './RenderVerify'
import RenderButtons from './RenderButtons'
import RenderForm from './RenderForm'
import './Form.css'

class Form extends Component {

  constructor(props) {
    super(props)

    this.state = {
      stepsLength: 0,
      data: {},
      model: {},
      stepNumber: 0,
      currentStep: [],
      currentStepName: '',
      verify: false,
      disableNext: false
    }

    this.changeStep = this.changeStep.bind(this)
  }

  componentDidMount() {
    const { data, model } = this.props
    const stepsLength = Object.keys(model.steps).length - 1
    const newModel = model

    // iterate through model, add valid props
    Object.entries(newModel.steps).forEach(([key, value]) => {
      value.map(obj => {
        if (obj.props.required) {
          obj.valid = data[obj.key].trim() ? true : false
        }
      })
    })

    const currentStepName = Object.keys(newModel.steps)[0]
    const currentStep = newModel.steps[currentStepName]

    // iterate over current step and disableNext

    this.setState({
      data: data,
      model: newModel,
      stepsLength: stepsLength,
      currentStepName: currentStepName,
      currentStep: currentStep
    })
  }

  onChange = (e, key) => {
    const value = e.target.value
    this.validateForm(e, key)
    const newData = this.state.data
    newData[key] = value
    this.setState({
      data: newData
    })
  }

  checkValidForm() {
    const validForm = this.state.currentStep.filter(step =>
      step.valid === false
    )
    this.setState({
      disableNext: validForm.length !== 0
    })
  }

  validateForm(e, key) {
    const newModel = this.props.model
    const newCurrentStep = newModel.steps[this.state.currentStepName]
    const step = newCurrentStep.findIndex(step => step.key === key)

    if (newCurrentStep[step].props.required) {
      newCurrentStep[step].valid = e.target.value.trim() ? true : false
    }

    this.setState({
      model: newModel
    }, () => this.checkValidForm())
  }

  changeStep(e) {
    const { steps } = this.props.model
    const { stepNumber, stepsLength } = this.state
    const increment = parseInt(e.target.value, 10)
    const nextStep = stepNumber + increment
    const verify = (nextStep > stepsLength)
    const keys = Object.keys(steps)
    const currentStepName = keys[nextStep]
    this.setState({
      stepNumber: nextStep,
      currentStep: steps[currentStepName],
      currentStepName: currentStepName,
      verify: verify,
      disableNext: false
    })
  }

  saveForm() {
    console.log('save')
  }

  render() {
    const { className, type, title, data, saveForm } = this.props
    const { currentStepName, currentStep, verify, stepNumber, disableNext, stepsLength, model } = this.state
    return (
      <div className={className}>
        {(!verify) ?
          <RenderForm
            type={type}
            title={title}
            currentStepName={currentStepName}
            currentStep={currentStep}
            data={data}
            onChange={this.onChange}
          /> :
          <RenderVerify
            title={title}
            steps={model.steps}
            data={data}
          />
        }
        <RenderButtons
          stepNumber={stepNumber}
          changeStep={this.changeStep}
          stepsLength={stepsLength}
          verifyForm={this.verifyForm}
          saveForm={saveForm}
          disableNext={disableNext}
        />
      </div>
    )
  }
}

export default Form
