import React from 'react'
import Backlog from './components/Backlog'
import Loading from './components/Loading'
import BacklogChart from './components/BacklogChart'

class App extends React.Component {
  render() {
    return (
      <div>
        <Loading />
        <BacklogChart />
        <Backlog />
      </div>
    )
  }
}

export default App
