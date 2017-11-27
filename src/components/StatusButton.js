import React, { PureComponent } from 'react'

class StatusButton extends PureComponent {

  render() {
    const { isDone, onClick } = this.props

    return (
        <button className={ isDone ? 'btn done' : 'btn todo' } onClick={onClick}>
          { isDone ? "DONE" : "TODO" }
        </button>
    )
  }
}

export default StatusButton
