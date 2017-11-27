// src/reducers/tasks.test.js

import { expect } from 'chai'
import tasks from './tasks'
import { TOGGLE_STATUS } from '../actions/tasks/toggle'

describe('tasks reducer', () => {
  const reducer = tasks
  const initialState = []

  it.skip('returns an empty array for the initial state', () => {
    expect(reducer()).to.eql(initialState)
  })

  it.skip(TOGGLE_STATUS, () => {
    const eventualState = ['any', 'array', 'will', 'do']

    const seedAction = {
      type: TOGGLE_STATUS,
      payload: eventualState
    }

    expect(reducer(initialState, seedAction)).to.eql(eventualState)
  })

  it.skip('NOT_A_VALID_ACTION_TYPE', () => {
    const initialState = ['any', 'array', 'will', 'do']
    const eventualState = [ ...initialState ]

    const nonValidAction = {
      type: 'NOT_A_VALID_ACTION_TYPE',
      payload: { foo: 'bar' }
    }

    expect(reducer(initialState, nonValidAction)).to.eql(eventualState)
  })
})
