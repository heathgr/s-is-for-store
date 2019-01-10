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
var Store = /** @class */ (function () {
    function Store(initState) {
        var _this = this;
        this.subscribers = [];
        this.getState = function () { return _this.state; };
        this.setState = function (newState) {
            _this.state = __assign({}, _this.state, newState);
            _this.subscribers.forEach(function (callback) { return callback(_this.state); });
        };
        this.subscribe = function (subscriber) {
            _this.subscribers.push(subscriber);
            // return unsubscribe function
            return function () {
                _this.subscribers = _this.subscribers.filter(function (item) { return item !== subscriber; });
            };
        };
        this.state = initState;
    }
    return Store;
}());
exports.default = Store;
