# S is for Store

![Build Status](https://github.com/heathgr/s-is-for-store/workflows/build/badge.svg)

S is for Store is a state container for JavaScript applications. It offers straightforward state management with the following features:

- Simple architecture.  Setup projects without having to rely on a large amount of boilerplate.
- TypeScript support is available out of the box.

# Installation

Install via npm:

``` shell
npm install s-is-for-store
```

Or via yarn:

``` shell
yarn add s-is-for-store
```

# Basic Example

> Note: The code for this example is written in TypeScript.  However, S is for Store works just fine with vanilla JavaScript.  If you aren't using TypeScript, a JavaScript example is available in this package's repository at `examples/basic-implementation.js`.

``` ts
import { createStore } from 's-is-for-store'

// define the store interface
interface State { message: string, count: number }

// create the store
const store = createStore<State>({ message: '', count: 0 })

// expose the update function
const { current, update } = store

// define the update functions
const setMessage = (message: string) => update({ message })
const incrementCount = (by: number) => {
  const state = current()

  return update({ count: state.count + by })
}

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

# Core Concepts

When using S is for Store you'll most likely be doing one of the following:

1. Creating a store.
2. Updating a store.
3. Handeling changes to a store.

## Creating a Store

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

##  Updating a Store

Updating state is done with the update function. The update function is passed an object that contains the fragments of state that will be updated.

In the above example calls to update are wrapped in update functions:

``` ts
// define the update functions
const setMessage = (message: string) => update({ message })
const incrementCount = (by: number) => {
  const state = current()

  return update({ count: state.count + by })
}
```

It isn't neccessary to follow this pattern.  However following it can be useful in situations where additional logic is needed to set the state.  An example of this is the incrementCount function which updates the count based on the value of the previous state.

## Handeling changes to a store.

Whenever the state updates, any listener functions that are subscribed to the store get called with the new state.

In the original code example, the listener function simply logs the new state to the console:

``` ts
const listener = (state: State) => console.log(state)
```

For this listener function to get called, it needs to be subscribed to the store:

``` ts
store.subscribe(listener)
```

### Unsubscribing

There are cases where a listener may need to unsubscribe from a store.  When the subscribe function gets called, it returns an unsubscribe function:

``` ts
const unsubscribe = store.subscribe(listener)
```

Calling the unsubscribe function will unsubscribe the listener.  It will no longer get called when the state updates.

``` ts
unsubscribe()
// lister is no longer subscribed
```

## Using With React

There is a React hook that's available for S is for Store.  It can be installed via npm:

``` shell
npm install @s-is-for-store/react
```

Or via yarn:

``` shell
yarn add @s-is-for-store/react
```

Using the hook is very straightforward:

``` ts
import React from 'react'
import exampleStore from './wherever/your/store/is/defined/'
import { useStore } from '@s-is-for-store/react'

const ExampleComponent: React.FC = () => {
  const store = useStore(exampleStore)

  return <div>
    <h1>This component uses the s is for store hook and will rerender whenever the store is updated.</h1>
    <p>{store.someValueToDisplay}</p>
  </div>
}
```