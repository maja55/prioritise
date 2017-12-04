import ApiClient from '../../api/client'
export const UPDATE_TASK = 'UPDATE_TASK'

const api = new ApiClient()

export default (updatedTask) => {
  return dispatch => {
    api.patch(`/tasks?id=eq.${updatedTask.id}`, updatedTask)
      .then(res => {
        dispatch({
          type: UPDATE_TASK,
          payload: updatedTask
        })
        alert('Changes saved')
      })
      .catch(err => {
        console.error(err)
      })
  }
}
