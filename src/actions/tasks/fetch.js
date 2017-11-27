// src/actions/recipes/fetch
import ApiClient from '../../api/client'
import loading from '../loading'
import loadError from '../loadError'
export const FETCHED_TASKS = 'FETCHED_TASKS'

const api = new ApiClient()

export default () => {
  return dispatch => {
    dispatch(loading(true))

    api.get('/tasks')
      .then(res => {
        dispatch(loading(false))
        dispatch({ type: FETCHED_TASKS, payload: res.body })
      })
      .catch(err => {
        console.error(err)
        dispatch(loading(false))
        dispatch(loadError(err))
      })
  }
}
