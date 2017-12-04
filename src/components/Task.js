import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StatusButton from './StatusButton'
import toggleStatus from '../actions/tasks/toggle'
import removeTask from '../actions/tasks/remove'
import UpdateTaskForm from './UpdateTaskForm'

class Task extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    tasks: PropTypes.string.isRequired,
    urgent: PropTypes.number,
    important: PropTypes.number,
    impact: PropTypes.number,
    finish: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    timedone: PropTypes.instanceOf(Date),
  }

  constructor(props){
    super(props);
    this.state = {editing: false}
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing })
  }

  renderEditForm() {
    return (
      <div>
        <UpdateTaskForm id={ this.props.id }/>
        <button onClick={() => this.toggleEditing() }>Close</button>
      </div>
    )
  }

  render() {
    const { tasks, important, urgent, impact, finish, id } = this.props

    return(
      <li className="task">
          <span className="task_label">
            { tasks }    ----    importance:{important} | urgency:{urgent} | energy:{ impact}  |
          </span>
          <span className="task_button-group">
            <StatusButton isDone={ finish } onClick={(e) => this.props.toggleStatus(this.props, e)} />
            <button onClick={() => this.setState({editing: !this.state.editing})}>EDIT TASK</button>
            <button onClick={(e) => this.props.removeTask(id, e)}>DELETE TASK</button>
          </span>
          { this.state.editing && this.renderEditForm() }
      </li>
    )
  }
}

const mapDispatchToProps = { toggleStatus, removeTask }

export default connect(null, mapDispatchToProps)(Task)
