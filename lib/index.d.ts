export declare type Subscriber<T> = (state: T) => any;
export declare type Unsubscriber = () => void;
export declare type GetState<T> = () => T;
export declare type StateResolverCallback<T> = (getState: GetState<T>) => Partial<T> | Partial<Promise<T>>;
/**
 * A class an S is Store state container.
 */
export declare class Store<T> {
    private state;
    private subscribers;
    /**
     * Initializes a new store instance.
     * @param initialState The store's initial state.
     */
    constructor(initialState: T);
    /**
     * Returns the current state.
     * @returns The current state.
     */
    current: () => T;
    /**
     * Updates the state with the provided values.
     * @param newState The new state values.
     * @returns The updated state.
     */
    update: (newState: Partial<T>) => T;
    /**
     * Adds a listener function that gets called whenever the state updates.
     * @param subscriber The listener function.
     * @param invokeOnSubscribe If set to true, the listener function will immediatley be called once it has been subscribed.  The default is false.
     * @returns An unsubscribe function that will unsubscribe the listener when called.
     */
    subscribe: (subscriber: Subscriber<T>, invokeOnSubscribe?: boolean) => Unsubscriber;
    /**
     * Will unsubscribes all listener functions.
     * @returns
     */
    unsubscribeAll: () => void;
}
/**
 * Returns a new store object.  A convenience function that is the equivalent to `new Store<T>(initialState)`.
 * @param initialState The store's initial state.
 */
export declare const createStore: <T>(initialState: T) => Store<T>;
export default Store;
//# sourceMappingURL=index.d.ts.map