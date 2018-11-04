import React, { Component } from 'react'
import Form from '@dyna-form/form'
import model from './data/model'

class EventForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      model: model
    }
    this.onBlur = this.onBlur.bind(this)
    this.saveForm = this.saveForm.bind(this)
  }

  componentWillMount() {
    this.setState({
      data: this.props.data
    })
    this.enhanceModel()
  }

  onBlur(e) {
    console.log(e.target.required)
    console.log(this.state)
  }

  enhanceModel() {
    const newModel = this.state.model
    newModel.steps["Venue"][0].props.onBlur = this.onBlur
    this.setState({
      model: newModel
    })
  }

  saveForm() {
    console.log(this.state)
  }

  render() {
    const { title, type, data } = this.props

    return (
      <Form
        type={type}
        title={title}
        data={data}
        model={model}
        saveForm={this.saveForm}
      />
    )
  }
}

export default EventForm
