import { createStore } from '../src/index'

/**
 * The state's interface.
 * This isn't necessary if you aren't using TypeScript.
 * But if you are using TypeScript s-is-for-store offers type support out of the box.
 */
interface State { message: string }

/**
 * This creates a new store.  The store's initial state is { message: '' }
 */
const store = createStore<State>({ message: '' })

/**
 * This is a state resolver.
 * A state resolver is a function that is the state.
 * The resolver will return the new state.
 * A resolver can also return a promise that will resolve the new state.
 */
const setMessage = (getState: () => State, message: string) => ({ ...getState(), message })

/**
 * This is a subscriber.
 * When the state is modified, the subscriber gets called with the new state.
 */
const subscriber = (state: State) => console.log(state)

/**
 * The subscriber function is now subscribed to the store.
 */
store.subscribe(subscriber)

/**
 * A resolver function is a function that takes the getState function as a parameter.
 * The resolver function must return the updated state or a promise that will resolve the updated state.
 * The resolveState method runs a resolver function and sets the returned value as the new state.
 */
store.resolveState((getState) => ({ ...getState(), message: 'Hello World' }))
// Outputs { message: 'Hello World' }

store.resolveState((getState) => ({...getState(), message: 'Hello Again' }))
// Outputs { message: 'Hello Again' }
