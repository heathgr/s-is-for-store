# S is for Store

[![CircleCI](https://circleci.com/gh/heathgr/s-is-for-store.svg?style=svg)](https://circleci.com/gh/heathgr/s-is-for-store)

S is for Store is a state container for JavaScript applications. It offers straightforward state management with the following features:

- Simple architecture.  Setup projects without having to rely on an oppressive amount of boilerplate.
- Side effects are easily managed.  Make http requests without having to rely on middleware.
- Written in TypeScript so type support is available out of the box.

## Installation

Install via npm:

``` shell
npm install s-is-for-store
```

Or via yarn:

``` shell
yarn add s-is-for-store
```

## Basic Usage

``` ts
import { createStore } from 's-is-for-store'

/**
 * The state's interface.
 * This isn't neccessary if you aren't using TypeScript.
 * But if you are using TypeScript s-is-for-store offers type support out of the box.
 */
interface State { message: string }

/**
 * This creates a new store.  The store's initial state is { message: '' }
 */
const store = createStore<State>({ message: '' })

/**
 * This is a state resolver.
 * A state resolver is a function that is the state.
 * The resolver will return the new state.
 * A resolver can also return a promise that will resolve the new state.
 * A resolver can be an async function.
 */
const setMessage = (state: State, message: string) => ({ ...state, message })

/**
 * This is a subscriber.
 * When the state is modified, the subscriber gets called with the new state.
 */
const subscriber = (state: State) => console.log(state)

/**
 * The subscriber function is now subscribed to the store.
 */
store.subscribe(subscriber)

store.run(setMessage, 'Hello World')
// Outputs { message: 'Hello World' }

store.run(setMessage, 'Hello Again')
// Outputs { message: 'Hello Again' }

```

## A Note to 0.x.x Users

Version 1.0.0 introduces the concept of state resolvers.  Moving forward state resolvers are going to be the only way to modify state.  As such the `setState` method has been removed.
