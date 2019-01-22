import Store, { createStore } from '../index'

describe('s-is-for-store', () => {
  it('Should create a store instance with the correct initial state.', () => {
    const testState = { testState: true }
    const testStore = createStore(testState)

    expect(testStore).toBeDefined()
    expect(testStore).toBeInstanceOf(Store)
    expect(testStore.getState()).toEqual(testState)
  })

  it('Should update state correctly.', () => {
    const testState = {
      value1: 23,
      value2: 'hello',
      value3: false,
    }
    const testStore = createStore(testState)

    // make sure store was initialized correctly
    expect(testStore.getState()).toEqual(testState)

    // make sure state can be set correctly
    const expectedState1 = {
      value1: 23,
      value2: 'good bye',
      value3: false,
    }

    testStore.setState({ value2: 'good bye' })

    expect(testStore.getState()).toEqual(expectedState1)

    const expectedState2 = {
      value1: -8,
      value2: 'good bye',
      value3: true,
    }

    testStore.setState({ value1: -8, value3: true })

    expect(testStore.getState()).toEqual(expectedState2)
  })

  it('Should handle subscribers correctly.', () => {
    const testState = { someVal: true }
    const testStore = createStore(testState)
    const mockSubscriber1 = jest.fn()
    const mockSubscriber2 = jest.fn()

    const unsubcriber1 = testStore.subscribe(mockSubscriber1)
    testStore.setState({ someVal: false })

    expect(mockSubscriber1).toHaveBeenCalledTimes(1)
    expect(mockSubscriber1).toBeCalledWith({ someVal: false })

    const unsibscribe2 = testStore.subscribe(mockSubscriber2)
    testStore.setState({ someVal: true })

    expect(mockSubscriber1).toHaveBeenCalledTimes(2)
    expect(mockSubscriber2).toHaveBeenCalledTimes(1)

    expect(mockSubscriber1).toBeCalledWith({ someVal: true })
    expect(mockSubscriber2).toBeCalledWith({ someVal: true })

    unsubcriber1()

    testStore.setState({ someVal: false })

    expect(mockSubscriber1).toHaveBeenCalledTimes(2)
    expect(mockSubscriber2).toHaveBeenCalledTimes(2)

    expect(mockSubscriber2).toBeCalledWith({ someVal: false })
  })

  it('Should run side effects.', async () => {
    interface TestState {
      count: number,
      message: string,
    }

    const testState = {
      count: 0,
      message: 'hello',
    }

    const increment = (state: TestState, amount: number) => ({ count: state.count + amount })
    // promise based increment function
    const incrementP = (state: TestState, amount: number ) => new Promise((resolve) => {
      resolve({ count: state.count + amount })
    })
    const store = createStore(testState)
    const { getState, runEffect } = store

    await runEffect(increment, 2)
    expect(getState().count).toEqual(2)
    await runEffect(increment, 5)
    expect(getState().count).toEqual(7)
    await runEffect(increment, 7)
    expect(getState().count).toEqual(14)

    expect(getState().message).toEqual('hello') // make sure the runEffect function handles partials correctly
  })
})
