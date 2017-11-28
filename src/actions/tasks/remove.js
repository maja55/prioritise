import ApiClient from '../../api/client'
export const REMOVE_TASK = 'REMOVE_TASK'

const api = new ApiClient()

export default (taskId) => {
  return dispatch => {
    api.delete(`/tasks?id=eq.${taskId}`)
      .then(res => {
        dispatch({ type: REMOVE_TASK, payload: taskId })
      })
      .catch(err => {
        console.error(err)
      })
  }
}
