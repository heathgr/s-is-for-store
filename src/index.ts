export type Subscriber<T> = (state: T) => any
export type Unsubscriber = () => void

export type GetState<T> = () => T
export type StateResolverCallback<T> = (getState: GetState<T>) => Partial<T> | Partial<Promise<T>>
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
   * @returns The current state.
   */
  public getState = () => this.state

  /**
   * Calls the provided callback with the getState function as a parameter.
   * The state then gets replaced with the value returned by the callback.
   * @returns The updated state.
   */
  public update = async (cb: StateResolverCallback<T>) => {
    const newState = await cb(this.getState)

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
