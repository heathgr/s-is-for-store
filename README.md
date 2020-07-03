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

> Note: The code for this example is written in TypeScript.  However, S is for Store works just fine with plain JavaScript.  If you aren't using TypeScript, a JavaScript example is available in this package's repository at `examples/basic-implementation.js`.

``` ts
import { createStore } from 's-is-for-store'

// define the store interface
interface State { message: string, count: number }

// create the store
const store = createStore<State>({ message: '', count: 0 })

// expose the update  and current functions
const { current, update } = store

// define the updater functions
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

When using S is for Store you'll be performing one of the following operations:

- Creating a store.
- Updating a store.
- Subscribing to a store.
- Unsubscribing from a store.

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

Updating state is accomplished by calling the store's update function. The update function is passed an object that contains the properties of state that will be updated.

In the above example calls to update are wrapped in an updater functions:

``` ts
// define the update functions
const setMessage = (message: string) => update({ message })
const incrementCount = (by: number) => {
  const state = current()

  return update({ count: state.count + by })
}
```

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

When the subscribe function gets called, it returns an unsubscribe function:

``` ts
const unsubscribe = store.subscribe(listener)
```

Calling the unsubscribe function will unsubscribe the listener.  It will no longer get called when the state updates.

``` ts
unsubscribe()
// lister is no longer subscribed
```

Calling the store's unsubscribeAll function will unsubscribe all listeners.

## Usage With React

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

## More resources

A simple example app is available at [https://github.com/heathgr/s-is-for-store-example.git](https://github.com/heathgr/s-is-for-store-example.git).  It deomonstrates how an S is for Store app can be used with React and tested.