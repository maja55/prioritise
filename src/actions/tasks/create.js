import ApiClient from '../../api/client'
export const CREATE_TASK = 'CREATE_TASK'

const api = new ApiClient()

export default (task) => {
  console.log(task);
  return dispatch => {

    api.post('/tasks', task)
      .then(res => {
        alert('New task succesfully created');
        dispatch({
          type: CREATE_TASK,
          payload: task
        })
      })
      .catch(err => {
        alert('Please check your input and try to submit again')
        console.error(err)
      })
  }
}
