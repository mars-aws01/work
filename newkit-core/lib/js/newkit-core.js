(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/http"), require("@angular/common"), require("kendo-wijmo"), require("@angular/platform-browser"), require("@angular/animations"), require("@angular/router"), require("Rx"));
	else if(typeof define === 'function' && define.amd)
		define([, , , , "kendo-wijmo", , , , "Rx"], factory);
	else if(typeof exports === 'object')
		exports["newkit-core"] = factory(require("@angular/core"), require("@angular/forms"), require("@angular/http"), require("@angular/common"), require("kendo-wijmo"), require("@angular/platform-browser"), require("@angular/animations"), require("@angular/router"), require("Rx"));
	else
		root["newkit"] = root["newkit"] || {}, root["newkit"]["newkit-core"] = factory(root["ng"]["core"], root["ng"]["forms"], root["ng"]["http"], root["ng"]["common"], root["kendo-wijmo"], root["ng"]["platformBrowser"], root["ng"]["animations"], root["ng"]["router"], root["Rx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_36__, __WEBPACK_EXTERNAL_MODULE_109__, __WEBPACK_EXTERNAL_MODULE_113__, __WEBPACK_EXTERNAL_MODULE_94__, __WEBPACK_EXTERNAL_MODULE_41__, __WEBPACK_EXTERNAL_MODULE_72__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(20);
var Subscription_1 = __webpack_require__(9);
var Observer_1 = __webpack_require__(23);
var rxSubscriber_1 = __webpack_require__(13);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(7);
var toSubscriber_1 = __webpack_require__(43);
var observable_1 = __webpack_require__(24);
var pipe_1 = __webpack_require__(25);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__(17);
var core_1 = __webpack_require__(0);
var negAlert_1 = __webpack_require__(18);
var negGlobalLoading_1 = __webpack_require__(33);
var ajaxDefaults = {
    headers: {
        'Accept': 'application/json'
    }
};
var NegAjax = /** @class */ (function () {
    function NegAjax(http, negGlobalLoading, negAlert) {
        this.http = http;
        this.negGlobalLoading = negGlobalLoading;
        this.negAlert = negAlert;
        this.requestCount = 0;
    }
    NegAjax.prototype.get = function (url, options) {
        return this._request('GET', url, null, options);
    };
    NegAjax.prototype.post = function (url, body, options) {
        return this._request('POST', url, body, options);
    };
    NegAjax.prototype.put = function (url, body, options) {
        return this._request('PUT', url, body, options);
    };
    NegAjax.prototype.delete = function (url, options) {
        return this._request('DELETE', url, null, options);
    };
    NegAjax.prototype.setCommonHeaders = function (headers) {
        Object.assign(ajaxDefaults.headers, headers);
    };
    NegAjax.prototype.removeCommonHeader = function (headerKey) {
        delete ajaxDefaults.headers[headerKey];
    };
    NegAjax.prototype._buildOptions = function (options, type) {
        options = options || {};
        var tmpHeader = {};
        if (type !== 'GET' && type !== 'DELETE') {
            tmpHeader['Content-Type'] = 'application/json';
        }
        var headers = new http_1.Headers(Object.assign({}, ajaxDefaults.headers, tmpHeader, options.headers || {}));
        var requestOptions = new http_1.RequestOptions({
            headers: headers
        });
        // 一个错别字导致的兼容处理
        requestOptions['useCustomErrorHandler'] = !!(options.useCustomErrorHandler || options.useCustomErrorHander);
        requestOptions['hideLoading'] = !!options.hideLoading;
        return requestOptions;
    };
    NegAjax.prototype._request = function (type, url, body, options) {
        var _this = this;
        options = options || {};
        var p;
        switch (type) {
            case 'GET':
                p = this.http.get(url, this._buildOptions(options, 'GET'));
                break;
            case 'POST':
                p = this.http.post(url, body, this._buildOptions(options, 'POST'));
                break;
            case 'PUT':
                p = this.http.put(url, body, this._buildOptions(options, 'PUT'));
                break;
            case 'DELETE':
                p = this.http.delete(url, this._buildOptions(options, 'DELETE'));
                break;
            default:
                throw new Error('Not Supported Method');
        }
        if (!options.hideLoading) {
            this.requestCount += 1;
            this._processLoading();
        }
        return p.toPromise()
            .then(function (res) {
            if (!options.hideLoading) {
                _this.requestCount -= 1;
                _this._processLoading();
            }
            var result = { data: _this._tryGetJsonData(res), res: res };
            return result;
        }).catch(function (errRes) {
            if (!options.hideLoading) {
                _this.requestCount -= 1;
                _this._processLoading();
            }
            if (!options.useCustomErrorHandler) {
                _this._handlerError(errRes);
            }
            return Promise.reject(errRes);
        });
    };
    NegAjax.prototype._tryGetJsonData = function (res) {
        try {
            return res.json();
        }
        catch (ex) {
            return res.text();
        }
    };
    NegAjax.prototype._handlerError = function (errRes) {
        errRes = errRes || {};
        var errMessage;
        switch (errRes.status) {
            case 0:
                errMessage = "Error, status is " + errRes.status;
                break;
            case 404:
                errMessage = errRes.text();
                break;
            case 500:
                var data = this._tryGetJsonData(errRes);
                if (typeof data === 'object') {
                    errMessage = data.error ? data.error.message : data.message;
                }
                else {
                    errMessage = data;
                }
                break;
            default:
                if (errRes.text) {
                    errMessage = errRes.text();
                }
                else {
                    errMessage = '[NegAjax] Unkown Error';
                    if (window['NEWKIT_DEBUG']) {
                        console.log(errRes);
                    }
                }
                break;
        }
        if (errMessage) {
            this.negAlert.error(errMessage);
        }
    };
    NegAjax.prototype._processLoading = function () {
        if (this.requestCount > 0) {
            this.negGlobalLoading.show();
        }
        else {
            this.negGlobalLoading.hide();
        }
    };
    NegAjax = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            negGlobalLoading_1.NegGlobalLoading,
            negAlert_1.NegAlert])
    ], NegAjax);
    return NegAjax;
}());
exports.NegAjax = NegAjax;
;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return TranslateStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateModule", function() { return TranslateModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateLoader", function() { return TranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateFakeLoader", function() { return TranslateFakeLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USE_STORE", function() { return USE_STORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USE_DEFAULT_LANG", function() { return USE_DEFAULT_LANG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateService", function() { return TranslateService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissingTranslationHandler", function() { return MissingTranslationHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeMissingTranslationHandler", function() { return FakeMissingTranslationHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateParser", function() { return TranslateParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateDefaultParser", function() { return TranslateDefaultParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateCompiler", function() { return TranslateCompiler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateFakeCompiler", function() { return TranslateFakeCompiler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateDirective", function() { return TranslateDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslatePipe", function() { return TranslatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_share__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_merge__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators_switchMap__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operators_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators_toArray__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators_toArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators_toArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators_take__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operators_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators_take__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();









var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TranslateLoader = (function () {
    function TranslateLoader() {
    }
    return TranslateLoader;
}());
/**
 * This loader is just a placeholder that does nothing, in case you don't need a loader at all
 */
var TranslateFakeLoader = (function (_super) {
    __extends(TranslateFakeLoader, _super);
    function TranslateFakeLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslateFakeLoader.prototype.getTranslation = function (lang) {
        return Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__["of"])({});
    };
    return TranslateFakeLoader;
}(TranslateLoader));
TranslateFakeLoader = __decorate$1([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], TranslateFakeLoader);
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
var isScheduler_2 = isScheduler;
var isScheduler_1 = {
    isScheduler: isScheduler_2
};
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
var _root = __window || __global || __self;
var root_1 = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
var root = {
    root: root_1
};
function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;
var isFunction_1 = {
    isFunction: isFunction_2
};
var isArray_1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
var isArray = {
    isArray: isArray_1
};
function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;
var isObject_1 = {
    isObject: isObject_2
};
// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1 = { e: {} };
var errorObject = {
    errorObject: errorObject_1
};
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject.errorObject.e = e;
        return errorObject.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;
var tryCatch_1 = {
    tryCatch: tryCatch_2
};
var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$2(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;
var UnsubscriptionError_1 = {
    UnsubscriptionError: UnsubscriptionError_2
};
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject.errorObject.e.errors) : [errorObject.errorObject.e]);
            }
        }
        if (isArray.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
var Subscription_2 = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
var Subscription_1 = {
    Subscription: Subscription_2
};
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
var Observer = {
    empty: empty
};
var rxSubscriber = createCommonjsModule(function (module, exports) {
    var Symbol = root.root.Symbol;
    exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
        Symbol.for('rxSubscriber') : '@@rxSubscriber';
    /**
     * @deprecated use rxSubscriber instead
     */
    exports.$$rxSubscriber = exports.rxSubscriber;
});
var rxSubscriber_1 = rxSubscriber.rxSubscriber;
var rxSubscriber_2 = rxSubscriber.$$rxSubscriber;
var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$1(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$1(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
var Subscriber_1 = {
    Subscriber: Subscriber_2
};
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber.rxSubscriber]) {
            return nextOrObserver[rxSubscriber.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
var toSubscriber_2 = toSubscriber;
var toSubscriber_1 = {
    toSubscriber: toSubscriber_2
};
var observable = createCommonjsModule(function (module, exports) {
    function getSymbolObservable(context) {
        var $$observable;
        var Symbol = context.Symbol;
        if (typeof Symbol === 'function') {
            if (Symbol.observable) {
                $$observable = Symbol.observable;
            }
            else {
                $$observable = Symbol('observable');
                Symbol.observable = $$observable;
            }
        }
        else {
            $$observable = '@@observable';
        }
        return $$observable;
    }
    exports.getSymbolObservable = getSymbolObservable;
    exports.observable = getSymbolObservable(root.root);
    /**
     * @deprecated use observable instead
     */
    exports.$$observable = exports.observable;
});
var observable_1 = observable.getSymbolObservable;
var observable_2 = observable.observable;
var observable_3 = observable.$$observable;
/* tslint:disable:no-empty */
function noop() { }
var noop_2 = noop;
var noop_1 = {
    noop: noop_2
};
/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
var pipe_2 = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
var pipeFromArray_1 = pipeFromArray;
var pipe_1 = {
    pipe: pipe_2,
    pipeFromArray: pipeFromArray_1
};
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable$2 = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable$$1(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable$$1.prototype.lift = function (operator) {
        var observable$$1 = new Observable$$1();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable$$1.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable$$1.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable$$1.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                PromiseCtor = root.root.Rx.config.Promise;
            }
            else if (root.root.Promise) {
                PromiseCtor = root.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable$$1.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable$$1.prototype[observable.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable$$1.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable$$1.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                PromiseCtor = root.root.Rx.config.Promise;
            }
            else if (root.root.Promise) {
                PromiseCtor = root.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable$$1.create = function (subscribe) {
        return new Observable$$1(subscribe);
    };
    return Observable$$1;
}());
var Observable_2 = Observable$2;
var Observable_1 = {
    Observable: Observable_2
};
var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends$3(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
var ScalarObservable_2 = ScalarObservable;
var ScalarObservable_1 = {
    ScalarObservable: ScalarObservable_2
};
var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends$4(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
var EmptyObservable_2 = EmptyObservable;
var EmptyObservable_1 = {
    EmptyObservable: EmptyObservable_2
};
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
var ArrayObservable_2 = ArrayObservable;
var ArrayObservable_1 = {
    ArrayObservable: ArrayObservable_2
};
var of_1 = ArrayObservable_1.ArrayObservable.of;
var of$2 = {
    of: of_1
};
var isArrayLike_1 = (function (x) { return x && typeof x.length === 'number'; });
var isArrayLike = {
    isArrayLike: isArrayLike_1
};
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
var isPromise_2 = isPromise;
var isPromise_1 = {
    isPromise: isPromise_2
};
var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = (function (_super) {
    __extends$6(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {PromiseLike<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1.Observable));
var PromiseObservable_2 = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
var PromiseObservable_1 = {
    PromiseObservable: PromiseObservable_2
};
var iterator = createCommonjsModule(function (module, exports) {
    function symbolIteratorPonyfill(root$$2) {
        var Symbol = root$$2.Symbol;
        if (typeof Symbol === 'function') {
            if (!Symbol.iterator) {
                Symbol.iterator = Symbol('iterator polyfill');
            }
            return Symbol.iterator;
        }
        else {
            // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
            var Set_1 = root$$2.Set;
            if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
                return '@@iterator';
            }
            var Map_1 = root$$2.Map;
            // required for compatability with es6-shim
            if (Map_1) {
                var keys = Object.getOwnPropertyNames(Map_1.prototype);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                    if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                        return key;
                    }
                }
            }
            return '@@iterator';
        }
    }
    exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
    exports.iterator = symbolIteratorPonyfill(root.root);
    /**
     * @deprecated use iterator instead
     */
    exports.$$iterator = exports.iterator;
});
var iterator_1 = iterator.symbolIteratorPonyfill;
var iterator_2 = iterator.iterator;
var iterator_3 = iterator.$$iterator;
var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IteratorObservable = (function (_super) {
    __extends$7(IteratorObservable, _super);
    function IteratorObservable(iterator$$1, scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
        if (iterator$$1 == null) {
            throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator$$1);
    }
    IteratorObservable.create = function (iterator$$1, scheduler) {
        return new IteratorObservable(iterator$$1, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, iterator$$1 = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator$$1.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
            if (typeof iterator$$1.return === 'function') {
                iterator$$1.return();
            }
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator$$1 = _a.iterator, scheduler = _a.scheduler;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, iterator: iterator$$1, subscriber: subscriber
            });
        }
        else {
            do {
                var result = iterator$$1.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.closed) {
                    if (typeof iterator$$1.return === 'function') {
                        iterator$$1.return();
                    }
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
}(Observable_1.Observable));
var IteratorObservable_2 = IteratorObservable;
var StringIterator = (function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) {
            idx = 0;
        }
        if (len === void 0) {
            len = str.length;
        }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[iterator.iterator] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
}());
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) {
            idx = 0;
        }
        if (len === void 0) {
            len = toLength(arr);
        }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[iterator.iterator] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
}());
function getIterator(obj) {
    var i = obj[iterator.iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[iterator.iterator]();
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && root.root.isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
var IteratorObservable_1 = {
    IteratorObservable: IteratorObservable_2
};
var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = (function (_super) {
    __extends$8(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (length === 1) {
            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(Observable_1.Observable));
var ArrayLikeObservable_2 = ArrayLikeObservable;
var ArrayLikeObservable_1 = {
    ArrayLikeObservable: ArrayLikeObservable_2
};
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.error);
            case 'C':
                return Observable_1.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
var Notification_2 = Notification;
var Notification_1 = {
    Notification: Notification_2
};
var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) {
        delay = 0;
    }
    return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
    };
}
var observeOn_2 = observeOn;
var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());
var ObserveOnOperator_1 = ObserveOnOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ObserveOnSubscriber = (function (_super) {
    __extends$9(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber_1.Subscriber));
var ObserveOnSubscriber_1 = ObserveOnSubscriber;
var ObserveOnMessage = (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());
var ObserveOnMessage_1 = ObserveOnMessage;
var observeOn_1 = {
    observeOn: observeOn_2,
    ObserveOnOperator: ObserveOnOperator_1,
    ObserveOnSubscriber: ObserveOnSubscriber_1,
    ObserveOnMessage: ObserveOnMessage_1
};
var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = (function (_super) {
    __extends$5(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * @example <caption>Converts an array to an Observable</caption>
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {@link create}
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     * @see {@link fromPromise}
     *
     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * emissions of values.
     * @return {Observable<T>} The Observable whose values are originally from the
     * input object that was converted.
     * @static true
     * @name from
     * @owner Observable
     */
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[observable.observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator.iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike.isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable.observable]().subscribe(subscriber);
        }
        else {
            return ish[observable.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1.Observable));
var FromObservable_2 = FromObservable;
var FromObservable_1 = {
    FromObservable: FromObservable_2
};
var from_1 = FromObservable_1.FromObservable.create;
var from = {
    from: from_1
};
var __extends$11 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends$11(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
var InnerSubscriber_2 = InnerSubscriber;
var InnerSubscriber_1 = {
    InnerSubscriber: InnerSubscriber_2
};
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator.iterator] === 'function') {
        var iterator$$2 = result[iterator.iterator]();
        do {
            var item = iterator$$2.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable.observable] === 'function') {
        var obs = result[observable.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
var subscribeToResult_2 = subscribeToResult;
var subscribeToResult_1 = {
    subscribeToResult: subscribeToResult_2
};
var __extends$12 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends$12(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
var OuterSubscriber_2 = OuterSubscriber;
var OuterSubscriber_1 = {
    OuterSubscriber: OuterSubscriber_2
};
var __extends$10 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return function mergeMapOperatorFunction(source) {
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
            resultSelector = null;
        }
        return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
    };
}
var mergeMap_2 = mergeMap;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
var MergeMapOperator_1 = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends$10(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
var MergeMapSubscriber_1 = MergeMapSubscriber;
var mergeMap_1 = {
    mergeMap: mergeMap_2,
    MergeMapOperator: MergeMapOperator_1,
    MergeMapSubscriber: MergeMapSubscriber_1
};
function identity(x) {
    return x;
}
var identity_2 = identity;
var identity_1 = {
    identity: identity_2
};
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return mergeMap_1.mergeMap(identity_1.identity, null, concurrent);
}
var mergeAll_2 = mergeAll;
var mergeAll_1 = {
    mergeAll: mergeAll_2
};
/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return mergeAll_1.mergeAll(1);
}
var concatAll_2 = concatAll;
var concatAll_1 = {
    concatAll: concatAll_2
};
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from given
 * Observable and then moves on to the next.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * `concat` joins multiple Observables together, by subscribing to them one at a time and
 * merging their results into the output Observable. You can pass either an array of
 * Observables, or put them directly as arguments. Passing an empty array will result
 * in Observable that completes immediately.
 *
 * `concat` will subscribe to first input Observable and emit all its values, without
 * changing or affecting them in any way. When that Observable completes, it will
 * subscribe to then next Observable passed and, again, emit its values. This will be
 * repeated, until the operator runs out of Observables. When last input Observable completes,
 * `concat` will complete as well. At any given moment only one Observable passed to operator
 * emits values. If you would like to emit values from passed Observables concurrently, check out
 * {@link merge} instead, especially with optional `concurrent` parameter. As a matter of fact,
 * `concat` is an equivalent of `merge` operator with `concurrent` parameter set to `1`.
 *
 * Note that if some input Observable never completes, `concat` will also never complete
 * and Observables following the one that did not complete will never be subscribed. On the other
 * hand, if some Observable simply completes immediately after it is subscribed, it will be
 * invisible for `concat`, which will just move on to the next Observable.
 *
 * If any Observable in chain errors, instead of passing control to the next Observable,
 * `concat` will error immediately as well. Observables that would be subscribed after
 * the one that emitted error, never will.
 *
 * If you pass to `concat` the same Observable many times, its stream of values
 * will be "replayed" on every subscription, which means you can repeat given Observable
 * as many times as you like. If passing the same Observable to `concat` 1000 times becomes tedious,
 * you can always use {@link repeat}.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = Rx.Observable.concat(timer, sequence);
 * result.subscribe(x => console.log(x));
 *
 * // results in:
 * // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
 *
 *
 * @example <caption>Concatenate an array of 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = Rx.Observable.concat([timer1, timer2, timer3]); // note that array is passed
 * result.subscribe(x => console.log(x));
 *
 * // results in the following:
 * // (Prints to console sequentially)
 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
 *
 *
 * @example <caption>Concatenate the same Observable to repeat it</caption>
 * const timer = Rx.Observable.interval(1000).take(2);
 *
 * Rx.Observable.concat(timer, timer) // concating the same Observable!
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('...and it is done!')
 * );
 *
 * // Logs:
 * // 0 after 1s
 * // 1 after 2s
 * // 0 after 3s
 * // 1 after 4s
 * // "...and it is done!" also after 4s
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {ObservableInput} input1 An input Observable to concatenate with others.
 * @param {ObservableInput} input2 An input Observable to concatenate with others.
 * More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @static true
 * @name concat
 * @owner Observable
 */
function concat$1() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    if (observables.length === 1 || (observables.length === 2 && isScheduler_1.isScheduler(observables[1]))) {
        return from.from(observables[0]);
    }
    return concatAll_1.concatAll()(of$2.of.apply(void 0, observables));
}
var concat_2$2 = concat$1;
var concat_1 = {
    concat: concat_2$2
};
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from every
 * given input Observable after the current Observable.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * Joins this Observable with multiple other Observables by subscribing to them
 * one at a time, starting with the source, and merging their results into the
 * output Observable. Will wait for each Observable to complete before moving
 * on to the next.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = timer.concat(sequence);
 * result.subscribe(x => console.log(x));
 *
 * // results in:
 * // 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
 *
 * @example <caption>Concatenate 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = timer1.concat(timer2, timer3);
 * result.subscribe(x => console.log(x));
 *
 * // results in the following:
 * // (Prints to console sequentially)
 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {ObservableInput} other An input Observable to concatenate after the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @method concat
 * @owner Observable
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return function (source) { return source.lift.call(concat_1.concat.apply(void 0, [source].concat(observables))); };
}
var concat_3 = concat;
var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MissingTranslationHandler = (function () {
    function MissingTranslationHandler() {
    }
    return MissingTranslationHandler;
}());
/**
 * This handler is just a placeholder that does nothing, in case you don't need a missing translation handler at all
 */
var FakeMissingTranslationHandler = (function () {
    function FakeMissingTranslationHandler() {
    }
    FakeMissingTranslationHandler.prototype.handle = function (params) {
        return params.key;
    };
    return FakeMissingTranslationHandler;
}());
FakeMissingTranslationHandler = __decorate$3([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], FakeMissingTranslationHandler);
var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TranslateCompiler = (function () {
    function TranslateCompiler() {
    }
    return TranslateCompiler;
}());
/**
 * This compiler is just a placeholder that does nothing, in case you don't need a compiler at all
 */
var TranslateFakeCompiler = (function (_super) {
    __extends(TranslateFakeCompiler, _super);
    function TranslateFakeCompiler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslateFakeCompiler.prototype.compile = function (value, lang) {
        return value;
    };
    TranslateFakeCompiler.prototype.compileTranslations = function (translations, lang) {
        return translations;
    };
    return TranslateFakeCompiler;
}(TranslateCompiler));
TranslateFakeCompiler = __decorate$4([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], TranslateFakeCompiler);
/* tslint:disable */
/**
 * @name equals
 *
 * @description
 * Determines if two objects or two values are equivalent.
 *
 * Two objects or values are considered equivalent if at least one of the following is true:
 *
 * * Both objects or values pass `===` comparison.
 * * Both objects or values are of the same type and all of their properties are equal by
 *   comparing them with `equals`.
 *
 * @param {*} o1 Object or value to compare.
 * @param {*} o2 Object or value to compare.
 * @returns {boolean} True if arguments are equal.
 */
function equals(o1, o2) {
    if (o1 === o2)
        return true;
    if (o1 === null || o2 === null)
        return false;
    if (o1 !== o1 && o2 !== o2)
        return true; // NaN === NaN
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2 && t1 == 'object') {
        if (Array.isArray(o1)) {
            if (!Array.isArray(o2))
                return false;
            if ((length = o1.length) == o2.length) {
                for (key = 0; key < length; key++) {
                    if (!equals(o1[key], o2[key]))
                        return false;
                }
                return true;
            }
        }
        else {
            if (Array.isArray(o2)) {
                return false;
            }
            keySet = Object.create(null);
            for (key in o1) {
                if (!equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && typeof o2[key] !== 'undefined') {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
/* tslint:enable */
function isDefined(value) {
    return typeof value !== 'undefined' && value !== null;
}
function isObject$1(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
function mergeDeep(target, source) {
    target = JSON.parse(JSON.stringify(target));
    source = JSON.parse(JSON.stringify(source));
    var output = Object.assign({}, target);
    if (isObject$1(target) && isObject$1(source)) {
        Object.keys(source).forEach(function (key) {
            if (isObject$1(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, (_b = {}, _b[key] = source[key], _b));
                }
                else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            }
            else {
                Object.assign(output, (_c = {}, _c[key] = source[key], _c));
            }
            var _b, _c;
        });
    }
    return output;
}
var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TranslateParser = (function () {
    function TranslateParser() {
    }
    return TranslateParser;
}());
var TranslateDefaultParser = (function (_super) {
    __extends(TranslateDefaultParser, _super);
    function TranslateDefaultParser() {
        var _this = _super.apply(this, arguments) || this;
        _this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
        return _this;
    }
    TranslateDefaultParser.prototype.interpolate = function (expr, params) {
        var result;
        if (typeof expr === 'string') {
            result = this.interpolateString(expr, params);
        }
        else if (typeof expr === 'function') {
            result = this.interpolateFunction(expr, params);
        }
        else {
            // this should not happen, but an unrelated TranslateService test depends on it
            result = expr;
        }
        return result;
    };
    TranslateDefaultParser.prototype.getValue = function (target, key) {
        var keys = key.split('.');
        key = '';
        do {
            key += keys.shift();
            if (isDefined(target) && isDefined(target[key]) && (typeof target[key] === 'object' || !keys.length)) {
                target = target[key];
                key = '';
            }
            else if (!keys.length) {
                target = undefined;
            }
            else {
                key += '.';
            }
        } while (keys.length);
        return target;
    };
    TranslateDefaultParser.prototype.interpolateFunction = function (fn, params) {
        return fn(params);
    };
    TranslateDefaultParser.prototype.interpolateString = function (expr, params) {
        var _this = this;
        if (!params) {
            return expr;
        }
        return expr.replace(this.templateMatcher, function (substring, b) {
            var r = _this.getValue(params, b);
            return isDefined(r) ? r : substring;
        });
    };
    return TranslateDefaultParser;
}(TranslateParser));
TranslateDefaultParser = __decorate$5([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], TranslateDefaultParser);
var TranslateStore = (function () {
    function TranslateStore() {
        /**
         * The lang currently used
         * @type {string}
         */
        this.currentLang = this.defaultLang;
        /**
         * a list of translations per lang
         * @type {{}}
         */
        this.translations = {};
        /**
         * an array of langs
         * @type {Array}
         */
        this.langs = [];
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<TranslationChangeEvent>}
         */
        this.onTranslationChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<LangChangeEvent>}
         */
        this.onLangChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<DefaultLangChangeEvent>}
         */
        this.onDefaultLangChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    return TranslateStore;
}());
var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
};
var USE_STORE = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('USE_STORE');
var USE_DEFAULT_LANG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('USE_DEFAULT_LANG');
var TranslateService = (function () {
    /**
     *
     * @param store an instance of the store (that is supposed to be unique)
     * @param currentLoader An instance of the loader currently used
     * @param compiler An instance of the compiler currently used
     * @param parser An instance of the parser currently used
     * @param missingTranslationHandler A handler for missing translations.
     * @param isolate whether this service should use the store or not
     * @param useDefaultLang whether we should use default language translation when current language translation is missing.
     */
    function TranslateService(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang, isolate) {
        if (useDefaultLang === void 0) { useDefaultLang = true; }
        if (isolate === void 0) { isolate = false; }
        this.store = store;
        this.currentLoader = currentLoader;
        this.compiler = compiler;
        this.parser = parser;
        this.missingTranslationHandler = missingTranslationHandler;
        this.useDefaultLang = useDefaultLang;
        this.isolate = isolate;
        this.pending = false;
        this._onTranslationChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._onLangChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._onDefaultLangChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._langs = [];
        this._translations = {};
        this._translationRequests = {};
    }
    Object.defineProperty(TranslateService.prototype, "onTranslationChange", {
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<TranslationChangeEvent>}
         */
        get: function () {
            return this.isolate ? this._onTranslationChange : this.store.onTranslationChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "onLangChange", {
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<LangChangeEvent>}
         */
        get: function () {
            return this.isolate ? this._onLangChange : this.store.onLangChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "onDefaultLangChange", {
        /**
         * An EventEmitter to listen to default lang change events
         * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
         *     // do something
         * });
         * @type {EventEmitter<DefaultLangChangeEvent>}
         */
        get: function () {
            return this.isolate ? this._onDefaultLangChange : this.store.onDefaultLangChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "defaultLang", {
        /**
         * The default lang to fallback when translations are missing on the current lang
         */
        get: function () {
            return this.isolate ? this._defaultLang : this.store.defaultLang;
        },
        set: function (defaultLang) {
            if (this.isolate) {
                this._defaultLang = defaultLang;
            }
            else {
                this.store.defaultLang = defaultLang;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "currentLang", {
        /**
         * The lang currently used
         * @type {string}
         */
        get: function () {
            return this.isolate ? this._currentLang : this.store.currentLang;
        },
        set: function (currentLang) {
            if (this.isolate) {
                this._currentLang = currentLang;
            }
            else {
                this.store.currentLang = currentLang;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "langs", {
        /**
         * an array of langs
         * @type {Array}
         */
        get: function () {
            return this.isolate ? this._langs : this.store.langs;
        },
        set: function (langs) {
            if (this.isolate) {
                this._langs = langs;
            }
            else {
                this.store.langs = langs;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateService.prototype, "translations", {
        /**
         * a list of translations per lang
         * @type {{}}
         */
        get: function () {
            return this.isolate ? this._translations : this.store.translations;
        },
        set: function (translations) {
            if (this.isolate) {
                this._currentLang = translations;
            }
            else {
                this.store.translations = translations;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the default language to use as a fallback
     * @param lang
     */
    TranslateService.prototype.setDefaultLang = function (lang) {
        var _this = this;
        if (lang === this.defaultLang) {
            return;
        }
        var pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the defaultLang immediately
            if (!this.defaultLang) {
                this.defaultLang = lang;
            }
            pending.pipe(Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators_take__["take"])(1))
                .subscribe(function (res) {
                _this.changeDefaultLang(lang);
            });
        }
        else {
            this.changeDefaultLang(lang);
        }
    };
    /**
     * Gets the default language used
     * @returns string
     */
    TranslateService.prototype.getDefaultLang = function () {
        return this.defaultLang;
    };
    /**
     * Changes the lang currently used
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.use = function (lang) {
        var _this = this;
        // don't change the language if the language given is already selected
        if (lang === this.currentLang) {
            return Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__["of"])(this.translations[lang]);
        }
        var pending = this.retrieveTranslations(lang);
        if (typeof pending !== "undefined") {
            // on init set the currentLang immediately
            if (!this.currentLang) {
                this.currentLang = lang;
            }
            pending.pipe(Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators_take__["take"])(1))
                .subscribe(function (res) {
                _this.changeLang(lang);
            });
            return pending;
        }
        else {
            this.changeLang(lang);
            return Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__["of"])(this.translations[lang]);
        }
    };
    /**
     * Retrieves the given translations
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.retrieveTranslations = function (lang) {
        var pending;
        // if this language is unavailable, ask for it
        if (typeof this.translations[lang] === "undefined") {
            this._translationRequests[lang] = this._translationRequests[lang] || this.getTranslation(lang);
            pending = this._translationRequests[lang];
        }
        return pending;
    };
    /**
     * Gets an object of translations for a given language with the current loader
     * and passes it through the compiler
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.getTranslation = function (lang) {
        var _this = this;
        this.pending = true;
        this.loadingTranslations = this.currentLoader.getTranslation(lang).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_share__["share"])());
        this.loadingTranslations.pipe(Object(__WEBPACK_IMPORTED_MODULE_8_rxjs_operators_take__["take"])(1))
            .subscribe(function (res) {
            _this.translations[lang] = _this.compiler.compileTranslations(res, lang);
            _this.updateLangs();
            _this.pending = false;
        }, function (err) {
            _this.pending = false;
        });
        return this.loadingTranslations;
    };
    /**
     * Manually sets an object of translations for a given language
     * after passing it through the compiler
     * @param lang
     * @param translations
     * @param shouldMerge
     */
    TranslateService.prototype.setTranslation = function (lang, translations, shouldMerge) {
        if (shouldMerge === void 0) { shouldMerge = false; }
        translations = this.compiler.compileTranslations(translations, lang);
        if (shouldMerge && this.translations[lang]) {
            this.translations[lang] = mergeDeep(this.translations[lang], translations);
        }
        else {
            this.translations[lang] = translations;
        }
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Returns an array of currently available langs
     * @returns {any}
     */
    TranslateService.prototype.getLangs = function () {
        return this.langs;
    };
    /**
     * @param langs
     * Add available langs
     */
    TranslateService.prototype.addLangs = function (langs) {
        var _this = this;
        langs.forEach(function (lang) {
            if (_this.langs.indexOf(lang) === -1) {
                _this.langs.push(lang);
            }
        });
    };
    /**
     * Update the list of available langs
     */
    TranslateService.prototype.updateLangs = function () {
        this.addLangs(Object.keys(this.translations));
    };
    /**
     * Returns the parsed result of the translations
     * @param translations
     * @param key
     * @param interpolateParams
     * @returns {any}
     */
    TranslateService.prototype.getParsedResult = function (translations, key, interpolateParams) {
        var res;
        if (key instanceof Array) {
            var result = {}, observables = false;
            for (var _b = 0, key_1 = key; _b < key_1.length; _b++) {
                var k = key_1[_b];
                result[k] = this.getParsedResult(translations, k, interpolateParams);
                if (typeof result[k].subscribe === "function") {
                    observables = true;
                }
            }
            if (observables) {
                var mergedObs = void 0;
                for (var _c = 0, key_2 = key; _c < key_2.length; _c++) {
                    var k = key_2[_c];
                    var obs = typeof result[k].subscribe === "function" ? result[k] : Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__["of"])(result[k]);
                    if (typeof mergedObs === "undefined") {
                        mergedObs = obs;
                    }
                    else {
                        mergedObs = mergedObs.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_merge__["merge"])(obs));
                    }
                }
                return mergedObs.pipe(Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators_toArray__["toArray"])(), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (arr) {
                    var obj = {};
                    arr.forEach(function (value, index) {
                        obj[key[index]] = value;
                    });
                    return obj;
                }));
            }
            return result;
        }
        if (translations) {
            res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
        }
        if (typeof res === "undefined" && this.defaultLang && this.defaultLang !== this.currentLang && this.useDefaultLang) {
            res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
        }
        if (typeof res === "undefined") {
            var params = { key: key, translateService: this };
            if (typeof interpolateParams !== 'undefined') {
                params.interpolateParams = interpolateParams;
            }
            res = this.missingTranslationHandler.handle(params);
        }
        return typeof res !== "undefined" ? res : key;
    };
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param key
     * @param interpolateParams
     * @returns {any} the translated key, or an object of translated keys
     */
    TranslateService.prototype.get = function (key, interpolateParams) {
        var _this = this;
        if (!isDefined(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        // check if we are loading a new translation to use
        if (this.pending) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                var onComplete = function (res) {
                    observer.next(res);
                    observer.complete();
                };
                var onError = function (err) {
                    observer.error(err);
                };
                _this.loadingTranslations.subscribe(function (res) {
                    res = _this.getParsedResult(res, key, interpolateParams);
                    if (typeof res.subscribe === "function") {
                        res.subscribe(onComplete, onError);
                    }
                    else {
                        onComplete(res);
                    }
                }, onError);
            });
        }
        else {
            var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            if (typeof res.subscribe === "function") {
                return res;
            }
            else {
                return Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__["of"])(res);
            }
        }
    };
    /**
     * Returns a stream of translated values of a key (or an array of keys) which updates
     * whenever the language changes.
     * @param key
     * @param interpolateParams
     * @returns {any} A stream of the translated key, or an object of translated keys
     */
    TranslateService.prototype.stream = function (key, interpolateParams) {
        var _this = this;
        if (!isDefined(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        return this
            .get(key, interpolateParams)
            .pipe(concat_3(this.onLangChange.pipe(Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_operators_switchMap__["switchMap"])(function (event) {
            var res = _this.getParsedResult(event.translations, key, interpolateParams);
            if (typeof res.subscribe === "function") {
                return res;
            }
            else {
                return Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__["of"])(res);
            }
        }))));
    };
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param key
     * @param interpolateParams
     * @returns {string}
     */
    TranslateService.prototype.instant = function (key, interpolateParams) {
        if (!isDefined(key) || !key.length) {
            throw new Error("Parameter \"key\" required");
        }
        var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
        if (typeof res.subscribe !== "undefined") {
            if (key instanceof Array) {
                var obj_1 = {};
                key.forEach(function (value, index) {
                    obj_1[key[index]] = key[index];
                });
                return obj_1;
            }
            return key;
        }
        else {
            return res;
        }
    };
    /**
     * Sets the translated value of a key, after compiling it
     * @param key
     * @param value
     * @param lang
     */
    TranslateService.prototype.set = function (key, value, lang) {
        if (lang === void 0) { lang = this.currentLang; }
        this.translations[lang][key] = this.compiler.compile(value, lang);
        this.updateLangs();
        this.onTranslationChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Changes the current lang
     * @param lang
     */
    TranslateService.prototype.changeLang = function (lang) {
        this.currentLang = lang;
        this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
        // if there is no default lang, use the one that we just set
        if (!this.defaultLang) {
            this.changeDefaultLang(lang);
        }
    };
    /**
     * Changes the default lang
     * @param lang
     */
    TranslateService.prototype.changeDefaultLang = function (lang) {
        this.defaultLang = lang;
        this.onDefaultLangChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Allows to reload the lang file from the file
     * @param lang
     * @returns {Observable<any>}
     */
    TranslateService.prototype.reloadLang = function (lang) {
        this.resetLang(lang);
        return this.getTranslation(lang);
    };
    /**
     * Deletes inner translation
     * @param lang
     */
    TranslateService.prototype.resetLang = function (lang) {
        this._translationRequests[lang] = undefined;
        this.translations[lang] = undefined;
    };
    /**
     * Returns the language code name from the browser, e.g. "de"
     *
     * @returns string
     */
    TranslateService.prototype.getBrowserLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }
        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }
        return browserLang;
    };
    /**
     * Returns the culture language code name from the browser, e.g. "de-DE"
     *
     * @returns string
     */
    TranslateService.prototype.getBrowserCultureLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        var browserCultureLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserCultureLang = browserCultureLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        return browserCultureLang;
    };
    return TranslateService;
}());
TranslateService = __decorate$2([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(USE_DEFAULT_LANG)),
    __param(6, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(USE_STORE)),
    __metadata("design:paramtypes", [TranslateStore,
        TranslateLoader,
        TranslateCompiler,
        TranslateParser,
        MissingTranslationHandler, Boolean, Boolean])
], TranslateService);
var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
var TranslateDirective = (function () {
    function TranslateDirective(translateService, element, _ref) {
        var _this = this;
        this.translateService = translateService;
        this.element = element;
        this._ref = _ref;
        // subscribe to onTranslationChange event, in case the translations of the current lang change
        if (!this.onTranslationChangeSub) {
            this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe(function (event) {
                if (event.lang === _this.translateService.currentLang) {
                    _this.checkNodes(true, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChangeSub) {
            this.onLangChangeSub = this.translateService.onLangChange.subscribe(function (event) {
                _this.checkNodes(true, event.translations);
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe(function (event) {
                _this.checkNodes(true);
            });
        }
    }
    Object.defineProperty(TranslateDirective.prototype, "translate", {
        set: function (key) {
            if (key) {
                this.key = key;
                this.checkNodes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TranslateDirective.prototype, "translateParams", {
        set: function (params) {
            if (!equals(this.currentParams, params)) {
                this.currentParams = params;
                this.checkNodes(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    TranslateDirective.prototype.ngAfterViewChecked = function () {
        this.checkNodes();
    };
    TranslateDirective.prototype.checkNodes = function (forceUpdate, translations) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        var nodes = this.element.nativeElement.childNodes;
        // if the element is empty
        if (!nodes.length) {
            // we add the key as content
            this.setContent(this.element.nativeElement, this.key);
            nodes = this.element.nativeElement.childNodes;
        }
        for (var i = 0; i < nodes.length; ++i) {
            var node = nodes[i];
            if (node.nodeType === 3) {
                var key = void 0;
                if (this.key) {
                    key = this.key;
                    if (forceUpdate) {
                        node.lastKey = null;
                    }
                }
                else {
                    var content = this.getContent(node).trim();
                    if (content.length) {
                        // we want to use the content as a key, not the translation value
                        if (content !== node.currentValue) {
                            key = content;
                            // the content was changed from the user, we'll use it as a reference if needed
                            node.originalContent = this.getContent(node);
                        }
                        else if (node.originalContent && forceUpdate) {
                            node.lastKey = null;
                            // the current content is the translation, not the key, use the last real content as key
                            key = node.originalContent.trim();
                        }
                    }
                }
                this.updateValue(key, node, translations);
            }
        }
    };
    TranslateDirective.prototype.updateValue = function (key, node, translations) {
        var _this = this;
        if (key) {
            if (node.lastKey === key && this.lastParams === this.currentParams) {
                return;
            }
            this.lastParams = this.currentParams;
            var onTranslation = function (res) {
                if (res !== key) {
                    node.lastKey = key;
                }
                if (!node.originalContent) {
                    node.originalContent = _this.getContent(node);
                }
                node.currentValue = isDefined(res) ? res : (node.originalContent || key);
                // we replace in the original content to preserve spaces that we might have trimmed
                _this.setContent(node, _this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
                _this._ref.markForCheck();
            };
            if (isDefined(translations)) {
                var res = this.translateService.getParsedResult(translations, key, this.currentParams);
                if (typeof res.subscribe === "function") {
                    res.subscribe(onTranslation);
                }
                else {
                    onTranslation(res);
                }
            }
            else {
                this.translateService.get(key, this.currentParams).subscribe(onTranslation);
            }
        }
    };
    TranslateDirective.prototype.getContent = function (node) {
        return isDefined(node.textContent) ? node.textContent : node.data;
    };
    TranslateDirective.prototype.setContent = function (node, content) {
        if (isDefined(node.textContent)) {
            node.textContent = content;
        }
        else {
            node.data = content;
        }
    };
    TranslateDirective.prototype.ngOnDestroy = function () {
        if (this.onLangChangeSub) {
            this.onLangChangeSub.unsubscribe();
        }
        if (this.onDefaultLangChangeSub) {
            this.onDefaultLangChangeSub.unsubscribe();
        }
        if (this.onTranslationChangeSub) {
            this.onTranslationChangeSub.unsubscribe();
        }
    };
    return TranslateDirective;
}());
__decorate$6([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata$1("design:type", String),
    __metadata$1("design:paramtypes", [String])
], TranslateDirective.prototype, "translate", null);
__decorate$6([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [Object])
], TranslateDirective.prototype, "translateParams", null);
TranslateDirective = __decorate$6([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[translate],[ngx-translate]'
    }),
    __metadata$1("design:paramtypes", [TranslateService, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
], TranslateDirective);
var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
var TranslatePipe = (function () {
    function TranslatePipe(translate, _ref) {
        this.translate = translate;
        this._ref = _ref;
        this.value = '';
    }
    TranslatePipe.prototype.updateValue = function (key, interpolateParams, translations) {
        var _this = this;
        var onTranslation = function (res) {
            _this.value = res !== undefined ? res : key;
            _this.lastKey = key;
            _this._ref.markForCheck();
        };
        if (translations) {
            var res = this.translate.getParsedResult(translations, key, interpolateParams);
            if (typeof res.subscribe === 'function') {
                res.subscribe(onTranslation);
            }
            else {
                onTranslation(res);
            }
        }
        this.translate.get(key, interpolateParams).subscribe(onTranslation);
    };
    TranslatePipe.prototype.transform = function (query) {
        var _this = this;
        var args = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            args[_b - 1] = arguments[_b];
        }
        if (!query || query.length === 0) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
            return this.value;
        }
        var interpolateParams;
        if (isDefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                var validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        // store the query, in case it changes
        this.lastKey = query;
        // store the params, in case they change
        this.lastParams = args;
        // set the value
        this.updateValue(query, interpolateParams);
        // if there is a subscription to onLangChange, clean it
        this._dispose();
        // subscribe to onTranslationChange event, in case the translations change
        if (!this.onTranslationChange) {
            this.onTranslationChange = this.translate.onTranslationChange.subscribe(function (event) {
                if (_this.lastKey && event.lang === _this.translate.currentLang) {
                    _this.lastKey = null;
                    _this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe(function (event) {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams, event.translations);
                }
            });
        }
        // subscribe to onDefaultLangChange event, in case the default language changes
        if (!this.onDefaultLangChange) {
            this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(function () {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams);
                }
            });
        }
        return this.value;
    };
    /**
     * Clean any existing subscription to change events
     * @private
     */
    TranslatePipe.prototype._dispose = function () {
        if (typeof this.onTranslationChange !== 'undefined') {
            this.onTranslationChange.unsubscribe();
            this.onTranslationChange = undefined;
        }
        if (typeof this.onLangChange !== 'undefined') {
            this.onLangChange.unsubscribe();
            this.onLangChange = undefined;
        }
        if (typeof this.onDefaultLangChange !== 'undefined') {
            this.onDefaultLangChange.unsubscribe();
            this.onDefaultLangChange = undefined;
        }
    };
    TranslatePipe.prototype.ngOnDestroy = function () {
        this._dispose();
    };
    return TranslatePipe;
}());
TranslatePipe = __decorate$7([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'translate',
        pure: false // required to update the value when the promise is resolved
    }),
    __metadata$2("design:paramtypes", [TranslateService, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
], TranslatePipe);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TranslateModule = TranslateModule_1 = (function () {
    function TranslateModule() {
    }
    /**
     * Use this method in your root module to provide the TranslateService
     * @param {TranslateModuleConfig} config
     * @returns {ModuleWithProviders}
     */
    TranslateModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: TranslateModule_1,
            providers: [
                config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                TranslateStore,
                { provide: USE_STORE, useValue: config.isolate },
                { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                TranslateService
            ]
        };
    };
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     * @param {TranslateModuleConfig} config
     * @returns {ModuleWithProviders}
     */
    TranslateModule.forChild = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: TranslateModule_1,
            providers: [
                config.loader || { provide: TranslateLoader, useClass: TranslateFakeLoader },
                config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                { provide: USE_STORE, useValue: config.isolate },
                { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                TranslateService
            ]
        };
    };
    return TranslateModule;
}());
TranslateModule = TranslateModule_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            TranslatePipe,
            TranslateDirective
        ],
        exports: [
            TranslatePipe,
            TranslateDirective
        ]
    })
], TranslateModule);
var TranslateModule_1;
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=core.es5.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(12)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(41);
var NegUtil = /** @class */ (function () {
    function NegUtil(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.window = window;
    }
    NegUtil.prototype.encodeUri = function (text) {
        return this.window.encodeURI(text);
    };
    NegUtil.prototype.decodeUri = function (text) {
        return this.window.decodeURI(text);
    };
    NegUtil.prototype.escape = function (text) {
        return this.window.escape(text);
    };
    NegUtil.prototype.unescape = function (text) {
        return this.window.unescape(text);
    };
    /**
     * Get query string.
     * @param  {string} key? If key exists, return this key value; else, return all query object.
     */
    NegUtil.prototype.getQuery = function (key) {
        var search = window.location.search.substring(1);
        var searchObj = {};
        search.split('&').forEach(function (s) {
            var sArr = s.split('=');
            searchObj[sArr[0]] = sArr[1];
        });
        if (key) {
            return searchObj[key];
        }
        return searchObj;
    };
    /**
     * Get base url by window.location
     * @param  {any} location
     */
    NegUtil.prototype.getBaseUrl = function (location) {
        return location.protocol + "//" + location.host;
    };
    /**
     * Add watcher to object property changed.
     * @param  {{}} obj The object that add watcher.
     * @param  {string} property The property that watched.
     * @param  {Function} watherFn Property changed callback.
     * @param  {} defaultVal The default value for property.
     */
    NegUtil.prototype.addWatcher = function (obj, property, watherFn, defaultVal) {
        var privateProperty = "__" + property;
        obj[privateProperty] = defaultVal;
        Object.defineProperty(obj, property, {
            get: function () {
                return this[privateProperty];
            },
            set: function (val) {
                var oldVal = this[property];
                this[privateProperty] = val;
                watherFn(val, oldVal);
            }
        });
    };
    /**
     * Remove item from Array(=== judge)
     * @param  {Array<any>} arr
     * @param  {any} item
     */
    NegUtil.prototype.remove = function (arr, item) {
        var idx;
        if (typeof item === 'function') {
            idx = arr.findIndex(item);
        }
        else {
            idx = arr.indexOf(item);
        }
        if (idx >= 0) {
            arr.splice(idx, 1);
        }
    };
    /**
     * Generate UUID
     */
    NegUtil.prototype.generateUUID = function () {
        return this.window.uuid.v4();
    };
    /**
     * Get current module name
     */
    NegUtil.prototype.getModuleName = function () {
        var moduleName = 'nk-core';
        var pathName = window.location.pathname;
        var pathArr = pathName.split('/');
        if (pathArr.length > 1) {
            moduleName = pathArr[1];
            if (moduleName === 'system') {
                moduleName = 'nk-shell';
            }
        }
        return moduleName;
    };
    NegUtil.prototype.resetObject = function (obj) {
        Object.keys(obj).forEach(function (k) {
            var v = obj[k];
            var vType = typeof v;
            if (Array.isArray(v)) {
                obj[k] = [];
            }
            else if (vType === 'number') {
                obj[k] = 0;
            }
            else if (vType === 'string') {
                obj[k] = '';
            }
            else if (vType === 'boolean') {
                obj[k] = false;
            }
        });
    };
    NegUtil.prototype.downloadFile = function (fileUrl, fileName) {
        var a = document.createElement('a');
        a.setAttribute('href', fileUrl);
        a.setAttribute('target', '_blank');
        a.style.display = 'none';
        if (fileName) {
            a.setAttribute('download', fileName);
        }
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
    /**
     * Get current route params
     */
    NegUtil.prototype.getRouteParams = function () {
        return this._getCurrentRouteParams('params');
    };
    /**
     * Get current route queryParams
     */
    NegUtil.prototype.getRouteQueryParams = function () {
        return this._getCurrentRouteParams('queryParams');
    };
    /**
     * Get current route data
     */
    NegUtil.prototype.getRouteData = function () {
        return this._getCurrentRouteParams('data');
    };
    /**
     * Get current route fragment
     */
    NegUtil.prototype.getRouteFragments = function () {
        return this._getCurrentRouteParams('fragment');
    };
    NegUtil.prototype._getCurrentRouteParams = function (type) {
        var params = _.cloneDeep(this.activatedRoute.snapshot[type]);
        var parentRoute = this.activatedRoute.parent;
        while (parentRoute) {
            var tempParams = _.cloneDeep(parentRoute.snapshot[type]);
            params = _.merge(tempParams, params);
            parentRoute = parentRoute.parent;
        }
        var childRoute = this.activatedRoute.children[0];
        while (childRoute) {
            var tempParams = _.cloneDeep(childRoute.snapshot[type]);
            params = _.merge(params, tempParams);
            childRoute = childRoute.children[0];
        }
        return params;
    };
    NegUtil = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], NegUtil);
    return NegUtil;
}());
exports.NegUtil = NegUtil;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// All services import
var negAjax_1 = __webpack_require__(4);
exports.NegAjax = negAjax_1.NegAjax;
var negAlert_1 = __webpack_require__(18);
exports.NegAlert = negAlert_1.NegAlert;
var negAuth_1 = __webpack_require__(15);
exports.NegAuth = negAuth_1.NegAuth;
var negBizLog_1 = __webpack_require__(70);
exports.NegBizLog = negBizLog_1.NegBizLog;
var negBreadcrumb_1 = __webpack_require__(71);
exports.NegBreadcrumb = negBreadcrumb_1.NegBreadcrumb;
var negConfigService_1 = __webpack_require__(73);
exports.NegConfigService = negConfigService_1.NegConfigService;
var negDfisUploader_1 = __webpack_require__(74);
exports.NegDfisUploader = negDfisUploader_1.NegDfisUploader;
var negEventBus_1 = __webpack_require__(16);
exports.NegEventBus = negEventBus_1.NegEventBus;
var negGlobalConfig_1 = __webpack_require__(75);
exports.NegGlobalConfig = negGlobalConfig_1.NegGlobalConfig;
var negGlobalLoading_1 = __webpack_require__(33);
exports.NegGlobalLoading = negGlobalLoading_1.NegGlobalLoading;
// import { NegModuleLoader } from './negModuleLoader';
var negStorage_1 = __webpack_require__(34);
exports.NegStorage = negStorage_1.NegStorage;
var negTranslate_1 = __webpack_require__(11);
exports.NegTranslate = negTranslate_1.NegTranslate;
var negUserProfile_1 = __webpack_require__(76);
exports.NegUserProfile = negUserProfile_1.NegUserProfile;
var negValidators_1 = __webpack_require__(77);
exports.NegValidators = negValidators_1.NegValidators;
var negUtil_1 = __webpack_require__(6);
exports.NegUtil = negUtil_1.NegUtil;
var negFeedback_1 = __webpack_require__(78);
exports.NegFeedback = negFeedback_1.NegFeedback;
var negMessageBox_1 = __webpack_require__(32);
exports.NegMessageBox = negMessageBox_1.NegMessageBox;
var negMultiTab_1 = __webpack_require__(79);
exports.NegMultiTab = negMultiTab_1.NegMultiTab;
var core_1 = __webpack_require__(5);
exports.TranslateService = core_1.TranslateService;
exports.TranslateLoader = core_1.TranslateLoader;
// Export all services
exports.CORE_SERVICES = [
    core_1.TranslateService,
    negAjax_1.NegAjax,
    negAlert_1.NegAlert,
    negAuth_1.NegAuth,
    negBizLog_1.NegBizLog,
    negBreadcrumb_1.NegBreadcrumb,
    negConfigService_1.NegConfigService,
    negDfisUploader_1.NegDfisUploader,
    negEventBus_1.NegEventBus,
    negGlobalConfig_1.NegGlobalConfig,
    negGlobalLoading_1.NegGlobalLoading,
    // NegModuleLoader,
    negStorage_1.NegStorage,
    negTranslate_1.NegTranslate,
    negUserProfile_1.NegUserProfile,
    negValidators_1.NegValidators,
    negUtil_1.NegUtil,
    negFeedback_1.NegFeedback,
    negMessageBox_1.NegMessageBox,
    negMultiTab_1.NegMultiTab
];


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(44);
var isObject_1 = __webpack_require__(21);
var isFunction_1 = __webpack_require__(20);
var tryCatch_1 = __webpack_require__(45);
var errorObject_1 = __webpack_require__(22);
var UnsubscriptionError_1 = __webpack_require__(46);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComponentBase = /** @class */ (function () {
    function ComponentBase() {
    }
    ComponentBase.prototype.watch = function (key, watchFn) {
        if (watchFn === void 0) { watchFn = function (newVal, oldVal) { }; }
        var p = "$_$_" + key;
        this[p] = this[key];
        Object.defineProperty(this, key, {
            get: function () {
                return this[p];
            },
            set: function (value) {
                var oldVal = this[p];
                this[p] = value;
                watchFn(value, oldVal);
            }
        });
    };
    return ComponentBase;
}());
exports.ComponentBase = ComponentBase;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(5);
var NegTranslate = /** @class */ (function () {
    function NegTranslate(translateService) {
        this.translateService = translateService;
        translateService.setDefaultLang('en-us');
    }
    NegTranslate.prototype.use = function (lang) {
        this.translateService.use(lang);
    };
    NegTranslate.prototype.set = function (moduleName, langObj) {
        var _this = this;
        Object.keys(langObj).forEach(function (lang) {
            var obj = langObj[lang];
            _this.translateService.setTranslation(lang, (_a = {}, _a[moduleName] = obj, _a), true);
            var _a;
        });
    };
    NegTranslate.prototype.get = function (key) {
        return this.translateService.instant(key);
    };
    NegTranslate.prototype.getCurrentLang = function () {
        return this.translateService.currentLang;
    };
    NegTranslate = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], NegTranslate);
    return NegTranslate;
}());
exports.NegTranslate = NegTranslate;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(7);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negAjax_1 = __webpack_require__(4);
var negStorage_1 = __webpack_require__(34);
var NegAuth = /** @class */ (function () {
    function NegAuth(negAjax, negStorage) {
        this.negAjax = negAjax;
        this.negStorage = negStorage;
        this._authorizedUrls = [];
        this._isAuthenticated = false;
        this._noPermissionMenus = [];
    }
    NegAuth.prototype.setAuthData = function (authData) {
        this._authData = authData;
        this._authData.newkitToken = this.negStorage.cookie.get('x-newkit-token');
        this._isAuthenticated = true;
        this._processAuthDataForNoPermissionMenus(authData.menus);
    };
    NegAuth.prototype._processAuthDataForNoPermissionMenus = function (menus, unauthorized) {
        var _this = this;
        if (unauthorized === void 0) { unauthorized = false; }
        menus.forEach(function (item) {
            var hasPermission = true;
            if (item.AuthorizeType === 'keystone') {
                var funArr_1 = (item.FunctionName || '').split(',');
                hasPermission = !!_this._authData.functions.find(function (x) { return x.ApplicationId.toString() === item.ApplicationId.toString() && funArr_1.includes(x.Name); });
            }
            if (unauthorized || !hasPermission) {
                if (item.subMenus && item.subMenus.length > 0) {
                    _this._processAuthDataForNoPermissionMenus(item.subMenus, true);
                }
                else {
                    _this._noPermissionMenus.push(item.Url);
                }
            }
            else {
                if (item.subMenus && item.subMenus.length > 0) {
                    // 非叶子节点
                    _this._processAuthDataForNoPermissionMenus(item.subMenus);
                }
                else {
                    _this._authorizedUrls.push(item.Url);
                }
            }
        });
    };
    NegAuth.prototype.canVisitUrl = function (url) {
        return this._authorizedUrls.includes(url);
    };
    NegAuth.prototype.setAuthorizedUrls = function (authorizedUrls) {
        this._authorizedUrls = authorizedUrls;
    };
    Object.defineProperty(NegAuth.prototype, "authData", {
        get: function () {
            return this._authData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegAuth.prototype, "user", {
        get: function () {
            return this.authData.userInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegAuth.prototype, "userId", {
        get: function () {
            return this.user.UserID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegAuth.prototype, "displayName", {
        get: function () {
            return this.user.DisplayName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegAuth.prototype, "newkitToken", {
        get: function () {
            return this.authData.newkitToken;
        },
        enumerable: true,
        configurable: true
    });
    NegAuth.prototype.isAuthenticated = function () {
        return this._isAuthenticated;
    };
    NegAuth.prototype.isAuthorizedPath = function (path) {
        return this._authorizedUrls.indexOf(path) >= 0;
    };
    /**
     * 通过AppId获取token
     * @param  {number} appId
     * @returns Promise
     */
    NegAuth.prototype.getOAuthToken = function (appId) {
        var postData = {
            username: this.userId,
            client_id: appId
        };
        var newkitToken = this.newkitToken;
        if (newkitToken) {
            return this.negAjax.post(NewkitConf.NewkitAPI + "/token", postData, { headers: { 'x-newkit-token': newkitToken } })
                .then(function (_a) {
                var data = _a.data;
                return data.access_token;
            });
        }
        else {
            return Promise.reject(new Error('Must login'));
        }
    };
    /**
     * 通过用户ID获取token
     */
    NegAuth.prototype.getTokenByWithRole = function () {
        return this.negAjax.get(NewkitConf.APIGatewayAddress + "/apiservice/v1/auth/basic/token/" + this.userId)
            .then(function (_a) {
            var data = _a.data;
            return data.Token;
        });
    };
    /**
     * 检查用户权限
     * @param  {string} appId AppId
     * @param  {string} functionName 权限名称
     * @returns boolean
     */
    NegAuth.prototype.hasFunction = function (appId, functionName) {
        var userFunctions = this.authData.functions || [];
        for (var _i = 0, userFunctions_1 = userFunctions; _i < userFunctions_1.length; _i++) {
            var fun = userFunctions_1[_i];
            if (fun.ApplicationId === appId && fun.Name === functionName) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查用户权限
     * @param  {string} appName app名称
     * @param  {string} functionName 权限名称
     * @returns boolean
     */
    NegAuth.prototype.hasFunctionByAppName = function (appName, functionName) {
        var appId = NewkitConf.Applications[appName];
        if (!appId) {
            return false;
        }
        return this.hasFunction(appId, functionName);
    };
    /**
     * 检查用户权限
     * @param  {string} functionName 权限名称
     * @returns boolean
     */
    NegAuth.prototype.hasFunctionByName = function (functionName) {
        var userFunctions = this.authData.functions || [];
        for (var _i = 0, userFunctions_2 = userFunctions; _i < userFunctions_2.length; _i++) {
            var fun = userFunctions_2[_i];
            if (fun.Name === functionName) {
                return true;
            }
        }
        return false;
    };
    NegAuth = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negAjax_1.NegAjax,
            negStorage_1.NegStorage])
    ], NegAuth);
    return NegAuth;
}());
exports.NegAuth = NegAuth;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var rxjs_1 = __webpack_require__(72);
var eventMap = new Map();
var NegEventBus = /** @class */ (function () {
    function NegEventBus() {
    }
    NegEventBus.prototype.emit = function (eventName, data) {
        if (eventMap.has(eventName)) {
            eventMap.get(eventName).source.next(data);
            return true;
        }
        ;
        return false;
    };
    NegEventBus.prototype.on = function (eventName, handler) {
        var eventObservable;
        if (!eventMap.has(eventName)) {
            var eventSource = new rxjs_1.Subject();
            eventObservable = eventSource.asObservable();
            eventMap.set(eventName, { source: eventSource, observable: eventObservable });
        }
        else {
            eventObservable = eventMap.get(eventName).observable;
        }
        return eventObservable.subscribe(handler);
    };
    NegEventBus.prototype.once = function (eventName, handler) {
        var sub;
        var fn = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            handler.apply(void 0, params);
            if (sub) {
                sub.unsubscribe();
            }
        };
        sub = this.on(eventName, fn);
    };
    NegEventBus = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], NegEventBus);
    return NegEventBus;
}());
exports.NegEventBus = NegEventBus;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negUtil_1 = __webpack_require__(6);
var negTranslate_1 = __webpack_require__(11);
var negMessageBox_1 = __webpack_require__(32);
var noop = function () { };
var defaults = {
    type: 'info',
    theme: 'flat',
    hideAfter: 3,
    showCloseButton: true,
    escapeText: true
};
var typesOpt = {
    warn: { color: '#C79121', icon: 'fa fa-shield fadeInLeft animated' },
    error: { color: '#C46A69', icon: 'fa fa-warning shake animated' },
    success: { color: '#739E73', icon: 'fa fa-check' },
    info: { color: '#3276B1', icon: 'fa fa-bell swing animated' },
};
var NegAlert = /** @class */ (function () {
    function NegAlert(negUtil, negTranslate, negMessageBox) {
        this.negUtil = negUtil;
        this.negTranslate = negTranslate;
        this.negMessageBox = negMessageBox;
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-top',
            theme: 'flat'
        };
        this.messageBox = Messenger();
    }
    NegAlert.prototype.info = function (message, callback, userOpt, useMessenger) {
        if (userOpt === void 0) { userOpt = {}; }
        if (useMessenger === void 0) { useMessenger = false; }
        if (useMessenger) {
            var opt = Object.assign({}, userOpt, { type: 'info', callback: callback, message: message });
            return this._post(opt);
        }
        else {
            return this.negMessageBox.info(message, null, callback, userOpt);
        }
    };
    NegAlert.prototype.success = function (message, callback, userOpt, useMessenger) {
        if (userOpt === void 0) { userOpt = {}; }
        if (useMessenger === void 0) { useMessenger = false; }
        if (useMessenger) {
            var opt = Object.assign({}, userOpt, { type: 'success', callback: callback, message: message });
            return this._post(opt);
        }
        else {
            return this.negMessageBox.success(message, null, callback, userOpt);
        }
    };
    NegAlert.prototype.warn = function (message, callback, userOpt, useMessenger) {
        if (userOpt === void 0) { userOpt = {}; }
        if (useMessenger === void 0) { useMessenger = false; }
        if (useMessenger) {
            var opt = Object.assign({}, userOpt, { type: 'warn', callback: callback, message: message });
            return this._post(opt);
        }
        else {
            return this.negMessageBox.warn(message, null, callback, userOpt);
        }
    };
    NegAlert.prototype.error = function (message, callback, userOpt, useMessenger) {
        if (userOpt === void 0) { userOpt = {}; }
        if (useMessenger === void 0) { useMessenger = false; }
        if (useMessenger) {
            var opt = Object.assign({}, userOpt, { type: 'error', callback: callback, message: message });
            return this._post(opt);
        }
        else {
            return this.negMessageBox.error(message, null, callback, userOpt);
        }
    };
    NegAlert.prototype.alert = function (message, callback, userOpt, useMessenger) {
        if (userOpt === void 0) { userOpt = {}; }
        if (useMessenger === void 0) { useMessenger = false; }
        if (useMessenger) {
            var okText = this.negTranslate.get('core.negAlert.okText');
            var opt = Object.assign({}, userOpt, {
                message: message,
                type: 'error',
                showCloseButton: false,
                seconds: 60 * 60 * 24 * 15,
                actions: (_a = {},
                    _a[okText] = callback || noop,
                    _a)
            });
            return this._post(opt);
        }
        else {
            return this.negMessageBox.alert(message, null, callback, userOpt);
        }
        var _a;
    };
    NegAlert.prototype.confirm = function (message, okCallback, cancelCallback, userOpt, useMessenger) {
        if (userOpt === void 0) { userOpt = {}; }
        if (useMessenger === void 0) { useMessenger = false; }
        if (useMessenger) {
            var $backdrop = this._getBackdrop();
            var okText = this.negTranslate.get('core.negAlert.okText');
            var cancelText = this.negTranslate.get('core.negAlert.cancelText');
            var opt = Object.assign({}, userOpt, {
                message: message,
                type: 'info',
                showCloseButton: false,
                seconds: 60 * 60 * 24 * 15,
                actions: (_a = {},
                    _a[okText] = okCallback || noop,
                    _a[cancelText] = cancelCallback || noop,
                    _a)
            });
            return this._post(opt, $backdrop);
        }
        else {
            return this.negMessageBox.confirm(message, null, okCallback, cancelCallback, userOpt);
        }
        var _a;
    };
    NegAlert.prototype._getBackdrop = function () {
        var $ = window['jQuery'];
        var $backdrop = $('#alert-modal-backdrop');
        if ($backdrop.length === 0) {
            $backdrop = $('<div id="alert-modal-backdrop" class="modal-backdrop fade in" style="z-index: 10100;"><input id="input_messenger_placeholder_jay" style="margin-left:-1000px;"></div>').appendTo($('body'));
        }
        return $backdrop;
    };
    NegAlert.prototype.show = function (message, userOpt) {
        if (userOpt === void 0) { userOpt = {}; }
        var opt = Object.assign({ type: 'info' }, userOpt, { message: message });
        return this._post(opt);
    };
    NegAlert.prototype._post = function (options, backdrop) {
        var opt = Object.assign({}, defaults);
        ['type', 'theme', 'closeButtonText', 'onClickClose', 'message'].forEach(function (p) {
            opt[p] = options[p];
        });
        if (options.showCloseButton === false) {
            opt.showCloseButton = false;
        }
        if (options.allowHtml) {
            opt.escapeText = false;
        }
        if (options.seconds) {
            opt.hideAfter = options.seconds;
        }
        if (options.actions) {
            opt.actions = {};
            Object.keys(options.actions).forEach(function (label, idx) {
                opt.actions["btn" + (idx + 1)] = {
                    label: label,
                    action: function (evt, msg) {
                        Promise.resolve(options.actions[label](msg))
                            .then(function (notCancel) {
                            if (notCancel !== false) {
                                msg.hide();
                            }
                        });
                    }
                };
            });
        }
        var ins = this.messageBox.post(opt);
        if (typeof options.callback === 'function') {
            this.negUtil.addWatcher(ins, 'shown', function (newVal, oldVal) {
                if (oldVal !== newVal && !newVal) {
                    options.callback(ins);
                }
            }, ins.shown);
        }
        ins.on('hide', function () {
            backdrop && backdrop.remove();
        });
        return ins;
    };
    NegAlert.prototype.close = function (ins) {
        if (ins && typeof ins.hide === 'function') {
            ins.hide();
        }
        if (typeof ins === 'string') {
            this.negMessageBox.close(ins);
        }
    };
    NegAlert.prototype.closeAll = function () {
        this.messageBox.hideAll();
        this.negMessageBox.closeAll();
    };
    NegAlert.prototype.notify = function (content, callback, userOpt) {
        if (userOpt === void 0) { userOpt = {}; }
        var opt = Object.assign({}, userOpt, {
            content: content,
            callback: callback
        });
        return this._notify(opt, userOpt);
    };
    NegAlert.prototype._notify = function (opt, userOpt) {
        if (!userOpt.hasOwnProperty('title')) {
            opt.title = 'Notify';
        }
        var typeOpt = typesOpt[opt.type];
        if (typeOpt) {
            opt.color = typeOpt.color;
            opt.icon = typeOpt.icon;
        }
        $.bigBox(opt, opt.callback || noop);
    };
    NegAlert = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negUtil_1.NegUtil,
            negTranslate_1.NegTranslate,
            negMessageBox_1.NegMessageBox])
    ], NegAlert);
    return NegAlert;
}());
exports.NegAlert = NegAlert;
;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
var ScalarObservable_1 = __webpack_require__(48);
var EmptyObservable_1 = __webpack_require__(14);
var isScheduler_1 = __webpack_require__(26);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(7);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var noop_1 = __webpack_require__(47);
/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
var Subscriber_1 = __webpack_require__(1);
var Subscription_1 = __webpack_require__(9);
var ObjectUnsubscribedError_1 = __webpack_require__(52);
var SubjectSubscription_1 = __webpack_require__(53);
var rxSubscriber_1 = __webpack_require__(13);
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
function refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
exports.refCount = refCount;
var RefCountOperator = (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=refCount.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(7);
var isArrayLike_1 = __webpack_require__(58);
var isPromise_1 = __webpack_require__(59);
var isObject_1 = __webpack_require__(21);
var Observable_1 = __webpack_require__(3);
var iterator_1 = __webpack_require__(60);
var InnerSubscriber_1 = __webpack_require__(61);
var observable_1 = __webpack_require__(24);
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {@link elementAt}
 * @see {@link take}
 * @see {@link takeLast}
 *
 * @class ArgumentOutOfRangeError
 */
var ArgumentOutOfRangeError = (function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var err = _super.call(this, 'argument out of range');
        this.name = err.name = 'ArgumentOutOfRangeError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ArgumentOutOfRangeError;
}(Error));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negTranslate_1 = __webpack_require__(11);
var typesOpt = {
    warn: { title: 'Warn' },
    error: { title: 'Error' },
    success: { title: 'Success' },
    info: { title: 'Information' },
};
var NegMessageBox = /** @class */ (function () {
    function NegMessageBox(negTranslate) {
        this.negTranslate = negTranslate;
        this._instances = new Map();
    }
    NegMessageBox.prototype.info = function (message, title, callback, userOpt) {
        if (userOpt === void 0) { userOpt = {}; }
        userOpt = userOpt || {};
        var opt = Object.assign({}, userOpt, {
            mode: 'normal',
            type: 'info',
            title: title || typesOpt.info.title,
            autoClose: true,
            closeCb: callback,
            message: message
        });
        return this._showMessageBox(opt);
    };
    NegMessageBox.prototype.success = function (message, title, callback, userOpt) {
        if (userOpt === void 0) { userOpt = {}; }
        userOpt = userOpt || {};
        var opt = Object.assign({}, userOpt, {
            mode: 'normal',
            type: 'success',
            title: title || typesOpt.success.title,
            autoClose: true,
            closeCb: callback,
            message: message
        });
        return this._showMessageBox(opt);
    };
    NegMessageBox.prototype.warn = function (message, title, callback, userOpt) {
        if (userOpt === void 0) { userOpt = {}; }
        userOpt = userOpt || {};
        var opt = Object.assign({}, userOpt, {
            mode: 'normal',
            type: 'warn',
            title: title || typesOpt.warn.title,
            autoClose: true,
            closeCb: callback,
            message: message
        });
        return this._showMessageBox(opt);
    };
    NegMessageBox.prototype.error = function (message, title, callback, userOpt) {
        if (userOpt === void 0) { userOpt = {}; }
        userOpt = userOpt || {};
        var opt = Object.assign({}, userOpt, {
            mode: 'normal',
            type: 'error',
            title: title || typesOpt.error.title,
            autoClose: true,
            closeCb: callback,
            message: message
        });
        return this._showMessageBox(opt);
    };
    NegMessageBox.prototype.alert = function (message, title, callback, userOpt) {
        if (userOpt === void 0) { userOpt = {}; }
        userOpt = userOpt || {};
        var okText = this.negTranslate.get('core.negAlert.okText');
        var type = typesOpt[userOpt.type] ? userOpt.type : 'info';
        var opt = Object.assign({}, userOpt, {
            mode: 'alert',
            type: type,
            title: title || typesOpt[type].title,
            autoClose: false,
            showCloseBtn: false,
            okCallback: callback,
            okText: okText,
            message: message
        });
        return this._showMessageBox(opt);
    };
    NegMessageBox.prototype.confirm = function (message, title, okCallback, cancelCallback, userOpt) {
        if (userOpt === void 0) { userOpt = {}; }
        var okText = this.negTranslate.get('core.negAlert.okText');
        var cancelText = this.negTranslate.get('core.negAlert.cancelText');
        var type = typesOpt[userOpt.type] ? userOpt.type : 'warning';
        var opt = Object.assign({}, userOpt, {
            mode: 'confirm',
            type: type,
            title: title || 'Confirm',
            autoClose: false,
            showCloseBtn: false,
            okCallback: okCallback,
            cancelCallback: cancelCallback,
            okText: okText,
            cancelText: cancelText,
            message: message
        });
        return this._showMessageBox(opt);
    };
    NegMessageBox.prototype.close = function (id) {
        if (typeof id !== 'string')
            return;
        var msgbox = this._instances.get(id);
        if (msgbox)
            msgbox.hide();
    };
    NegMessageBox.prototype.closeAll = function () {
        if (this._instances) {
            this._instances.forEach(function (value) {
                value.hide();
            });
        }
    };
    NegMessageBox.prototype._showMessageBox = function (opt) {
        this._checkWarpper();
        if (opt.seconds && !opt.timeout && Number.isInteger(opt.seconds)) {
            opt.timeout = opt.seconds * 1000;
        }
        var msgbox = new MessageBox(opt, this._onBoxClose.bind(this));
        if (this._wrapper.children.length === 0) {
            this._wrapper.appendChild(msgbox.domElement);
        }
        else {
            this._wrapper.insertBefore(msgbox.domElement, this._wrapper.children[0]);
        }
        this._instances.set(msgbox.id, msgbox);
        msgbox.show();
        return msgbox.id;
    };
    NegMessageBox.prototype._onBoxClose = function (id) {
        this._instances.delete(id);
    };
    NegMessageBox.prototype._checkWarpper = function () {
        this._wrapper = document.querySelector('.nk-message-box-warpper');
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('nk-message-box-warpper');
            document.body.appendChild(this._wrapper);
        }
    };
    NegMessageBox = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negTranslate_1.NegTranslate])
    ], NegMessageBox);
    return NegMessageBox;
}());
exports.NegMessageBox = NegMessageBox;
var MessageBox = /** @class */ (function () {
    function MessageBox(opt, closeCb) {
        this.opt = opt;
        this.opt.timeout = this.opt.timeout || 3000;
        this.closeCb = closeCb;
        this.id = "msg_box_" + new Date().valueOf() + "_" + Math.floor(Math.random() * 10000);
        this._buildElement();
    }
    MessageBox.prototype.show = function () {
        window['jQuery'](this.domElement).show();
        this._autoClose();
        if (this.opt.mode === 'confirm') {
            this.backdrop = this._getBackdrop();
        }
    };
    MessageBox.prototype.hide = function () {
        var _this = this;
        if (this.timer)
            clearTimeout(this.timer);
        window['jQuery'](this.domElement).slideUp('fast', function () {
            _this.domElement.remove();
            if (_this.backdrop) {
                var count = +_this.backdrop.attr('data-count');
                if (count === 1) {
                    _this.backdrop.remove();
                }
                else {
                    count--;
                    _this.backdrop.attr('data-count', count);
                }
            }
            if (_this.closeCb)
                _this.closeCb(_this.id);
            if (_this.opt.mode === 'normal' && _this.opt.closeCb && typeof _this.opt.closeCb === 'function') {
                _this.opt.closeCb();
            }
        });
    };
    MessageBox.prototype.onCloseBtnClick = function (evt) {
        this.hide();
    };
    MessageBox.prototype.onMouseEnter = function (evt) {
        if (this.timer)
            clearTimeout(this.timer);
    };
    MessageBox.prototype.onMouseLeave = function (evt) {
        this._autoClose();
    };
    MessageBox.prototype.onOkBtnClick = function (evt) {
        this.hide();
        if (this.opt.mode !== 'normal' && this.opt.okCallback && typeof this.opt.okCallback === 'function') {
            this.opt.okCallback();
        }
    };
    MessageBox.prototype.onCancelBtnClick = function (evt) {
        this.hide();
        if (this.opt.mode === 'confirm' && this.opt.cancelCallback && typeof this.opt.cancelCallback === 'function') {
            this.opt.cancelCallback();
        }
    };
    MessageBox.prototype._autoClose = function () {
        var _this = this;
        if (!this.opt.autoClose)
            return;
        if (this.timer)
            clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.hide();
        }, this.opt.timeout);
    };
    MessageBox.prototype._buildElement = function () {
        var boxItem = document.createElement('div');
        boxItem.id = this.id;
        boxItem.style.display = 'none';
        (_a = boxItem.classList).add.apply(_a, ['nk-message-box', this.opt.type]);
        var boxTitle = document.createElement('div');
        boxTitle.classList.add('box-title');
        boxTitle.innerHTML = "<div class=\"header\">" + this.opt.title + "</div>";
        if (this.opt.showCloseBtn !== false) {
            var closeBtn = document.createElement('div');
            closeBtn.classList.add('close-btn');
            closeBtn.innerHTML = '<i class="fa fa-remove"></i>';
            closeBtn.onclick = this.onCloseBtnClick.bind(this);
            boxTitle.appendChild(closeBtn);
        }
        boxItem.appendChild(boxTitle);
        var boxContent = document.createElement('div');
        boxContent.classList.add('box-content');
        if (this.opt.allowHtml) {
            boxContent.innerHTML = this.opt.message;
        }
        else {
            boxContent.innerText = this.opt.message;
        }
        boxItem.appendChild(boxContent);
        if (this.opt.mode === 'alert' || this.opt.mode === 'confirm') {
            var boxFooter = document.createElement('div');
            boxFooter.classList.add('box-footer');
            var okBtn = document.createElement('button');
            okBtn.classList.add('nk-button');
            okBtn.textContent = this.opt.okText;
            okBtn.onclick = this.onOkBtnClick.bind(this);
            boxFooter.appendChild(okBtn);
            if (this.opt.mode === 'confirm') {
                okBtn.classList.add('nk-button-primary');
                var cancelBtn = document.createElement('button');
                cancelBtn.classList.add('nk-button');
                cancelBtn.textContent = this.opt.cancelText;
                cancelBtn.onclick = this.onCancelBtnClick.bind(this);
                boxFooter.appendChild(cancelBtn);
            }
            boxItem.appendChild(boxFooter);
        }
        boxItem.onmouseenter = this.onMouseEnter.bind(this);
        boxItem.onmouseleave = this.onMouseLeave.bind(this);
        this.domElement = boxItem;
        var _a;
    };
    MessageBox.prototype._getBackdrop = function () {
        var $ = window['jQuery'];
        var $backdrop = $('#msg_box_backdrop');
        if ($backdrop.length === 0) {
            $backdrop = $('<div id="msg_box_backdrop" class="modal-backdrop fade in" style="z-index: 1000190;" data-count="1"></div>').appendTo($('body'));
        }
        else {
            var count = +$backdrop.attr('data-count');
            count++;
            $backdrop.attr('data-count', count);
        }
        return $backdrop;
    };
    return MessageBox;
}());


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NegGlobalLoading = /** @class */ (function () {
    function NegGlobalLoading() {
        this._init();
    }
    NegGlobalLoading.prototype._init = function () {
        this.loadingEl = document.querySelector('#loading-target');
    };
    NegGlobalLoading.prototype.show = function (text) {
        this.loadingEl.style.display = 'block';
        var loadingTextEl = this.loadingEl.querySelector('.loading-text');
        loadingTextEl && (loadingTextEl.innerHTML = text || '');
    };
    NegGlobalLoading.prototype.hide = function () {
        this.loadingEl.style.display = 'none';
    };
    NegGlobalLoading = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], NegGlobalLoading);
    return NegGlobalLoading;
}());
exports.NegGlobalLoading = NegGlobalLoading;
;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negUtil_1 = __webpack_require__(6);
var isPlainObject = function (value) { return !!value && Object.prototype.toString.call(value) === '[object Object]'; };
var CookieStorage = /** @class */ (function () {
    function CookieStorage(negUtil) {
        this.negUtil = negUtil;
    }
    CookieStorage.prototype.get = function (name) {
        var nameEq = name + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var c = cookies[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEq) === 0) {
                return this.negUtil.unescape(c.substring(nameEq.length, c.length));
            }
        }
        return null;
    };
    CookieStorage.prototype.set = function (name, value, options) {
        var _this = this;
        if (isPlainObject(name)) {
            Object.keys(name).forEach(function (k) {
                _this.set(k, name[k], value);
            });
            return;
        }
        var opt = isPlainObject(options) ? options : { expires: options };
        var expires = opt.expires !== undefined ? opt.expires : '';
        var expiresType = typeof (expires);
        var path = opt.path !== undefined ? ';path=' + opt.path : ';path=/';
        var domain = opt.domain ? ';domain=' + opt.domain : '';
        var secure = opt.secure ? ';secure=' + opt.secure : '';
        // 过期时间
        if (expiresType === 'string' && expires !== '') {
            expires = new Date(expires);
        }
        else if (expiresType === 'number') {
            expires = new Date(+new Date + 1000 * 60 * 60 * 24 * expires);
        }
        if (expires !== '' && 'toGMTString' in expires) {
            expires = ';expires=' + expires.toGMTString();
        }
        document.cookie = name + '=' + this.negUtil.escape(value) + expires + path + domain + secure; // 转码并赋值    
    };
    CookieStorage.prototype.remove = function (name) {
        this.set(name, '', -1);
    };
    CookieStorage.prototype.clear = function () {
        var _this = this;
        var cookies = document.cookie.split(';');
        cookies.forEach(function (c) {
            var name = c.split('=')[0];
            _this.remove(name);
        });
    };
    return CookieStorage;
}());
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        if (!window.localStorage) {
            console.warn('local storage not supported.');
        }
    }
    LocalStorage.prototype.set = function (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    };
    LocalStorage.prototype.get = function (key) {
        var value = window.localStorage.getItem(key);
        return JSON.parse(value);
    };
    LocalStorage.prototype.remove = function (key) {
        window.localStorage.removeItem(key);
    };
    LocalStorage.prototype.clear = function () {
        window.localStorage.clear();
    };
    return LocalStorage;
}());
var SessionStorage = /** @class */ (function () {
    function SessionStorage() {
        if (!window.sessionStorage) {
            console.warn('session storage not supported.');
        }
    }
    SessionStorage.prototype.set = function (key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    };
    SessionStorage.prototype.get = function (key) {
        var value = window.sessionStorage.getItem(key);
        return JSON.parse(value);
    };
    SessionStorage.prototype.remove = function (key) {
        window.sessionStorage.removeItem(key);
    };
    SessionStorage.prototype.clear = function () {
        window.sessionStorage.clear();
    };
    return SessionStorage;
}());
var memoryMap = new Map();
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage() {
        if (!window.sessionStorage) {
            console.warn('session storage not supported.');
        }
    }
    MemoryStorage.prototype.set = function (key, value) {
        memoryMap.set(key, value);
    };
    MemoryStorage.prototype.get = function (key) {
        return memoryMap.get(key);
    };
    MemoryStorage.prototype.remove = function (key) {
        memoryMap.delete(key);
    };
    MemoryStorage.prototype.clear = function () {
        memoryMap.clear();
    };
    return MemoryStorage;
}());
var NegStorage = /** @class */ (function () {
    function NegStorage(negUtil) {
        this.negUtil = negUtil;
        this.cookie = new CookieStorage(negUtil);
        this.local = new LocalStorage();
        this.session = new SessionStorage();
        this.memory = new MemoryStorage();
    }
    NegStorage = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negUtil_1.NegUtil])
    ], NegStorage);
    return NegStorage;
}());
exports.NegStorage = NegStorage;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var to_array_pipe_1 = __webpack_require__(80);
exports.ToArrayPipe = to_array_pipe_1.ToArrayPipe;
var menu_translate_pipe_1 = __webpack_require__(81);
exports.MenuTranslatePipe = menu_translate_pipe_1.MenuTranslatePipe;
var prefix_translate_pipe_1 = __webpack_require__(82);
exports.PrefixTranslatePipe = prefix_translate_pipe_1.PrefixTranslatePipe;
exports.CORE_PIPES = [
    to_array_pipe_1.ToArrayPipe,
    menu_translate_pipe_1.MenuTranslatePipe,
    prefix_translate_pipe_1.PrefixTranslatePipe
];


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_36__;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(111);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(39);
__webpack_require__(40);
__export(__webpack_require__(8));
__export(__webpack_require__(35));
__export(__webpack_require__(83));
__export(__webpack_require__(5));


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_41__;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayObservable_1 = __webpack_require__(19);
exports.of = ArrayObservable_1.ArrayObservable.of;
//# sourceMappingURL=of.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(1);
var rxSubscriber_1 = __webpack_require__(13);
var Observer_1 = __webpack_require__(23);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(22);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
exports.ScalarObservable = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var multicast_1 = __webpack_require__(50);
var refCount_1 = __webpack_require__(28);
var Subject_1 = __webpack_require__(27);
function shareSubjectFactory() {
    return new Subject_1.Subject();
}
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 * This is an alias for .multicast(() => new Subject()).refCount().
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
 * @method share
 * @owner Observable
 */
function share() {
    return function (source) { return refCount_1.refCount()(multicast_1.multicast(shareSubjectFactory)(source)); };
}
exports.share = share;
;
//# sourceMappingURL=share.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ConnectableObservable_1 = __webpack_require__(51);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} An Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        var connectable = Object.create(source, ConnectableObservable_1.connectableObservableDescriptor);
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    };
}
exports.multicast = multicast;
var MulticastOperator = (function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}());
exports.MulticastOperator = MulticastOperator;
//# sourceMappingURL=multicast.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(27);
var Observable_1 = __webpack_require__(3);
var Subscriber_1 = __webpack_require__(1);
var Subscription_1 = __webpack_require__(9);
var refCount_1 = __webpack_require__(28);
/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._refCount = 0;
        this._isComplete = false;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription_1.Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount_1.refCount()(this);
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
var connectableProto = ConnectableObservable.prototype;
exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableSubscriber = (function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(Subject_1.SubjectSubscriber));
var RefCountOperator = (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=ConnectableObservable.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(9);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(3);
var ArrayObservable_1 = __webpack_require__(19);
var mergeAll_1 = __webpack_require__(56);
var isScheduler_1 = __webpack_require__(26);
/* tslint:enable:max-line-length */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return function (source) { return source.lift.call(mergeStatic.apply(void 0, [source].concat(observables))); };
}
exports.merge = merge;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // timer will emit ascending values, one every second(1000ms) to console
 * // clicks logs MouseEvents to console everytime the "document" is clicked
 * // Since the two streams are merged you see these happening
 * // as they occur.
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - First timer1 and timer2 will run concurrently
 * // - timer1 will emit a value every 1000ms for 10 iterations
 * // - timer2 will emit a value every 2000ms for 6 iterations
 * // - after timer1 hits it's max iteration, timer2 will
 * //   continue, and timer3 will start to run concurrently with timer2
 * // - when timer2 hits it's max iteration it terminates, and
 * //   timer3 will continue to emit a value every 500ms until it is complete
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {...ObservableInput} observables Input Observables to merge together.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
        return observables[0];
    }
    return mergeAll_1.mergeAll(concurrent)(new ArrayObservable_1.ArrayObservable(observables, scheduler));
}
exports.mergeStatic = mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeMap_1 = __webpack_require__(57);
var identity_1 = __webpack_require__(62);
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return mergeMap_1.mergeMap(identity_1.identity, null, concurrent);
}
exports.mergeAll = mergeAll;
//# sourceMappingURL=mergeAll.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var subscribeToResult_1 = __webpack_require__(29);
var OuterSubscriber_1 = __webpack_require__(30);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return function mergeMapOperatorFunction(source) {
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
            resultSelector = null;
        }
        return source.lift(new MergeMapOperator(project, resultSelector, concurrent));
    };
}
exports.mergeMap = mergeMap;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
exports.MergeMapOperator = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapSubscriber = MergeMapSubscriber;
//# sourceMappingURL=mergeMap.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(7);
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function identity(x) {
    return x;
}
exports.identity = identity;
//# sourceMappingURL=identity.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(30);
var subscribeToResult_1 = __webpack_require__(29);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return function switchMapOperatorFunction(source) {
        return source.lift(new SwitchMapOperator(project, resultSelector));
    };
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var reduce_1 = __webpack_require__(65);
function toArrayReducer(arr, item, index) {
    arr.push(item);
    return arr;
}
function toArray() {
    return reduce_1.reduce(toArrayReducer, []);
}
exports.toArray = toArray;
//# sourceMappingURL=toArray.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var scan_1 = __webpack_require__(66);
var takeLast_1 = __webpack_require__(67);
var defaultIfEmpty_1 = __webpack_require__(68);
var pipe_1 = __webpack_require__(25);
/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {@link scan} followed by operator {@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link count}
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link scan}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
 * called on each source value.
 * @param {R} [seed] The initial accumulation value.
 * @return {Observable<R>} An Observable that emits a single value that is the
 * result of accumulating the values emitted by the source Observable.
 * @method reduce
 * @owner Observable
 */
function reduce(accumulator, seed) {
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        return function reduceOperatorFunctionWithSeed(source) {
            return pipe_1.pipe(scan_1.scan(accumulator, seed), takeLast_1.takeLast(1), defaultIfEmpty_1.defaultIfEmpty(seed))(source);
        };
    }
    return function reduceOperatorFunction(source) {
        return pipe_1.pipe(scan_1.scan(function (acc, value, index) {
            return accumulator(acc, value, index + 1);
        }), takeLast_1.takeLast(1))(source);
    };
}
exports.reduce = reduce;
//# sourceMappingURL=reduce.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator
 * The accumulator function called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    var hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return function scanOperatorFunction(source) {
        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
    };
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) { hasSeed = false; }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this._seed = _seed;
        this.hasSeed = hasSeed;
        this.index = 0;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=scan.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
var ArgumentOutOfRangeError_1 = __webpack_require__(31);
var EmptyObservable_1 = __webpack_require__(14);
/**
 * Emits only the last `count` values emitted by the source Observable.
 *
 * <span class="informal">Remembers the latest `count` values, then emits those
 * only when the source completes.</span>
 *
 * <img src="./img/takeLast.png" width="100%">
 *
 * `takeLast` returns an Observable that emits at most the last `count` values
 * emitted by the source Observable. If the source emits fewer than `count`
 * values then all of its values are emitted. This operator must wait until the
 * `complete` notification emission from the source in order to emit the `next`
 * values on the output Observable, because otherwise it is impossible to know
 * whether or not more values will be emitted on the source. For this reason,
 * all values are emitted synchronously, followed by the complete notification.
 *
 * @example <caption>Take the last 3 values of an Observable with many values</caption>
 * var many = Rx.Observable.range(1, 100);
 * var lastThree = many.takeLast(3);
 * lastThree.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of values to emit from the end of
 * the sequence of values emitted by the source Observable.
 * @return {Observable<T>} An Observable that emits at most the last count
 * values emitted by the source Observable.
 * @method takeLast
 * @owner Observable
 */
function takeLast(count) {
    return function takeLastOperatorFunction(source) {
        if (count === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else {
            return source.lift(new TakeLastOperator(count));
        }
    };
}
exports.takeLast = takeLast;
var TakeLastOperator = (function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeLastSubscriber = (function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.ring = new Array();
        this.count = 0;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=takeLast.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
/* tslint:enable:max-line-length */
/**
 * Emits a given value if the source Observable completes without emitting any
 * `next` value, otherwise mirrors the source Observable.
 *
 * <span class="informal">If the source Observable turns out to be empty, then
 * this operator will emit a default value.</span>
 *
 * <img src="./img/defaultIfEmpty.png" width="100%">
 *
 * `defaultIfEmpty` emits the values emitted by the source Observable or a
 * specified default value if the source Observable is empty (completes without
 * having emitted any `next` value).
 *
 * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
 * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link empty}
 * @see {@link last}
 *
 * @param {any} [defaultValue=null] The default value used if the source
 * Observable is empty.
 * @return {Observable} An Observable that emits either the specified
 * `defaultValue` if the source Observable emits no items, or the values emitted
 * by the source Observable.
 * @method defaultIfEmpty
 * @owner Observable
 */
function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
}
exports.defaultIfEmpty = defaultIfEmpty;
var DefaultIfEmptyOperator = (function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DefaultIfEmptySubscriber = (function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        _super.call(this, destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=defaultIfEmpty.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(1);
var ArgumentOutOfRangeError_1 = __webpack_require__(31);
var EmptyObservable_1 = __webpack_require__(14);
/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * <img src="./img/take.png" width="100%">
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
 * var interval = Rx.Observable.interval(1000);
 * var five = interval.take(5);
 * five.subscribe(x => console.log(x));
 *
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of `next` values to emit.
 * @return {Observable<T>} An Observable that emits only the first `count`
 * values emitted by the source Observable, or all of the values from the source
 * if the source emits fewer than `count` values.
 * @method take
 * @owner Observable
 */
function take(count) {
    return function (source) {
        if (count === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else {
            return source.lift(new TakeOperator(count));
        }
    };
}
exports.take = take;
var TakeOperator = (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeSubscriber = (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=take.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negAuth_1 = __webpack_require__(15);
var negAjax_1 = __webpack_require__(4);
var NegBizLog = /** @class */ (function () {
    function NegBizLog(negAuth, negAjax) {
        this.negAuth = negAuth;
        this.negAjax = negAjax;
    }
    /**
     * 记录EventTrace
     * @param {key} 常用key [ 'visit' | 'click' ]
     * @param {bizData} 是业务数据，原样存储
     * @param {keyData} 可选的关键数据，会把数据进行平铺存储
     * @param {label} 可选标识，如 Button 名字
     */
    NegBizLog.prototype.log = function (key, bizData, keyData, label) {
        var userId;
        try {
            userId = this.negAuth.userId;
        }
        catch (e) {
            userId = 'System';
        }
        var postData = Object.assign({
            key: key,
            userId: userId,
            createDate: Date.now(),
            pageUrl: location.pathname + location.hash,
            label: label
        }, keyData || {});
        postData.data = bizData;
        this._commitData(postData);
    };
    NegBizLog.prototype.tracePageView = function () {
        this.log('visit', null);
    };
    NegBizLog.prototype._commitData = function (data) {
        var NewkitConf = window['NewkitConf'];
        this.negAjax.post(NewkitConf.NewkitAPI + "/bizlog", data, { hideLoading: true })
            .then(function () {
        })
            .catch(function (err) { });
    };
    NegBizLog = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negAuth_1.NegAuth, negAjax_1.NegAjax])
    ], NegBizLog);
    return NegBizLog;
}());
exports.NegBizLog = NegBizLog;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negEventBus_1 = __webpack_require__(16);
var NegBreadcrumb = /** @class */ (function () {
    function NegBreadcrumb(negEventBus) {
        this.negEventBus = negEventBus;
    }
    NegBreadcrumb.prototype.setBreadcrumbs = function (breadcrumbs) {
        var _this = this;
        if (!_.isArray(breadcrumbs)) {
            return;
        }
        breadcrumbs = breadcrumbs.map(function (x) { return _this.processBreadcrumb(x); });
        this.negEventBus.emit('global.setBreadcrumbs', { force: true, breadcrumbs: breadcrumbs });
    };
    NegBreadcrumb.prototype.setLastBreadcrumb = function (lastBreadcrumb) {
        var breadcrumb = this.processBreadcrumb(lastBreadcrumb);
        this.negEventBus.emit('global.setLastBreadcrumb', breadcrumb);
    };
    NegBreadcrumb.prototype.processBreadcrumb = function (breadcrumb) {
        var result = { MenuName: breadcrumb['en-us'], Url: breadcrumb.url };
        result.MenuNameCn = breadcrumb['zh-cn'] || result.MenuName;
        result.MenuNameTw = breadcrumb['zh-tw'] || result.MenuName;
        return result;
    };
    NegBreadcrumb = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negEventBus_1.NegEventBus])
    ], NegBreadcrumb);
    return NegBreadcrumb;
}());
exports.NegBreadcrumb = NegBreadcrumb;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_72__;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negAjax_1 = __webpack_require__(4);
var negUtil_1 = __webpack_require__(6);
var configServiceMap = new Map();
var NegConfigService = /** @class */ (function () {
    function NegConfigService(negAjax, negUtil) {
        this.negAjax = negAjax;
        this.negUtil = negUtil;
    }
    /**
     * 加载config services.
     * @param  {string} system - 系统名称
     * @param  {string} key - 系统中的key
     * @param  {string} hashKey - 系统名称和key拼接的一个key
     * @param  {boolean} force? - 是否强制获取最新数据
     * @returns {Promise}
     */
    NegConfigService.prototype._load = function (system, key, hashKey, force, hideLoading) {
        var _this = this;
        var url = NewkitConf.configServiceAddress + "/" + this.negUtil.encodeUri(system) + "/" + this.negUtil.encodeUri(key);
        return new Promise(function (resolve, reject) {
            if (!force) {
                if (configServiceMap.has(hashKey)) {
                    return resolve(true);
                }
            }
            _this.negAjax.get(url, { hideLoading: !!hideLoading })
                .then(function (_a) {
                var data = _a.data;
                configServiceMap.set(hashKey, data);
                resolve(true);
            })
                .catch(function (reason) { return reject(reason); });
        });
    };
    /**
     * 获取指定system和key的config数据
     * @param  {string} system - 系统名称
     * @param  {string} key - 系统中的key
     * @param  {boolean} force? - 强制获取最新数据
     * @returns {Promise}
     */
    NegConfigService.prototype.get = function (system, key, force, hideLoading) {
        var _this = this;
        if (!system) {
            throw new Error('system param required.');
        }
        if (!key) {
            throw new Error('key param required.');
        }
        var hashKey = system + "+|*|+" + key;
        return new Promise(function (resolve, reject) {
            _this._load(system, key, hashKey, force, hideLoading)
                .then(function () {
                var config = configServiceMap.get(hashKey);
                if (config) {
                    return resolve(config.configValue);
                }
                resolve(null);
            })
                .catch(function (reason) { return reject(reason); });
        });
    };
    /**
     * 批量获取config数据
     * @param  {Array<string>} paths - 系统名称. e.g. ['/system/config1', 'system/config2']
     * @returns {Promise}
     */
    NegConfigService.prototype.batchQuery = function (paths, hideLoading) {
        var _this = this;
        if (!paths || paths.length === 0) {
            throw new Error('paths param required and cannot be null or empty.');
        }
        return new Promise(function (resolve, reject) {
            var url = "http://localhost:8484/eggkeeper/v1/batch-query";
            _this.negAjax.post(url, paths, { hideLoading: !!hideLoading })
                .then(function (_a) {
                var data = _a.data;
                resolve(data);
            })
                .catch(function (reason) { return reject(reason); });
        });
    };
    NegConfigService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negAjax_1.NegAjax, negUtil_1.NegUtil])
    ], NegConfigService);
    return NegConfigService;
}());
exports.NegConfigService = NegConfigService;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negAuth_1 = __webpack_require__(15);
var NegDfisUploader = /** @class */ (function () {
    function NegDfisUploader(negAuth) {
        this.negAuth = negAuth;
    }
    NegDfisUploader.prototype._upload = function (dfisUrl, file, headers) {
        if (headers === void 0) { headers = {}; }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', dfisUrl);
            Object.keys(headers).forEach(function (key) {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.addEventListener('readystatechange', function (evt) {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status !== 200) {
                        return reject(xhr.statusText);
                    }
                    resolve(dfisUrl);
                }
            });
            xhr.addEventListener('error', function (err) {
                reject(err);
            });
            xhr.send(file);
        });
    };
    /**
     * 上传文件到dfis
     * @param  {string} dfisUrl - 要上传的地址（Dfis完整上传地址）
     * @param  {Blob|File} file - 要上传的内容
     */
    NegDfisUploader.prototype.upload = function (dfisUrl, file) {
        return this._upload(dfisUrl, file, {
            'Content-Type': 'application/x-www-form-urlencoded'
        });
    };
    /**
     * 上传文件到dfis
     * @param  {string} dfisUrl - 要上传的地址（Dfis完整上传地址）
     * @param  {Blob|File} file - 要上传的内容
     */
    NegDfisUploader.prototype.uploadForLL = function (dfisUrl, file) {
        var token = this.negAuth.newkitToken;
        var headers = {
            Authorization: token,
            'x-newkit-token': token
        };
        return this._upload(dfisUrl, file, headers);
    };
    NegDfisUploader = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negAuth_1.NegAuth])
    ], NegDfisUploader);
    return NegDfisUploader;
}());
exports.NegDfisUploader = NegDfisUploader;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negAjax_1 = __webpack_require__(4);
var negUtil_1 = __webpack_require__(6);
var globalConfigMap = new Map();
var NegGlobalConfig = /** @class */ (function () {
    function NegGlobalConfig(negAjax, negUtil) {
        this.negAjax = negAjax;
        this.negUtil = negUtil;
    }
    /**
     * 加载指定domain的global config数据
     * @param {string} domain - 指定的Domain
     * @param {boolean} force? - 是否强制请求（默认会检查是否存在）
     * @returns {Promise}
     */
    NegGlobalConfig.prototype.load = function (domain, force) {
        var _this = this;
        if (!domain) {
            throw new Error('domain param required.');
        }
        var encodeDomain = this.negUtil.encodeUri(domain);
        var url = NewkitConf.APIGatewayAddress + "/framework/v1/global-configuration?domain=" + encodeDomain;
        return new Promise(function (resolve, reject) {
            if (!force) {
                if (globalConfigMap.has(domain)) {
                    return resolve(true);
                }
            }
            _this.negAjax.get(url)
                .then(function (_a) {
                var data = _a.data;
                globalConfigMap.set(domain, data);
                resolve(true);
            })
                .catch(function (reason) { return reject(reason); });
        });
    };
    /**
     * 获取指定的Config数据
     * @param  {string} domain - 指定Domain
     * @param  {string} key - 指定要获取的Key
     * @param  {boolean} force? - 是否强制获取最新数据
     */
    NegGlobalConfig.prototype.get = function (domain, key, force) {
        var _this = this;
        if (!domain) {
            throw new Error('domain param required.');
        }
        if (!key) {
            throw new Error('key param required.');
        }
        return new Promise(function (resolve, reject) {
            _this.load(domain, force)
                .then(function () {
                var domainConfig = globalConfigMap.get(domain);
                var config = domainConfig.find(function (x) { return x.Key === key; });
                if (config) {
                    return resolve(config.Value);
                }
                resolve(null);
            }).catch(function (reason) { return reject(reason); });
        });
    };
    NegGlobalConfig = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negAjax_1.NegAjax, negUtil_1.NegUtil])
    ], NegGlobalConfig);
    return NegGlobalConfig;
}());
exports.NegGlobalConfig = NegGlobalConfig;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negAjax_1 = __webpack_require__(4);
var NegUserProfile = /** @class */ (function () {
    function NegUserProfile(negAjax) {
        this.negAjax = negAjax;
        this.userProfile = new Map();
    }
    Object.defineProperty(NegUserProfile.prototype, "rootUrl", {
        get: function () {
            return NewkitConf.APIGatewayAddress + "/framework/v2/user-profile/" + NewkitConf.DomainName + "/" + this._userId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init User Profile
     * @param userId specify user
     */
    NegUserProfile.prototype.init = function (userId) {
        var _this = this;
        if (!userId) {
            throw new Error('Must provider userId');
        }
        this._userId = userId;
        return this.negAjax.get(this.rootUrl)
            .then(function (_a) {
            var data = _a.data;
            data = data || [];
            data.forEach(function (item) {
                if (item.Key) {
                    _this.userProfile.set(item.Key, item);
                }
            });
        });
    };
    /**
     * Get user profile by key
     * @param key  Query key
     * @param force Force to get data from server
     */
    NegUserProfile.prototype.get = function (key, force) {
        if (force === void 0) { force = false; }
        var p;
        if (force || !this.userProfile.has(key)) {
            p = this.negAjax.get(this.rootUrl + "/" + key)
                .then(function (_a) {
                var data = _a.data;
                return data;
            });
        }
        else {
            p = Promise.resolve(this.userProfile.get(key));
        }
        return p.then(function (data) {
            return data ? data.Value : null;
        });
    };
    /**
     * Set single user profile.
     * @param key Profile key
     * @param value Profile value
     */
    NegUserProfile.prototype.set = function (key, value) {
        var _this = this;
        return this.negAjax.post(this.rootUrl + "/" + key, value)
            .then(function () {
            _this.userProfile.set(key, {
                Key: key,
                Value: value
            });
            return Promise.resolve(true);
        });
    };
    /**
     * Remove single user profile by key
     * @param key Remove key
     */
    NegUserProfile.prototype.remove = function (key) {
        var _this = this;
        return this.negAjax.delete(this.rootUrl + "/" + key)
            .then(function () {
            if (_this.userProfile.has(key)) {
                _this.userProfile.delete(key);
            }
            return Promise.resolve(true);
        });
    };
    NegUserProfile = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negAjax_1.NegAjax])
    ], NegUserProfile);
    return NegUserProfile;
}());
exports.NegUserProfile = NegUserProfile;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var isEmptyInputValue = function (value) {
    return value == null || (typeof value === 'string' && value.length === 0);
};
var NegValidators = /** @class */ (function () {
    function NegValidators() {
    }
    NegValidators.min = function (minValue) {
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            var numberVal = parseFloat(control.value);
            return numberVal < minValue ? { 'min': { 'requiredValue': minValue, 'actualValue': numberVal } } : null;
        };
    };
    NegValidators.max = function (maxValue) {
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            var numberVal = parseFloat(control.value);
            return numberVal > maxValue ? { 'max': { 'requiredValue': maxValue, 'actualValue': numberVal } } : null;
        };
    };
    NegValidators.url = function () {
        var urlReg = /^((http|ftp|https):\/\/)?[\w-_.]+(\/[\w-_]+)*\/?$/;
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            return urlReg.test(control.value) ? null : { 'url': true };
        };
    };
    NegValidators.email = function () {
        var emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            return emailReg.test(control.value) ? null : { 'email': true };
        };
    };
    NegValidators.emailGroup = function () {
        var emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            var emails = control.value.split(';').map(function (item) { return item.trim(); });
            var invalid = false;
            for (var _i = 0, emails_1 = emails; _i < emails_1.length; _i++) {
                var item = emails_1[_i];
                if (!emailReg.test(item)) {
                    invalid = true;
                    break;
                }
            }
            var numberVal = parseFloat(control.value);
            return invalid ? { 'emailGroup': true } : null;
        };
    };
    NegValidators.ip = function () {
        var ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            return ipReg.test(control.value) ? null : { 'ip': true };
        };
    };
    NegValidators.integer = function () {
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            return Number(control.value) === parseInt(control.value, 10) ? null : { 'integer': true };
        };
    };
    NegValidators.date = function () {
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            return !/Invalid|NaN/.test(new Date(control.value).toString()) ? null : { 'date': true };
        };
    };
    NegValidators.number = function () {
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(control.value) ? null : { 'number': true };
        };
    };
    NegValidators.equal = function (equalValue) {
        return function (control) {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            return equalValue === control.value ? null : { equal: { 'requiredValue': equalValue, 'actualValue': control.value } };
        };
    };
    NegValidators.equalTo = function (equalTo) {
        var subscribed = false;
        var equalControl = typeof equalTo === 'string' ? null : equalTo;
        return function (control) {
            if (!subscribed) {
                subscribed = true;
                if (!equalControl) {
                    equalControl = control.root.get(equalTo);
                }
                equalControl.valueChanges.subscribe(function () {
                    control.updateValueAndValidity();
                });
            }
            return control.value === equalControl.value ? null : { 'equalTo': { to: typeof equalTo === 'string' ? equalTo : equalControl.name } };
        };
    };
    NegValidators.validateFn = function (fn) {
        return function (control) {
            return new Promise(function (resolve, reject) {
                Promise.resolve()
                    .then(function () {
                    return fn(control.value);
                })
                    .then(function (result) {
                    if (result === false) {
                        return resolve({ validateFn: true });
                    }
                    resolve(null);
                })
                    .catch(function (reason) {
                    resolve({ validateFn: true, reason: reason });
                });
            });
        };
    };
    NegValidators = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], NegValidators);
    return NegValidators;
}());
exports.NegValidators = NegValidators;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var modulePersonMap = new Map();
var NegFeedback = /** @class */ (function () {
    function NegFeedback() {
    }
    /**
     * 注册模块收件人
     * @param moduleName 模块名称
     * @param recipient 收件人
     */
    NegFeedback.prototype.registerModule = function (moduleName, recipient) {
        modulePersonMap.set(moduleName, recipient);
    };
    /**
     * 通过模块名称，获取动态设置的收件人
     * @param  {string} moduleName 模块名称
     */
    NegFeedback.prototype.getModuleRecipient = function (moduleName) {
        if (modulePersonMap.has(moduleName)) {
            return modulePersonMap.get(moduleName) || '';
        }
        return '';
    };
    NegFeedback = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], NegFeedback);
    return NegFeedback;
}());
exports.NegFeedback = NegFeedback;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var negEventBus_1 = __webpack_require__(16);
var NegMultiTab = /** @class */ (function () {
    function NegMultiTab(negEventBus) {
        this.negEventBus = negEventBus;
    }
    NegMultiTab.prototype.openPage = function (path, queryParams, newTab) {
        if (newTab === void 0) { newTab = true; }
        this.negEventBus.emit('global.tabNavigation', {
            newTab: !!newTab,
            href: path,
            queryParams: queryParams
        });
    };
    NegMultiTab.prototype.setCurrentTabName = function (value) {
        value = this.processMultiLang(value);
        this.negEventBus.emit('global.setTabName', value);
    };
    NegMultiTab.prototype.processMultiLang = function (value) {
        var result = { MenuName: value['en-us'], Url: value.url };
        result.MenuNameCn = value['zh-cn'] || result.MenuName;
        result.MenuNameTw = value['zh-tw'] || result.MenuName;
        return result;
    };
    NegMultiTab = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [negEventBus_1.NegEventBus])
    ], NegMultiTab);
    return NegMultiTab;
}());
exports.NegMultiTab = NegMultiTab;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ToArrayPipe = /** @class */ (function () {
    function ToArrayPipe() {
    }
    ToArrayPipe.prototype.transform = function (value, args) {
        return Object.keys(value).map(function (key) { return Object.assign({ key: key }, value[key]); });
    };
    ToArrayPipe = __decorate([
        core_1.Pipe({
            name: 'toArray'
        })
    ], ToArrayPipe);
    return ToArrayPipe;
}());
exports.ToArrayPipe = ToArrayPipe;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(5);
var langKeyMapping = {
    'en-us': 'MenuName',
    'zh-cn': 'MenuNameCn',
    'zh-tw': 'MenuNameTw'
};
var MenuTranslatePipe = /** @class */ (function () {
    function MenuTranslatePipe(translateService) {
        this.translateService = translateService;
    }
    MenuTranslatePipe.prototype.transform = function (value, args) {
        var lang = this.translateService.currentLang || this.translateService.getDefaultLang();
        return value[langKeyMapping[lang]] || value['MenuName'];
    };
    MenuTranslatePipe = __decorate([
        core_1.Pipe({
            name: 'menuTranslate',
            pure: false
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], MenuTranslatePipe);
    return MenuTranslatePipe;
}());
exports.MenuTranslatePipe = MenuTranslatePipe;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(5);
var langKeyMapping = {
    'en-us': '',
    'zh-cn': 'Cn',
    'zh-tw': 'Tw'
};
var PrefixTranslatePipe = /** @class */ (function () {
    function PrefixTranslatePipe(translateService) {
        this.translateService = translateService;
    }
    PrefixTranslatePipe.prototype.transform = function (value, args) {
        var prefix = args;
        if (!value)
            return value;
        var lang = this.translateService.currentLang || this.translateService.getDefaultLang();
        return value["" + prefix + langKeyMapping[lang]] || value[prefix];
    };
    PrefixTranslatePipe = __decorate([
        core_1.Pipe({
            name: 'prefixTranslate',
            pure: false
        }),
        __metadata("design:paramtypes", [core_2.TranslateService])
    ], PrefixTranslatePipe);
    return PrefixTranslatePipe;
}());
exports.PrefixTranslatePipe = PrefixTranslatePipe;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = __webpack_require__(2);
var http_1 = __webpack_require__(17);
var components_1 = __webpack_require__(84);
var ngx_ckeditor_1 = __webpack_require__(106);
var pipes_1 = __webpack_require__(35);
var common_1 = __webpack_require__(36);
var kendo_wijmo_1 = __webpack_require__(109);
var kubi_ui_1 = __webpack_require__(110);
var services_1 = __webpack_require__(8);
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(5);
var i18n_1 = __webpack_require__(114);
// import { SmartAdminModule } from 'ngx-smartadmin';
var NkCoreModule = /** @class */ (function () {
    function NkCoreModule(negTranslate) {
        this.negTranslate = negTranslate;
        negTranslate.set('core', i18n_1.default);
    }
    NkCoreModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ngx_ckeditor_1.CKEditorModule,
                // SmartAdminModule,
                kubi_ui_1.KubiUIModule
            ],
            declarations: components_1.ALL_COMPONENTS.concat(pipes_1.CORE_PIPES),
            exports: [
                common_1.CommonModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                core_2.TranslateModule,
                kendo_wijmo_1.KendoWijmoModule,
                // SmartAdminModule,
                kubi_ui_1.KubiUIModule,
                ngx_ckeditor_1.CKEditorModule
            ].concat(components_1.ALL_COMPONENTS, pipes_1.CORE_PIPES)
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof services_1.NegTranslate !== "undefined" && services_1.NegTranslate) === "function" && _a || Object])
    ], NkCoreModule);
    return NkCoreModule;
    var _a;
}());
exports.NkCoreModule = NkCoreModule;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var autocomplete_component_1 = __webpack_require__(85);
var drop_down_grid_component_1 = __webpack_require__(87);
var drop_down_list_component_1 = __webpack_require__(89);
var drop_list_component_1 = __webpack_require__(91);
var function_panel_component_1 = __webpack_require__(93);
var multi_select_component_1 = __webpack_require__(96);
var tag_input_component_1 = __webpack_require__(98);
var time_zone_picker_component_1 = __webpack_require__(100);
var tree_component_1 = __webpack_require__(102);
var tree_item_component_1 = __webpack_require__(104);
// import { TabToolBarComponent } from './ui-elements/tab-toolbar.component';
exports.ALL_COMPONENTS = [
    autocomplete_component_1.AutoCompleteComponent,
    tag_input_component_1.TagInputComponent,
    multi_select_component_1.MultiSelectComponent,
    drop_list_component_1.DropListComponent,
    drop_down_list_component_1.DropDownListComponent,
    drop_down_grid_component_1.DropDownGridComponent,
    time_zone_picker_component_1.TimeZonePickerComponent,
    // TabToolBarComponent,
    function_panel_component_1.FunctionPanelComponent,
    tree_component_1.TreeComponent,
    tree_item_component_1.TreeItemComponent
];


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
var ComponentBase_1 = __webpack_require__(10);
exports.AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return AutoCompleteComponent; }),
    multi: true
};
var AutoCompleteComponent = /** @class */ (function (_super) {
    __extends(AutoCompleteComponent, _super);
    function AutoCompleteComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.textField = 'text';
        _this.valueField = 'value';
        _this.maxItems = 10;
        _this.delay = 100;
        _this.disabled = false;
        _this.placeholder = '';
        _this.source = [];
        _this.candidateData = [];
        _this.filterKey = '';
        _this.focusedIndex = -1;
        _this.inputFocused = false;
        _this.searching = false;
        _this.onChange = Function.prototype;
        _this.onTouched = Function.prototype;
        return _this;
    }
    AutoCompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.elementRef.nativeElement.className = 'smart-form';
        _super.prototype.watch.call(this, 'innerValue', function (newVal, oldValue) {
            _this.onChange(_this.innerValue);
        });
    };
    AutoCompleteComponent.prototype.writeValue = function (value) {
        if (value) {
            this.filterKey = this.textField ? value[this.textField] : value;
        }
        this.innerValue = value;
    };
    AutoCompleteComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    AutoCompleteComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    AutoCompleteComponent.prototype.inputFocus = function () {
        this.inputFocused = true;
        this.filterChanged = false;
        this.focusedIndex = -1;
    };
    AutoCompleteComponent.prototype.inputBlur = function () {
        this.inputFocused = false;
    };
    AutoCompleteComponent.prototype.inputKeyDown = function (event) {
        if (!event)
            return;
        if (event.keyCode !== 13 && event.keyCode !== 38 && event.keyCode !== 40)
            return;
        event.stopPropagation();
        event.preventDefault();
        if (event.keyCode === 13) {
            this.filterChanged = false;
            this.focusedIndex = -1;
            return;
        }
        if (event.keyCode === 38) {
            this.focusedIndex--;
            if (this.focusedIndex < 0) {
                this.focusedIndex = this.candidateData.length - 1;
            }
            this._calcScrollTop();
        }
        if (event.keyCode === 40) {
            this.focusedIndex++;
            if (this.focusedIndex > this.candidateData.length - 1) {
                this.focusedIndex = 0;
            }
            this._calcScrollTop();
        }
        var selectedItem = this.candidateData[this.focusedIndex];
        this.filterKey = this.textField ? selectedItem[this.textField] : selectedItem;
        this.innerValue = this.valueField ? selectedItem[this.valueField] : selectedItem;
    };
    AutoCompleteComponent.prototype._calcScrollTop = function () {
    };
    AutoCompleteComponent.prototype.inputValueChanged = function (value) {
        var _this = this;
        this.filterKey = value;
        this.filterChanged = true;
        this.innerValue = null;
        if (!this.filterKey || this.filterKey.length < this.minLength)
            return;
        if (this.filterTimeout)
            clearTimeout(this.filterTimeout);
        this.candidateData = [];
        this.filterTimeout = setTimeout(function () {
            _this.searching = true;
            if (typeof _this.source === 'function') {
                var request = { term: _this.filterKey };
                _this.source(request, function (result) {
                    _this.candidateData = _this.filter(_this.filterKey, result, _this.maxItems);
                    _this.searching = false;
                });
            }
            else {
                if (_this.source.length > 0 && typeof _this.source[0] !== 'object') {
                    _this.source = _this.source.map(function (item) {
                        return _a = {},
                            _a[_this.valueField] = item,
                            _a[_this.textField] = item,
                            _a;
                        var _a;
                    });
                }
                _this.candidateData = _this.filter(_this.filterKey, _this.source, _this.maxItems, true);
                _this.searching = false;
            }
        }, this.delay);
    };
    AutoCompleteComponent.prototype.filter = function (key, datas, maxItems, needProcess) {
        var _this = this;
        if (needProcess === void 0) { needProcess = false; }
        datas = datas || [];
        if (datas.length === 0)
            return [];
        var tempData;
        if (!needProcess) {
            tempData = datas;
        }
        else {
            var regex_1 = new RegExp(this.filterKey, 'i');
            tempData = datas.filter(function (item) {
                return regex_1.test(item[_this.textField]);
            });
        }
        return tempData.slice(0, maxItems);
    };
    AutoCompleteComponent.prototype.setFocusIndex = function (index) {
        this.focusedIndex = index;
    };
    AutoCompleteComponent.prototype.itemMouseDown = function (event) {
        event.preventDefault();
    };
    AutoCompleteComponent.prototype.itemSelect = function (item) {
        this.filterKey = this.textField ? item[this.textField] : item;
        this.innerValue = this.valueField ? item[this.valueField] : item;
        this.filterChanged = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoCompleteComponent.prototype, "textField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoCompleteComponent.prototype, "valueField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoCompleteComponent.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoCompleteComponent.prototype, "maxItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AutoCompleteComponent.prototype, "delay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutoCompleteComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoCompleteComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AutoCompleteComponent.prototype, "source", void 0);
    AutoCompleteComponent = __decorate([
        core_1.Component({
            selector: 'nk-autocomplete',
            template: __webpack_require__(86),
            providers: [exports.AUTOCOMPLETE_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}(ComponentBase_1.ComponentBase));
exports.AutoCompleteComponent = AutoCompleteComponent;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = "<div class=\"nk-autocomplete autocomplete-warpper\">\r\n  <label class=\"input\">\r\n    <i class=\"icon-append fa fa-circle-o-notch fa-spin\" *ngIf=\"searching\"></i>\r\n    <input type=\"text\" class=\"autocomplete-input\" [placeholder]=\"placeholder\" [disabled]=\"disabled\" \r\n    (focus)=\"inputFocus()\" (blur)=\"inputBlur()\" (keydown)=\"inputKeyDown($event)\"\r\n    (ngModelChange)=\"inputValueChanged($event)\" [ngModel]=\"filterKey\" [ngModelOptions]=\"{standalone: true}\" #autocompleteInput>\r\n  </label>  \r\n  <div class=\"datalist-warpper\" [class.hide]=\"!filterKey?.length || !inputFocused || !filterChanged || !candidateData.length\">\r\n    <ul class=\"ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all\">\r\n      <li class=\"ui-menu-item\" *ngFor=\"let item of candidateData; let i = index;\">\r\n        <a href=\"javascript:void(0)\" class=\"ui-corner-all\" [class.ui-state-focus]=\"focusedIndex == i\" (mouseenter)=\"setFocusIndex(i)\" (mousedown)=\"itemMouseDown($event)\" (click)=\"itemSelect(item)\">\r\n          {{ textField ? item[textField] : item }}\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</div>"

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
exports.DROP_DOWN_GRID_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DropDownGridComponent; }),
    multi: true
};
var DropDownGridComponent = /** @class */ (function () {
    function DropDownGridComponent(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.showPopupPanel = false;
        this.onDocumentClick = function (e) {
            _this.showPopupPanel = false;
        };
        this.columns = [];
        this.dataSource = [];
        this.key = '';
        this.onSelectChanged = new core_1.EventEmitter();
    }
    DropDownGridComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.el = this.elementRef.nativeElement.querySelector('input');
        this.el.addEventListener('click', function (e) {
            e.stopPropagation();
            _this.showPopupPanel = true;
        }, false);
        document.addEventListener('click', this.onDocumentClick, false);
    };
    DropDownGridComponent.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.onDocumentClick);
    };
    DropDownGridComponent.prototype.onRowClick = function (rowData) {
        this.innerValue = (rowData || {})[this.key];
        this.onChange(this.innerValue);
        this.onSelectChanged.emit(rowData);
    };
    DropDownGridComponent.prototype.writeValue = function (value) {
        this.innerValue = value;
    };
    DropDownGridComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DropDownGridComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DropDownGridComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropDownGridComponent.prototype, "dataSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DropDownGridComponent.prototype, "key", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DropDownGridComponent.prototype, "onSelectChanged", void 0);
    DropDownGridComponent = __decorate([
        core_1.Component({
            selector: 'nk-drop-down-grid',
            template: __webpack_require__(88),
            providers: [exports.DROP_DOWN_GRID_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DropDownGridComponent);
    return DropDownGridComponent;
}());
exports.DropDownGridComponent = DropDownGridComponent;


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = "<div class=\"nk-drop-down-grid smart-form\">\r\n  <label class=\"input\">\r\n    <input type=\"text\" readonly [ngModel]=\"innerValue\">\r\n  </label>\r\n  <div class=\"nk-drop-down-grid-panel\" [style.display]=\"showPopupPanel ? 'block': 'none'\">\r\n    <nk-grid [data]=\"dataSource\" (onRowClick)=\"onRowClick($event)\">\r\n      <nk-grid-column *ngFor=\"let c of columns\" [header]=\"c.header\" [field]=\"c.field\" [width]=\"c.width\">\r\n      </nk-grid-column>\r\n    </nk-grid>\r\n  </div>\r\n</div>"

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
exports.DROP_DOWN_LIST_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DropDownListComponent; }),
    multi: true
};
var DropDownListComponent = /** @class */ (function () {
    function DropDownListComponent(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.showPopupPanel = false;
        this.innerText = '';
        this.onDocumentClick = function (e) {
            _this.showPopupPanel = false;
        };
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.dataSource = [];
        this.multi = false;
    }
    DropDownListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var el = this.elementRef.nativeElement;
        var input = el.querySelector('input');
        input.addEventListener('click', function (e) {
            _this.showPopupPanel = true;
        });
        el.addEventListener('click', function (e) {
            e.stopPropagation();
        });
        document.addEventListener('click', this.onDocumentClick, false);
    };
    DropDownListComponent.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.onDocumentClick);
    };
    DropDownListComponent.prototype.dropdownItemClick = function (item, evt) {
        !this.multi && evt && evt.preventDefault();
        if (!this.multi) {
            this.showPopupPanel = false;
            this.dataSource.forEach(function (x) { return x.checked = x === item; });
        }
        this.setNgModelValue();
    };
    DropDownListComponent.prototype.setNgModelValue = function () {
        var _this = this;
        setTimeout(function () {
            var values = [];
            var texts = [];
            _this.dataSource
                .filter(function (x) { return x.checked; })
                .forEach(function (x) {
                values.push(x.value);
                texts.push(x.text);
            });
            _this.innerText = texts.join(',');
            _this.onChange(values);
        });
    };
    DropDownListComponent.prototype.writeValue = function (value) {
        value = value || [];
        if (!_.isEqual(value, this.dataSource)) {
            if (!this.multi && value.length > 1) {
                value.length = 1;
            }
            this.dataSource.forEach(function (x) {
                x.checked = value.indexOf(x.value) >= 0;
            });
            this.setNgModelValue();
        }
    };
    DropDownListComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DropDownListComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DropDownListComponent.prototype, "dataSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropDownListComponent.prototype, "multi", void 0);
    DropDownListComponent = __decorate([
        core_1.Component({
            selector: 'nk-drop-down-list',
            template: __webpack_require__(90),
            providers: [exports.DROP_DOWN_LIST_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DropDownListComponent);
    return DropDownListComponent;
}());
exports.DropDownListComponent = DropDownListComponent;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "<div class=\"nk-drop-down-list smart-form\" style=\"position: relative;\">\r\n  <label class=\"input\">\r\n\t\t<input type=\"text\" readonly [ngModel]=\"innerText\">\r\n    <ul class=\"drop-down-list-popup-panel\" [style.display]=\"showPopupPanel ? 'block': 'none'\">\r\n      <li *ngFor=\"let item of dataSource\" (click)=\"dropdownItemClick(item, $event)\" [ngClass]=\"{checked: item.checked}\">\r\n        <nk-checkbox *ngIf=\"multi\" [(ngModel)]=\"item.checked\">{{item.text}}</nk-checkbox>\r\n        <span *ngIf=\"!multi\">{{item.text}}</span>\r\n      </li>\r\n    </ul>\r\n  </label>\r\n</div>"

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
var ComponentBase_1 = __webpack_require__(10);
exports.DROP_LIST_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DropListComponent; }),
    multi: true
};
var MAX_PAGE_BUTTON_COUNT = 5;
var DropListComponent = /** @class */ (function (_super) {
    __extends(DropListComponent, _super);
    function DropListComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.onChange = Function.prototype;
        _this.onTouched = Function.prototype;
        _this.innerDataSource = [];
        //分页下拉
        _this.inputFocused = false;
        _this.focusedIndex = -1;
        _this.pages = [];
        _this.pageIndex = 1;
        _this.pageCount = 1;
        _this.totalCount = 0;
        _this.filterKey = '';
        _this.pageChanged = new core_1.EventEmitter();
        _super.prototype.watch.call(_this, 'innerValue', function (newVal, oldValue) {
            if (_.isEqual(newVal, oldValue)) {
                return;
            }
            _this.onChange(newVal);
        });
        return _this;
    }
    Object.defineProperty(DropListComponent.prototype, "pageSize", {
        set: function (val) {
            this._pageSize = Math.floor(Math.max(1, val));
        },
        enumerable: true,
        configurable: true
    });
    DropListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.elementRef.nativeElement.className = 'smart-form';
        _super.prototype.watch.call(this, 'innerValue', function (newVal, oldValue) {
            _this.onChange(_this.innerValue);
        });
        this.totalCount = this.dataSource.length;
        this.innerDataSource = this.dataSource.slice(0, this._pageSize);
    };
    DropListComponent.prototype.ngOnChanges = function (changesObj) {
        if (changesObj.totalCount || changesObj.pageSize) {
            this.calcPageInfo();
            this.innerDataSource = this.dataSource.slice((this.pageIndex - 1) * this._pageSize, (this.pageIndex) * this._pageSize);
        }
    };
    DropListComponent.prototype.pageClick = function (event, p) {
        event.stopPropagation();
        event.preventDefault();
        this.inputFocused = true;
        if (p < 1) {
            return;
        }
        if (p > this.pageCount) {
            return;
        }
        this.pageIndex = p;
        this.emitValue();
        this.buildPages();
        this.dataChange(p);
        this.focusedIndex = -1;
    };
    DropListComponent.prototype.writeValue = function (value) {
        this.pageIndex = Math.max(1, +value);
        this.buildPages();
    };
    DropListComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DropListComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DropListComponent.prototype.emitValue = function () {
        this.onChange(this.pageIndex);
        this.pageChanged.next(this.pageIndex);
    };
    DropListComponent.prototype.dataChange = function (p) {
        if (p < 1) {
            return;
        }
        if (p > this.pageCount) {
            return;
        }
        if (p == 1) {
            this.innerDataSource = this.dataSource.slice(0, this._pageSize);
        }
        else {
            this.innerDataSource = this.dataSource.slice((p - 1) * this._pageSize, p * this._pageSize);
        }
    };
    DropListComponent.prototype.inputKeyDown = function (event) {
        if (!event)
            return;
        if (event.keyCode !== 13 && event.keyCode !== 38 && event.keyCode !== 40)
            return;
        event.stopPropagation();
        event.preventDefault();
        if (event.keyCode === 13) {
            this.inputFocused = false;
            this.focusedIndex = -1;
            return;
        }
        if (event.keyCode === 38) {
            this.focusedIndex--;
            if (this.focusedIndex < 0) {
                this.focusedIndex = this.innerDataSource.length - 1;
            }
        }
        if (event.keyCode === 40) {
            this.focusedIndex++;
            if (this.focusedIndex > this.innerDataSource.length - 1) {
                this.focusedIndex = 0;
            }
        }
        var selectedItem = this.innerDataSource[this.focusedIndex];
        this.filterKey = selectedItem;
    };
    DropListComponent.prototype.inputFocus = function () {
        this.inputFocused = true;
        this.focusedIndex = -1;
        this.calcPageInfo();
    };
    DropListComponent.prototype.inputBlur = function (event) {
        this.inputFocused = false;
    };
    DropListComponent.prototype.setFocusIndex = function (index) {
        this.focusedIndex = index;
    };
    DropListComponent.prototype.itemMouseDown = function (event) {
        event.preventDefault();
    };
    DropListComponent.prototype.itemSelect = function (item) {
        this.filterKey = item;
        this.inputFocused = false;
    };
    DropListComponent.prototype.buildPages = function () {
        var result = [];
        var startIndex;
        var endIndex;
        var needHead = false;
        var needFoot = false;
        if (this.pageCount <= MAX_PAGE_BUTTON_COUNT) {
            startIndex = 1;
            endIndex = this.pageCount;
        }
        else {
            if (this.pageCount - this.pageIndex < MAX_PAGE_BUTTON_COUNT) {
                endIndex = this.pageCount;
                startIndex = this.pageCount - MAX_PAGE_BUTTON_COUNT + 1;
                needHead = true;
            }
            else {
                startIndex = (Math.ceil(this.pageIndex / MAX_PAGE_BUTTON_COUNT) - 1) * MAX_PAGE_BUTTON_COUNT + 1;
                endIndex = startIndex + MAX_PAGE_BUTTON_COUNT - 1;
                if (this.pageIndex > MAX_PAGE_BUTTON_COUNT) {
                    needHead = true;
                }
                needFoot = true;
            }
        }
        for (var i = startIndex; i <= endIndex; i++) {
            result.push({ value: i, text: i });
        }
        if (needHead) {
            result.unshift({ text: '...', value: startIndex - 1, });
        }
        if (needFoot) {
            result.push({ text: '...', value: endIndex + 1 });
        }
        this.pages = result;
    };
    DropListComponent.prototype.calcPageInfo = function () {
        var _this = this;
        this.pageCount = Math.ceil(this.totalCount / this._pageSize);
        this.buildPages();
        if (this.pageIndex > this.pageCount) {
            this.pageIndex = this.pageCount;
            this.buildPages();
            setTimeout(function () {
                _this.emitValue();
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DropListComponent.prototype, "dataSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DropListComponent.prototype, "pageSize", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DropListComponent.prototype, "pageChanged", void 0);
    DropListComponent = __decorate([
        core_1.Component({
            selector: 'nk-drop-list',
            template: __webpack_require__(92),
            providers: [exports.DROP_LIST_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DropListComponent);
    return DropListComponent;
}(ComponentBase_1.ComponentBase));
exports.DropListComponent = DropListComponent;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = "<div class=\"nk-drop-list nk-autocomplete autocomplete-warpper\">\r\n  <label class=\"input\">\r\n    <i class=\"icon-append fa fa-circle-o-notch fa-spin\" *ngIf=\"searching\"></i>\r\n    <input id=\"dropListInput\" type=\"text\" class=\"autocomplete-input\" [disabled]=\"disabled\" \r\n    (click)=\"inputFocus()\" (blur)=\"inputBlur($event)\" (keydown)=\"inputKeyDown($event)\"\r\n    [ngModel]=\"filterKey\">\r\n  </label>\r\n  <div class=\"datalist-warpper\" [class.hide]=\"!inputFocused\">\r\n    <ul class=\"ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all\">\r\n      <li class=\"ui-menu-item\" *ngFor=\"let item of innerDataSource; let i = index;\">\r\n        <a href=\"javascript:void(0)\" class=\"ui-corner-all\" [class.ui-state-focus]=\"focusedIndex == i\" (mouseenter)=\"setFocusIndex(i)\"\r\n          (mousedown)=\"itemMouseDown($event)\" (click)=\"itemSelect(item)\">\r\n          {{ item }}\r\n        </a>\r\n      </li>\r\n      <br>\r\n      <li style=\"text-align: center;\">\r\n      <ul class=\"nk-pagination pagination pagination-sm\" [ngClass]=\"paginationClass\">\r\n        <li [ngClass]=\"{disabled: pageIndex <= 1}\" (mousedown)=\"pageClick($event, pageIndex - 1)\">\r\n          <a href=\"javascript:;\"><i class=\"fa fa-chevron-left\"></i></a>\r\n        </li>\r\n        <li *ngFor=\"let p of pages\" [ngClass]=\"{'active': pageIndex === p.value}\" (mousedown)=\"pageClick($event, p.value)\">\r\n          <a href=\"javascript:void(0);\">{{p.text}}</a>\r\n        </li>\r\n        <li [ngClass]=\"{disabled: pageIndex >= pageCount}\" (mousedown)=\"pageClick($event, pageIndex + 1)\">\r\n          <a href=\"javascript:void(0);\"><i class=\"fa fa-chevron-right\"></i></a>\r\n        </li>\r\n      </ul>\r\n\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</div>"

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var animations_1 = __webpack_require__(94);
var services_1 = __webpack_require__(8);
var FunctionPanelComponent = /** @class */ (function () {
    function FunctionPanelComponent(negEventBus) {
        this.negEventBus = negEventBus;
        this.expandFuncPanel = true;
    }
    FunctionPanelComponent.prototype.ngOnInit = function () { };
    FunctionPanelComponent.prototype.toggleMenuStatus = function () {
        this.negEventBus.emit('global.toggleMenuStatus');
    };
    FunctionPanelComponent.prototype.showFeedback = function () {
        this.negEventBus.emit('global.showFeedback');
    };
    FunctionPanelComponent.prototype.toggleFuncPanel = function () {
        this.expandFuncPanel = !this.expandFuncPanel;
    };
    __decorate([
        core_1.ViewChild('sysFuncPanel'),
        __metadata("design:type", core_1.ElementRef)
    ], FunctionPanelComponent.prototype, "sysFuncPanel", void 0);
    FunctionPanelComponent = __decorate([
        core_1.Component({
            selector: 'nk-function-panel',
            template: __webpack_require__(95),
            animations: [
                animations_1.trigger('sysFuncPanelState', [
                    animations_1.state('show', animations_1.style({
                        height: '*'
                    })),
                    animations_1.state('hide', animations_1.style({
                        height: '40px'
                    })),
                    animations_1.transition('show <=> hide', animations_1.animate('200ms ease'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [services_1.NegEventBus])
    ], FunctionPanelComponent);
    return FunctionPanelComponent;
}());
exports.FunctionPanelComponent = FunctionPanelComponent;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_94__;

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = "<div class=\"nk-bottom-navbar container-fluid\" style=\"z-index: 102; opacity: 1;\" [@sysFuncPanelState]=\"expandFuncPanel ? 'show' : 'hide'\">\r\n  <div class=\"nav-panel\" style=\"align-items: flex-start\">\r\n    <div class=\"function-panel\" [class.hide-divider]=\"!expandFuncPanel\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n    <div class=\"common-tools\" style=\"align-self: flex-start;\">\r\n      <div class=\"collspan-btn\" (click)=\"toggleFuncPanel()\">\r\n        <i class=\"fa\" [class.fa-angle-double-down]=\"expandFuncPanel\" [class.fa-angle-double-up]=\"!expandFuncPanel\"></i>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
var ComponentBase_1 = __webpack_require__(10);
exports.MULTI_SELECT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultiSelectComponent; }),
    multi: true
};
;
var MultiSelectComponent = /** @class */ (function (_super) {
    __extends(MultiSelectComponent, _super);
    function MultiSelectComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.onChange = Function.prototype;
        _this.onTouched = Function.prototype;
        _this.innerDataSource = [];
        _this.textField = 'text';
        _this.valueField = 'value';
        _super.prototype.watch.call(_this, 'innerValue', function (newVal, oldValue) {
            if (_.isEqual(newVal, oldValue)) {
                return;
            }
            _this.onChange(newVal);
        });
        return _this;
    }
    MultiSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$el = $(this.elementRef.nativeElement.querySelector('select'));
        this.$el.select2();
        this.$el.on('change', function (e) {
            _this.innerValue = _this.$el.val();
        });
    };
    MultiSelectComponent.prototype.ngOnChanges = function (changesObj) {
        this.processDataSource();
    };
    MultiSelectComponent.prototype.ngAfterViewInit = function () {
    };
    MultiSelectComponent.prototype.writeValue = function (value) {
        this.$el.val(value);
        this.$el.trigger('change');
    };
    MultiSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    MultiSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    MultiSelectComponent.prototype.processDataSource = function () {
        var _this = this;
        if (Array.isArray(this.dataSource)) {
            if (this.dataSource.length > 0 && typeof this.dataSource[0] !== 'object') {
                this.innerDataSource = this.dataSource.map(function (item) {
                    return _a = {},
                        _a[_this.textField] = item,
                        _a[_this.valueField] = item,
                        _a;
                    var _a;
                });
            }
            else {
                this.innerDataSource = this.dataSource.slice(0);
            }
        }
        else if (typeof this.dataSource === 'function') {
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "dataSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelectComponent.prototype, "textField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiSelectComponent.prototype, "valueField", void 0);
    MultiSelectComponent = __decorate([
        core_1.Component({
            selector: 'nk-multi-select',
            template: __webpack_require__(97),
            providers: [exports.MULTI_SELECT_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], MultiSelectComponent);
    return MultiSelectComponent;
}(ComponentBase_1.ComponentBase));
exports.MultiSelectComponent = MultiSelectComponent;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = "<div class=\"nk-multi-select\">\r\n  <select multiple style=\"width:100%\" class=\"select2\">\r\n    <option *ngFor=\"let item of innerDataSource\" [value]=\"item[valueField]\">{{item[textField]}}</option>\r\n  </select>\r\n</div>"

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
var ComponentBase_1 = __webpack_require__(10);
exports.TAG_INPUT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var TagInputComponent = /** @class */ (function (_super) {
    __extends(TagInputComponent, _super);
    function TagInputComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.onChange = Function.prototype;
        _this.onTouched = Function.prototype;
        _this.tags = [];
        _this.inputValue = '';
        _this.placeholder = 'Type tag';
        return _this;
    }
    Object.defineProperty(TagInputComponent.prototype, "inputSize", {
        get: function () {
            return Math.max(this.placeholder.length, this.inputValue.length);
        },
        enumerable: true,
        configurable: true
    });
    TagInputComponent.prototype.ngOnInit = function () {
    };
    TagInputComponent.prototype.addTag = function (evt) {
        if (evt.keyCode === 13) {
            var val = this.inputValue.trim();
            if (val && this.tags.indexOf(val) < 0) {
                this.tags.push(val);
                this.inputValue = '';
                this.notifyValueChange();
            }
        }
    };
    TagInputComponent.prototype.notifyValueChange = function () {
        this.onChange(this.tags);
    };
    TagInputComponent.prototype.removeTag = function (idx) {
        this.tags.splice(idx, 1);
        this.notifyValueChange();
    };
    TagInputComponent.prototype.writeValue = function (value) {
        this.tags = value;
    };
    TagInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    TagInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TagInputComponent.prototype, "placeholder", void 0);
    TagInputComponent = __decorate([
        core_1.Component({
            selector: 'nk-tag-input',
            template: __webpack_require__(99),
            providers: [exports.TAG_INPUT_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TagInputComponent);
    return TagInputComponent;
}(ComponentBase_1.ComponentBase));
exports.TagInputComponent = TagInputComponent;


/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = "<div class=\"nk-tag-input bootstrap-tagsinput\" (keypress)=\"addTag($event)\">\r\n  <span class=\"tag label label-info\" *ngFor=\"let tag of tags, let idx = index\">{{tag}}\r\n    <span data-role=\"remove\" (click)=\"removeTag(idx)\"></span>\r\n  </span>\r\n  <input type=\"text\" [placeholder]=\"placeholder\" [(ngModel)]=\"inputValue\" [attr.size]=\"inputSize\">\r\n</div>"

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var TimeZonePickerComponent = /** @class */ (function () {
    function TimeZonePickerComponent() {
    }
    TimeZonePickerComponent.prototype.ngOnInit = function () { };
    TimeZonePickerComponent = __decorate([
        core_1.Component({
            selector: 'nk-time-zone-picker',
            template: __webpack_require__(101)
        })
    ], TimeZonePickerComponent);
    return TimeZonePickerComponent;
}());
exports.TimeZonePickerComponent = TimeZonePickerComponent;


/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = "<div class=\"nk-time-zone-picker\">\r\n  Time zone\r\n</div>"

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var services_1 = __webpack_require__(8);
var TreeComponent = /** @class */ (function () {
    function TreeComponent(negUtil) {
        this.negUtil = negUtil;
        this.treeData = [];
        this.showIcon = false;
        this.showCheckbox = true;
        this.single = false;
        this.valueChange = new core_1.EventEmitter();
        this.itemClick = new core_1.EventEmitter();
    }
    TreeComponent.prototype.ngOnInit = function () {
        this.processTreeData(this.treeData || []);
    };
    TreeComponent.prototype.processTreeData = function (arr) {
        var _this = this;
        arr.forEach(function (item) {
            item.hasChildren = item.children && item.children.length > 0;
            if (item.hasChildren) {
                _this.processTreeData(item.children);
            }
        });
    };
    TreeComponent.prototype.ngOnChanges = function (changesObj) {
        if (changesObj.treeData) {
            this.processTreeData(this.treeData || []);
        }
        if (changesObj.value) {
            this.setItemState();
        }
    };
    TreeComponent.prototype.setItemState = function () {
        var valueArr = Array.isArray(this.value) ? this.value : [this.value];
        this.selectItems(this.treeData, valueArr);
    };
    TreeComponent.prototype.selectItems = function (itemArr, valueArr) {
        var _this = this;
        itemArr.forEach(function (item) {
            if (item.hasChildren) {
                _this.selectItems(item.children, valueArr);
            }
            else {
                if (valueArr.indexOf(item.value) >= 0) {
                    item.selected = true;
                }
            }
        });
    };
    TreeComponent.prototype.onItemClick = function (item) {
        if (item.hasChildren) {
            item.open = !item.open;
        }
        else {
            var selected = !item.selected;
            if (this.single) {
                this.cancelAllItemSelect(this.treeData);
            }
            item.selected = selected;
            if (this.single) {
                this.valueChange.emit(selected ? item.value : null);
            }
            else {
                if (!Array.isArray(this.value)) {
                    this.value = [this.value];
                }
                selected ? this.value.push(item.value) : this.negUtil.remove(this.value, item.value);
                this.valueChange.emit(this.value);
            }
        }
        this.itemClick.emit(item);
    };
    TreeComponent.prototype.cancelAllItemSelect = function (itemArr) {
        var _this = this;
        itemArr.forEach(function (item) {
            item.selected = false;
            if (item.hasChildren) {
                _this.cancelAllItemSelect(item.children);
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "treeData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeComponent.prototype, "showIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeComponent.prototype, "showCheckbox", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TreeComponent.prototype, "single", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeComponent.prototype, "itemClick", void 0);
    TreeComponent = __decorate([
        core_1.Component({
            selector: 'nk-tree',
            template: __webpack_require__(103)
        }),
        __metadata("design:paramtypes", [services_1.NegUtil])
    ], TreeComponent);
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;


/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"tree nk-tree\">\r\n  <li *ngFor=\"let item of treeData\" [nk-tree-item]=\"item\" (click)=\"onItemClick(item)\" (itemClick)=\"onItemClick($event)\" [treeOpt]=\"{showIcon: showIcon, showCheckbox: showCheckbox}\"\r\n   [ngClass]=\"{'tree-item': !item.hasChildren, 'parent_li': item.hasChildren, 'tree-selected': !item.hasChildren && item.selected, 'tree-open': item.hasChildren && item.open}\">\r\n</ul>"

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var TreeItemComponent = /** @class */ (function () {
    function TreeItemComponent() {
        this.itemClick = new core_1.EventEmitter();
    }
    TreeItemComponent.prototype.ngOnInit = function () { };
    TreeItemComponent.prototype.onChildItemClick = function ($event, item) {
        $event && $event.stopPropagation();
        this.itemClick.emit(item);
    };
    __decorate([
        core_1.Input('nk-tree-item'),
        __metadata("design:type", Object)
    ], TreeItemComponent.prototype, "treeItem", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeItemComponent.prototype, "treeOpt", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeItemComponent.prototype, "itemClick", void 0);
    TreeItemComponent = __decorate([
        core_1.Component({
            selector: '[nk-tree-item]',
            template: __webpack_require__(105)
        }),
        __metadata("design:paramtypes", [])
    ], TreeItemComponent);
    return TreeItemComponent;
}());
exports.TreeItemComponent = TreeItemComponent;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = "<ng-template [ngIf]=\"!treeItem.hasChildren\">\r\n  <span class=\"tree-label\"><i [ngClass]=\"treeItem.icon\" *ngIf=\"treeOpt.showIcon\"></i> {{treeItem.text}}</span>\r\n</ng-template>\r\n\r\n<!-- 有子集的场景 -->\r\n<ng-template [ngIf]=\"treeItem.hasChildren\">\r\n  <span class=\"tree-branch-name\">\r\n      <i class=\"fa\" [ngClass]=\"{'fa-minus-circle': treeItem.open, 'fa-plus-circle': !treeItem.open}\"></i>\r\n      {{treeItem.text}}\r\n  </span>\r\n  <ul [ngClass]=\"{hidden: !treeItem.open}\">\r\n    <li *ngFor=\"let item of treeItem.children\" [nk-tree-item]=\"item\" (click)=\"onChildItemClick($event, item)\" (itemClick)=\"onChildItemClick(null, $event)\"\r\n      [treeOpt]=\"treeOpt\" [ngClass]=\"{'parent_li': item.hasChildren, 'tree-selected': !item.hasChildren && item.selected, 'tree-open': item.hasChildren && item.open}\">\r\n  </ul>\r\n</ng-template>"

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ck_editor_module_1 = __webpack_require__(107);
exports.CKEditorModule = ck_editor_module_1.CKEditorModule;
//# sourceMappingURL=index.js.map

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
var ck_editor_component_1 = __webpack_require__(108);
var CKEditorModule = (function () {
    function CKEditorModule() {
    }
    CKEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [],
                    exports: [
                        forms_1.FormsModule,
                        ck_editor_component_1.CKEditorComponent
                    ],
                    declarations: [ck_editor_component_1.CKEditorComponent],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    CKEditorModule.ctorParameters = function () { return []; };
    return CKEditorModule;
}());
exports.CKEditorModule = CKEditorModule;
//# sourceMappingURL=ck-editor.module.js.map

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
var defaults = {
    contentsCss: [''],
    customConfig: ''
};
exports.CKEDITOR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CKEditorComponent; }),
    multi: true
};
var CKEditorComponent = (function () {
    function CKEditorComponent(ngZone) {
        this.ngZone = ngZone;
        this.innerValue = '';
        this.readonly = false;
        this.config = {};
        this.skin = 'moono-lisa';
        this.language = 'en';
        this.fullPage = false;
    }
    CKEditorComponent.prototype.onChange = function (_) { };
    ;
    CKEditorComponent.prototype.onTouched = function () { };
    ;
    CKEditorComponent.prototype.ngOnInit = function () { };
    CKEditorComponent.prototype.ngOnChanges = function (changes) {
        if (!this.ckIns) {
            return;
        }
        if (changes.readonly) {
            this.ckIns.setReadOnly(this.readonly);
        }
    };
    CKEditorComponent.prototype.ngOnDestroy = function () {
        if (this.ckIns) {
            this.ckIns.removeAllListeners();
            CKEDITOR.instances[this.ckIns.name].destroy();
            this.ckIns.destroy();
            this.ckIns = null;
        }
    };
    CKEditorComponent.prototype.ngAfterViewInit = function () {
        this.initCKEditor();
    };
    CKEditorComponent.prototype.initCKEditor = function () {
        var _this = this;
        if (typeof CKEDITOR === 'undefined') {
            return console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        }
        var opt = Object.assign({}, defaults, this.config, {
            readOnly: this.readonly,
            skin: this.skin,
            language: this.language,
            fullPage: this.fullPage
        });
        this.ckIns = CKEDITOR.replace(this.ck.nativeElement, opt);
        this.ckIns.setData(this.innerValue);
        this.ckIns.on('change', function () {
            _this.onTouched();
            var val = _this.ckIns.getData();
            console.warn('chagne', val);
            _this.updateValue(val);
        });
    };
    CKEditorComponent.prototype.updateValue = function (value) {
        var _this = this;
        this.ngZone.run(function () {
            _this.innerValue = value;
            _this.onChange(value); // 通知外部ngModel更新
            _this.onTouched();
        });
    };
    CKEditorComponent.prototype.writeValue = function (value) {
        console.log(value);
        this.innerValue = value || '';
        if (this.ckIns) {
            this.ckIns.setData(this.innerValue);
            // 修复FullPage模式下，当连续设置两次不带html标记的值时，不会触发change事件，导致ngModel无法更新的bug。
            var val = this.ckIns.getData();
            this.ckIns.setData(val);
        }
    };
    CKEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CKEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    CKEditorComponent.prototype.setDisabledState = function (isDisabled) {
    };
    CKEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ck-editor',
                    template: "<textarea #ck></textarea>",
                    providers: [exports.CKEDITOR_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CKEditorComponent.ctorParameters = function () { return [
        { type: core_1.NgZone, },
    ]; };
    CKEditorComponent.propDecorators = {
        'readonly': [{ type: core_1.Input },],
        'config': [{ type: core_1.Input },],
        'skin': [{ type: core_1.Input },],
        'language': [{ type: core_1.Input },],
        'fullPage': [{ type: core_1.Input },],
        'ck': [{ type: core_1.ViewChild, args: ['ck',] },],
    };
    return CKEditorComponent;
}());
exports.CKEditorComponent = CKEditorComponent;
//# sourceMappingURL=ck-editor.component.js.map

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_109__;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {!function(e,t){ true?module.exports=t(__webpack_require__(0),__webpack_require__(2),__webpack_require__(36),__webpack_require__(113)):"function"==typeof define&&define.amd?define("kubi-ui",["@angular/core","@angular/forms","@angular/common","@angular/platform-browser"],t):"object"==typeof exports?exports["kubi-ui"]=t(require("@angular/core"),require("@angular/forms"),require("@angular/common"),require("@angular/platform-browser")):e["kubi-ui"]=t(e["@angular/core"],e["@angular/forms"],e["@angular/common"],e["@angular/platform-browser"])}("undefined"!=typeof self?self:this,function(e,t,n,o){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=28)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(e){return null==e||"string"==typeof e&&0===e.length},s=function(){function e(){}return e.min=function(e){return function(t){if(a(t.value))return null;var n=parseFloat(t.value);return n<e?{min:{requiredValue:e,actualValue:n}}:null}},e.max=function(e){return function(t){if(a(t.value))return null;var n=parseFloat(t.value);return n>e?{max:{requiredValue:e,actualValue:n}}:null}},e.url=function(){var e=/^((http|ftp|https):\/\/)?[\w-_.]+(\/[\w-_]+)*\/?$/;return function(t){return a(t.value)?null:e.test(t.value)?null:{url:!0}}},e.email=function(){var e=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return function(t){return a(t.value)?null:e.test(t.value)?null:{email:!0}}},e.emailGroup=function(){var e=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return function(t){if(a(t.value))return null;for(var n=t.value.split(";").map(function(e){return e.trim()}),o=!1,i=0,r=n;i<r.length;i++){var s=r[i];if(!e.test(s)){o=!0;break}}parseFloat(t.value);return o?{emailGroup:!0}:null}},e.ip=function(){var e=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;return function(t){return a(t.value)?null:e.test(t.value)?null:{ip:!0}}},e.integer=function(){return function(e){return a(e.value)?null:Number(e.value)===parseInt(e.value,10)?null:{integer:!0}}},e.date=function(){return function(e){return a(e.value)?null:/Invalid|NaN/.test(new Date(e.value).toString())?{date:!0}:null}},e.number=function(){return function(e){return a(e.value)?null:/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e.value)?null:{number:!0}}},e.equal=function(e){return function(t){return a(t.value)?null:e===t.value?null:{equal:{requiredValue:e,actualValue:t.value}}}},e.equalTo=function(e){var t=!1,n="string"==typeof e?null:e;return function(o){return t||(t=!0,n||(n=o.root.get(e)),n.valueChanges.subscribe(function(){o.updateValueAndValidity()})),o.value===n.value?null:{equalTo:{to:"string"==typeof e?e:n.name}}}},e.validateFn=function(e){return function(t){return new Promise(function(n,o){Promise.resolve().then(function(){return e(t.value)}).then(function(e){if(!1===e)return n({validateFn:!0});n(null)}).catch(function(e){n({validateFn:!0,reason:e})})})}},e=o([r.Injectable(),i("design:paramtypes",[])],e)}();t.NkValidators=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(32),i=n(33),r=n(34),a=n(35),s=n(36),c=n(37),l=n(38),p=n(39),u=n(40),d=n(41),f=n(42),h=n(43);!function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(2)),t.ALL_VALIDATORS=[o.DateValidator,i.EmailGroupValidator,r.EmailValidator,a.EqualToValidator,s.EqualValidator,c.IntegerValidator,l.IpValidator,u.MinValidator,p.MaxValidator,d.NumberValidator,f.UrlValidator,h.ValidateFnValidator]},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(44);var r=n(0),a=function(){function e(){this.accordionId="accordion_"+Math.random().toString(16).slice(2)}return e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){},e=o([r.Component({selector:"nk-accordion",template:n(45)}),i("design:paramtypes",[])],e)}();t.AccordionComponent=a},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(){function e(e){this.elementRef=e,this.active=!1,this.isFirstItem=!1,this.imgWidth=0,this.imgHeight=0,this.imgUrl="",this.loadImgDone=new r.EventEmitter}return e.prototype.ngOnInit=function(){this.rootDiv=this.elementRef.nativeElement.querySelector("div")},e.prototype.loaded=function(e){this.imgWidth=this.imgEle.nativeElement.width,this.imgHeight=this.imgEle.nativeElement.height,this.imgLoaded=!0,this.loadImgDone.emit(!0)},e.prototype.loadError=function(e){this.imgLoaded=!0,this.loadImgDone.emit(!0)},o([r.ViewChild("imgEle"),i("design:type",r.ElementRef)],e.prototype,"imgEle",void 0),o([r.Input(),i("design:type",String)],e.prototype,"imgUrl",void 0),e=o([r.Component({selector:"nk-carousel-item",template:n(56)}),i("design:paramtypes",[r.ElementRef])],e)}();t.CarouselItemComponent=a},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=this&&this.__param||function(e,t){return function(n,o){t(n,o,e)}};Object.defineProperty(t,"__esModule",{value:!0}),n(60);var a=n(0),s=n(1),c=n(7),l=n(8);t.CHECKBOX_VALUE_ACCESSOR={provide:s.NG_VALUE_ACCESSOR,useExisting:a.forwardRef(function(){return p}),multi:!0};var p=function(){function e(e,t){this.checkboxGroup=e,this._domSanitizer=t,this.onChange=Function.prototype,this.onTouched=Function.prototype,this.innerDisabled=!1,this.innerChecked=!1,this.disabled=!1,this.contentStyle=""}return Object.defineProperty(e.prototype,"_inlineStyle",{get:function(){return this._domSanitizer.bypassSecurityTrustStyle(this.contentStyle)},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){e.disabled&&(this.innerDisabled=this.disabled)},e.prototype.handleCheckedChange=function(e){e&&(e.stopPropagation(),this.innerChecked=e.target.checked,this.onChange(this.innerChecked),this.checkboxGroup&&this.checkboxGroup.updateCheckboxGroupValue(this.value,this.innerChecked))},e.prototype.writeValue=function(e){this.innerChecked=Boolean(e)},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.setDisabledState=function(e){this.innerDisabled=e},o([a.Input(),i("design:type",Object)],e.prototype,"value",void 0),o([a.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([a.Input("style"),i("design:type",String)],e.prototype,"contentStyle",void 0),e=o([a.Component({selector:"nk-checkbox",template:n(63),providers:[t.CHECKBOX_VALUE_ACCESSOR]}),r(0,a.Optional()),r(0,a.Host()),i("design:paramtypes",[l.CheckboxGroupComponent,c.DomSanitizer])],e)}();t.CheckboxComponent=p},function(e,t){e.exports=o},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1),s=n(9),c=n(6);t.CHECKBOX_GROUP_VALUE_ACCESSOR={provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return l}),multi:!0};var l=function(){function e(e){this.arrayHelper=e,this.onChange=Function.prototype,this.onTouched=Function.prototype,this.checkedValues=[],this.disabled=!1,this.checkboxList=[]}return e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){var t=this;e.disabled&&setTimeout(function(){t.checkboxList.forEach(function(e){return e.innerDisabled=t.disabled})})},e.prototype.updateCheckboxGroupValue=function(e,t){this.checkedValues=this.arrayHelper[t?"addValue":"removeValue"](this.checkedValues,e),this.onChange(this.checkedValues),this.syncCheckboxStatus()},e.prototype.syncCheckboxStatus=function(){var e=this;this.checkboxList.forEach(function(t){return t.innerChecked=e.checkedValues.includes(t.value)})},e.prototype.writeValue=function(e){this.checkedValues=e,this.syncCheckboxStatus()},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.setDisabledState=function(e){this.checkboxList.forEach(function(t){return t.innerDisabled=e})},o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.ContentChildren(r.forwardRef(function(){return c.CheckboxComponent})),i("design:type",Array)],e.prototype,"checkboxList",void 0),e=o([r.Component({selector:"nk-checkbox-group",template:n(62),providers:[t.CHECKBOX_GROUP_VALUE_ACCESSOR]}),i("design:paramtypes",[s.ArrayHelper])],e)}();t.CheckboxGroupComponent=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(61);t.ArrayHelper=o.ArrayHelper,t.HELPERS=[o.ArrayHelper]},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(66);var r=n(0),a=function(){function e(){this.gutter=0,this.justify="start",this.align="top"}return Object.defineProperty(e.prototype,"style",{set:function(e){if(e){this._styleObj={};var t=e.split(":"),n=this.camelize(t[0].trim());this._styleObj[n]=t[1].trim()}else this._styleObj=null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"rowStyle",{get:function(){var e={};return this.gutter&&(e.marginLeft="-"+this.gutter/2+"px",e.marginRight=e.marginLeft,e.width="calc(100% + "+this.gutter+"px)"),this._styleObj&&Object.assign(e,this._styleObj),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"rowClass",{get:function(){var e=[];return"start"!==this.justify&&e.push("is-justify-"+this.justify),"top"!==this.align&&e.push("is-align-"+this.align),"flex"===this.type&&e.push("nk-row--flex"),e},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.camelize=function(e){return e.replace(/(?:^|[-])(\w)/g,function(e,t){return(t="-"===e.substr(0,1)?t.toUpperCase():t)||""})},o([r.ViewChild("rowDiv"),i("design:type",r.ElementRef)],e.prototype,"rowDiv",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"gutter",void 0),o([r.Input(),i("design:type",String)],e.prototype,"type",void 0),o([r.Input(),i("design:type",String)],e.prototype,"justify",void 0),o([r.Input(),i("design:type",String)],e.prototype,"align",void 0),o([r.Input("style"),i("design:type",String),i("design:paramtypes",[String])],e.prototype,"style",null),e=o([r.Component({selector:"nk-row",template:n(67)})],e)}();t.RowComponent=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e){e?e instanceof Date?this.innerDate=e:this.innerDate=new Date(e):this.innerDate=new Date}return e.prototype.addYears=function(e){var t=this.innerDate.getFullYear()+e;return this.innerDate.setFullYear(t),this},e.prototype.addMonths=function(e){var t=this.innerDate.getMonth()+e,n=Math.floor(t/12);return 0!==n&&this.addYears(n),this.innerDate.setMonth(t-12*n),this},e.prototype.addDays=function(e){var t=1e3*e*3600*24;return this.innerDate=new Date(this.toNumber()+t),this},e.prototype.toNumber=function(){return this.innerDate.valueOf()},e.prototype.get=function(){return this.innerDate},e.prototype.format=function(e){return e.replace("yyyy",this.innerDate.getFullYear().toString()).replace("MM",this._fixedZero(this.innerDate.getMonth()+1)).replace("dd",this._fixedZero(this.innerDate.getDate()))},e.prototype._fixedZero=function(e){return e="00"+e,e.substring(e.length-2)},e}();t.SaDate=o},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(87);var r=n(0),a=n(1),s=function(){function e(){this.labelWidth="",this.inline=!0,this.onSubmit=new r.EventEmitter}return Object.defineProperty(e.prototype,"submitted",{get:function(){return!!this.form&&this.form.submitted},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.validateForm=function(){var e=this;return Object.keys(this.form.controls).forEach(function(t){e.form.controls[t].markAsDirty()}),this.form.valid},e.prototype.submit=function(){this.submitBtn.nativeElement.click()},e.prototype.resetForm=function(){this.form&&this.form.resetForm()},e.prototype._innerSubmit=function(){this.onSubmit.emit(this.form)},o([r.Input(),i("design:type",String)],e.prototype,"labelWidth",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"inline",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onSubmit",void 0),o([r.ViewChild("nkForm"),i("design:type",a.NgForm)],e.prototype,"form",void 0),o([r.ViewChild("submitBtn"),i("design:type",r.ElementRef)],e.prototype,"submitBtn",void 0),e=o([r.Component({selector:"nk-form",template:n(88),exportAs:"nkForm"}),i("design:paramtypes",[])],e)}();t.FormComponent=s},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(){function e(e){this.template=e}return e.prototype.ngOnInit=function(){},e=o([r.Directive({selector:"[nkGridCellTemplate]"}),i("design:paramtypes",[r.TemplateRef])],e)}();t.GridCellDirective=a},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(13),s=function(){function e(){this.sort="",this.header="",this.width="auto",this.sortable=!1,this.contentClass="",this.headerClass=""}return Object.defineProperty(e.prototype,"styleWidth",{get:function(){return"auto"===this.width?"auto":this.width+"px"},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},o([r.Input(),i("design:type",String)],e.prototype,"header",void 0),o([r.Input(),i("design:type",String)],e.prototype,"field",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"width",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"sortable",void 0),o([r.Input("class"),i("design:type",String)],e.prototype,"contentClass",void 0),o([r.Input(),i("design:type",String)],e.prototype,"headerClass",void 0),o([r.Input(),r.ContentChild(a.GridCellDirective,{read:r.TemplateRef}),i("design:type",r.TemplateRef)],e.prototype,"cellTemplate",void 0),e=o([r.Directive({selector:"nk-grid-column"})],e)}();t.GridColumnDirective=s},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(){function e(){}return Object.defineProperty(e.prototype,"hostClass",{get:function(){var e=["popover","fade","in"];return e.push(this.placement),e.join(" ")},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},o([r.Input(),i("design:type",String)],e.prototype,"placement",void 0),o([r.Input(),i("design:type",String)],e.prototype,"title",void 0),e=o([r.Component({selector:"nk-popover-content",template:n(111),host:{"[class]":"hostClass",style:"display:block;"}}),i("design:paramtypes",[])],e)}();t.PopoverContentComponent=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(114);t.ComponentLoader=o.ComponentLoader,t.ComponentLoaderFactory=o.ComponentLoaderFactory,t.ContentRef=o.ContentRef;var i=n(21);t.Positioning=i.Positioning,t.PositioningService=i.PositioningService,t.positionElements=i.positionElements,t.CORE_SERVICES=[o.ComponentLoaderFactory,i.PositioningService]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(18),r=n(20),a=function(){function e(e,t,n,i,r,a,s,c){this._viewContainerRef=e,this._renderer=t,this._elementRef=n,this._injector=i,this._componentFactoryResolver=r,this._ngZone=a,this._applicationRef=s,this._posService=c,this.onBeforeShow=new o.EventEmitter,this.onShown=new o.EventEmitter,this.onBeforeHide=new o.EventEmitter,this.onHidden=new o.EventEmitter,this._providers=[],this._isHiding=!1,this._listenOpts={},this._globalListener=Function.prototype}return Object.defineProperty(e.prototype,"isShown",{get:function(){return!this._isHiding&&!!this._componentRef},enumerable:!0,configurable:!0}),e.prototype.attach=function(e){return this._componentFactory=this._componentFactoryResolver.resolveComponentFactory(e),this},e.prototype.to=function(e){return this.container=e||this.container,this},e.prototype.position=function(e){return this.attachment=e.attachment||this.attachment,this._elementRef=e.target||this._elementRef,this},e.prototype.provide=function(e){return this._providers.push(e),this},e.prototype.show=function(e){if(void 0===e&&(e={}),this._subscribePositioning(),this._innerComponent=null,!this._componentRef){this.onBeforeShow.emit(),this._contentRef=this._getContentRef(e.content,e.context);var t=o.ReflectiveInjector.resolveAndCreate(this._providers,this._injector);this._componentRef=this._componentFactory.create(t,this._contentRef.nodes),this._applicationRef.attachView(this._componentRef.hostView),this.instance=this._componentRef.instance,Object.assign(this._componentRef.instance,e),this.container instanceof o.ElementRef&&this.container.nativeElement.appendChild(this._componentRef.location.nativeElement),"body"===this.container&&"undefined"!=typeof document&&document.querySelector(this.container).appendChild(this._componentRef.location.nativeElement),!this.container&&this._elementRef&&this._elementRef.nativeElement.parentElement&&this._elementRef.nativeElement.parentElement.appendChild(this._componentRef.location.nativeElement),this._contentRef.componentRef&&(this._innerComponent=this._contentRef.componentRef.instance,this._contentRef.componentRef.changeDetectorRef.markForCheck(),this._contentRef.componentRef.changeDetectorRef.detectChanges()),this._componentRef.changeDetectorRef.markForCheck(),this._componentRef.changeDetectorRef.detectChanges(),this.onShown.emit(this._componentRef.instance)}return this._registerOutsideClick(),this._componentRef},e.prototype.hide=function(){if(!this._componentRef)return this;this.onBeforeHide.emit(this._componentRef.instance);var e=this._componentRef.location.nativeElement;return e.parentNode.removeChild(e),this._contentRef.componentRef&&this._contentRef.componentRef.destroy(),this._componentRef.destroy(),this._viewContainerRef&&this._contentRef.viewRef&&this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef)),this._contentRef=null,this._componentRef=null,this._removeGlobalListener(),this.onHidden.emit(),this},e.prototype.toggle=function(){if(this.isShown)return void this.hide();this.show()},e.prototype.dispose=function(){this.isShown&&this.hide(),this._unsubscribePositioning(),this._unregisterListenersFn&&this._unregisterListenersFn()},e.prototype.listen=function(e){var t=this;this.triggers=e.triggers||this.triggers,this._listenOpts.outsideClick=e.outsideClick,e.target=e.target||this._elementRef.nativeElement;var n=this._listenOpts.hide=function(){return e.hide?e.hide():void t.hide()},o=this._listenOpts.show=function(n){e.show?e.show(n):t.show(n),n()},r=function(e){t.isShown?n():o(e)};return this._unregisterListenersFn=i.listenToTriggersV2(this._renderer,{target:e.target,triggers:e.triggers,show:o,hide:n,toggle:r}),this},e.prototype._removeGlobalListener=function(){this._globalListener&&(this._globalListener(),this._globalListener=null)},e.prototype.attachInline=function(e,t){return this._inlineViewRef=e.createEmbeddedView(t),this},e.prototype._registerOutsideClick=function(){var e=this;if(this._componentRef&&this._componentRef.location&&this._listenOpts.outsideClick){var t=this._componentRef.location.nativeElement;setTimeout(function(){e._globalListener=i.registerOutsideClick(e._renderer,{targets:[t,e._elementRef.nativeElement],outsideClick:e._listenOpts.outsideClick,hide:function(){return e._listenOpts.hide()}})})}},e.prototype.getInnerComponent=function(){return this._innerComponent},e.prototype._subscribePositioning=function(){var e=this;!this._zoneSubscription&&this.attachment&&(this._zoneSubscription=this._ngZone.onStable.subscribe(function(){e._componentRef&&e._posService.position({element:e._componentRef.location,target:e._elementRef,attachment:e.attachment,appendToBody:"body"===e.container})}))},e.prototype._unsubscribePositioning=function(){this._zoneSubscription&&(this._zoneSubscription.unsubscribe(),this._zoneSubscription=null)},e.prototype._getContentRef=function(e,t){if(!e)return new r.ContentRef([]);if(e instanceof o.TemplateRef){if(this._viewContainerRef){var n=this._viewContainerRef.createEmbeddedView(e,t);return n.markForCheck(),new r.ContentRef([n.rootNodes],n)}var i=e.createEmbeddedView({});return this._applicationRef.attachView(i),new r.ContentRef([i.rootNodes],i)}if("function"==typeof e){var a=this._componentFactoryResolver.resolveComponentFactory(e),s=o.ReflectiveInjector.resolveAndCreate(this._providers.slice(),this._injector),c=a.create(s);return this._applicationRef.attachView(c.hostView),new r.ContentRef([[c.location.nativeElement]],c.hostView,c)}return new r.ContentRef([[this._renderer.createText(""+e)]])},e}();t.ComponentLoader=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(115);t.listenToTriggers=o.listenToTriggers,t.listenToTriggersV2=o.listenToTriggersV2,t.parseTriggers=o.parseTriggers,t.registerOutsideClick=o.registerOutsideClick;var i=n(19);t.Trigger=i.Trigger;var r=n(116);t.removeAngularTag=r.removeAngularTag},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){this.open=e,this.close=t||e}return e.prototype.isManual=function(){return"manual"===this.open||"manual"===this.close},e}();t.Trigger=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t,n){this.nodes=e,this.viewRef=t,this.componentRef=n}return e}();t.ContentRef=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(22);t.positionElements=o.positionElements,t.Positioning=o.Positioning;var i=n(118);t.PositioningService=i.PositioningService},function(e,t,n){"use strict";function o(e,t,n,o){var i=r.positionElements(e,t,n,o);t.style.top=i.top+"px",t.style.left=i.left+"px"}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(){}return e.prototype.position=function(e,t){void 0===t&&(t=!0);var n,o={width:0,height:0,top:0,bottom:0,left:0,right:0};if("fixed"===this.getStyle(e,"position")){var i=e.getBoundingClientRect();n={width:i.width,height:i.height,top:i.top,bottom:i.bottom,left:i.left,right:i.right}}else{var r=this.offsetParent(e);n=this.offset(e,!1),r!==document.documentElement&&(o=this.offset(r,!1)),o.top+=r.clientTop,o.left+=r.clientLeft}return n.top-=o.top,n.bottom-=o.top,n.left-=o.left,n.right-=o.left,t&&(n.top=Math.round(n.top),n.bottom=Math.round(n.bottom),n.left=Math.round(n.left),n.right=Math.round(n.right)),n},e.prototype.offset=function(e,t){void 0===t&&(t=!0);var n=e.getBoundingClientRect(),o={top:window.pageYOffset-document.documentElement.clientTop,left:window.pageXOffset-document.documentElement.clientLeft},i={height:n.height||e.offsetHeight,width:n.width||e.offsetWidth,top:n.top+o.top,bottom:n.bottom+o.top,left:n.left+o.left,right:n.right+o.left};return t&&(i.height=Math.round(i.height),i.width=Math.round(i.width),i.top=Math.round(i.top),i.bottom=Math.round(i.bottom),i.left=Math.round(i.left),i.right=Math.round(i.right)),i},e.prototype.positionElements=function(e,t,n,o){var i=o?this.offset(e,!1):this.position(e,!1),r=this.getAllStyles(t),a={left:i.left,center:i.left+i.width/2-t.offsetWidth/2,right:i.left+i.width},s={top:i.top,center:i.top+i.height/2-t.offsetHeight/2,bottom:i.top+i.height},c=t.getBoundingClientRect(),l=n.split(" ")[0]||"top",p=n.split(" ")[1]||"center",u={height:c.height||t.offsetHeight,width:c.width||t.offsetWidth,top:0,bottom:c.height||t.offsetHeight,left:0,right:c.width||t.offsetWidth};if("auto"===l){var d=this.autoPosition(u,i,t,p);d||(d=this.autoPosition(u,i,t)),d&&(l=d),t.classList.add(l)}switch(l){case"top":u.top=i.top-(t.offsetHeight+parseFloat(r.marginBottom)),u.bottom+=i.top-t.offsetHeight,u.left=a[p],u.right+=a[p];break;case"bottom":u.top=s[l],u.bottom+=s[l],u.left=a[p],u.right+=a[p];break;case"left":u.top=s[p],u.bottom+=s[p],u.left=i.left-(t.offsetWidth+parseFloat(r.marginRight)),u.right+=i.left-t.offsetWidth;break;case"right":u.top=s[p],u.bottom+=s[p],u.left=a[l],u.right+=a[l]}return u.top=Math.round(u.top),u.bottom=Math.round(u.bottom),u.left=Math.round(u.left),u.right=Math.round(u.right),u},e.prototype.autoPosition=function(e,t,n,o){return(!o||"right"===o)&&e.left+t.left-n.offsetWidth<0?"right":(!o||"top"===o)&&e.bottom+t.bottom+n.offsetHeight>window.innerHeight?"top":(!o||"bottom"===o)&&e.top+t.top-n.offsetHeight<0?"bottom":(!o||"left"===o)&&e.right+t.right+n.offsetWidth>window.innerWidth?"left":null},e.prototype.getAllStyles=function(e){return window.getComputedStyle(e)},e.prototype.getStyle=function(e,t){return this.getAllStyles(e)[t]},e.prototype.isStaticPositioned=function(e){return"static"===(this.getStyle(e,"position")||"static")},e.prototype.offsetParent=function(e){for(var t=e.offsetParent||document.documentElement;t&&t!==document.documentElement&&this.isStaticPositioned(t);)t=t.offsetParent;return t||document.documentElement},e}();t.Positioning=i;var r=new i;t.positionElements=o},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=this&&this.__param||function(e,t){return function(n,o){t(n,o,e)}};Object.defineProperty(t,"__esModule",{value:!0}),n(122);var a=n(0),s=n(1),c=n(24);t.RADIO_VALUE_ACCESSOR={provide:s.NG_VALUE_ACCESSOR,useExisting:a.forwardRef(function(){return l}),multi:!0};var l=function(){function e(e){this.radioGroup=e,this.onChange=Function.prototype,this.onTouched=Function.prototype,this.innerDisabled=!1,this.value=!0,this.disabled=!1}return Object.defineProperty(e.prototype,"innerChecked",{get:function(){return this.innerValue===this.value},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"radioName",{get:function(){return this.name||(this.radioGroup||{name:""}).name||"nk-radio"},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){e.disabled&&(this.innerDisabled=this.disabled)},e.prototype.handleRadioClick=function(e){e&&e.stopPropagation(),this.onChange(this.value),this.innerValue=this.value,this.radioGroup&&this.radioGroup.setRadioGroupValue(this.value)},e.prototype.writeValue=function(e){this.innerValue=e},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.setDisabledState=function(e){this.innerDisabled=e},o([a.Input(),i("design:type",Object)],e.prototype,"value",void 0),o([a.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([a.Input(),i("design:type",String)],e.prototype,"name",void 0),e=o([a.Component({selector:"nk-radio",template:n(125),providers:[t.RADIO_VALUE_ACCESSOR]}),r(0,a.Optional()),r(0,a.Host()),i("design:paramtypes",[c.RadioGroupComponent])],e)}();t.RadioComponent=l},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(123);var r=n(0),a=n(1),s=n(23);t.RADIO_GROUP_VALUE_ACCESSOR={provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){this.onChange=Function.prototype,this.onTouched=Function.prototype,this.disabled=!1,this.radioList=[]}return e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){var t=this;e.disabled&&setTimeout(function(){t.radioList.forEach(function(e){return e.innerDisabled=t.disabled})})},e.prototype.setRadioGroupValue=function(e){this.onChange(e),this.syncRadioValue(e)},e.prototype.syncRadioValue=function(e){this.radioList.forEach(function(t){return t.innerValue=e})},e.prototype.writeValue=function(e){this.syncRadioValue(e)},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.setDisabledState=function(e){this.disabled=e,this.radioList.forEach(function(t){return t.disabled=e})},o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.Input(),i("design:type",String)],e.prototype,"name",void 0),o([r.ContentChildren(r.forwardRef(function(){return s.RadioComponent})),i("design:type",Array)],e.prototype,"radioList",void 0),e=o([r.Component({selector:"nk-radio-group",template:n(124),providers:[t.RADIO_GROUP_VALUE_ACCESSOR]})],e)}();t.RadioGroupComponent=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(129);var r=n(0),a=n(1);t.SELECT_VALUE_ACCESSOR={provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return s}),multi:!0};var s=function(){function e(e,t){this.renderer=e,this.elementRef=t,this.onChange=Function.prototype,this.onTouched=Function.prototype,this.options=[],this.placeholder="",this.allowClear=!1,this.disabled=!1,this.allowSearch=!1}return e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){var e=this,t=window.jQuery||window.$;return t?t("body").select2?(this._select2Ctrl=t(this.select2Ctrl.nativeElement),this._select2Ctrl.select2({placeholder:this.placeholder||"",allowClear:this.allowClear,disabled:this.disabled,data:this.dataSource,minimumResultsForSearch:this.allowSearch?0:-1}).on("select2:select",function(t){var n=t.params.data.data;e.onChange(n)}),this.updateDataSource(),void this.updateSelect2Value()):console.error("nk-select component need select2 support"):console.error("nk-select component need jQuery support")},e.prototype.ngOnDestroy=function(){this._select2Ctrl.select2("destroy")},e.prototype.updateSelect2Value=function(){this._select2Ctrl&&(this._select2Ctrl.val(this.selectedValue),this._select2Ctrl.trigger("change"))},e.prototype.updateDataSource=function(){var e=[];this.options&&(e=this.options.map(function(e){return{id:e.value,text:e.label,disabled:e.disabled,data:e.value}})),this.dataSource=e,this._select2Ctrl&&this._select2Ctrl.select2({data:e})},e.prototype.addOption=function(e){this.options.push(e),this.updateDataSource()},e.prototype.removeOption=function(e){this.options.splice(this.options.indexOf(e),1),this.updateDataSource()},e.prototype.writeValue=function(e){this.selectedValue=e,this.updateSelect2Value()},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.setDisabledState=function(e){},o([r.ViewChild("select2Ctrl"),i("design:type",r.ElementRef)],e.prototype,"select2Ctrl",void 0),o([r.Input(),i("design:type",String)],e.prototype,"placeholder",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"allowClear",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"allowSearch",void 0),e=o([r.Component({selector:"nk-select",template:n(130),providers:[t.SELECT_VALUE_ACCESSOR]}),i("design:paramtypes",[r.Renderer2,r.ElementRef])],e)}();t.SelectComponent=s},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(134);var r=n(0),a=function(){function e(e,t){this.elementRef=e,this.renderer=t,this.direction="horizontal",this.active=0,this.offset=0,this.stepsLength=0}return Object.defineProperty(e.prototype,"space",{get:function(){return null},set:function(e){console.warn("[nk-steps] 'space' property has expired")},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"simple",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"processStatus",{get:function(){return"process"},set:function(e){console.warn("[nk-steps] 'process-status' property has expired")},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"finishStatus",{get:function(){return"finish"},set:function(e){console.warn("[nk-steps] 'finish-status' property has expired")},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"alignCenter",{get:function(){return!1},set:function(e){console.warn("[nk-steps] 'align-center' property has expired")},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"stepsClass",{get:function(){return e={},e["nk-steps--"+this.direction]=!this.simple,e;var e},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){var e=this,t=this.elementRef.nativeElement.querySelectorAll("nk-step");if(!t||!t.length)return console.warn("steps components required children");t.forEach(function(t,n){e.renderer.setAttribute(t,"nk-index",String(n))}),this.stepsLength=t.length},o([r.Input(),i("design:type",Object),i("design:paramtypes",[Object])],e.prototype,"space",null),o([r.Input(),i("design:type",String)],e.prototype,"direction",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"active",void 0),o([r.Input(),i("design:type",Boolean),i("design:paramtypes",[])],e.prototype,"simple",null),o([r.Input("process-status"),i("design:type",String),i("design:paramtypes",[String])],e.prototype,"processStatus",null),o([r.Input("finish-status"),i("design:type",String),i("design:paramtypes",[String])],e.prototype,"finishStatus",null),o([r.Input("align-center"),i("design:type",Boolean),i("design:paramtypes",[Boolean])],e.prototype,"alignCenter",null),e=o([r.Component({selector:"nk-steps",template:n(135),changeDetection:r.ChangeDetectionStrategy.OnPush}),i("design:paramtypes",[r.ElementRef,r.Renderer2])],e)}();t.StepsComponent=a},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(141);var r=n(0),a=function(){function e(e){this.renderer=e,this.tabItems=[],this.isDestroyed=!1,this.tabsLeft=!1,this.headerWidth=80,this.selectedChange=new r.EventEmitter}return Object.defineProperty(e.prototype,"headerStyle",{get:function(){return this.tabsLeft?{width:this.headerWidth+"px"}:{}},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){e.selected&&this._processSelectedChange(this.selected)},e.prototype.ngAfterViewInit=function(){var e=this;setTimeout(function(){e._processSelectedChange(e.selected)})},e.prototype.ngOnDestroy=function(){this.isDestroyed=!0},e.prototype.setActiveItem=function(e){this._currentTabItem!==e&&(this._currentTabItem&&(this._currentTabItem.active=!1),this._currentTabItem=e,this._currentTabItem.active=!0,this.selectedChange.emit(this._currentTabItem.innerName))},e.prototype.addTab=function(e){var t=this;this.tabItems.push(e),e.innerName||(e.innerName="tabpane-"+(this.tabItems.length-1)),e.active=1===this.tabItems.length&&!e.active,e.active&&setTimeout(function(){t.setActiveItem(e)})},e.prototype.removeTab=function(e){var t=this.tabItems.indexOf(e);-1===t||this.isDestroyed||(this.tabItems.splice(t,1),e.elementRef.nativeElement.parentNode&&this.renderer.removeChild(e.elementRef.nativeElement.parentNode,e.elementRef.nativeElement),this.tabItems.length>0&&0===this.tabItems.filter(function(e){return e.active}).length&&this.setActiveItem(this.tabItems[this.tabItems.length-1]))},e.prototype._processSelectedChange=function(e){var t=this.tabItems.find(function(t){return t.innerName===e})||this.tabItems[0];t&&this.setActiveItem(t)},o([r.Input(),i("design:type",String)],e.prototype,"selected",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"tabsLeft",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"headerWidth",void 0),o([r.Output(),i("design:type",Object)],e.prototype,"selectedChange",void 0),e=o([r.Component({selector:"nk-tabset",template:n(142)}),i("design:paramtypes",[r.Renderer2])],e)}();t.TabsetComponent=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(29);t.KubiUIModule=o.KubiUIModule;var i=n(3);t.NkValidators=i.NkValidators;t.version="0.2.4"},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(t,"__esModule",{value:!0}),n(30);var i=n(31),r=n(154),a=n(1),s=n(16),c=n(156),l=n(9),p=n(0),u=n(3),d=function(){function e(){}return e=o([p.NgModule({imports:[c.CommonModule,a.FormsModule,a.ReactiveFormsModule],declarations:i.ALL_COMPONENTS.concat(r.COMMON_COMPONENTS),entryComponents:i.ENTRY_COMPONENTS.slice(),exports:i.ALL_COMPONENTS.slice(),providers:l.HELPERS.concat(s.CORE_SERVICES,[u.NkValidators])})],e)}();t.KubiUIModule=d},function(e,t){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),i=n(4),r=n(46),a=n(48),s=n(51),c=n(54),l=n(5),p=n(58),u=n(6),d=n(8),f=n(64),h=n(69),g=n(72),y=n(75),m=n(78),v=n(81),b=n(84),_=n(12),C=n(89),R=n(13),O=n(14),w=n(91),k=n(94),I=n(97),S=n(100),j=n(104),D=n(15),E=n(112),P=n(119),M=n(23),x=n(24),T=n(126),A=n(10),V=n(25),L=n(131),F=n(133),N=n(26),H=n(137),B=n(140),z=n(27),G=n(143),q=n(145),U=n(148),W=n(151);t.ENTRY_COMPONENTS=[D.PopoverContentComponent],t.ALL_COMPONENTS=[E.PopoverDirective,D.PopoverContentComponent,G.TooltipDirective].concat(o.ALL_VALIDATORS,[A.RowComponent,f.ColComponent,i.AccordionComponent,r.AccordionItemComponent,a.AlertComponent,s.ButtonComponent,c.CarouselComponent,l.CarouselItemComponent,h.CollapseBoxComponent,b.FixbarComponent,w.GridComponent,O.GridColumnDirective,R.GridCellDirective,S.ModalComponent,k.ImageZoomComponent,P.ProgressComponent,U.WidgetComponent,N.StepsComponent,F.StepComponent,z.TabsetComponent,B.TabItemComponent,p.CascaderComponent,u.CheckboxComponent,d.CheckboxGroupComponent,g.DatePickerComponent,y.DateRangePickerComponent,m.TimePickerComponent,v.TimeRangePickerComponent,_.FormComponent,C.FormItemComponent,I.InputComponent,j.PaginationComponent,M.RadioComponent,x.RadioGroupComponent,T.RatingComponent,V.SelectComponent,L.SelectOptionComponent,H.SwitchComponent,q.ValidatorComponent,W.CreditCardComponent])},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.DATE_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.date()},e.prototype.ngOnChanges=function(e){e.date&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",String)],e.prototype,"date",void 0),e=o([a.Directive({selector:"[date][formControlName],[date][formControl],[date][ngModel]",providers:[t.DATE_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.DateValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.EMAIL_GROUP_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.emailGroup()},e.prototype.ngOnChanges=function(e){e.emailGroup&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",String)],e.prototype,"emailGroup",void 0),e=o([a.Directive({selector:"[emailGroup][formControlName],[emailGroup][formControl],[emailGroup][ngModel]",providers:[t.EMAIL_GROUP_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.EmailGroupValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.EMAIL_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.email()},e.prototype.ngOnChanges=function(e){e.email&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",String)],e.prototype,"email",void 0),e=o([a.Directive({selector:"[email][formControlName],[email][formControl],[email][ngModel]",providers:[t.EMAIL_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.EmailValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.EQUAL_TO_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.equalTo(this.equalTo)},e.prototype.ngOnChanges=function(e){e.equalTo&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",Object)],e.prototype,"equalTo",void 0),e=o([a.Directive({selector:"[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]",providers:[t.EQUAL_TO_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.EqualToValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.EQUAL_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.equal(this.equal)},e.prototype.ngOnChanges=function(e){e.equal&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",Object)],e.prototype,"equal",void 0),e=o([a.Directive({selector:"[equal][formControlName],[equal][formControl],[equal][ngModel]",providers:[t.EQUAL_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.EqualValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.INTEGER_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.integer()},e.prototype.ngOnChanges=function(e){e.integer&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",String)],e.prototype,"integer",void 0),e=o([a.Directive({selector:"[integer][formControlName],[integer][formControl],[integer][ngModel]",providers:[t.INTEGER_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.IntegerValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.IP_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.ip()},e.prototype.ngOnChanges=function(e){e.ip&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",String)],e.prototype,"ip",void 0),e=o([a.Directive({selector:"[ip][formControlName],[ip][formControl],[ip][ngModel]",providers:[t.IP_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.IpValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.MAX_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.max(+this.max)},e.prototype.ngOnChanges=function(e){e.max&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this.max?this._validator(e):null},o([a.Input(),i("design:type",String)],e.prototype,"max",void 0),e=o([a.Directive({selector:"[max][formControlName],[max][formControl],[max][ngModel]",providers:[t.MAX_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.MaxValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.MIN_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.min(+this.min)},e.prototype.ngOnChanges=function(e){e.min&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this.min?this._validator(e):null},o([a.Input(),i("design:type",String)],e.prototype,"min",void 0),e=o([a.Directive({selector:"[min][formControlName],[min][formControl],[min][ngModel]",providers:[t.MIN_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.MinValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.NUMBER_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.number()},e.prototype.ngOnChanges=function(e){e.number&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",String)],e.prototype,"number",void 0),e=o([a.Directive({selector:"[number][formControlName],[number][formControl],[number][ngModel]",providers:[t.NUMBER_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.NumberValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.URL_VALIDATOR={provide:r.NG_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.url()},e.prototype.ngOnChanges=function(e){e.url&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",String)],e.prototype,"url",void 0),e=o([a.Directive({selector:"[url][formControlName],[url][formControl],[url][ngModel]",providers:[t.URL_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.UrlValidator=c},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),s=n(2);t.VALIDATE_FN_VALIDATOR={provide:r.NG_ASYNC_VALIDATORS,useExisting:a.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){}return e.prototype._createValidator=function(){this._validator=s.NkValidators.validateFn(this.validateFn)},e.prototype.ngOnChanges=function(e){e.validateFn&&(this._createValidator(),this._onChange&&this._onChange())},e.prototype.validate=function(e){return this._validator(e)},o([a.Input(),i("design:type",Function)],e.prototype,"validateFn",void 0),e=o([a.Directive({selector:"[validateFn][formControlName],[validateFn][formControl],[validateFn][ngModel]",providers:[t.VALIDATE_FN_VALIDATOR]}),i("design:paramtypes",[])],e)}();t.ValidateFnValidator=c},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-accordion panel-group smart-accordion-default" [id]="accordionId">\r\n  <ng-content></ng-content>\r\n</div>\r\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(4),s=function(){function e(e){this.accordion=e,this.accordionItemId="accordion_item_"+Math.random().toString(16).slice(2),this.activeChange=new r.EventEmitter}return e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){},e.prototype.changeActiveStatus=function(){this.active=!this.active,this.activeChange.emit(this.active)},o([r.Input(),i("design:type",String)],e.prototype,"header",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"active",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"activeChange",void 0),e=o([r.Component({selector:"nk-accordion-item",template:n(47)}),i("design:paramtypes",[a.AccordionComponent])],e)}();t.AccordionItemComponent=s},function(e,t){e.exports='<div class="nk-comp nk-accordion-item panel panel-default">\r\n  <div class="panel-heading" (click)="changeActiveStatus()">\r\n    <h4 class="panel-title">\r\n      {{header}}\r\n    </h4>\r\n  </div>\r\n  <div class="panel-collapse collapse" [ngClass]="{in: active}">\r\n    <div class="panel-body">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(49);var r=n(0),a=function(){function e(){this.type="info",this.shown=!0,this.shownChange=new r.EventEmitter,this.closable=!0,this.inline=!0,this.onClose=new r.EventEmitter}return Object.defineProperty(e.prototype,"inlineHeader",{get:function(){if(this.header)return this.header;switch(this.header){case"info":return"Information";case"warning":return"Warning";case"danger":return"Danger";case"success":return"Success";default:return"Information"}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"alertClass",{get:function(){var e=["nk-alert-"+this.type];return this.inline&&e.push("nk-alert-inline"),e},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){},e.prototype.onCloseBtnClick=function(){this.shown=!1,this.shownChange.emit(!1),this.onClose.emit(!1)},o([r.Input(),i("design:type",String)],e.prototype,"type",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"shown",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"shownChange",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"closable",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"inline",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onClose",void 0),o([r.Input(),i("design:type",String)],e.prototype,"header",void 0),e=o([r.Component({selector:"nk-alert",template:n(50)})],e)}();t.AlertComponent=a},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-alert alert" [ngClass]="alertClass" [hidden]="!shown">\n  <button class="alert-close close" *ngIf="closable" (click)="onCloseBtnClick()">×</button>\n  <span class="alert-title">    \n    <span>{{inlineHeader}} </span>\n  </span>\n  <ng-content></ng-content>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(52);var r=n(0),a=function(){function e(e){this.renderer2=e,this._type="normal",this._disabled=!1,this._width="",this.mode="button",this.buttonClass={"nk-button-disabled":!1,"nk-button-primary":!1,"nk-button-danger":!1}}return Object.defineProperty(e.prototype,"type",{get:function(){return this._type},set:function(e){this._type=e,this._updateButtonClass()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return this._disabled},set:function(e){this._disabled=!!e,this._updateButtonClass()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"width",{get:function(){return this._width},set:function(e){this._width=e,this._updateButtonStyle()},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){this._updateButtonStyle()},e.prototype._updateButtonClass=function(){this.buttonClass["nk-button-disabled"]=this.disabled,this.buttonClass["nk-button-primary"]="primary"===this.type,this.buttonClass["nk-button-danger"]="danger"===this.type},e.prototype._updateButtonStyle=function(){if(this.buttonEle)if(this.width){var e=this.width+("number"==typeof this.width?"px":"");this.renderer2.setStyle(this.buttonEle.nativeElement,"width",e)}else this.renderer2.setStyle(this.buttonEle.nativeElement,"width",null)},o([r.ViewChild("buttonEle"),i("design:type",r.ElementRef)],e.prototype,"buttonEle",void 0),o([r.Input(),i("design:type",String),i("design:paramtypes",[String])],e.prototype,"type",null),o([r.Input(),i("design:type",Boolean),i("design:paramtypes",[Boolean])],e.prototype,"disabled",null),o([r.Input(),i("design:type",Object),i("design:paramtypes",[Object])],e.prototype,"width",null),o([r.Input(),i("design:type",String)],e.prototype,"icon",void 0),o([r.Input(),i("design:type",String)],e.prototype,"mode",void 0),e=o([r.Component({selector:"nk-button",template:n(53)}),i("design:paramtypes",[r.Renderer2])],e)}();t.ButtonComponent=a},function(e,t){},function(e,t){e.exports='<button type="{{mode}}" class="nk-comp nk-button" [disabled]="disabled" [ngClass]="buttonClass" #buttonEle>\n  <i [class]="icon" *ngIf="!!icon"></i>\n  <ng-content></ng-content>\n</button>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(55);var r=n(0),a=n(5),s=function(){function e(e){this.renderer=e,this.innerIndex=0,this.pause=!1,this.animateType="slide",this.autoplay=!0,this.interval=3e3,this.change=new r.EventEmitter,this._carouselItemSubs=[]}return Object.defineProperty(e.prototype,"onlyOneItem",{get:function(){return this.items.length<=1},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngOnChange=function(e){(e.autoplay||e.interval)&&this.setAutoplay()},e.prototype.ngAfterViewInit=function(){var e=this;this.initFisrtImg(),this.initCarouselItemSubs(),this._carouselQuerySub=this.items.changes.subscribe(function(t){e.initCarouselItemSubs(),e.initFisrtImg()})},e.prototype.ngOnDestroy=function(){this._carouselItemSubs.forEach(function(e){return e.unsubscribe()}),this._carouselQuerySub&&this._carouselQuerySub.unsubscribe()},e.prototype.initFisrtImg=function(){var e=this;setTimeout(function(){var t=e.items.toArray()[0];t&&(t.isFirstItem=!0,t.active=!0),e.setAutoplay()})},e.prototype.initCarouselItemSubs=function(){var e=this;this._carouselItemSubs.forEach(function(e){return e.unsubscribe()}),this._carouselItemSubs=[],this.items.toArray().forEach(function(t){var n=t.loadImgDone.subscribe(function(t){setTimeout(function(){e.resetHeight()})});e._carouselItemSubs.push(n)})},e.prototype.resetHeight=function(){var e=this.items.toArray(),t=e.map(function(e){return e.rootDiv.offsetWidth}).find(function(e){return e>0}),n=Math.max.apply(Math,e.map(function(e){return 0===e.imgWidth?0:t/e.imgWidth*e.imgHeight}));n=Math.floor(n||0),this.renderer.setStyle(this.nkCarouselContainer.nativeElement,"height",n>0?n+"px":"auto")},e.prototype.handleMouseEnter=function(){this.pause=!0},e.prototype.handleMouseLeave=function(){this.pause=!1},e.prototype.setAutoplay=function(){var e=this;clearInterval(this.intervalId),this.autoplay&&(this.intervalId=setInterval(function(){e.pause||e.onlyOneItem||e.next()},this.interval))},e.prototype.prev=function(){var e=this.innerIndex-1;e=e<0?this.items.length-1:e,this.slide(e,"prev")},e.prototype.next=function(){var e=this.innerIndex+1;e=e>this.items.length-1?0:e,this.slide(e)},e.prototype.slide=function(e,t){var n=this;void 0===t&&(t="next");var o=this.innerIndex;this.innerIndex=e;var i=this.items.toArray(),r=i[o],a=i[this.innerIndex];if("slide"===this.animateType){var s="next"==t?"left":"right";this.renderer.addClass(a.rootDiv,t),setTimeout(function(){n.renderer.addClass(a.rootDiv,s),n.renderer.addClass(r.rootDiv,s)}),setTimeout(function(){n.removeClass(r.rootDiv,s+" active"),n.removeClass(a.rootDiv,t+" "+s),n.renderer.addClass(a.rootDiv,"active")},600)}else setTimeout(function(){r.active=!1,a.active=!0});this.change.emit(this.innerIndex)},e.prototype.removeClass=function(e,t){var n=this;(t||"").split(" ").forEach(function(t){n.renderer.removeClass(e,t)})},o([r.ViewChild("nkCarouselContainer"),i("design:type",r.ElementRef)],e.prototype,"nkCarouselContainer",void 0),o([r.Input(),i("design:type",String)],e.prototype,"animateType",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"autoplay",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"interval",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"change",void 0),o([r.ContentChildren(a.CarouselItemComponent),i("design:type",r.QueryList)],e.prototype,"items",void 0),e=o([r.Component({selector:"nk-carousel",template:n(57)}),i("design:paramtypes",[r.Renderer2])],e)}();t.CarouselComponent=s},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-carousel-item item" [ngClass]="{active: active, \'first-item\': isFirstItem}">\n  <img [src]="imgUrl" alt="" (error)="loadError($event)" (load)="loaded($event)" #imgEle>\n  <div class="carousel-caption caption-right">\n    <ng-content></ng-content>\n  </div>  \n</div>\n'},function(e,t){e.exports='<div class="nk-carousel carousel" [ngClass]="animateType" (mouseenter)="handleMouseEnter()" (mouseleave)="handleMouseLeave()" #nkCarouselContainer>\n  <ol class="carousel-indicators" [hidden]="onlyOneItem">\n    <li *ngFor="let item of items;let idx = index" [ngClass]="{active: idx === innerIndex}" (click)="slide(idx)"></li>\n  </ol>\n  <div class="carousel-inner">\n    <ng-content></ng-content>\n  </div>\n  <a [hidden]="onlyOneItem" class="left nk-carousel-control" href="javascript:;" (click)="prev()">\n    <span class="fa fa-angle-left"></span>\n  </a>\n  <a [hidden]="onlyOneItem" class="right nk-carousel-control" href="javascript:;" (click)="next()">\n    <span class="fa fa-angle-right"></span>\n  </a>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=function(){function e(){}return e.prototype.ngOnInit=function(){},e=o([i.Component({selector:"nk-cascader",template:n(59)})],e)}();t.CascaderComponent=r},function(e,t){e.exports='<div class="nk-comp cascader"> Hello CascaderComponent! </div>\r\n'},function(e,t){},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(){function e(){}return e.prototype.removeValue=function(e,t){return e.filter(function(e){return e!==t})},e.prototype.addValue=function(e,t){var n=e.slice();return n.includes(t)||n.push(t),n},e=o([r.Injectable(),i("design:paramtypes",[])],e)}();t.ArrayHelper=a},function(e,t){e.exports='<div class="nk-comp nk-checkbox-group">\r\n  <ng-content></ng-content>\r\n</div>\r\n'},function(e,t){e.exports='<label class="nk-comp nk-checkbox" [attr.style]="_inlineStyle" [ngClass]="{\'nk-checkbox-checked\': innerChecked, \'nk-checkbox-disabled\': innerDisabled}">\r\n  <span class="nk-checkbox-inner">\r\n    <input type="checkbox" [ngModel]="innerChecked" [disabled]="innerDisabled" (click)="handleCheckedChange($event)">\r\n  </span>\r\n  <span class="nk-checkbox-content">\r\n    <ng-content></ng-content>\r\n  </span>\r\n</label>\r\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=this&&this.__param||function(e,t){return function(n,o){t(n,o,e)}};Object.defineProperty(t,"__esModule",{value:!0}),n(65);var a=n(0),s=n(10),c=function(){function e(e,t){this.elementRef=e,this.row=t,this.span=24,this.offset=0,this.push=0,this.pull=0}return Object.defineProperty(e.prototype,"gutter",{get:function(){return this.row.gutter||0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"colStyle",{get:function(){var e={};return this.gutter&&(e.marginLeft=this.gutter/2+"px",e.marginRight=e.marginLeft),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"colClass",{get:function(){var e=this,t=[];return["span","offset","pull","push"].forEach(function(n){e[n]&&t.push("span"!==n?"nk-col-"+n+"-"+e[n]:"nk-col-"+e[n])}),["xs","sm","md","lg"].forEach(function(n){if("number"==typeof e[n])t.push("nk-col-"+n+"-"+e[n]);else if("object"==typeof e[n]){var o=e[n];Object.keys(o).forEach(function(e){t.push("span"!==e?"nk-col-"+n+"-"+e+"-"+o[e]:"nk-col-"+n+"-"+o[e])})}}),t},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){this._setElementClassAndStyle()},e.prototype.ngOnChanges=function(e){this._setElementClassAndStyle()},e.prototype._setElementClassAndStyle=function(){if(this.elementRef.nativeElement){var e=this.elementRef.nativeElement;e.className=["nk-col"].concat(this.colClass).join(" "),this.gutter&&(e.style.paddingLeft=this.gutter/2+"px",e.style.paddingRight=e.style.paddingLeft)}},o([a.Input(),i("design:type",Number)],e.prototype,"span",void 0),o([a.Input(),i("design:type",Number)],e.prototype,"offset",void 0),o([a.Input(),i("design:type",Number)],e.prototype,"push",void 0),o([a.Input(),i("design:type",Number)],e.prototype,"pull",void 0),o([a.Input(),i("design:type",Object)],e.prototype,"xs",void 0),o([a.Input(),i("design:type",Object)],e.prototype,"sm",void 0),o([a.Input(),i("design:type",Object)],e.prototype,"md",void 0),o([a.Input(),i("design:type",Object)],e.prototype,"lg",void 0),e=o([a.Component({selector:"nk-col",template:n(68)}),r(1,a.Host()),r(1,a.Optional()),i("design:paramtypes",[a.ElementRef,s.RowComponent])],e)}();t.ColComponent=c},function(e,t){},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-row" [ngStyle]="rowStyle" [ngClass]="rowClass" #rowDiv>  \n  <ng-content></ng-content>\n</div>\n'},function(e,t){e.exports="<ng-content></ng-content>\r\n"},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(70);var r=n(0),a=function(){function e(){this.innerCollapsed=!1,this.collapsed=!1,this.disabled=!1,this.collapsedChange=new r.EventEmitter}return e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){e.collapsed&&(this.innerCollapsed=this.collapsed)},e.prototype.handleHeaderClick=function(){this.disabled||(this.innerCollapsed=!this.innerCollapsed,this.collapsedChange.next(this.innerCollapsed))},o([r.Input(),i("design:type",String)],e.prototype,"header",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"collapsed",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"collapsedChange",void 0),e=o([r.Component({selector:"nk-collapse-box",template:n(71)})],e)}();t.CollapseBoxComponent=a},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-collapse-box" [ngClass]="{\'nk-collapse-box-disabled\': disabled}">\r\n  <div class="collapse-box-header">\r\n    <span class="cursor-pointer" (click)="handleHeaderClick()">\r\n      <i class="nk-collapse-icon fa" [ngClass]="{\'fa-angle-right\': innerCollapsed, \'fa-angle-down\': !innerCollapsed}"></i>\r\n      <b>{{header}}</b>\r\n    </span>\r\n    <span class="nk-collapse-box-line"></span>\r\n    <span>\r\n      <ng-content select="[slot=box-tools]"></ng-content>\r\n    </span>\r\n  </div>\r\n  <div class="collapse-box-content" [hidden]="innerCollapsed">\r\n    <ng-content></ng-content>\r\n  </div>\r\n  <div class="clearfix"></div>\r\n</div>\r\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(73);var r=n(0),a=n(1),s=n(11);t.DATE_PICKER_VALUE_ACCESSOR={provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return l}),multi:!0};var c={"en-us":{weekLabels:["Su","Mo","Tu","We","Th","Fr","Sa"],monthLabels:["01 Jan","02 Feb","03 Mar","04 Apr","05 May","06 Jun","07 Jul","08 Aug","09 Seq","10 Oct","11 Nov","12 Dec"],yearSuffix:""},"zh-cn":{weekLabels:["日","一","二","三","四","五","六"],monthLabels:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],yearSuffix:" 年"}};t.MultiLang=c;var l=function(){function e(e){this.elementRef=e,this.onChange=Function.prototype,this.onTouched=Function.prototype,this.pickerShown=!1,this.labelObject={},this.monthWeeks=[],this.currentMode="day",this.today=new Date,this.disabled=!1,this.mode="day",this.placeholder="",this.lang="en-us",this.format="yyyy/MM/dd"}return Object.defineProperty(e.prototype,"nowYear",{get:function(){return this.today.getFullYear()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"nowMonth",{get:function(){return this.today.getMonth()+1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"nowDay",{get:function(){return this.today.getDate()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"innerDateString",{get:function(){var e=this.format;return"month"===this.mode?e="yyyy/MM":"year"===this.mode&&(e="yyyy"),this.innerDate?new s.SaDate(this.innerDate).format(e):""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"headerText",{get:function(){var e=this.showDate||new Date;if("day"===this.currentMode){return this.labelObject.monthLabels[e.getMonth()]+" "+e.getFullYear()}if("month"===this.currentMode)return e.getFullYear();if("year"===this.currentMode){var t=10*Math.floor(e.getFullYear()/10);return t+"-"+(t+9)}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"footerText",{get:function(){return"day"===this.currentMode?"Today":"month"===this.currentMode?"This Month":"This Year"},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){this.setLabelObject(),this._buildMonthList(),this.currentYear=(new Date).getFullYear(),this._buildYearList(),this._initMonthPanel(),this._documentClick=this._documentClick.bind(this),document.addEventListener("click",this._documentClick)},e.prototype.ngOnChanges=function(e){e.lang&&(this.setLabelObject(),this._buildMonthList(),this._buildYearList()),e.mode&&(this.currentMode=this.mode)},e.prototype.ngOnDestroy=function(){document.removeEventListener("click",this._documentClick)},e.prototype._documentClick=function(e){e.path&&-1===e.path.indexOf(this.elementRef.nativeElement)&&this.pickerShown&&(this.pickerShown=!1)},e.prototype.toggleDatePicker=function(){this.pickerShown=!this.pickerShown},e.prototype.handleFooterClick=function(){this.selectDate({date:new Date})},e.prototype.selectDate=function(e){this.innerDate=e.date,this.onChange(this.innerDate),this.pickerShown=!1,this.showDate=this.innerDate,this._initMonthPanel(this.showDate)},e.prototype.selectMonth=function(e){var t=this.showDate||new Date,n=new Date(t.getFullYear(),e.val-1,1);this.selectDate({date:n})},e.prototype.selectYear=function(e){var t=new Date(e.val,0,1);this.currentYear=e.val,this.selectDate({date:t}),this._buildYearList()},e.prototype.changeMonth=function(e){this.showDate=new s.SaDate(this.showDate).addMonths(e).get(),this._initMonthPanel(this.showDate)},e.prototype.changeYear=function(e){var t=this;"year"===this.mode&&(e*=10,setTimeout(function(){t._buildYearList()})),this.showDate=new s.SaDate(this.showDate).addYears(e).get(),this.currentYear=this.showDate.getFullYear(),this._initMonthPanel(this.showDate)},e.prototype._buildMonthList=function(){for(var e=[],t=[],n=c[this.lang],o=0;o<12;o++)e.push({val:o+1,text:n.monthLabels[o],selected:this.innerDate&&this.innerDate.getMonth()===o,current:o===this.today.getMonth()}),3===e.length&&(t.push(e),e=[]);this.monthList=t},e.prototype._buildYearList=function(){for(var e=[],t=[],n=10*Math.floor(this.currentYear/10)-1,o=c[this.lang].yearSuffix,i=n,r=n+12;i<r;i++)e.push({val:i,text:""+i+o,selected:this.innerDate&&this.innerDate.getFullYear()===i,current:i===this.today.getFullYear()}),3===e.length&&(t.push(e),e=[]);this.yearList=t},e.prototype._initMonthPanel=function(e){this.monthWeeks=this._buildMonthWeeks(e)},e.prototype.setLabelObject=function(){this.labelObject=c[this.lang]},e.prototype._getMonthString=function(e){return e.getMonth()},e.prototype._buildMonthWeeks=function(e){e||(e=new Date);var t=[],n=6,o=new Date(e.getTime());o.setDate(1);for(var i=new s.SaDate(o),r=i.addDays(-i.get().getDay()).get();n>0;)t.push({days:this._buildWeekDays(r,e)}),r=i.addDays(7).get(),n--;return t},e.prototype._buildWeekDays=function(e,t){for(var n,o,i,r=[],a=this._getYearMonthNumber(t),c=this._getDayNumber(new Date),l=0;l<7;l++)n=new s.SaDate(e).addDays(l).get(),o=this._getYearMonthNumber(n),i=this._getDayNumber(n),r.push({number:n.getDate(),isCurrentDay:i===c,isSelectedDay:i===this._getDayNumber(t),isPrevMonth:o<a,isNextMonth:o>a,date:n,disabled:!1});return r},e.prototype._getYearMonthNumber=function(e){return+(e.getFullYear()+(e.getMonth()+10).toString())-10},e.prototype._getDayNumber=function(e){return+(e.getFullYear()+(e.getMonth()+10).toString()+(e.getDate()+10).toString())-1010},e.prototype.writeValue=function(e){e&&(this.innerDate=e instanceof Date?e:new Date(e),this.showDate=this.innerDate,this._initMonthPanel(this.showDate))},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.setDisabledState=function(e){},o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.Input(),i("design:type",String)],e.prototype,"mode",void 0),o([r.Input(),i("design:type",String)],e.prototype,"placeholder",void 0),o([r.Input(),i("design:type",String)],e.prototype,"lang",void 0),o([r.Input(),i("design:type",Date)],e.prototype,"minDate",void 0),o([r.Input(),i("design:type",Date)],e.prototype,"maxDate",void 0),o([r.Input(),i("design:type",String)],e.prototype,"format",void 0),e=o([r.Component({selector:"nk-date-picker",template:n(74),providers:[t.DATE_PICKER_VALUE_ACCESSOR],encapsulation:r.ViewEncapsulation.None}),i("design:paramtypes",[r.ElementRef])],e)}();t.DatePickerComponent=l},function(e,t){},function(e,t){e.exports='<div class="sa-date-picker" [class.show-picker]="pickerShown" [class.disabled]="disabled">\n  <input class="nk-input" (click)="toggleDatePicker()" readonly [ngModel]="innerDateString" [attr.placeholder]="placeholder">\n  <span class="input-icon" (click)="toggleDatePicker()">\n    <i class="fa fa-calendar"></i>\n  </span>\n  \x3c!-- <span class="input-icon">\n    <i class="fa fa-close" [hidden]="true"></i>\n  </span> --\x3e\n  <div class="picker-panel" [hidden]="!pickerShown">\n    <div class="picker-panel-main">\n      <div class="picker-panel-header" [class.year-mode]="currentMode == \'year\'">\n        <span class="prev-year" (click)="changeYear(-1)">\n          <i class="fa fa-caret-left"></i>\n          <i class="fa fa-caret-left" *ngIf="currentMode != \'year\'"></i>\n        </span>\n        <span class="prev-month" (click)="changeMonth(-1)" [hidden]="currentMode != \'day\'">\n          <i class="fa fa-caret-left"></i>\n        </span>\n        <div class="set-year-month">\n          <span>{{headerText}}</span>\n        </div>\n        <span class="next-month" (click)="changeMonth(1)" [hidden]="currentMode != \'day\'">\n          <i class="fa fa-caret-right"></i>\n        </span>\n        <span class="next-year" (click)="changeYear(1)">\n          <i class="fa fa-caret-right"></i>\n          <i class="fa fa-caret-right" *ngIf="currentMode != \'year\'"></i>\n        </span>\n      </div>\n      <div class="picker-panel-content">\n        <table class="ym-panel" *ngIf="currentMode == \'year\'">\n          <tbody>\n            <tr *ngFor="let yearArr of yearList">\n              <td *ngFor="let year of yearArr" [ngClass]="{\'current\': year.current, \'selected\': year.selected }" (click)="selectYear(year)">\n                <span>{{year.text}}</span>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        \x3c!-- 月份选择面板 --\x3e\n        <table class="ym-panel" *ngIf="currentMode === \'month\'">\n          <tbody>\n            <tr *ngFor="let mArr of monthList">\n              <td *ngFor="let m of mArr" [ngClass]="{\'current\': m.current, \'selected\': m.selected }" (click)="selectMonth(m)">\n                <span>{{m.text}}</span>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        \x3c!-- 日期选择面板 --\x3e\n        <table *ngIf="currentMode === \'day\'">\n          <thead>\n            <tr>\n              <th *ngFor="let item of labelObject.weekLabels">\n                <span>{{item}}</span>\n              </th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor="let week of monthWeeks">\n              <td *ngFor="let d of week.days" [ngClass]="{\'day-prev\': d.isPrevMonth, \'day-next\': d.isNextMonth, \'current\': d.isCurrentDay, \'selected\': d.isSelectedDay }"\n                (click)="selectDate(d)">\n                <span>{{d.number}}</span>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n    <div class="picker-panel-footer" (click)="handleFooterClick()">\n      {{footerText}}\n    </div>\n  </div>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(76);var r=n(0),a=n(1),s=n(11),c=function(){function e(){this.onChange=Function.prototype,this.onTouched=Function.prototype,this.disabled=!1,this.placeholder="",this.pickerShown=!1,this._innerDateRange={from:null,to:null}}return t=e,Object.defineProperty(e.prototype,"innerDateString",{get:function(){var e="";return this._innerDateRange.from&&this._innerDateRange.to&&(e=new s.SaDate(this._innerDateRange.from).format("yyyy-MM-dd")+" ~ "+new s.SaDate(this._innerDateRange.to).format("yyyy-MM-dd")),e},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){var e=this,t={parentEl:this.dateRangePickerContainer.nativeElement,autoUpdateInput:!1,autoApply:!0,template:'<div class="daterangepicker dropdown-menu nk-date-range-picker"><div class="calendar left"><div class="calendar-table"></div></div><div class="calendar right"><div class="calendar-table"></div></div></div>'};this._innerDateRange.from&&(t.startDate=new s.SaDate(this._innerDateRange.from).format("MM/dd/yyyy")),this._innerDateRange.to&&(t.endDate=new s.SaDate(this._innerDateRange.to).format("MM/dd/yyyy")),this.minDate&&(t.minDate=new s.SaDate(this.minDate).format("MM/dd/yyyy")),this.maxDate&&(console.log(this.maxDate),t.maxDate=new s.SaDate(this.maxDate).format("MM/dd/yyyy")),window.jQuery(this.dateRangeInput.nativeElement).daterangepicker(t).on("show.daterangepicker",function(t){e.pickerShown=!0}).on("hide.daterangepicker",function(t){e.pickerShown=!1}).on("apply.daterangepicker",function(t,n){e._innerDateRange.from=n.startDate.toDate(),e._innerDateRange.to=n.endDate.toDate(),e.onChange(e._innerDateRange)}),this._dataRangePicker=$(this.dateRangeInput.nativeElement).data("daterangepicker")},e.prototype.ngOnDestroy=function(){window.jQuery(this.dateRangeInput.nativeElement).data("daterangepicker").remove()},e.prototype.writeValue=function(e){var t={from:null,to:null};e&&e.from&&e.to?(t.from=e.from,t.to=e.to):e&&(e.from||e.to)&&this.onChange(t),this._innerDateRange=t,this._dataRangePicker&&(this._dataRangePicker.setStartDate(this._innerDateRange.from||new Date),this._dataRangePicker.setEndDate(this._innerDateRange.to||new Date))},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},o([r.ViewChild("dateRangeInput"),i("design:type",r.ElementRef)],e.prototype,"dateRangeInput",void 0),o([r.ViewChild("dateRangePickerContainer"),i("design:type",r.ElementRef)],e.prototype,"dateRangePickerContainer",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.Input(),i("design:type",String)],e.prototype,"placeholder",void 0),o([r.Input(),i("design:type",Date)],e.prototype,"minDate",void 0),o([r.Input(),i("design:type",Date)],e.prototype,"maxDate",void 0),e=t=o([r.Component({selector:"nk-date-range",template:n(77),providers:[{provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return t}),multi:!0}]}),i("design:paramtypes",[])],e);var t}();t.DateRangePickerComponent=c},function(e,t){},function(e,t){e.exports='<div class="nk-date-range">\n  <div class="sa-date-picker" [class.show-picker]="pickerShown" [class.disabled]="disabled">\n    <input class="nk-input" #dateRangeInput readonly [ngModel]="innerDateString" [attr.placeholder]="placeholder">\n    <span class="input-icon" (click)="dateRangeInput.click()">\n      <i class="fa fa-calendar"></i>\n    </span>\n  </div>\n  <div style="position: relative" #dateRangePickerContainer>\n\n  </div>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(79);var r=n(0),a=n(1),s=function(){function e(){this.onChange=Function.prototype,this.onTouched=Function.prototype,this.pickerShown=!1,this.disabled=!1}return t=e,e.prototype.ngOnInit=function(){},Object.defineProperty(e.prototype,"innerDateString",{get:function(){if(this.innerDate){var e=this.innerDate.getHours(),t=this.innerDate.getMinutes();return(e<10?"0"+e:e)+":"+(t<10?"0"+t:t)}return""},enumerable:!0,configurable:!0}),e.prototype.keyDown=function(e){13===e.keyCode&&(e.stopPropagation(),e.preventDefault(),this.innerDate||(this.innerDate=new Date),this.innerDate.setHours(this.innerHours),this.innerDate.setMinutes(this.innerMins),this.onChange(new Date(this.innerDate)),this.pickerShown=!1)},e.prototype.hourChange=function(e){var t=this;this.innerHours=null,null!==e&&(e=parseInt(e))>=0&&e<=23&&setTimeout(function(){t.innerHours=e})},e.prototype.minChange=function(e){var t=this;this.innerMins=null,null!==e&&(e=parseInt(e))>=0&&e<=59&&setTimeout(function(){t.innerMins=e})},e.prototype.toggleTimePicker=function(){!1===this.pickerShown&&(this.innerHours=this.innerDate?this.innerDate.getHours():null,this.innerMins=this.innerDate?this.innerDate.getMinutes():null),this.pickerShown=!this.pickerShown},e.prototype.writeValue=function(e){this.innerDate=e?new Date(e):e},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},o([r.Input(),i("design:type",String)],e.prototype,"placeholder",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),e=t=o([r.Component({selector:"nk-time-picker",template:n(80),providers:[{provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return t}),multi:!0}]}),i("design:paramtypes",[])],e);var t}();t.TimePickerComponent=s},function(e,t){},function(e,t){e.exports='<div class="nk-time-picker" [class.show-picker]="pickerShown" [class.disabled]="disabled">\n  <input class="nk-input" (click)="toggleTimePicker()" readonly [ngModel]="innerDateString" [attr.placeholder]="placeholder">\n  <span class="input-icon" (click)="toggleTimePicker()">\n    <i class="fa fa-clock-o"></i>\n  </span>\n  <div class="picker-panel" [hidden]="!pickerShown">\n    <div class="picker-panel-main" (keydown)="keyDown($event)">\n      <div>\n        <input class="nk-input" type="number" min="0" max="23" [ngModel]="innerHours" (ngModelChange)="hourChange($event)">\n      </div>\n      <div class="split-char">\n        <strong>:</strong>\n      </div>\n      <div>\n        <input class="nk-input" type="number" min="0" max="59" [ngModel]="innerMins" (ngModelChange)="minChange($event)">\n      </div>\n      \x3c!-- <div class="nk-time-type" *ngIf="mode == \'hh\'">\n        <div [class.active]="currentTimeType == \'AM\'" (click)="setType(\'AM\')">AM</div>\n        <div [class.active]="currentTimeType == \'PM\'" (click)="setType(\'PM\')">PM</div>        \n      </div> --\x3e\n    </div>\n  </div>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(82);var r=n(0),a=n(1),s=function(){function e(){this.onChange=Function.prototype,this.onTouched=Function.prototype,this.pickerShown=!1,this.disabled=!1}return t=e,Object.defineProperty(e.prototype,"innerDateString",{get:function(){if(this.innerDateRange&&this.innerDateRange.from.date&&this.innerDateRange.to.date){var e=this.innerDateRange.from.date.getHours(),t=this.innerDateRange.from.date.getMinutes(),n=(e<10?"0"+e:e)+":"+(t<10?"0"+t:t),o=this.innerDateRange.to.date.getHours(),i=this.innerDateRange.to.date.getMinutes();return n+" - "+((o<10?"0"+o:o)+":"+(i<10?"0"+i:i))}return""},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.keyDown=function(e){if(13===e.keyCode){if(e.stopPropagation(),e.preventDefault(),this.innerDateRange.from.innerHours>this.innerDateRange.to.innerHours)return;if(this.innerDateRange.from.innerHours===this.innerDateRange.to.innerHours&&this.innerDateRange.from.innerMins>this.innerDateRange.to.innerMins)return;this.innerDateRange.from.date||(this.innerDateRange.from.date=new Date),this.innerDateRange.to.date||(this.innerDateRange.to.date=new Date),this.innerDateRange.from.date.setHours(this.innerDateRange.from.innerHours),this.innerDateRange.from.date.setMinutes(this.innerDateRange.from.innerMins),this.innerDateRange.to.date.setHours(this.innerDateRange.to.innerHours),this.innerDateRange.to.date.setMinutes(this.innerDateRange.to.innerMins),this.onChange({from:new Date(this.innerDateRange.from.date),to:new Date(this.innerDateRange.to.date)}),this.pickerShown=!1}},e.prototype.hourChange=function(e,t){var n=this;this.innerDateRange[t].innerHours=null,null!==e&&(e=parseInt(e))>=0&&e<=23&&setTimeout(function(){n.innerDateRange[t].innerHours=e})},e.prototype.minChange=function(e,t){var n=this;this.innerDateRange[t].innerMins=null,null!==e&&(e=parseInt(e))>=0&&e<=59&&setTimeout(function(){n.innerDateRange[t].innerMins=e})},e.prototype.toggleTimePicker=function(){this.innerDateRange||(this.innerDateRange={from:{date:null},to:{date:null}}),!1===this.pickerShown&&(this.innerDateRange.from.innerHours=this.innerDateRange.from.date?this.innerDateRange.from.date.getHours():null,this.innerDateRange.from.innerMins=this.innerDateRange.from.date?this.innerDateRange.from.date.getMinutes():null,this.innerDateRange.to.innerHours=this.innerDateRange.to.date?this.innerDateRange.to.date.getHours():null,this.innerDateRange.to.innerMins=this.innerDateRange.to.date?this.innerDateRange.to.date.getMinutes():null),this.pickerShown=!this.pickerShown},e.prototype.writeValue=function(e){e?this.innerDateRange={from:{date:e.from},to:{date:e.to}}:(this.innerDateRange=null,this.onChange(null))},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},o([r.Input(),i("design:type",String)],e.prototype,"placeholder",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),e=t=o([r.Component({selector:"nk-time-range",template:n(83),providers:[{provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return t}),multi:!0}]}),i("design:paramtypes",[])],e);var t}();t.TimeRangePickerComponent=s},function(e,t){},function(e,t){e.exports='<div class="nk-time-picker nk-time-range-picker" [class.show-picker]="pickerShown" [class.disabled]="disabled">\n  <input class="nk-input" (click)="toggleTimePicker()" readonly [ngModel]="innerDateString" [attr.placeholder]="placeholder">\n  <span class="input-icon" (click)="toggleTimePicker()">\n    <i class="fa fa-clock-o"></i>\n  </span>\n  <div class="picker-panel" [hidden]="!pickerShown" *ngIf="innerDateRange">\n    <div (keydown)="keyDown($event)">      \n      <div class="range-title">From:</div>\n      <div class="picker-panel-main">\n        <div>\n          <input class="nk-input" type="number" min="0" max="23" [ngModel]="innerDateRange.from.innerHours" (ngModelChange)="hourChange($event, \'from\')">\n        </div>\n        <div class="split-char">\n          <strong>:</strong>\n        </div>\n        <div>\n          <input class="nk-input" type="number" min="0" max="59" [ngModel]="innerDateRange.from.innerMins" (ngModelChange)="minChange($event, \'from\')">\n        </div>\n      </div>\n      <div class="range-title">To:</div>\n      <div class="picker-panel-main">\n        <div>\n          <input class="nk-input" type="number" min="0" max="23" [ngModel]="innerDateRange.to.innerHours" (ngModelChange)="hourChange($event, \'to\')">\n        </div>\n        <div class="split-char">\n          <strong>:</strong>\n        </div>\n        <div>\n          <input class="nk-input" type="number" min="0" max="59" [ngModel]="innerDateRange.to.innerMins" (ngModelChange)="minChange($event, \'to\')">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(85);var r=n(0),a=function(){function e(){this.items=[]}return e.prototype.ngOnInit=function(){},e.prototype.onItemClick=function(e,t){"function"==typeof e.fn&&e.fn.call(null,t)},o([r.Input(),i("design:type",Array)],e.prototype,"items",void 0),e=o([r.Component({selector:"nk-fixbar",template:n(86)})],e)}();t.FixbarComponent=a},function(e,t){},function(e,t){e.exports='<ul class="nk-comp nk-fixbar">\r\n  <li *ngFor="let item of items" [title]="item.title" (click)="onItemClick(item, $event)">\r\n    <i [ngClass]="item.icon"></i>\r\n  </li>\r\n</ul>\r\n'},function(e,t){},function(e,t){e.exports='<form class="nk-comp nk-form form-horizontal" novalidate #nkForm="ngForm" [class.ng-submitted]="nkForm.submitted" (ngSubmit)="_innerSubmit()">\n  <ng-content></ng-content>\n  <button type="submit" class="hide" #submitBtn></button>\n</form>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(1),s=n(12),c=function(){function e(e){this.form=e,this.errorMsg={},this.innerForm=e}return Object.defineProperty(e.prototype,"labelStyle",{get:function(){return{width:this.labelWidth}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"labelWidth",{get:function(){return this.form.labelWidth},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"contentStyle",{get:function(){return{width:"calc(100% - "+this.labelWidth+")"}},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){var e=this;this.ngModels.length>0&&this.ngModels.toArray().forEach(function(t){t.name||(t.name="nk_form_item_"+Math.floor(1e4*Math.random())),e.form.form.addControl(t)})},e.prototype.ngOnDestroy=function(){},o([r.ContentChildren(a.NgModel),i("design:type",r.QueryList)],e.prototype,"ngModels",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"control",void 0),o([r.Input(),i("design:type",String)],e.prototype,"label",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"errorMsg",void 0),e=o([r.Component({selector:"nk-form-item",template:n(90)}),i("design:paramtypes",[s.FormComponent])],e)}();t.FormItemComponent=c},function(e,t){e.exports='<div class="nk-comp nk-form-item">\n  <label class="nk-form-item-label" [ngStyle]="labelStyle">\n    {{label}}\n  </label>\n  <div class="nk-form-item-content" [ngStyle]="contentStyle">\n    <ng-content></ng-content>\n  </div>\n  <ng-container *ngIf="innerForm?.form?.submitted">\n    <nk-validator [control]="control" [left]="labelWidth" [errorMsg]="errorMsg" [fireOnDirty]="false"></nk-validator>\n  </ng-container>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(92);var r=n(0),a=n(14),s=function(){function e(e){this.renderer=e,this.columns=[],this._pageIndex=1,this.dataItems=[],this.pageIndexChange=new r.EventEmitter,this.sortable=!1,this.sortOrder="asc",this.data=[],this.pageable=!1,this.pageSizeList=[10,20,50],this.showPageSizeList=!0,this.pageSize=20,this.serverPaging=!1,this.totalCount=0,this.maxHeight=0,this.onSorting=new r.EventEmitter,this.onPaging=new r.EventEmitter,this.onRowClick=new r.EventEmitter,this.onPageSizeChanged=new r.EventEmitter}return Object.defineProperty(e.prototype,"_totalCount",{get:function(){return this.serverPaging?this.totalCount:this.data.length},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_pageIndexArr",{get:function(){for(var e=[],t=Math.ceil(this._totalCount/this.pageSize),n=1;n<=t;n++)e.push(n);return e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageIndex",{get:function(){return this._pageIndex},set:function(e){this._pageIndex!==e&&(this._pageIndex=e,this.setDataItems(),this.pageIndexChange.next(e))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"currentEndIdx",{get:function(){return Math.min(this.pageSize*this.pageIndex,this._totalCount)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"defaultSortField",{get:function(){return this.sortField},set:function(e){this.sortField=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"defaultSortOrder",{get:function(){return this.sortOrder},set:function(e){this.sortOrder=e||"asc"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"columnTemplates",{set:function(e){var t=this;if(e){this.columns=e.toArray();var n=e.toArray().filter(function(e){return e.sortable}).map(function(e){return{header:e.header,field:e.field}});this.sortable=n.length>0,this.sortableColumns=n}else this.sortable=!1,this.sortableColumns=null;setTimeout(function(){t.updateFixedHeaderWidth()},200)},enumerable:!0,configurable:!0}),e.prototype._onWindowResize=function(){this.updateFixedHeaderWidth()},e.prototype.ngOnInit=function(){this.updateFixedHeaderPos=this.updateFixedHeaderPos.bind(this)},e.prototype.ngAfterViewInit=function(){this.updateFixedHeaderWidth(),this.tableBody.nativeElement.parentElement.addEventListener("scroll",this.updateFixedHeaderPos)},e.prototype.ngOnDestroy=function(){this.tableBody.nativeElement.parentElement.removeEventListener("scroll",this.updateFixedHeaderPos)},e.prototype.dataRowRepeatDone=function(){this.updateFixedHeaderWidth(),this.updateFixedHeaderPos()},e.prototype.updateFixedHeaderWidth=function(){if(this.tableHeader&&this.tableBody){var e=this.tableHeader.nativeElement,t=this.tableBody.nativeElement,n=e.querySelectorAll("thead>tr:first-child>th"),o=t.querySelectorAll("thead>tr:first-child>th");if(n.length===o.length){for(var i=o.length,r=0;r<i;r++)n[r].style.width=o[r].offsetWidth+"px";var a=t.parentElement.offsetWidth-t.parentElement.clientWidth;if(a>0){var s=i-1;n[s].style.width=o[s].offsetWidth+a+"px"}this.updateFixedHeaderPos()}}},e.prototype.updateFixedHeaderPos=function(){if(this.tableHeader&&this.tableBody){var e=this.tableHeader.nativeElement,t=this.tableBody.nativeElement.parentElement;(0!==t.scrollLeft||e.style.marginLeft)&&this.renderer.setStyle(e,"marginLeft",-t.scrollLeft+"px")}},e.prototype.ngOnChanges=function(e){e.data&&this.setDataItems()},e.prototype.onHeaderClick=function(e){e.sortable&&(this.sortField===e.field?this.sortOrder="asc"===this.sortOrder?"desc":"asc":this.sortField=e.field,this.emitSortChanged(this.sortField,e.header,this.sortOrder))},e.prototype.onSortFieldChanged=function(e){this.sortField=e,this.sortOrder||(this.sortOrder=this.defaultSortOrder||"asc");var t=this.columns.filter(function(t){return t.field===e});this.emitSortChanged(e,t[0].header,this.sortOrder)},e.prototype.onSortOrderChanged=function(e){var t=this,n=this.columns.filter(function(e){return e.field===t.sortField});this.sortOrder=e,this.emitSortChanged(this.sortField,n[0].header,e)},e.prototype.emitSortChanged=function(e,t,n){var o=this;this.onSorting.next({field:e,header:t,sort:n}),setTimeout(function(){o.setDataItems()})},e.prototype.onPageIndexChanged=function(e){this.pageIndex!==e&&(this.pageIndex=e,this.onPaging.next({pageIndex:this.pageIndex}))},e.prototype.setPage=function(e){var t=this._pageIndexArr.pop(),n=this.pageIndex;switch(e){case"start":n=1;break;case"prev":n>1&&n--;break;case"next":n<t&&n++;break;case"end":n=t}this.pageIndex!==n&&(this.pageIndex=n,this.onPaging.next({pageIndex:this.pageIndex}))},e.prototype.onPageSizeSelectChange=function(e){this.pageSize=e,this.onPageSizeChanged.next({pageSize:e}),this.setDataItems()},e.prototype.rowClick=function(e,t){this.onRowClick.emit(e)},e.prototype.setDataItems=function(){if(!this.serverPaging&&this.pageable){for(var e=[],t=this.pageSize*(this.pageIndex-1),n=Math.min(t+this.pageSize,this.data.length),o=t;o<n;o++)e.push(this.data[o]);this.dataItems=e}else this.dataItems=this.data},o([r.ViewChild("tableHeader"),i("design:type",r.ElementRef)],e.prototype,"tableHeader",void 0),o([r.ViewChild("tableBody"),i("design:type",r.ElementRef)],e.prototype,"tableBody",void 0),o([r.Input(),i("design:type",Object),i("design:paramtypes",[Object])],e.prototype,"pageIndex",null),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"pageIndexChange",void 0),o([r.Input(),i("design:type",Array)],e.prototype,"data",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"pageable",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"pageSizeList",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"showPageSizeList",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"pageSize",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"serverPaging",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"totalCount",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"maxHeight",void 0),o([r.Input(),i("design:type",String),i("design:paramtypes",[String])],e.prototype,"defaultSortField",null),o([r.Input(),i("design:type",String),i("design:paramtypes",[String])],e.prototype,"defaultSortOrder",null),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onSorting",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onPaging",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onRowClick",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onPageSizeChanged",void 0),o([r.ContentChildren(a.GridColumnDirective),i("design:type",r.QueryList),i("design:paramtypes",[r.QueryList])],e.prototype,"columnTemplates",null),o([r.HostListener("window:resize"),i("design:type",Function),i("design:paramtypes",[]),i("design:returntype",void 0)],e.prototype,"_onWindowResize",null),e=o([r.Component({selector:"nk-grid",template:n(93)}),i("design:paramtypes",[r.Renderer2])],e)}();t.GridComponent=s},function(e,t){},function(e,t){e.exports='<div>\n\n  <div class="nk-fixed-header">\n    <table class="nk-comp nk-grid table table-striped table-bordered table-hover dataTable m-b-none" #tableHeader>\n      <thead>\n        <tr>\n          <th [style.cursor]="column.sortable ? \'pointer\' : null" *ngFor="let column of columns" [style.width]="column.styleWidth"\n            (click)="onHeaderClick(column)">\n            {{column.header}}\n            <ng-container *ngIf="column.sortable && sortField == column.field">\n              <i class="fa fa-caret-up" *ngIf="sortOrder == \'asc\'"></i>\n              <i class="fa fa-caret-down" *ngIf="sortOrder == \'desc\'"></i>\n            </ng-container>\n          </th>\n        </tr>\n      </thead>\n    </table>\n  </div>\n\n  <div class="nk-grid-body" [style.maxHeight]="maxHeight > 0 ? maxHeight + \'px\' : null">\n    <table class="nk-comp nk-grid table table-striped table-bordered table-hover dataTable m-b-none" #tableBody>\n      <thead style="visibility: collapse">\n        <tr>\n          <th *ngFor="let column of columns" [style.width]="column.styleWidth">\n            {{column.header}}\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor="let row of dataItems; let isLastRow = last;" (click)="rowClick(row, $event)">\n          <td *ngFor="let column of columns; let isLastColumn = last;" [ngClass]="column.contentClass">\n            <ng-for-event [isLast]="isLastRow && isLastColumn" (onLastDone)="dataRowRepeatDone($event)"></ng-for-event>\n            <span *ngIf="!column.cellTemplate">{{row[column.field]}}</span>\n            <ng-template [ngIf]="column.cellTemplate" [ngTemplateOutlet]="column.cellTemplate" [ngOutletContext]="{ item: row, column: column }"></ng-template>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n\n  <div class="nk-fixed-footer">\n    <table class="nk-comp nk-grid table table-striped table-bordered table-hover dataTable" *ngIf="pageable || sortable">\n      <tfoot>\n        <tr>\n          <td [attr.colspan]="columns.length" class="dt-toolbar-footer">\n            <div class="tool-panel">\n              <div class="sort-panel" *ngIf="sortable">\n                <span>Sort by:</span>\n                <nk-select class="sort-field-select" placeholder="Field" [ngModel]="sortField" (ngModelChange)="onSortFieldChanged($event)">\n                  <ng-container *ngFor="let item of sortableColumns">\n                    <nk-option [value]="item.field" [label]="item.header"></nk-option>\n                  </ng-container>\n                </nk-select>\n                <nk-select *ngIf="sortField" class="order-select" placeholder="Order" [ngModel]="sortOrder" (ngModelChange)="onSortOrderChanged($event)">\n                  <nk-option [value]="\'asc\'" [label]="\'Asc\'"></nk-option>\n                  <nk-option [value]="\'desc\'" [label]="\'Desc\'"></nk-option>\n                </nk-select>\n              </div>\n              <div class="page-panel" *ngIf="pageable">\n                <nk-pagination [totalCount]="_totalCount" [ngModel]="pageIndex" (ngModelChange)="onPageIndexChanged($event)" [allowPageSize]="showPageSizeList"\n                  (onPageSizeChange)="onPageSizeSelectChange($event)" [pageSize]="pageSize" [pageSizeList]="pageSizeList">\n\n                </nk-pagination>\n              </div>\n            </div>\n          </td>\n        </tr>\n      </tfoot>\n    </table>\n  </div>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(95);var r=n(0),a=function(){function e(){this.fullscreen=!1,this.zoomImageUrl="",this.change=new r.EventEmitter}return e.prototype.onClick=function(e){var t=e.target;"IMG"===t.tagName&&(this.fullscreen=!this.fullscreen,this.fullscreen?(this.zoomImageUrl=t.getAttribute("src"),this.change.emit(!0)):(this.zoomImageUrl="",this.change.emit(!1)))},e.prototype.ngOnInit=function(){},o([r.HostListener("click",["$event"]),i("design:type",Function),i("design:paramtypes",[MouseEvent]),i("design:returntype",void 0)],e.prototype,"onClick",null),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"change",void 0),e=o([r.Component({selector:"nk-image-zoom",template:n(96)})],e)}();t.ImageZoomComponent=a},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-image-zoom" [ngClass]="{fullscreen: fullscreen}">\r\n  <ng-content></ng-content>\r\n  <div class="zoom-image-mask"></div>\r\n  <div class="zoom-image-container" [hidden]="!fullscreen">\r\n    <img [src]="zoomImageUrl" alt="" class="zoom-image">\r\n  </div>\r\n</div>\r\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(98);var r=n(0),a=n(1);t.INPUT_VALUE_ACCESSOR={provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return s}),multi:!0};var s=function(){function e(){this.onChange=Function.prototype,this.onTouched=Function.prototype,this.containerClass="nk-input-wrap",this.type="text",this.disabled=!1,this.readonly=!1,this.rows=3,this.placeholder="",this.enableIconClick=!1,this.maxlength=-1,this.iconClick=new r.EventEmitter,this.onBlur=new r.EventEmitter}return Object.defineProperty(e.prototype,"isTextarea",{get:function(){return"textarea"===this.type},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"inputClass",{get:function(){var e=["nk-input"];return this.isTextarea&&e.push("nk-textarea"),this.readonly&&e.push("nk-input-readonly"),this.disabled&&e.push("nk-input-disabled"),!!this.icon&&e.push("nk-input-has-icon"),e},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.handleModelChange=function(e){this.innerValue=e,this.onChange(e)},e.prototype.handleIconClick=function(e){this.disabled&&!this.enableIconClick||this.iconClick.emit(e)},e.prototype.innerBlur=function(e){this.onBlur.emit(e)},e.prototype.writeValue=function(e){this.innerValue=e},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},o([r.HostBinding("class"),i("design:type",Object)],e.prototype,"containerClass",void 0),o([r.Input(),i("design:type",String)],e.prototype,"type",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"readonly",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"rows",void 0),o([r.Input(),i("design:type",String)],e.prototype,"placeholder",void 0),o([r.Input(),i("design:type",String)],e.prototype,"icon",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"enableIconClick",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"maxlength",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"iconClick",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onBlur",void 0),e=o([r.Component({selector:"nk-input",template:n(99),providers:[t.INPUT_VALUE_ACCESSOR]}),i("design:paramtypes",[])],e)}();t.InputComponent=s},function(e,t){},function(e,t){e.exports='<input *ngIf="!isTextarea" [ngClass]="inputClass" [type]="type" [readonly]="readonly" [disabled]="disabled" [placeholder]="placeholder"\n  [ngModel]="innerValue" (ngModelChange)="handleModelChange($event)" (blur)="innerBlur($event)" [attr.maxlength]="maxlength > 0 ? maxlength : null">\n<i *ngIf="!!icon" [ngClass]="icon" (click)="handleIconClick($event)"></i>\n<textarea *ngIf="isTextarea" [ngClass]="inputClass" [rows]="rows" [readonly]="readonly" [disabled]="disabled" [placeholder]="placeholder"\n  [ngModel]="innerValue" (ngModelChange)="handleModelChange($event)" (blur)="innerBlur($event)" [attr.maxlength]="maxlength > 0 ? maxlength : null">\n</textarea>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(101),n(102);var r=n(0),a={backdrop:"static",show:!1,keyboard:!1},s=function(){function e(e){var t=this;this.elementRef=e,this.isShown=!1,this.hasCustomHeader=!1,this.hasCustomFooter=!1,this.dragInit=!1,this.dragObj={isDragging:!1,pageX:0,pageY:0,elLeft:0,elTop:0},this.onHeaderMouseDown=function(e){var n=window.getComputedStyle(t.modalDialog);document.body.style.userSelect="none",t.dragObj={isDragging:!0,pageX:e.pageX,pageY:e.pageY,elLeft:parseInt(n.left,10),elTop:parseInt(n.top,10)}},this.onDocumentMouseMove=function(e){if(t.dragObj.isDragging){if(1!==e.buttons)return t.dragObj.isDragging=!1,void(document.body.style.userSelect="unset");var n=t.dragObj.elLeft+e.pageX-t.dragObj.pageX,o=t.dragObj.elTop+e.pageY-t.dragObj.pageY;n=Math.max(0,n),n=Math.min(window.innerWidth-t.modalDialog.clientWidth,n),o=Math.max(0,o),o=Math.min(window.innerHeight-t.modalDialog.clientHeight,o),t.modalDialog.style.left=n+"px",t.modalDialog.style.top=o+"px"}},this.onDocumentMouseUp=function(e){document.body.style.userSelect="unset",t.dragObj.isDragging=!1},this.animate="fade",this.okText="Save",this.cancelText="Cancel",this.draggable=!1,this.dragModalPos={},this.disableBackdrop=!1,this.onShown=new r.EventEmitter,this.onHidden=new r.EventEmitter,this.onCancel=new r.EventEmitter,this.onOk=new r.EventEmitter,this.shownChange=new r.EventEmitter}return Object.defineProperty(e.prototype,"modalSize",{get:function(){return-1===(this.size||"").indexOf("modal")?"modal-"+this.size:this.size},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"shown",{set:function(e){this.isShown!==e&&(this.isShown=e,this.$modal&&(this.isShown?this.showModal():this.hideModal()))},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){this.$el=this.elementRef.nativeElement,this.$modal=window.jQuery(this.$el.querySelector(".modal")),this.modalDialog=this.$el.querySelector(".modal-dialog"),this.hasCustomHeader=!!this.modalHeader.nativeElement.querySelector("[slot=modal-header]"),this.hasCustomFooter=!!this.modalFooter.nativeElement.querySelector("[slot=modal-footer]"),this._onModalHidden=this._onModalHidden.bind(this),this._onModalShown=this._onModalShown.bind(this)},e.prototype.ngOnChanges=function(e){e.draggable&&this.initDrag()},e.prototype.ngAfterViewInit=function(){var e=this;this.configModalOptions(),this.configModalEvents(),this.isShown&&setTimeout(function(){e.showModal()})},e.prototype.ngOnDestroy=function(){var e=this;this.modalDialog.querySelector(".modal-header").removeEventListener("mousedown",this.onHeaderMouseDown),document.removeEventListener("mousemove",this.onDocumentMouseMove),document.removeEventListener("mouseup",this.onDocumentMouseUp),this.$modal&&(this.hideModal(),setTimeout(function(){e.$modal.off("hidden.bs.modal",e._onModalHidden),e.$modal.off("shown.bs.modal",e._onModalShown),e.$modal.data("bs.modal",null)}))},e.prototype.configModalOptions=function(){var e=Object.assign({},a,this.options);this.$modal.modal(e)},e.prototype.configModalEvents=function(){this.$modal.on("hidden.bs.modal",this._onModalHidden),this.$modal.on("shown.bs.modal",this._onModalShown)},e.prototype._onModalHidden=function(e){e.target===this.$el.querySelector(".modal")&&(this.shownChange.emit(!1),this.onHidden.emit(e))},e.prototype._onModalShown=function(e){e.target===this.$el.querySelector(".modal")&&(this.shownChange.emit(!0),this.onShown.emit(e))},e.prototype.initDrag=function(){if(!this.dragInit){var e=this.elementRef.nativeElement.querySelector(".modal-header");this.draggable&&(e.addEventListener("mousedown",this.onHeaderMouseDown,!1),document.addEventListener("mousemove",this.onDocumentMouseMove,!1),document.addEventListener("mouseup",this.onDocumentMouseUp,!1)),this.dragInit=!0}},e.prototype.showModal=function(){this.draggable&&this.initModalPosition();var e=Object.assign({},a,this.options);this.$modal.modal(e).modal("show")},e.prototype.hideModal=function(){this.$modal.modal("hide")},e.prototype.onCancelClick=function(){this.onCancel.emit(),this.hideModal()},e.prototype.onOkClick=function(){this.onOk.emit()},e.prototype.initModalPosition=function(){var e=this;this.modalDialog.style=null;var t=!1;void 0!==this.dragModalPos.top&&(t=!0,this.modalDialog.style.top=this.dragModalPos.top+"px"),void 0!==this.dragModalPos.right&&(t=!0,this.modalDialog.style.right=this.dragModalPos.right+"px"),void 0!==this.dragModalPos.bottom&&(t=!0,this.modalDialog.style.bottom=this.dragModalPos.bottom+"px"),void 0!==this.dragModalPos.left&&(t=!0,this.modalDialog.style.left=this.dragModalPos.left+"px"),t||(this.modalDialog.style.top="30px",setTimeout(function(){e.modalDialog.style.left=(window.innerWidth-e.modalDialog.clientWidth)/2+"px"},200))},o([r.Input(),i("design:type",String)],e.prototype,"size",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"width",void 0),o([r.Input(),i("design:type",String)],e.prototype,"header",void 0),o([r.Input(),i("design:type",String)],e.prototype,"animate",void 0),o([r.Input(),i("design:type",String)],e.prototype,"okText",void 0),o([r.Input(),i("design:type",String)],e.prototype,"cancelText",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"draggable",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"dragModalPos",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disableBackdrop",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"options",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onShown",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onHidden",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onCancel",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onOk",void 0),o([r.Input(),i("design:type",Boolean),i("design:paramtypes",[Boolean])],e.prototype,"shown",null),o([r.Output(),i("design:type",Object)],e.prototype,"shownChange",void 0),o([r.ViewChild("modalHeader"),i("design:type",Object)],e.prototype,"modalHeader",void 0),o([r.ViewChild("modalFooter"),i("design:type",Object)],e.prototype,"modalFooter",void 0),e=o([r.Component({selector:"nk-modal",template:n(103)}),i("design:paramtypes",[r.ElementRef])],e)}();t.ModalComponent=s},function(e,t){!function(e){var t=e.fn.modal.Constructor.prototype.backdrop;e.extend(e.fn.modal.Constructor.prototype,{backdrop:function(e){var n=this;t.call(this,function(){n.$backdrop&&n.$backdrop.appendTo(n.$element.parent()),e&&e()})}})}(jQuery)},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-modal" [ngClass]="{\'nk-modal-drag\': draggable, \'nk-disable-backdrop\': disableBackdrop}">\n  <div class="modal animated" [ngClass]="animate">\n    <div class="modal-dialog" [ngClass]="modalSize" [style.width]="(width ? (width + \'px\'): null)">\n      <div class="modal-content">\n        <div class="modal-header" #modalHeader>\n          <ng-content select="[slot=modal-header]"></ng-content>\n          <ng-template [ngIf]="!hasCustomHeader">\n            <h4 class="modal-title">\n              {{header}} &nbsp;\n            </h4>\n          </ng-template>\n          <button type="button" class="colse" (click)="hideModal()">\n            <i class="fa fa-remove"></i>\n          </button>\n        </div>\n        <div class="modal-body" [style.paddingBottom]="modalFooter?.offsetHeight == 16 ? \'0\' : null">          \n          <ng-content></ng-content>\n        </div>\n        <div class="modal-footer" #modalFooter>\n          <ng-content select="[slot=modal-footer]"></ng-content>\n          <ng-template [ngIf]="!hasCustomFooter">            \n            <nk-button type="primary" (click)="onOkClick()">{{okText}}</nk-button>\n            <nk-button (click)="onCancelClick()">{{cancelText}}</nk-button>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(105);var r=n(0),a=n(1),s=n(106);t.PAGINATION_VALUE_ACCESSOR={provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return c}),multi:!0};var c=function(){function e(){this.onChange=Function.prototype,this.onTouched=Function.prototype,this.paginationClass="",this.pageIndex=1,this.pages=[],this.simpleMode=!1,this.showTotalCount=!0,this._totalCount=0,this.allowPageSize=!1,this.pageSizeList=[10,20,50],this._pageSize=20,this.onPageChange=new r.EventEmitter,this.onPageSizeChange=new r.EventEmitter}return Object.defineProperty(e.prototype,"totalCount",{get:function(){return this._totalCount},set:function(e){this._totalCount=parseInt(e,10)||0,this.buildPages()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageSize",{get:function(){return this._pageSize},set:function(e){e=parseInt(e,10),-1!==this.pageSizeList.indexOf(e)&&(this._pageSize=parseInt(e,10),this.buildPages())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageCount",{get:function(){return Math.ceil(this.totalCount/this.pageSize)},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.setPage=function(e){var t=this.pages[this.pages.length-1],n=this.pageIndex;switch(e){case"start":n=1;break;case"prev":n>1&&n--;break;case"next":n<t&&n++;break;case"end":n=t}this.pageIndex!==n&&(this.pageIndex=n,this.pageClick(this.pageIndex))},e.prototype.onPageSizeSelectChange=function(e){this.pageSize=e,this.onPageSizeChange.emit(e)},e.prototype.pageClick=function(e){e<1||e>this.pageCount||this.emitValue(e)},e.prototype.emitValue=function(e){this.pageIndex=e,this.onChange(e),this.onPageChange.next(e)},e.prototype.buildPages=function(){var e=this;this._buildPagesTimer&&clearTimeout(this._buildPagesTimer),this._buildPagesTimer=s.setTimeout(function(){for(var t=[],n=1;n<=e.pageCount;n++)t.push(n);e.pages=t},100)},e.prototype.writeValue=function(e){e=Math.max(1,Math.abs(+e));var t=Math.min(e,this.pageCount);t!==this.pageIndex&&this.emitValue(t),this.pageIndex=t},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},o([r.Input(),i("design:type",Boolean)],e.prototype,"simpleMode",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"showTotalCount",void 0),o([r.Input(),i("design:type",Object),i("design:paramtypes",[Object])],e.prototype,"totalCount",null),o([r.Input(),i("design:type",Object)],e.prototype,"allowPageSize",void 0),o([r.Input(),i("design:type",Array)],e.prototype,"pageSizeList",void 0),o([r.Input(),i("design:type",Object),i("design:paramtypes",[Object])],e.prototype,"pageSize",null),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onPageChange",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onPageSizeChange",void 0),e=o([r.Component({selector:"nk-pagination",template:n(110),providers:[t.PAGINATION_VALUE_ACCESSOR]})],e)}();t.PaginationComponent=c},function(e,t){},function(e,t,n){function o(e,t){this._id=e,this._clearFn=t}var i=Function.prototype.apply;t.setTimeout=function(){return new o(i.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new o(i.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(107),t.setImmediate=setImmediate,t.clearImmediate=clearImmediate},function(e,t,n){(function(e,t){!function(e,n){"use strict";function o(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var o={callback:e,args:t};return l[c]=o,s(c),c++}function i(e){delete l[e]}function r(e){var t=e.callback,o=e.args;switch(o.length){case 0:t();break;case 1:t(o[0]);break;case 2:t(o[0],o[1]);break;case 3:t(o[0],o[1],o[2]);break;default:t.apply(n,o)}}function a(e){if(p)setTimeout(a,0,e);else{var t=l[e];if(t){p=!0;try{r(t)}finally{i(e),p=!1}}}}if(!e.setImmediate){var s,c=1,l={},p=!1,u=e.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(e);d=d&&d.setTimeout?d:e,"[object process]"==={}.toString.call(e.process)?function(){s=function(e){t.nextTick(function(){a(e)})}}():function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?function(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&a(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),s=function(n){e.postMessage(t+n,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){a(e.data)},s=function(t){e.port2.postMessage(t)}}():u&&"onreadystatechange"in u.createElement("script")?function(){var e=u.documentElement;s=function(t){var n=u.createElement("script");n.onreadystatechange=function(){a(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}():function(){s=function(e){setTimeout(a,0,e)}}(),d.setImmediate=o,d.clearImmediate=i}}("undefined"==typeof self?void 0===e?this:e:self)}).call(t,n(108),n(109))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(p===setTimeout)return setTimeout(e,0);if((p===n||!p)&&setTimeout)return p=setTimeout,setTimeout(e,0);try{return p(e,0)}catch(t){try{return p.call(null,e,0)}catch(t){return p.call(this,e,0)}}}function r(e){if(u===clearTimeout)return clearTimeout(e);if((u===o||!u)&&clearTimeout)return u=clearTimeout,clearTimeout(e);try{return u(e)}catch(t){try{return u.call(null,e)}catch(t){return u.call(this,e)}}}function a(){g&&f&&(g=!1,f.length?h=f.concat(h):y=-1,h.length&&s())}function s(){if(!g){var e=i(a);g=!0;for(var t=h.length;t;){for(f=h,h=[];++y<t;)f&&f[y].run();y=-1,t=h.length}f=null,g=!1,r(e)}}function c(e,t){this.fun=e,this.array=t}function l(){}var p,u,d=e.exports={};!function(){try{p="function"==typeof setTimeout?setTimeout:n}catch(e){p=n}try{u="function"==typeof clearTimeout?clearTimeout:o}catch(e){u=o}}();var f,h=[],g=!1,y=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new c(e,t)),1!==h.length||g||i(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t){e.exports='<div class="nk-pagination-panel">\n  <div class="total-count" *ngIf="showTotalCount">\n    <span>Total Count:</span>\n    <span>{{ totalCount }}</span>\n  </div>\n  <div class="page-info">\n    <div *ngIf="allowPageSize">\n      <span>Pagesize:</span>\n      <nk-select [ngModel]="_pageSize" (ngModelChange)="onPageSizeSelectChange($event)">\n        <ng-container *ngFor="let item of pageSizeList">\n          <nk-option [value]="item" [label]="item"></nk-option>\n        </ng-container>\n      </nk-select>\n    </div>\n    <div *ngIf="pages?.length > 0">\n      <span>Page:</span>      \n      <nk-select [allowSearch]="true" [ngModel]="pageIndex" (ngModelChange)="pageClick($event)">\n        <ng-container *ngFor="let item of pages">\n          <nk-option [value]="item" [label]="item"></nk-option>\n        </ng-container>\n      </nk-select>\n    </div>\n  </div>\n  <div class="pagination-nav">\n    <nk-button (click)="setPage(\'start\')">\n      <i class="fa fa-angle-double-left"></i>\n    </nk-button>\n    <nk-button (click)="setPage(\'prev\')">\n      Prev\n    </nk-button>\n    <nk-button (click)="setPage(\'next\')">\n      Next\n    </nk-button>\n    <nk-button (click)="setPage(\'end\')">\n      <i class="fa fa-angle-double-right"></i>\n    </nk-button>\n  </div>\n</div>\n'},function(e,t){e.exports='<div class="nk-comp popover-arrow arrow"></div>\r\n<h3 class="popover-title popover-header" *ngIf="title">{{ title }}</h3>\r\n<div class="popover-content popover-body">\r\n  <ng-content></ng-content>\r\n</div>\r\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(113);var r=n(0),a=n(16),s=n(15),c=function(){function e(e,t,n,o){this.elementRef=e,this.renderer=t,this.viewContainerRef=n,this.clf=o,this.placement="right",this.popoverTrigger="click",this.title="",this.isOpen=!1,this._isInited=!1,this.popoverContent=o.createLoader(e,n,t),this.onShown=this.popoverContent.onShown,this.onHidden=this.popoverContent.onHidden}return e.prototype.ngOnInit=function(){var e=this;this._isInited||(this._isInited=!0,this.popoverContent.listen({triggers:this.popoverTrigger,outsideClick:!0,show:function(){return e.show()}}))},e.prototype.ngOnDestroy=function(){this.popoverContent.dispose()},e.prototype.show=function(){!this.popoverContent.isShown&&this.content&&(this.popoverContent.attach(s.PopoverContentComponent).to(void 0).position({attachment:this.placement}).show({content:this.content,placement:this.placement,title:this.title}),this.isOpen=!0)},e.prototype.hide=function(){this.isOpen&&(this.popoverContent.hide(),this.isOpen=!1)},o([r.Input("nk-popover"),i("design:type",Object)],e.prototype,"content",void 0),o([r.Input(),i("design:type",String)],e.prototype,"placement",void 0),o([r.Input(),i("design:type",String)],e.prototype,"popoverTrigger",void 0),o([r.Input(),i("design:type",String)],e.prototype,"title",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onShown",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onHidden",void 0),e=o([r.Directive({selector:"[nk-popover]"}),i("design:paramtypes",[r.ElementRef,r.Renderer2,r.ViewContainerRef,a.ComponentLoaderFactory])],e)}();t.PopoverDirective=c},function(e,t){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(17);t.ComponentLoader=o.ComponentLoader;var i=n(117);t.ComponentLoaderFactory=i.ComponentLoaderFactory;var r=n(20);t.ContentRef=r.ContentRef},function(e,t,n){"use strict";function o(e,t){void 0===t&&(t=c);var n=(e||"").trim();if(0===n.length)return[];var o=n.split(/\s+/).map(function(e){return e.split(":")}).map(function(e){var n=t[e[0]]||e;return new s.Trigger(n[0],n[1])}),i=o.filter(function(e){return e.isManual()});if(i.length>1)throw new Error("Triggers parse error: only one manual trigger is allowed");if(1===i.length&&o.length>1)throw new Error("Triggers parse error: manual trigger can't be mixed with other triggers");return o}function i(e,t,n,i,r,a){var s=o(n),c=[];return 1===s.length&&s[0].isManual()?Function.prototype:(s.forEach(function(n){if(n.open===n.close)return void c.push(e.listen(t,n.open,a));c.push(e.listen(t,n.open,i),e.listen(t,n.close,r))}),function(){c.forEach(function(e){return e()})})}function r(e,t){var n=o(t.triggers),i=t.target;if(1===n.length&&n[0].isManual())return Function.prototype;var r=[],a=[],s=function(){a.forEach(function(e){return r.push(e())}),a.length=0};return n.forEach(function(n){var o=n.open===n.close,c=o?t.toggle:t.show;o||a.push(function(){return e.listen(i,n.close,t.hide)}),r.push(e.listen(i,n.open,function(){return c(s)}))}),function(){r.forEach(function(e){return e()})}}function a(e,t){return t.outsideClick?e.listen("document","click",function(e){t.target&&t.target.contains(e.target)||t.targets&&t.targets.some(function(t){return t.contains(e.target)})||t.hide()}):Function.prototype}Object.defineProperty(t,"__esModule",{value:!0});var s=n(19),c={hover:["mouseover","mouseout"],focus:["focusin","focusout"]};t.parseTriggers=o,t.listenToTriggers=i,t.listenToTriggersV2=r,t.registerOutsideClick=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){var t=e.parentElement;if(t&&t.insertBefore){for(;e.firstChild;)t.insertBefore(e.firstChild,e);t.removeChild(e)}};t.removeAngularTag=o},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(17),s=n(21),c=function(){function e(e,t,n,o,i){this._componentFactoryResolver=e,this._ngZone=t,this._injector=n,this._posService=o,this._applicationRef=i}return e.prototype.createLoader=function(e,t,n){return new a.ComponentLoader(t,n,e,this._injector,this._componentFactoryResolver,this._ngZone,this._applicationRef,this._posService)},e=o([r.Injectable(),i("design:paramtypes",[r.ComponentFactoryResolver,r.NgZone,r.Injector,s.PositioningService,r.ApplicationRef])],e)}();t.ComponentLoaderFactory=c},function(e,t,n){"use strict";function o(e){return"string"==typeof e?document.querySelector(e):e instanceof r.ElementRef?e.nativeElement:e}var i=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(22),s=function(){function e(){}return e.prototype.position=function(e){var t=e.element,n=e.target,i=e.attachment,r=e.appendToBody;a.positionElements(o(n),o(t),i,r)},e=i([r.Injectable()],e)}();t.PositioningService=s},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(120);var r=n(0),a=function(){function e(){this.align="",this.striped=!1,this.active=!1,this.size="",this.maxValue=100,this.type="primary",this.class=""}return Object.defineProperty(e.prototype,"barClass",{get:function(){var e=[];return this.type&&e.push("progress-bar-"+this.type),this.size&&e.push("progress-"+this.size),this.align&&e.push(this.align),this.striped&&e.push("progress-bar-striped"),this.active&&e.push("active"),this.class&&e.push(this.class),e.join(" ")},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){(e.value||e.maxValue)&&this.calcBarWidthOrHeight()},e.prototype.calcBarWidthOrHeight=function(){var e=this.value/this.maxValue*100;if(e!==e)return this.barWidth=null,void(this.barHeight=null);e>100&&(e=100),this.barWidth=e+"%"},o([r.Input(),i("design:type",String)],e.prototype,"align",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"striped",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"active",void 0),o([r.Input(),i("design:type",String)],e.prototype,"size",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"maxValue",void 0),o([r.Input(),i("design:type",String)],e.prototype,"type",void 0),o([r.Input(),i("design:type",String)],e.prototype,"class",void 0),o([r.Input(),i("design:type",Number)],e.prototype,"value",void 0),e=o([r.Component({selector:"nk-progress",template:n(121)})],e)}();t.ProgressComponent=a},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-progress progress">\r\n  <div class="progress-bar" [ngClass]="barClass" [style.width]="barWidth">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n'},function(e,t){},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-radio-group">\r\n  <ng-content></ng-content>\r\n</div>\r\n'},function(e,t){e.exports='<label class="nk-comp nk-radio" [ngClass]="{\'nk-radio-checked\': innerChecked, \'nk-radio-disabled\': innerDisabled}">\n  <span class="nk-radio-inner">\n    <input type="radio" [attr.name]="radioName" [ngModel]="innerChecked" [disabled]="innerDisabled" (click)="handleRadioClick($event)">\n  </span>\n  <span class="nk-radio-content">\n    <ng-content></ng-content>\n  </span>\n</label>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(127);var r=n(0),a=n(1);t.RATING_VALUE_ACCESSOR={provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return s}),multi:!0};var s=function(){function e(e){this.elementRef=e,this.onChange=Function.prototype,this.onTouched=Function.prototype,this.value=0,this.hoverIdx=0,this.rateArr=[],this.maxNum=5,this.rateClass="",this.readOnly=!1}return e.prototype.ngOnInit=function(){this.elementRef.nativeElement.className="smart-form",this.updateRateArr()},e.prototype.ngOnChanges=function(e){e.maxNum&&this.updateRateArr()},e.prototype.onClick=function(e){this.readOnly||(this.value=e,this.onChange(e))},e.prototype.onMouseLeave=function(){this.readOnly||(this.hoverIdx=0)},e.prototype.onMouseEnter=function(e){this.readOnly||(this.hoverIdx=e)},e.prototype.updateRateArr=function(){for(var e=[],t=1;t<=this.maxNum;t++)e.push(t);this.rateArr=e},e.prototype.writeValue=function(e){this.value=+e},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},o([r.Input(),i("design:type",Number)],e.prototype,"maxNum",void 0),o([r.Input(),i("design:type",String)],e.prototype,"rateClass",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"readOnly",void 0),e=o([r.Component({selector:"nk-rating",template:n(128),providers:[t.RATING_VALUE_ACCESSOR]}),i("design:paramtypes",[r.ElementRef])],e)}();t.RatingComponent=s},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-rating rating" [class.read-only]="readOnly">\n  <label *ngFor="let v of rateArr" [ngClass]="{active: v <= value, hover: v <= hoverIdx}" (click)="onClick(v)" (mouseenter)="onMouseEnter(v)"\n    (mouseleave)="onMouseLeave(v)">\n    <i [ngClass]="rateClass" *ngIf="rateClass"></i>\n    <div class="egg" *ngIf="!rateClass"></div>\n  </label>\n</div>\n'},function(e,t){},function(e,t){e.exports='<div class="nk-select">\n  <select style="width: 100%;" #select2Ctrl>\n  </select>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(25),s=function(){function e(e){this.select=e,this.disabled=!1}return e.prototype.ngOnInit=function(){this.select.addOption(this)},e.prototype.ngOnDestroy=function(){this.select.removeOption(this)},o([r.Input(),i("design:type",String)],e.prototype,"label",void 0),o([r.Input(),i("design:type",String)],e.prototype,"value",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),e=o([r.Component({selector:"nk-option",encapsulation:r.ViewEncapsulation.None,template:n(132)}),i("design:paramtypes",[a.SelectComponent])],e)}();t.SelectOptionComponent=s},function(e,t){e.exports=""},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=this&&this.__param||function(e,t){return function(n,o){t(n,o,e)}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),s=n(7),c=n(26),l=n(18),p=function(){function e(e,t,n){this.parent=e,this.el=t,this.sanitizer=n,this.index=1,this.mainOffset="0px"}return e.prototype.currentStatus=function(){return this.parent.active>this.index?this.parent.finishStatus:this.parent.active===this.index?this.parent.processStatus:"wait"},e.prototype.isLast=function(){return this.parent.stepsLength-1===this.index},e.prototype.isVertical=function(){return"vertical"===this.parent.direction},e.prototype.ngOnInit=function(){if(this.index=+this.el.nativeElement.getAttribute("nk-index"),"horizontal"===this.parent.direction&&this.parent.alignCenter){var e=this.titleRef.nativeElement.getBoundingClientRect().width;this.mainOffset=e/2+16+"px"}l.removeAngularTag(this.el.nativeElement)},o([a.ViewChild("titleRef"),i("design:type",a.ElementRef)],e.prototype,"titleRef",void 0),o([a.Input(),i("design:type",String)],e.prototype,"title",void 0),o([a.Input(),i("design:type",String)],e.prototype,"description",void 0),o([a.Input(),i("design:type",String)],e.prototype,"icon",void 0),o([a.Input(),i("design:type",String)],e.prototype,"status",void 0),e=o([a.Component({selector:"nk-step",template:n(136),changeDetection:a.ChangeDetectionStrategy.OnPush}),r(0,a.Optional()),i("design:paramtypes",[c.StepsComponent,a.ElementRef,s.DomSanitizer])],e)}();t.StepComponent=p},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-steps" [ngClass]="stepsClass">\r\n  <ng-content></ng-content>\r\n</div>\r\n'},function(e,t){e.exports='<div class="nk-comp nk-step">\n  <div [class]="\'nk-step__head is-\' + currentStatus()">\n    <div class="nk-step__icon is-text">\n      <ng-container *ngIf="currentStatus() !== \'finish\'">\n        <div *ngIf="!parent.simple" class="nk-step__icon-inner">{{ index + 1 }}</div>\n      </ng-container>      \n      <i *ngIf="currentStatus() === \'finish\'" [class]="\'fa fa-check nk-step__icon-inner is-status\'">\n      </i>\n    </div>\n    <div [class]="\'nk-step__title \' + \'is-\' + currentStatus()" #titleRef>\n      {{ title || \'Step\' + (index + 1) }}\n    </div>\n  </div>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(138);var r=n(0),a=n(1);t.SWITCH_VALUE_ACCESSOR={provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return s}),multi:!0};var s=function(){function e(){this.onChange=Function.prototype,this.onTouched=Function.prototype,this.innerDisabled=!1,this.innerChecked=!1,this.disabled=!1}return e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){e.disabled&&(this.innerDisabled=this.disabled)},e.prototype.handleCheckedChange=function(e){this.innerChecked=e,this.onChange(e)},e.prototype.writeValue=function(e){this.innerChecked=Boolean(e)},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.setDisabledState=function(e){this.innerDisabled=e},o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),e=o([r.Component({selector:"nk-switch",template:n(139),providers:[t.SWITCH_VALUE_ACCESSOR]})],e)}();t.SwitchComponent=s},function(e,t){},function(e,t){e.exports='<label class="nk-comp nk-switch" [ngClass]="{\'nk-switch-checked\': innerChecked, \'nk-switch-disabled\': innerDisabled}">\n  <span class="nk-switch-inner">\n    <input type="checkbox" [ngModel]="innerChecked" [disabled]="innerDisabled" (ngModelChange)="handleCheckedChange($event)">\n  </span>\n  <span class="nk-switch-content">\n    <ng-content></ng-content>\n  </span>\n</label>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(27),s=function(){function e(e,t,n){this.elementRef=e,this.renderer=t,this.tabset=n,this._active=!1}return Object.defineProperty(e.prototype,"active",{get:function(){return this._active},set:function(e){this._active=e,this.renderer[e?"addClass":"removeClass"](this.elementRef.nativeElement,"active")},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){this.tabset.addTab(this),this.elementRef.nativeElement.className="nk-tab-item"},e.prototype.ngOnChanges=function(e){e.name&&(this.innerName=name)},e.prototype.ngOnDestroy=function(){this.tabset.removeTab(this)},o([r.Input(),i("design:type",String)],e.prototype,"name",void 0),o([r.Input(),i("design:type",String)],e.prototype,"header",void 0),o([r.Input(),i("design:type",String)],e.prototype,"icon",void 0),e=o([r.Component({selector:"nk-tab-item",template:"<ng-content></ng-content>"}),i("design:paramtypes",[r.ElementRef,r.Renderer2,a.TabsetComponent])],e)}();t.TabItemComponent=s},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-tabset" [ngClass]="{\'nk-tabset-left\': tabsLeft}">\r\n  <ul class="nav nk-tabset-header" [ngClass]="{\'tabs-left\': tabsLeft}" [ngStyle]="headerStyle">\r\n    <li class="active" *ngFor="let tab of tabItems" [ngClass]="{active: tab.active}" (click)="setActiveItem(tab)">\r\n      <a href="javascript:;">\r\n        <i *ngIf="tab.icon" [ngClass]="tab.icon"></i> {{tab.header}}</a>\r\n    </li>\r\n  </ul>\r\n  <div class="nk-tab-content">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(144);var r=n(0),a=function(){function e(e){this.elementRef=e,this.content="",this.placement="top",this.delay=0,this.allowHtml=!1,this.tooltipTrigger="hover focus",this.type="normal"}return e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){this.$el&&this.initTooltip()},e.prototype.ngAfterViewInit=function(){this.$el=jQuery(this.elementRef.nativeElement),this.initTooltip()},e.prototype.ngOnDestroy=function(){this.destroyTooltip()},e.prototype.getTooltipOptions=function(){return{container:"body",delay:this.delay,html:this.allowHtml,placement:this.placement,title:this.content,trigger:this.tooltipTrigger,template:'\n      <div class="tooltip nk-tooltip nk-tooltip-'+this.type+'" role="tooltip">\n        <div class="tooltip-arrow"></div>\n        <div class="tooltip-inner"></div>\n      </div>'}},e.prototype.initTooltip=function(){var e=this;window.clearTimeout(this.timerForInit),this.destroyTooltip(),this.timerForInit=setTimeout(function(){var t=e.getTooltipOptions();e.$el.tooltip(t)},300)},e.prototype.destroyTooltip=function(){try{this.$el.tooltip("destroy")}catch(e){}},o([r.Input("nk-tooltip"),i("design:type",String)],e.prototype,"content",void 0),o([r.Input(),i("design:type",String)],e.prototype,"placement",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"delay",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"allowHtml",void 0),o([r.Input(),i("design:type",String)],e.prototype,"tooltipTrigger",void 0),o([r.Input("tooltip-type"),i("design:type",String)],e.prototype,"type",void 0),e=o([r.Directive({selector:"[nk-tooltip]"}),i("design:paramtypes",[r.ElementRef])],e)}();t.TooltipDirective=a},function(e,t){},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(146);var r=n(0),a=function(){function e(){this.validationTypes=["required","minlength","maxlength","pattern","date","email","emailGroup","equal","equalTo","integer","number","ip","url","max","min","validateFn"],this.errorMsg={},this.fireOnDirty=!0,this.requiredMsg="This field is required.",this.minlengthMsg="Field letters must greater and equals to {0}.",this.maxlengthMsg="Field letters must less or equalss to {0}.",this.patternMsg="Field must match `{0}`.",this.dateMsg="Please enter a date.",this.emailMsg="Please enter an email address.",this.emailGroupMsg="Please enter any email address.",this.equal="Field must be equal to `{0}`.",this.equalTo="Field must be equal to `{{control?.errors?.equalTo.to}}` field.",this.integerMsg="Please enter an integer.",this.ipMsg="Please enter an ip address.",this.maxMsg="Field must less than or equals to {0}.",this.minMsg="Field must greater than or equals to {0}.",this.numberMsg="Please enter a number.",this.urlMsg="Please enter an valid url.",this.validateFnMsg="Custom validate error."}return Object.defineProperty(e.prototype,"validatorStyle",{get:function(){return{left:this.left}},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.getShown=function(e){return void 0!==this.getValue(e)},e.prototype.getErrorMessage=function(e){var t=this.getValue(e);return((this.errorMsg||{})[e]||this[e+"Msg"]||"").replace("{0}",t&&t.to||t.requiredLength||t.requiredValue)},e.prototype.getValue=function(e){return this.control&&this.control.errors&&this.control.errors[e]},o([r.Input(),i("design:type",Object)],e.prototype,"control",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"left",void 0),o([r.Input(),i("design:type",Object)],e.prototype,"errorMsg",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"fireOnDirty",void 0),o([r.Input(),i("design:type",String)],e.prototype,"requiredMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"minlengthMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"maxlengthMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"patternMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"dateMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"emailMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"emailGroupMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"equal",void 0),o([r.Input(),i("design:type",String)],e.prototype,"equalTo",void 0),o([r.Input(),i("design:type",String)],e.prototype,"integerMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"ipMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"maxMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"minMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"numberMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"urlMsg",void 0),o([r.Input(),i("design:type",String)],e.prototype,"validateFnMsg",void 0),e=o([r.Component({selector:"nk-validator",template:n(147)})],e)}();t.ValidatorComponent=a},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-validator" *ngIf="(fireOnDirty && control?.dirty && control?.invalid) || (!fireOnDirty && control?.invalid)" [ngStyle]="validatorStyle">\n  <span *ngFor="let type of validationTypes" [hidden]="!getShown(type)">\n    <ng-container *ngIf="getShown(type)">\n      {{getErrorMessage(type)}}\n    </ng-container>\n  </span>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(149);var r=n(0),a=function(){function e(){this.innerCollapsed=!1,this.collapsed=!1,this.disabled=!1,this.defaultColor="",this.showCollapseBtn=!0,this.showFullscreenBtn=!1,this.showPickColorBtn=!1,this.collapsedChange=new r.EventEmitter}return Object.defineProperty(e.prototype,"hasCustomHeader",{get:function(){return this.customHeader.nativeElement.children.length>0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"headerStyle",{get:function(){var e={};return this.defaultColor&&(e["background-color"]=this.defaultColor),e},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){},e.prototype.ngOnChanges=function(e){e.collapsed&&(this.innerCollapsed=this.collapsed)},e.prototype.handleHeaderClick=function(){this.disabled||(this.innerCollapsed=!this.innerCollapsed,this.collapsedChange.next(this.innerCollapsed))},o([r.Input(),i("design:type",String)],e.prototype,"header",void 0),o([r.Input(),i("design:type",String)],e.prototype,"icon",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"collapsed",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.Input(),i("design:type",String)],e.prototype,"defaultColor",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"showCollapseBtn",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"showFullscreenBtn",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"showPickColorBtn",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"collapsedChange",void 0),o([r.ViewChild("customHeader"),i("design:type",r.ElementRef)],e.prototype,"customHeader",void 0),e=o([r.Component({selector:"nk-widget",template:n(150)})],e)}();t.WidgetComponent=a},function(e,t){},function(e,t){e.exports='<div class="nk-comp nk-widget" [class.hide-body]="innerCollapsed">\n  <div class="widget-heading">\n    <div class="nk-widget-title">\n      <i [hidden]="!icon" [attr.class]="icon"></i>\n      <ng-container *ngIf="!hasCustomHeader">\n        {{header}}\n      </ng-container>\n      <div #customHeader>\n        <ng-content select="[slot=header]"></ng-content>\n      </div>\n    </div>\n    <div class="widget-toolbar">\n      <ng-content select="[slot=toolbar]"></ng-content>\n      <span class="cursor-pointer" (click)="handleHeaderClick()">\n        <i class="nk-widget-icon fa" [ngClass]="{\'fa-angle-down\': innerCollapsed, \'fa-angle-up\': !innerCollapsed}"></i>\n      </span>\n    </div>\n  </div>\n  <div class="widget-body" [hidden]="innerCollapsed">\n    <ng-content></ng-content>\n  </div>\n</div>\n'},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0}),n(152);var r=n(0),a=n(1),s=function(){function e(){this.onChange=Function.prototype,this.onTouched=Function.prototype,this.placeholder="Card Number",this.readonly=!1,this.disabled=!1,this.invalid=!1,this.cardTypeClass={fa:!0,"fa-credit-card":!0}}return t=e,Object.defineProperty(e.prototype,"customMask",{get:function(){return this._customMask},set:function(e){this._customMask=e,this.wijmoInputCtrl&&(this.wijmoInputCtrl.mask=e)},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){this.cardValueChange=this.cardValueChange.bind(this)},e.prototype.ngAfterViewInit=function(){var e=this;this.wijmoInputCtrl=new window.wijmo.input.InputMask(this.inputEle.nativeElement),this.wijmoInputCtrl.placeholder=this.placeholder,this.wijmoInputCtrl.isDisabled=!!this.disabled,this.wijmoInputCtrl.inputElement.readOnly=!!this.readonly,this.customMask&&(this.wijmoInputCtrl.mask=this.customMask),setTimeout(function(){e.innerValue&&(e.wijmoInputCtrl.rawValue=e.innerValue)}),this.wijmoInputCtrl.valueChanged.addHandler(this.cardValueChange)},e.prototype.ngOnDestroy=function(){this.wijmoInputCtrl&&this.wijmoInputCtrl.dispose()},e.prototype.ngOnChanges=function(e){this.wijmoInputCtrl&&(this.wijmoInputCtrl.isDisabled=!!this.disabled,this.wijmoInputCtrl.inputElement.readOnly=!!this.readonly,this.customMask&&(this.wijmoInputCtrl.mask=this.customMask))},e.prototype.writeValue=function(e){var t=this,n=e?e.toString():e;this.innerValue!==n&&this.wijmoInputCtrl&&setTimeout(function(){t.wijmoInputCtrl.rawValue=n})},e.prototype.registerOnChange=function(e){this.onChange=e},e.prototype.registerOnTouched=function(e){this.onTouched=e},e.prototype.cardValueChange=function(e){this.cardType=this._getCreditCardType(e.rawValue),this.customMask||(this.wijmoInputCtrl.mask=this._getMaskType(this.cardType)),this.cardTypeClass={fa:!0,"fa-credit-card":"unknown"===this.cardType,"fa-cc-mastercard":"mastercard"===this.cardType,"fa-cc-visa":"visa"===this.cardType,"fa-cc-amex":"amex"===this.cardType,"fa-cc-diners-club":"diners"===this.cardType,"fa-cc-discover":"discover"===this.cardType,"fa-cc-jcb":"jcb"===this.cardType},this.innerValue=e.rawValue,this.onChange(this.innerValue)},e.prototype._getMaskType=function(e){return{mastercard:"0000 0000 0000 0000",visa:"0000 0000 0000 0000",amex:"0000 000000 00000",diners:"0000 0000 0000 00",discover:"0000 0000 0000 0000",jcb:"0000 0000 0000 0000",unknown:"0000 0000 0000 0000"}[e]},e.prototype._getCreditCardType=function(e){var t="unknown";return/^5[1-5]/.test(e)?t="mastercard":/^4/.test(e)?t="visa":/^3[47]/.test(e)?t="amex":/3(?:0[0-5]|[68][0-9])[0-9]{11}/.test(e)?t="diners":/6(?:011|5[0-9]{2})[0-9]{12}/.test(e)?t="discover":/^35((28)|(29)|([3-8]{1,1}[0-9]{1,1})){1,1}/.test(e)&&(t="jcb"),t},o([r.ViewChild("inputEle"),i("design:type",r.ElementRef)],e.prototype,"inputEle",void 0),o([r.Input(),i("design:type",String)],e.prototype,"placeholder",void 0),o([r.Input(),i("design:type",String),i("design:paramtypes",[String])],e.prototype,"customMask",null),o([r.Input(),i("design:type",Boolean)],e.prototype,"readonly",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"disabled",void 0),o([r.Input(),i("design:type",Boolean)],e.prototype,"invalid",void 0),e=t=o([r.Component({selector:"nk-credit-card",template:n(153),providers:[{provide:a.NG_VALUE_ACCESSOR,useExisting:r.forwardRef(function(){return t}),multi:!0}]}),i("design:paramtypes",[])],e);var t}();t.CreditCardComponent=s},function(e,t){},function(e,t){e.exports='<div class="nk-credit-card" [class.invalid]="invalid">\n  <input type="text" class="nk-input" [readonly]="readonly" [disabled]="disabled" [placeholder]="placeholder" #inputEle>\n  <div class="card-icon">\n    <i class="fa fa-credit-card" [ngClass]="cardTypeClass"></i>\n  </div>\n</div>\n'},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(155);t.COMMON_COMPONENTS=[o.NgForEventComponent]},function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(){function e(){this.onLastDone=new r.EventEmitter}return e.prototype.ngOnInit=function(){this.isLast&&this.onLastDone.emit(!0)},o([r.Input(),i("design:type",Boolean)],e.prototype,"isLast",void 0),o([r.Output(),i("design:type",r.EventEmitter)],e.prototype,"onLastDone",void 0),e=o([r.Component({selector:"ng-for-event",template:""})],e)}();t.NgForEventComponent=a},function(e,t){e.exports=n}])});
//# sourceMappingURL=kubi-ui.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37).setImmediate, __webpack_require__(37).clearImmediate))

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(112)))

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_113__;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en_us_1 = __webpack_require__(115);
var zh_tw_1 = __webpack_require__(116);
var zh_cn_1 = __webpack_require__(117);
exports.default = {
    'en-us': en_us_1.default,
    'zh-cn': zh_cn_1.default,
    'zh-tw': zh_tw_1.default
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    negAlert: {
        okText: 'OK',
        cancelText: 'CANCEL'
    }
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    negAlert: {
        okText: '确定',
        cancelText: '取消'
    }
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    negAlert: {
        okText: '确定',
        cancelText: '取消'
    }
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=newkit-core.js.map