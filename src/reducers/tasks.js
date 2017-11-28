import {
  TOGGLE_STATUS,
  CREATE_TASK,
  FETCH_TASKS,
  REMOVE_TASK
} from '../actions/tasks'


export default (currentState = [], { type, payload } = {}) => {
  switch(type) {
    case FETCH_TASKS:
      return [ ...payload ]

    case CREATE_TASK:
      return [ ...payload ]

    case TOGGLE_STATUS :
      let date = Date.now();
      return currentState.map((task) => {
        if (task.id === payload) {
          return { ...task,
            finish: !task.finish,
            timedone: task.finish ? null : new Date(date)
          }
        }
        return task
      })

    case REMOVE_TASK :
      return currentState.filter((task) => task.id !== payload)

    default :
      return currentState
  }
}
