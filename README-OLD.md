# S is for Store

[![CircleCI](https://circleci.com/gh/heathgr/s-is-for-store.svg?style=svg)](https://circleci.com/gh/heathgr/s-is-for-store)

S is for Store is a state container for JavaScript applications. It offers straightforward state management with the following features:

- Simple architecture.  Setup projects without having to rely on a large amount of boilerplate.
- Asynchronous operations are easily managed.
- TypeScript support is available out of the box.

## Installation

Install via npm:

``` shell
npm install s-is-for-store
```

Or via yarn:

``` shell
yarn add s-is-for-store
```

## Example

> Note: The code for this example is written in TypeScript.  However, S is for Store works just fine with vanilla JavaScript.  If you aren't using TypeScript, a JavaScript example is available in this package's repository at `examples/basic-implementation.js`.

``` ts
import { createStore } from 's-is-for-store'

// define the store interface
interface State { message: string, count: number }

// create the store
const store = createStore<State>({ message: '', count: 0 })

// expose the update function
const { update } = store

// define the update functions
const setMessage = (message: string) => update(() => ({ message }))
const incrementCount = (by: number) => update((getState) => {
  const { count } = getState()

  return {
    count: count + by,
  }
})

// create a listener
const listener = (state: State) => console.log(state)

// subscribe to the store
store.subscribe(listener)

// run the update functions

setMessage('Hello World.')
// Outputs { message: 'Hello World', count: 0 }

setMessage('Hello Again.')
// Outputs { message: 'Hello Again', count: 0 }

incrementCount(4)
// Outputs { message: 'Hello Again', count: 4 }

incrementCount(2)
// Outputs { message: 'Hello Again', count: 6 }

```

## Core Concepts

There are several concepts that are key to understanding S is for Store:

1. Store creation.
2. Updating state.
3. Responding to state changes.

This documentation will address each of these in more depth.

## Store Creation

First, import  the `createStore` function:

``` ts
import { createStore } from 's-is-for-store'
```

If you are using TypeScript, define the interface for your store.  In the above example that store implements this interface:

``` ts
interface State { message: string, count: number }
```

Create a new store with the `createStore` function.  The createStore function takes the store's initial state as a parameter.

``` ts
const store = createStore<State>({ message: '', count: 0 })
```

The newly created store has three functions getState, update, and subscribe.  Each of these functions will be described in more detail in the following sections.

## Updating State

Updating the store's state is done with the update function. The update function takes an executor function as a parameter.  The executor needs to return one of two things:

1. An object containing the updated state values.
2. A promise that will resolve the updated state values.

For example, the following code would change the state's message property to 'Hello :)':

``` ts
store.update({ message: 'Hello :)' })
```

The executor is passed a getState function.  As the name implies, getState returns the value of the current state.  In the above example, getState is never used.  So, the function could be rewritten as follows:

``` ts
store.update({ message: 'Hello :)' })
```

> Note: The getState function is also available on the store object itself.  So, `store.getState()` is another way retrieve the current state.

In the example code, the update function is always wrapped into a higher order function.  In order to do this, first expose the update function:

``` ts
const { update } = store
```

This makes it easier for another function to call update.  Like in the `incrementCount` function:

``` ts
const incrementCount = (by: number) => update((getState) => {
  const { count } = getState()

  return {
    count: count + by,
  }
})
```

When `incrementCount` gets called, it is passed a number and then returns a call to `update`.  The executor passed to update gets the current count value and increments it by the number passed to `incrementCount`.

Following this pattern makes it easy to write reusable update functions.  These functions can be used wherever needed in your application.

## Responding to State Updates

Whenever the state updates, any listener functions that are subscribed to the store get called with the new state.

In the original code example, the listener function simply logs the new state to the console:

``` ts
const listener = (state: State) => console.log(state)
```

For this listener function to get called, it needs to be subscribed to the store:

``` ts
store.subscribe(listener)
```

There are cases where a listener may need to unsubscribe from a store.  When the subscribe function gets called, it returns an unsubscribe function:

``` ts
const unsubscribe = store.subscribe(listener)
```

Calling the unsubscribe function will unsubscribe the listener.  It will no longer get called when the state updates.

``` ts
unsubscribe()
// lister is no longer subscribed
```
