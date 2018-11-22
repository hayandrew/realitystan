import React from "react"
import "./Letter.css"

const classNames = require("classnames")

class Letter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      positionTop: true
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
  }

  onMouseEnter() {
    this.setState({
      positionTop: !this.state.positionTop
    })
  }

  getClassNames() {
    return classNames(
      "letter-wrapper",
      this.state.positionTop ? `anim-top` : `anim-bottom`
    )
  }

  render() {
    const { path, offset, containerStyle } = this.props.icon
    return (
      <div className="letter-container" style={containerStyle}>
        <div className={this.getClassNames()}>
          <img
            onMouseEnter={this.onMouseEnter}
            src={path}
            style={offset}
            alt=""
          />
        </div>
      </div>
    )
  }
}

export default Letter
