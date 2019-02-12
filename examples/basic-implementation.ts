import { createStore } from '../src/index'

/**
 * This defines the state's interface.
 * This isn't necessary if you aren't using TypeScript.
 * But if you are using TypeScript s-is-for-store offers type support out of the box.
 */
interface State { message: string, count: number }

/**
 * This creates a new store.  The store's initial state is { message: '', count: 0 }
 */
const store = createStore<State>({ message: '', count: 0 })

/**
 * This exposes the store's update function.
 * The update function is used to update the store's state.
 * The update function is passed a callback that returns the properties and values that will be updated.
 * For example: `update((getState) => ({ message: ':)'}))` would update the state
 * to the following `{ message: ':)', count: 0 }`
 */
const { update } = store

/**
 * The setMessage function wraps the update function.
 * Calling `setMessage`, would update the state's message property.
 */
const setMessage = (message: string) => update(() => ({ message }))

/**
 * When update is passed a callback, that callback gets passed a getState function.
 * This is important in situations where you need to know the current state before you update it.
 * The `incrementCount` function increments the state's count property by the specified amount.
 */
const incrementCount = (by: number) => update((getState) => {
  const { count } = getState()

  return {
    count: count + by,
  }
})

/**
 * The subscriber function gets passed the current state.
 * That state is then outputted to the console.
 */
const subscriber = (state: State) => console.log(state)

/**
 * The subscriber function is now subscribed to the store.
 */
store.subscribe(subscriber)

setMessage('Hello World.')
// Outputs { message: 'Hello World', count: 0 }

setMessage('Hello Again.')
// Outputs { message: 'Hello Again', count: 0 }

incrementCount(4)
// Outputs { message: 'Hello Again', count: 4 }

incrementCount(2)
// Outputs { message: 'Hello Again', count: 6 }
