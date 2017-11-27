import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createTask from '../actions/tasks/create'

class NewTaskForm extends PureComponent {
  render() {
    return (
      <form onSubmit={ this.props.createTask }>
        <input id="task" placeholder="What needs to be done..." />
        <input id="importance" placeholder="importance 1-5" />
        <input id="urgency" placeholder="urgency 1-5" />
        <input id="energy" placeholder="energy 1-5" />
        <button>Add to backlog</button>
      </form>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({
  hide: tasks.length > 0
})

export default connect(mapStateToProps, { createTask })(NewTaskForm)
