import React from "react"

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-left">
          <div>
            <h1>
              Big Brother <span>game board</span>
            </h1>
          </div>
          {this.props.children}
        </div>
        <div className="header-right" />
      </div>
    )
  }
}
export default Header
