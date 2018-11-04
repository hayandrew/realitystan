import React, { Component } from 'react'

export default class Save extends Component {
  constructor(props) {
    super(props)

    this.state = {
      savedToCloud: props.getStore().savedToCloud
    }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // not required as this component has no forms or user entry
  // isValidated() {}

  render() {
    return (
      <div className="step step6">
        <h2>{this.props.title}</h2>
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <label className="col-md-12 control-label">
                {
                  (this.state.savedToCloud)
                  ?
                    <div>
                      <p>Thanks!</p>
                      <p>Data was successfully saved to cloud...</p>
                    </div>
                  :
                    <h1>You have updated data, go <button onClick={() => {this.props.jumpToStep(4)}}>back</button> and Save again!</h1>
                }
              </label>
              </div>
          </form>
        </div>
      </div>
    )
  }
}
