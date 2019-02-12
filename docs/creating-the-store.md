# Creating the Store

## Install S is For Store

From the terminal, add S is for Store to the project with the following command:

```
npm install s-is-for-store
```

## Open the Store File

In your code editor of choice, open `src/store.ts`.  Currently, this file is blank.  You will add the code that will initialize a new store.

## Import the Create Store Function

Add the following line to `store.ts`:

``` ts
import { createStore } from 's-is-for-store'
```

## Create a New Store

The `createStore` function will return a new state container. Add the following line of code:

``` ts
const store = createStore({})
```

The above code creates a new state container.  It was passed a blank object.  This object the store's initial state.  
