import React, { Component } from 'react'
import './Button.css'

class Button extends Component {
  render() {
    const { label } = this.props
    return (
      <div className="button-wrapper">
        <button {...this.props}>{label}</button>
      </div>
    )
  }
}

export default Button
