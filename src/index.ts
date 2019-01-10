export type Subscriber<T> = (state: T) => void

class Store<T> {
  private state: T
  private subscribers: Subscriber<T>[] = []

  constructor (initState: T) {
    this.state = initState
  }

  public getState = (): T => this.state
  public setState = (newState: Partial<T>) => {
    this.state = {
      ...this.state,
      ...newState,
    }
    this.subscribers.forEach(callback => callback(this.state))
  }
  public subscribe = (subscriber: Subscriber<T>) => {
    this.subscribers.push(subscriber)

    // return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(item => item !== subscriber)
    }
  }
}

export default Store
