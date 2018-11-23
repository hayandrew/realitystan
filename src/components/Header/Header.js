import React from 'react'
import Select from 'react-select'

class Header extends React.Component {

  render() {
    const options = []

    this.props.shows.map(show => {
      options.push({
        key: show.id,
        value: show.id,
        label: show.name
      })

    })

    return (

      <div className="header">
        <div className="header-left">
          <div>
            <h1>{this.props.siteName} <span>game board</span></h1>
          </div>
          <div>
            <h2>
              <Select
                clearable={false}
                disabled={false}
                value={this.props.show.id}
                options={options}
                onChange={this.props.onChangeShow}
              />
            </h2>
          </div>
          {this.props.children}
        </div>
        <div className="header-right">
          <a className="button" onClick={this.props.onClickLogin.bind(this)}>Login</a> | 
          <a className="button" onClick={this.props.onClickLogin.bind(this)}>Sign Up</a>
        </div>
      </div>
      
    )
  }
}
export default Header