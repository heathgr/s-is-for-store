import Store, { createStore } from '../index'

describe('s-is-for-store', () => {

  interface TestState {
    message: string,
    count: number,
  }

  const initialState = {
    message: 'hello',
    count: 0,
  }

  let testStore = createStore<TestState>(initialState)

  // test state resolvers
  // these will be recrated before each test
  let increment: (by: number) => Promise<TestState>
  let incrementPromiseBased:  (by: number) => Promise<TestState>
  let setMessage:   (message: string) => Promise<TestState>

  beforeEach(() => {
    testStore = createStore<TestState>(initialState)

    const { resolveState } = testStore

    increment = (by: number) => resolveState((getState) => {
      const state = getState()

      return {
        ...state,
        count: state.count + by,
      }
    })

    incrementPromiseBased = (by: number) => resolveState((getState) => {
      const state = getState()

      return new Promise((resolve) => {
        resolve({
          ...state,
          count: state.count + by
        })
      })
    })

    setMessage = (message: string) => resolveState((getState) => ({
      ...getState(),
      message,
    }))
  })

  it('Should create a store instance with the correct initial state.', () => {
    expect(testStore).toBeDefined()
    expect(testStore).toBeInstanceOf(Store)
    expect(testStore.getState()).toEqual(initialState)
  })

  it('Should resolve state.', async () => {
    const { getState } = testStore

    await increment(2)
    expect(getState().count).toEqual(2)
    await increment(5)
    expect(getState().count).toEqual(7)
    await incrementPromiseBased(7) // make sure the resolver runner resolves promises correctly
    expect(getState().count).toEqual(14)
  })

  it('Should handle subscribers correctly.', async () => {
    const mockSubscriber1 = jest.fn()
    const mockSubscriber2 = jest.fn()

    const testMessage1 = 'Turtles do not like peanut butter.'
    const testMessage2 = 'Unicorns do not like ice cream.'
    const testMessage3 = 'Cats do not like humans.'

    const unsubscriber_1 = testStore.subscribe(mockSubscriber1)
    await setMessage(testMessage1)

    expect(mockSubscriber1).toHaveBeenCalledTimes(1)
    expect(mockSubscriber1).toBeCalledWith({ count: 0, message: testMessage1 })

    const unsubscriber_2 = testStore.subscribe(mockSubscriber2)
    await setMessage(testMessage2)

    expect(mockSubscriber1).toHaveBeenCalledTimes(2)
    expect(mockSubscriber2).toHaveBeenCalledTimes(1)

    expect(mockSubscriber1).toBeCalledWith({ count: 0, message: testMessage2 })
    expect(mockSubscriber2).toBeCalledWith({ count: 0, message: testMessage2 })

    unsubscriber_1()

    await setMessage(testMessage3)

    expect(mockSubscriber1).toHaveBeenCalledTimes(2)
    expect(mockSubscriber2).toHaveBeenCalledTimes(2)

    expect(mockSubscriber2).toBeCalledWith({ count: 0, message: testMessage3 })

    unsubscriber_2()

    await setMessage('Developers do not like AngularJS')

    expect(mockSubscriber1).toHaveBeenCalledTimes(2)
    expect(mockSubscriber2).toHaveBeenCalledTimes(2)
  })
})
