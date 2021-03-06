import React, { PureComponent } from 'react'
import { fetchTasks } from '../actions/tasks'
import { connect } from 'react-redux'
import Title from '../components/Title'
import NewTaskForm from './NewTaskForm'
import Task from './Task'

export class Backlog extends PureComponent {
  componentWillMount() {
    this.props.fetchTasks()
  }

  renderTasks(task, index) {
    return (
      <Task key={index} {...task} />
    )
  }

  render() {
    return(
      <div className="home">
        <header>
          <Title content="Navbar and stuff" />
        </header>

        <main>
          <NewTaskForm />
          <ol className="backlog">
            { this.props.tasks.map(this.renderTasks) }
          </ol>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ tasks }) => ({ tasks })
const mapDispatchToProps = { fetchTasks }

export default connect(mapStateToProps, mapDispatchToProps)(Backlog)
