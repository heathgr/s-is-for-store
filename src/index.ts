export type Subscriber<T> = (state: T) => any
export type Unsubscriber = () => void

export type GetState<T> = () => T
export type StateResolverCallback<T> = (getState: GetState<T>) => Partial<T> | Partial<Promise<T>>
/**
 * A class an S is Store state container.
 */
export class Store<T> {
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
  public current = () => this.state

  /**
   * Updates the state with the provided values.
   * @param newState The new state values.
   * @returns The updated state.
   */
  public update = (newState: Partial<T>) => {
    // update the state
    this.state = {
      ...this.state,
      ...newState,
    }

    // call the subscribers
    this.subscribers.map(subscriber => subscriber(this.state))

    return this.state
  }

  /**
   * Adds a listener function that gets called whenever the state updates.
   * @param subscriber The listener function.
   * @param invokeOnSubscribe If set to true, the listener function will immediatley be called once it has been subscribed.  The default is false.
   * @returns An unsubscribe function that will unsubscribe the listener when called.
   */
  public subscribe = (subscriber: Subscriber<T>, invokeOnSubscribe: boolean = false): Unsubscriber => {
    this.subscribers.push(subscriber)

    if (invokeOnSubscribe) {
      subscriber(this.state)
    }

    // return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(item => item !== subscriber)
    }
  }

  /**
   * Will unsubscribes all listener functions.
   */
  public unsubscribeAll = (): void => {
    this.subscribers = []
  }
}

/**
 * Returns a new store object.  A convenience function that is the equivalent to `new Store<T>(initialState)`.
 * @param initialState The store's initial state.
 */
export const createStore = <T>(initialState: T) => new Store(initialState)

export default Store
