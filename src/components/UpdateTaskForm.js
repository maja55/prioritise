import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import  updateTask from '../actions/tasks/update'

class UpdateTaskForm extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  constructor(props){
    super(props);
    this.state = this.props.tasks.find((task) => task.id === this.props.id);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const updatedTask = { ...this.state }
    this.props.updateTask(updatedTask);
  }

  handleChange = (event) => {
    const target = event.target.name;
    const num = parseInt(event.target.value, 10);

    target === 'tasks' && this.setState({tasks: event.target.value});
    target === 'important' && this.setState({important: num});
    target === 'urgent' && this.setState({urgent: num});
    target === 'impact' && this.setState({impact: num});
  }

  render() {
    return (
      <form
        onSubmit={ this.handleSubmit }
        className="form--create-task">
        <input
          reguired="true"
          name="tasks"
          type="text"
          placeholder="What needs to be done..."
          value={ this.state.tasks ? this.state.tasks : '' }
          onChange={ this.handleChange.bind(this) }/>
        <input
          name="important"
          type="number"
          placeholder="importance 1-5"
          value={ this.state.important ? this.state.important : '' }
          onChange={ this.handleChange.bind(this) } />
        <input
          name="urgent"
          type="number"
          placeholder="urgency 1-5"
          value={ this.state.urgent ? this.state.urgent : '' }
          onChange={ this.handleChange.bind(this) } />
        <input
          name="impact"
          type="number"
          placeholder="energy 1-5"
          value={ this.state.impact ? this.state.impact : '' }
          onChange={ this.handleChange.bind(this) } />
        <button>Save changes</button>
      </form>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks })

export default connect(mapStateToProps, { updateTask })(UpdateTaskForm)
