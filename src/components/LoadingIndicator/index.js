import React, { Component } from 'react'
import './style.css'

export default class LoadingIndicator extends Component {
  render() {
    return (
      <div>
        <div className="toiletroll">
          <div className="roll"></div>
          <div className="papers">
            <div className="paper">Loading</div>
            <div className="paper">Wait</div>
            <div className="paper">Please</div>
          </div>
        </div>
      </div>
    )
  }
}
