import loading from '../loading'
import loadError from '../loadError'
export const FETCHED_TASKS = 'FETCHED_TASKS'

const endpoint = "http://ec2-52-31-99-183.eu-west-1.compute.amazonaws.com:3000/tasks"

export default () => {
  return dispatch => {
    dispatch(loading(true))

    fetch(endpoint)
      .then(res => {
        dispatch(loading(false))
        dispatch({ type: FETCHED_TASKS, payload: res })
        console.log(res.json())
      })
      .catch(err => {
        dispatch(loading(false))
        dispatch(loadError(err))
      })
  }
}
