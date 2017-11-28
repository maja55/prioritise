import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StatusButton from '../components/StatusButton'
import toggleStatus from '../actions/tasks/toggle'
import removeTask from '../actions/tasks/remove'

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

  render() {
    const { tasks, important, urgent, impact, finish, id } = this.props

    return(
      <li className="task">
          <span className="task--label">
            { tasks }    ----    importance:{important} | urgency:{urgent} | energy:{ impact}  |
          </span>
          <span className="task--button-group">
            <StatusButton isDone={ finish } onClick={(e) => this.props.toggleStatus(this.props, e)} />
            <button onClick={(e) => this.props.removeTask(id, e)}>DELETE TASK</button>
          </span>
      </li>
    )
  }
}

const mapDispatchToProps = { toggleStatus, removeTask }

export default connect(null, mapDispatchToProps)(Task)
