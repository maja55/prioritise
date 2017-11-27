export const TOGGLE_STATUS = 'TOGGLE_STATUS'

export default (taskId) => ({
  type: TOGGLE_STATUS,
  payload: taskId
})
