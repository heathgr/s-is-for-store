# S is for Store

A no frills state container written in TypeScript.

[![CircleCI](https://circleci.com/gh/heathgr/s-is-for-store.svg?style=svg)](https://circleci.com/gh/heathgr/s-is-for-store)

## Installation

Install via npm:

``` shell
npm install s-is-for-store
```

Or via yarn:

``` shell
yarn add s-is-for-store
```

## Usage

``` ts
import { createStore } from 's-is-for-store'

// Define an interface for the state.
interface State {
  messageOne: string,
  messageTwo: string,
}

// The initial state object.
const initialState: State = {
  messageOne: 'Hello',
  messageTwo: ':(',
}

// Create a new store with the initial state object.
const store = createStore<State>(initialState)

// This function will be called when the state updates.
const updateHandler = (state: State) => {
  const { messageOne, messageTwo } = state

  console.log(`Value for message one: ${messageOne}`)
  console.log(`Value for message two: ${messageTwo}`)
}

// Register updateHandler with the store.
// store.subscribe returns an unsubscribe function.
const unsubscribe = store.subscribe(updateHandler)

// Updates the value for the state's `messageOne` key.
store.setState({
  messageOne: 'Hello World!'
})

/*
Because the state has updated, the folowing is outputted:

Value for message one: Hello World!
Value for message two: :(
*/

// Updates the values for both the `messageOne` and 'messageTwo' keys.
store.setState({
  messageOne: 'Good Bye World!',
  messageTwo: ':)'
})

/*
Because the state has updated, the folowing is outputted:

Value for message one: Good Bye World!
Value for message two: :)
*/

unsubscribe()

// Updates the value for the state's `messageTwo` key.
store.setState({
  messageTwo: 'This message will not be displayed.'
})

/*
No message is displayed.
The unsubscribe function was called.
As a result, updateHandler not longer gets called when the state updates.
*/
```

> Note: This example was written in TypeScript.  However, it would have worked just as well in JavaScript.
