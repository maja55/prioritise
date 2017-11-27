import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StatusButton from '../components/StatusButton'
import toggleStatus from '../actions/tasks/toggle'

class Task extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    urgency: PropTypes.number.isRequired,
    importance: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    isDone: PropTypes.bool
  }

  toggleStatus = () => {
    this.props.toggleStatus(this.props._id);
    this.props.isDone = !this.props.isDone;
  }

  render() {
    const { task, isDone } = this.props

    return(
      <li className="task">
          <span className="task--label">{ task }</span>
          <span className="task--button-group">
            <StatusButton status={ isDone } onClick={this.toggleStatus} />
          </span>
      </li>
    )
  }
}

export default connect(null, { toggleStatus })(Task)
