import React, { Component } from 'react'
import { connect } from 'react-redux'
import createTask from '../actions/tasks/create'

class NewTaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: '',
      important: 0,
      urgent: 0,
      impact: 0
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const date = Date.now();
    const newTask = { ...this.state,
      finish: false,
      date: new Date(date)
    }
    this.props.createTask(newTask);
  }

  handleChange = (event) => {
    const property = event.target.name;
    property === 'tasks' && this.setState({tasks: event.target.value});
    property === 'important' && this.setState({important: event.target.value});
    property === 'urgent' && this.setState({urgent: event.target.value});
    property === 'impact' && this.setState({impact: event.target.value});
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
          value={ this.state.tasks }
          onChange={ this.handleChange.bind(this) }/>
        <input
          name="important"
          type="number"
          placeholder="importance 1-5"
          value={ this.state.important }
          onChange={ this.handleChange.bind(this) } />
        <input
          name="urgent"
          type="number"
          placeholder="urgency 1-5"
          value={ this.state.urgent }
          onChange={ this.handleChange.bind(this) } />
        <input
          name="impact"
          type="number"
          placeholder="energy 1-5"
          value={ this.state.impact }
          onChange={ this.handleChange.bind(this) } />
        <button>Add to backlog</button>
      </form>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({
  hide: tasks.length > 0
})

export default connect(mapStateToProps, { createTask })(NewTaskForm)
