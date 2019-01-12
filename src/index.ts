/**
 * When the state gets updated, the subscriber functions get called.
 * The new state is called as a parameter.
 */
export type Subscriber<T> = (state: T) => any
export type Unsubscriber = () => void

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
   * Updates the state based on the object passed to this function.
   * @param newState An object containing the keys and values of the state that will be updated.
   */
  public setState = (newState: Partial<T>) => {
    this.state = {
      ...this.state,
      ...newState,
    }
    this.subscribers.forEach(callback => callback(this.state))
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
 * Returns a new store object.  A convienience function that is the equivalent to `new Store<T>(initialState)`.
 * @param initialState The store's initial state.
 */
export const createStore = <T>(initialState: T) => new Store(initialState)

export default Store
