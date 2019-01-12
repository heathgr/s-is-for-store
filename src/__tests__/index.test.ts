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
})
