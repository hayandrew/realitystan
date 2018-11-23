import React from 'react'
import AnimateOnChange from 'react-animate-on-change'

class Overlay extends React.Component {

  onClickChild = (e) => {
    e.stopPropagation()
  }

  onClickOverlayClose = (e) => {
    e.stopPropagation()
    if (this.props.callback) this.props.callback()
  }

  renderLoginOverlay() {
    return (
      <div className="overlay-inner">
        <div className="overlay-header">
          <h2>This is the login overlay.</h2>
        </div>
      </div>
    )
  }

  renderHelperOverlay() {
    return (
      <div className="overlay-inner">
        <div className="overlay-header">
          <h2>This is the helper overlay.</h2>
        </div>
      </div>
    )
  }

  renderEvictedOverlay() {

    const evictedPerson = this.props.evictedPerson
    const votesAgainst = this.props.people.filter(person => person.voteId === evictedPerson.id)

    return (
      <div className="overlay-inner">

        <div className="overlay-header">
          <h2>{evictedPerson.firstName} has been evicted.</h2>
          <h3>{this.props.evictionMessages[0]}</h3>

          <div className="people">
            <div className="houseguest-outer">
              <div className="houseguest" key={evictedPerson.firstName}>
                <div className="houseguest-details">
                  <div className="houseguest-image" style={{backgroundImage:'url(images/cast/' + this.props.show.short_id + '/' + evictedPerson.image}}></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <h4>Votes Against:</h4>
        <div className="people overlay-votes-against">
          { votesAgainst.map((person, key) => (
            <div className="houseguest-outer" onClick={this.onClickChild.bind(this)} key={key}>
              <div className="houseguest" key={person.firstName}>
                <div className="houseguest-details">
                  <div>{person.firstName}</div>
                  <div className="houseguest-image" style={{backgroundImage:'url(images/cast/' + this.props.show.short_id + '/' + person.image}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    const overlay = this.props.overlay

    return (
      <div onClick={this.props.toggleOverlay.bind(this, null)} className={"overlay " + (this.props.overlay ? ' overlay--active' : '')}>
        <a onClick={this.props.toggleOverlay.bind(this, null)} className="overlay--close">Close</a>
        {(overlay === 'login') ? this.renderLoginOverlay() : ''}
        {(overlay === 'evicted') ? this.renderEvictedOverlay() : ''}
      </div>
    )
  }

}
export default Overlay