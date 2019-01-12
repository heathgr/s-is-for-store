/**
 * When the state gets updated, the subscriber functions get called.
 * The new state is called as a parameter.
 */
export declare type Subscriber<T> = (state: T) => any;
export declare type Unsubscriber = () => void;
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
     * Updates the state based on the object passed to this function.
     * @param newState An object containing the keys and values of the state that will be updated.
     */
    setState: (newState: Partial<T>) => void;
    /**
     * Adds an update handler, a function that gets called when the state updates.
     * An unsubscribe function gets returned.
     */
    subscribe: (subscriber: Subscriber<T>) => Unsubscriber;
}
/**
 * Returns a new store object.  A convienience function that is the equivalent to `new Store<T>(initialState)`.
 * @param initialState The store's initial state.
 */
export declare const createStore: <T>(initialState: T) => Store<T>;
export default Store;
//# sourceMappingURL=index.d.ts.map