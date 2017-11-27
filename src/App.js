import React from 'react'
import Backlog from './tasks/Backlog'
import Loading from './components/Loading'

class App extends React.Component {
  render() {
    return (
      <div>
        <Backlog />
        <Loading />
      </div>
    )
  }
}

export default App
