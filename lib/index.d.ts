export declare type Subscriber<T> = (state: T) => any;
export declare type Unsubscriber = () => void;
export declare type Resolver<T, A extends any[] = any> = (getState: () => T, ...args: A) => T | Promise<T>;
/**
 * A class for a simple no frills state container.
 */
declare class Store<T> {
    private state;
    private subscribers;
    /**
     * Initializes a new store instance.
     * @param initialState The store's initial state.
     */
    constructor(initialState: T);
    /**
     * Returns the current state.
     */
    getState: () => T;
    /**
     * Runs a resolver function.
     * @param resolver A state resolver function.  A function that takes the getState function as an argument.  It returns mutated state or a promise that will resolve mutated state.
     * @returns The new state
     */
    run: <A extends any[] = any>(resolver: Resolver<T, A>, ...args: A) => Promise<T>;
    /**
     * Adds an update handler, a function that gets called when the state updates.
     * An unsubscribe function gets returned.
     */
    subscribe: (subscriber: Subscriber<T>) => Unsubscriber;
}
/**
 * Returns a new store object.  A convenience function that is the equivalent to `new Store<T>(initialState)`.
 * @param initialState The store's initial state.
 */
export declare const createStore: <T>(initialState: T) => Store<T>;
export default Store;
//# sourceMappingURL=index.d.ts.map