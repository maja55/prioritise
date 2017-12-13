import React from 'react'
import { connect } from 'react-redux'
import NewTaskForm from './NewTaskForm'
import Task from './Task'

export class Backlog extends React.PureComponent {
  renderTasks(task) {
    return (
      <Task { ...task }
      key={ task.id }
      date={ new Date(task.date) }
      timedone={ new Date(task.timedone) } />
    )
  }

  render() {
    return(
      <div className="page">
        {/* <header>
          header
        </header> */}

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

export default connect(mapStateToProps, null)(Backlog)
