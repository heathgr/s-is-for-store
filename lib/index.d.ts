export declare type Subscriber<T> = (state: T) => void;
declare class Store<T> {
    private state;
    private subscribers;
    constructor(initState: T);
    getState: () => T;
    setState: (newState: Partial<T>) => void;
    subscribe: (subscriber: Subscriber<T>) => () => void;
}
export default Store;
//# sourceMappingURL=index.d.ts.map