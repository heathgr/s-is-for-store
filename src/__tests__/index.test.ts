import Store, { createStore, Resolver } from '../index'

describe('s-is-for-store', () => {

  interface TestState {
    message: string,
    count: number,
  }

  const initialState = {
    message: 'hello',
    count: 0,
  }

  // test resolvers
  const increment = (getState: () => TestState , by: number) => {
    const state = getState()

    return {
      ...state,
      count: state.count + by,
    }
  }

  const incrementPromiseBased = (getState: () => TestState, by: number) => new Promise<TestState>((resolve) => {
    const state = getState()

    resolve({
      ...state,
      count: state.count + by,
    })
  })

  const setMessage = (getState: () => TestState, message: string) => ({
    ...getState(),
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

  it('Should state resolvers.', async () => {
    const { run , getState } = testStore

    await run(increment, 2)
    expect(getState().count).toEqual(2)
    await run(increment, 5)
    expect(getState().count).toEqual(7)
    await run(incrementPromiseBased, 7) // make sure the resolver runner resolves promises correctly
    expect(getState().count).toEqual(14)
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
