"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = exports.Store = void 0;
/**
 * A class an S is Store state container.
 */
var Store = /** @class */ (function () {
    /**
     * Initializes a new store instance.
     * @param initialState The store's initial state.
     */
    function Store(initialState) {
        var _this = this;
        this.subscribers = [];
        /**
         * Returns the current state.
         * @returns The current state.
         */
        this.current = function () { return _this.state; };
        /**
         * Updates the state with the provided values.
         * @param newState The new state values.
         * @returns The updated state.
         */
        this.update = function (newState) {
            // update the state
            _this.state = __assign(__assign({}, _this.state), newState);
            // call the subscribers
            _this.subscribers.map(function (subscriber) { return subscriber(_this.state); });
            return _this.state;
        };
        /**
         * Adds a listener function that gets called whenever the state updates.
         * @param subscriber The listener function.
         * @param invokeOnSubscribe If set to true, the listener function will immediatley be called once it has been subscribed.  The default is false.
         * @returns An unsubscribe function that will unsubscribe the listener when called.
         */
        this.subscribe = function (subscriber, invokeOnSubscribe) {
            if (invokeOnSubscribe === void 0) { invokeOnSubscribe = false; }
            _this.subscribers.push(subscriber);
            if (invokeOnSubscribe) {
                subscriber(_this.state);
            }
            // return unsubscribe function
            return function () {
                _this.subscribers = _this.subscribers.filter(function (item) { return item !== subscriber; });
            };
        };
        /**
         * Will unsubscribes all listener functions.
         */
        this.unsubscribeAll = function () {
            _this.subscribers = [];
        };
        this.state = initialState;
    }
    return Store;
}());
exports.Store = Store;
/**
 * Returns a new store object.  A convenience function that is the equivalent to `new Store<T>(initialState)`.
 * @param initialState The store's initial state.
 */
exports.createStore = function (initialState) { return new Store(initialState); };
exports.default = Store;
//# sourceMappingURL=index.js.map