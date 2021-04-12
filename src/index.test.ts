import Store, { createStore } from './index'

describe('s-is-for-store', () => {

  interface TestState {
    message: string,
    count: number,
    extra?: boolean,
  }

  const testState: TestState = {
    message: 'hello world',
    count: 0,
  }

  const testStateExtra: TestState = {
    message: ':)',
    count: 55,
    extra: true,
  }

  it('Should have a createStore function for creating a new store.', () => {
    const subject = createStore(testState)

    expect(subject).toBeInstanceOf(Store)
  })

  it('Should have a current function that returns the current state.', () => {
    const subject = createStore<TestState>(testState)

    expect(subject.current()).toEqual(testState)
  })

  it('Should have an update function that updates the specified state.', () => {

    const subject = createStore<TestState>(testState)

    subject.update({ message: 'hello universe' })
    expect(subject.current()).toEqual({ count: 0, message: 'hello universe' })

    subject.update({count: 10})
    expect(subject.current()).toEqual({ count: 10, message: 'hello universe' })
  })

  it('Should have a replace function that replaces the entire state.', () => {

    const subject = createStore<TestState>(testStateExtra)

    subject.replace({ message: 'hello universe', count: -10 })
    expect(subject.current()).toEqual({ count: -10, message: 'hello universe' })
  })

  it('Should call listeners when the state has changed.', () => {
    const subject = jest.fn()
    const listener = (state: TestState) => {
      subject(state)
    }
    const store = createStore(testState)
    
    store.subscribe(listener)
    expect(subject).toHaveBeenCalledTimes(0)

    store.update({ message: 'Good Bye!'})

    expect(subject).toHaveBeenCalledWith({ message: 'Good Bye!', count: 0 })
    expect(subject).toHaveBeenCalledTimes(1)
  })

  it('Should be able to immediately call a listener when it has subscribed.', () => {
    const subject = jest.fn()
    const listener = (state: TestState) => {
      subject(state)
    }
    const store = createStore(testState)
    
    store.subscribe(listener, true)
    expect(subject).toHaveBeenCalledWith(testState)
    expect(subject).toHaveBeenCalledTimes(1)
  })

  it('Returns a function used to unsubscribe a listener when subscribe is called.', () => {
    const subject = jest.fn()
    const listener = (state: TestState) => {
      subject(state)
    }
    const store = createStore(testState)
    
    const unsubscribe = store.subscribe(listener)

    expect(subject).toHaveBeenCalledTimes(0)

    store.update({ message: 'Good Bye!'})
    expect(subject).toHaveBeenCalledWith({ message: 'Good Bye!', count: 0 })
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
