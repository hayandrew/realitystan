import React from "react"
import "./Header.css"

const Header = props => {
  return (
    <div className="header">
      <div className="header-left">
        <div>
          <h1>
            Big Brother <span>calculator</span>
          </h1>
        </div>
        {props.children}
      </div>
      <div className="header-right" />
    </div>
  )
}

export default Header
