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
    const estimate = parseInt(event.target.value, 10);

    property === 'tasks' && this.setState({tasks: event.target.value});
    property === 'important' && this.setState({important: estimate});
    property === 'urgent' && this.setState({urgent: estimate});
    property === 'impact' && this.setState({impact: estimate});
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
          onChange={ this.handleChange.bind(this) }/>
        <input
          name="important"
          type="number"
          placeholder="importance 1-5"
          onChange={ this.handleChange.bind(this) } />
        <input
          name="urgent"
          type="number"
          placeholder="urgency 1-5"
          onChange={ this.handleChange.bind(this) } />
        <input
          name="impact"
          type="number"
          placeholder="energy 1-5"
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
