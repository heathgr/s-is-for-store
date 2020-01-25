import { createStore } from 's-is-for-store'

// create the store
const store = createStore({ message: '', count: 0 })

// expose the update function
const { current, update } = store

// define the update functions
const setMessage = (message) => update({ message })
const incrementCount = (by) => {
  const state = current()

  return update({ count: state.count + by })
}

// create a listener
const listener = (state) => console.log(state)

// subscribe to the store
store.subscribe(listener)

// run the update functions

setMessage('Hello World.')
// Outputs { message: 'Hello World', count: 0 }

setMessage('Hello Again.')
// Outputs { message: 'Hello Again', count: 0 }

incrementCount(4)
// Outputs { message: 'Hello Again', count: 4 }

incrementCount(2)
// Outputs { message: 'Hello Again', count: 6 }

