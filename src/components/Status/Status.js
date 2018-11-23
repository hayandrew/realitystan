import React from 'react'

class Status extends React.Component {

  changeStatus = (key, event) => {
    let houseguests = this.state.houseguests

    if (!event.target.checked) {
      delete houseguests[key].evicted
    } else {
      houseguests[key].evicted = true
    }

    //houseguests = houseguests.sort((a, b) => ('evicted' in a) - ('evicted' in b) || a.id - b.id)
    houseguests = houseguests.sort((a, b) => a.id - b.id)

    this.setState({
      houseguests: houseguests
    })
  }
  
  render() {
    return (
      <div className="header">
        <div className="header-left">
          <div>
            <h1>RealityStan</h1>
          </div>
          <div>
            <h2>
              <select onChange={this.props.onChangeShow} value={this.props.show.short_id}>
                { this.props.shows.map(show => {
                  return <option key={show.id} value={show.id}>{show.name}</option>
                })}
              </select>
              <span>Game Board</span>
            </h2>
          </div>
        </div>
        <div className="header-right">
          <a className="button" onClick={this.props.onClickLogin.bind(this)}>Login</a> | 
          <a className="button" onClick={this.props.onClickLogin.bind(this)}>Sign Up</a>
        </div>
      </div>
    )
  }
}
export default Status