export type Subscriber<T> = (state: T) => any
export type Unsubscriber = () => void

// TODO revisit the Resolver type and make sure this is the best way to handle the spread operator on function arguments
export type Resolver<T, A extends any[] = any> = (getState: () => T, ...args: A) => T | Promise<T>

/**
 * A class for a simple no frills state container.
 */
class Store<T> {
  private state: T
  private subscribers: Subscriber<T>[] = []

  /**
   * Initializes a new store instance.
   * @param initialState The store's initial state.
   */
  constructor (initialState: T) {
    this.state = initialState
  }

  /**
   * Returns the current state.
   */
  public getState = (): T => this.state

  /**
   * Runs a resolver function.
   * @param resolver A state resolver function.  A function that takes the getState function as an argument.  It returns mutated state or a promise that will resolve mutated state.
   * @returns The new state
   */
  public run = async <A extends any[] = any>(resolver: Resolver<T, A>, ...args: A) => {
    const state = this.getState()
    const newState: T = await resolver(this.getState, ...args)

    // update the state
    this.state = {
      ...this.state,
      ...newState,
    }

    // call the subscribers
    await Promise.all(this.subscribers.map(subscriber => subscriber(this.state)))

    return this.state
  }

  /**
   * Adds an update handler, a function that gets called when the state updates.
   * An unsubscribe function gets returned.
   */
  public subscribe = (subscriber: Subscriber<T>): Unsubscriber => {
    this.subscribers.push(subscriber)

    // return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(item => item !== subscriber)
    }
  }
}

/**
 * Returns a new store object.  A convenience function that is the equivalent to `new Store<T>(initialState)`.
 * @param initialState The store's initial state.
 */
export const createStore = <T>(initialState: T) => new Store(initialState)

export default Store
