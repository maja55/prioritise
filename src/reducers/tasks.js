import {
  TOGGLE_STATUS,
  CREATE_TASK,
  FETCHED_TASKS
} from '../actions/tasks'


export default (currentState = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_TASKS:
      return [ ...payload ]
    case  CREATE_TASK:
      return currentState.concat(payload)

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

    default :
      return currentState
  }
}
