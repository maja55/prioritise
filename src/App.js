import React from 'react'
import { fetchTasks } from './actions/tasks'
import { connect } from 'react-redux'
import Backlog from './components/Backlog'
// import Loading from './components/Loading'
import BacklogChart from './components/BacklogChart'

class App extends React.Component {
  componentWillMount() {
    this.props.fetchTasks()
  }

  render() {
    return (
      <div>
        {/* <Loading /> */}
        <BacklogChart />
        <Backlog />
      </div>
    )
  }
}

const mapDispatchToProps = { fetchTasks }

export default connect (null, mapDispatchToProps)(App)
