import ApiClient from '../../api/client'
export const TOGGLE_STATUS = 'TOGGLE_STATUS'

const api = new ApiClient()

export default (task) => {
  return dispatch => {
    const editTask = () => {
      const date = Date.now();
      return { ...task,
        finish: !task.finish,
        timedone: task.finish ? null : new Date(date)
      }
    }
    api.patch(`/tasks?id=eq.${task.id}`, editTask())
      .then(res => {
        dispatch({
          type: TOGGLE_STATUS,
          payload: task.id
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}
