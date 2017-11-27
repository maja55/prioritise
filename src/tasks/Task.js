import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StatusButton from '../components/StatusButton'
import toggleStatus from '../actions/tasks/toggle'

class Task extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    tasks: PropTypes.string.isRequired,
    urgent: PropTypes.number,
    important: PropTypes.number,
    impact: PropTypes.number,
    finish: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    timedone: PropTypes.instanceOf(Date)
  }

  toggleStatus = () => {
    this.props.toggleStatus(this.props);
  }

  render() {
    const { tasks, important, urgent, impact, finish } = this.props

    return(
      <li className="task">
          <span className="task--label">
            { tasks }    ----    importance:{important} | urgency:{urgent} | energy:{ impact}  |
          </span>
          <span className="task--button-group">
            <StatusButton isDone={ finish } onClick={this.toggleStatus} />
          </span>
      </li>
    )
  }
}

const mapDispatchToProps = { toggleStatus }


export default connect(null, mapDispatchToProps)(Task)
