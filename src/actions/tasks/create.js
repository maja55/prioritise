import ApiClient from '../../api/client'
export const CREATE_TASK = 'CREATE_TASK'

const api = new ApiClient()

export default (task) => {
  return dispatch => {
    api.post('/tasks', task)
      .then(res => {
        api.get(`/tasks`)
          .then (res =>
            dispatch({
              type: CREATE_TASK,
              payload: res.body
            })
          )
          alert('New task succesfully created')
      })
      .catch(err => {
        alert('Please check your input and try to submit again')
        console.error(err)
      })
  }
}
