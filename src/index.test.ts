import Store, { createStore } from './index'

describe('s-is-for-store', () => {

  interface TestState {
    message: string,
    count: number,
  }

  it('Should have a createStore function for creating a new store.', () => {
    const subject = createStore<{ message: String }>({ message: 'Test store!!' })

    expect(subject).toBeInstanceOf(Store)
  })

  it('Should have a current function that returns the current state.', () => {
    interface TestState {
      count: number
      message: string
    }

    const testState: TestState = {
      count: 5,
      message: 'Just a test!!!'
    }

    const subject = createStore<TestState>(testState)

    expect(subject.current()).toEqual(testState)
  })

  it('Should have an update function that updates the specified state.', () => {
    interface TestState {
      a: number
      b: string
      c: number
    }

    const subject = createStore<TestState>({ a: 2, b: ':(', c: 12 })

    subject.update({ a: 7 })
    expect(subject.current()).toEqual({ a: 7, b: ':(', c: 12})

    subject.update({b: ':)'})
    expect(subject.current()).toEqual({ a: 7, b: ':)', c: 12})
  })

  it('Should call listeners when the state has changed.', () => {
    interface TestState {
      message: string
    }

    const subject = jest.fn()
    const listener = (state: TestState) => {
      subject(state)
    }
    const store = createStore<TestState>({ message: 'Hello!'})
    
    store.subscribe(listener)
    expect(subject).toHaveBeenCalledTimes(0)

    store.update({ message: 'Good Bye!'})
    expect(subject).toHaveBeenCalledWith({ message: 'Good Bye!'})
    expect(subject).toHaveBeenCalledTimes(1)
  })

  it('Should be able to immediately call a listener when it has subscribed.', () => {
    interface TestState {
      message: string
    }

    const subject = jest.fn()
    const listener = (state: TestState) => {
      subject(state)
    }
    const store = createStore<TestState>({ message: 'Hello!'})
    
    store.subscribe(listener, true)
    expect(subject).toHaveBeenCalledWith({ message: 'Hello!'})
    expect(subject).toHaveBeenCalledTimes(1)
  })

  it('Returns a function used to unsubscribe a listener when subscribe is called.', () => {
    interface TestState {
      message: string
    }

    const subject = jest.fn()
    const listener = (state: TestState) => {
      subject(state)
    }
    const store = createStore<TestState>({ message: 'Hello!'})
    
    const unsubscribe = store.subscribe(listener)
    expect(subject).toHaveBeenCalledTimes(0)

    store.update({ message: 'Good Bye!'})
    expect(subject).toHaveBeenCalledWith({ message: 'Good Bye!'})
    expect(subject).toHaveBeenCalledTimes(1)

    unsubscribe()

    store.update({ message: 'Hello Again!'})
    expect(subject).toHaveBeenCalledTimes(1)
  })

  it('Unsubscribes all listeners when unsubscribe all is called.', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()

    const store = createStore<TestState>({
      message: "hello",
      count: 0,
    })

    store.subscribe(listener1)
    store.subscribe(listener2)

    store.update({ count: 1 })

    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)

    store.unsubscribeAll()

    store.update({ count: 2 })

    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)
  })
})
