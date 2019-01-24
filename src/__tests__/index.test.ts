import Store, { createStore, Effect } from '../index'

describe('s-is-for-store', () => {

  interface TestState {
    message: string,
    count: number,
  }

  const initialState = {
    message: 'hello',
    count: 0,
  }

  // test effects
  const increment = (state: TestState , by: number) => ({
    count: state.count + by
  })

  const incrementPromiseBased = (state: TestState, by: number) => new Promise((resolve) => {
    resolve({ count: state.count + by })
  })

  const setMessage = (state: TestState, message: string) => ({
    message: message
  })

  let testStore = createStore<TestState>(initialState)

  beforeEach(() => {
    testStore = createStore<TestState>(initialState)
  })

  it('Should create a store instance with the correct initial state.', () => {
    expect(testStore).toBeDefined()
    expect(testStore).toBeInstanceOf(Store)
    expect(testStore.getState()).toEqual(initialState)
  })

  it('Should run effect functions.', async () => {
    const { run , getState } = testStore

    await run(increment, 2)
    expect(getState().count).toEqual(2)
    await run(increment, 5)
    expect(getState().count).toEqual(7)
    await run(incrementPromiseBased, 7) // make sure runEffect resolves promises correctly
    expect(getState().count).toEqual(14)

    expect(getState().message).toEqual('hello') // make sure the runEffect function handles partials correctly
  })

  it('Should handle subscribers correctly.', async () => {
    const { run } = testStore
    const mockSubscriber1 = jest.fn()
    const mockSubscriber2 = jest.fn()

    const testMessage1 = 'Turtles do not like peanut butter.'
    const testMessage2 = 'Unicorns do not like ice cream.'
    const testMessage3 = 'Cats do not like humans.'

    const unsubcriber1 = testStore.subscribe(mockSubscriber1)
    await run(setMessage, testMessage1)

    expect(mockSubscriber1).toHaveBeenCalledTimes(1)
    expect(mockSubscriber1).toBeCalledWith({ count: 0, message: testMessage1 })

    const unsibscribe2 = testStore.subscribe(mockSubscriber2)
    await run(setMessage, testMessage2)

    expect(mockSubscriber1).toHaveBeenCalledTimes(2)
    expect(mockSubscriber2).toHaveBeenCalledTimes(1)

    expect(mockSubscriber1).toBeCalledWith({ count: 0, message: testMessage2 })
    expect(mockSubscriber2).toBeCalledWith({ count: 0, message: testMessage2 })

    unsubcriber1()

    await run(setMessage, testMessage3)

    expect(mockSubscriber1).toHaveBeenCalledTimes(2)
    expect(mockSubscriber2).toHaveBeenCalledTimes(2)

    expect(mockSubscriber2).toBeCalledWith({ count: 0, message: testMessage3 })
  })
})
