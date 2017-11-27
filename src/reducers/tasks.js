import {
  TOGGLE_STATUS,
  CREATE_TASK,
  FETCHED_TASKS
} from '../actions/tasks'


export default (currentState = [], { type, payload } = {}) => {
  switch(type) {
    case  FETCHED_TASKS:
    case  CREATE_TASK:
      return [ ...payload ]

    case TOGGLE_STATUS :
      return currentState.map((task) => {
        if (task._id === payload) {
          return { ...task, finish: !task.finish }
        }

        return task
      })

    default :
      return currentState
  }
}
