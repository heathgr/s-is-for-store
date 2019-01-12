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
/**
 * A class for a simple no frills state container.
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
         */
        this.getState = function () { return _this.state; };
        /**
         * Updates the state based on the object passed to this function.
         * @param newState An object containing the keys and values of the state that will be updated.
         */
        this.setState = function (newState) {
            _this.state = __assign({}, _this.state, newState);
            _this.subscribers.forEach(function (callback) { return callback(_this.state); });
        };
        /**
         * Adds an update handler, a function that gets called when the state updates.
         * An unsubscribe function gets returned.
         */
        this.subscribe = function (subscriber) {
            _this.subscribers.push(subscriber);
            // return unsubscribe function
            return function () {
                _this.subscribers = _this.subscribers.filter(function (item) { return item !== subscriber; });
            };
        };
        this.state = initialState;
    }
    return Store;
}());
/**
 * Returns a new store object.  A convienience function that is the equivalent to `new Store<T>(initialState)`.
 * @param initialState The store's initial state.
 */
exports.createStore = function (initialState) { return new Store(initialState); };
exports.default = Store;
//# sourceMappingURL=index.js.map