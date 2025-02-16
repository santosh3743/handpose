/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function (a) {
    return a.raw = a
};
$jscomp.createTemplateTagFirstArgWithRaw = function (a, b) {
    a.raw = b;
    return a
};
$jscomp.arrayIteratorImpl = function (a) {
    var b = 0;
    return function () {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function (a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
};
$jscomp.makeIterator = function (a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : $jscomp.arrayIterator(a)
};
$jscomp.arrayFromIterator = function (a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
    return c
};
$jscomp.arrayFromIterable = function (a) {
    return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function (a) {
    var b = function () {};
    b.prototype = a;
    return new b
};
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};
$jscomp.getGlobal = function (a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.polyfill = function (a, b, c, d) {
    b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d))
};
$jscomp.polyfillUnisolated = function (a, b) {
    var c = $jscomp.global;
    a = a.split(".");
    for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        if (!(e in c)) return;
        c = c[e]
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: b
    })
};
$jscomp.polyfillIsolated = function (a, b, c) {
    var d = a.split(".");
    a = 1 === d.length;
    var e = d[0];
    e = !a && e in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var g = 0; g < d.length - 1; g++) {
        var k = d[g];
        if (!(k in e)) return;
        e = e[k]
    }
    d = d[d.length - 1];
    c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? e[d] : null;
    b = b(c);
    null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, d, {
        configurable: !0,
        writable: !0,
        value: b
    }) : b !== c && ($jscomp.propertyToPolyfillSymbol[d] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(d) : $jscomp.POLYFILL_PREFIX + d,
        d = $jscomp.propertyToPolyfillSymbol[d], $jscomp.defineProperty(e, d, {
            configurable: !0,
            writable: !0,
            value: b
        })))
    console.log("drawing...")
};
$jscomp.getConstructImplementation = function () {
    function a() {
        function e() {}

        function g() {}
        new e;
        Reflect.construct(e, [], g);
        return new e instanceof e
    }

    function b(e, g, k) {
        void 0 === k && (k = e);
        k = k.prototype || Object.prototype;
        k = $jscomp.objectCreate(k);
        var f = Function.prototype.apply;
        return (e = f.call(e, k, g)) || k
    }
    if ($jscomp.TRUST_ES6_POLYFILLS && "undefined" != typeof Reflect && Reflect.construct) {
        if (a()) return Reflect.construct;
        var c = Reflect.construct,
            d = function (e, g, k) {
                e = c(e, g);
                k && Reflect.setPrototypeOf(e, k.prototype);
                return e
            };
        return d
    }
    return b
};
$jscomp.construct = {
    valueOf: $jscomp.getConstructImplementation
}.valueOf();
$jscomp.underscoreProtoCanBeSet = function () {
    var a = {
            a: !0
        },
        b = {};
    try {
        return b.__proto__ = a, b.a
    } catch (c) {}
    return !1
};
$jscomp.setPrototypeOf = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function (a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
    return a
} : null;
$jscomp.inherits = function (a, b) {
    a.prototype = $jscomp.objectCreate(b.prototype);
    a.prototype.constructor = a;
    if ($jscomp.setPrototypeOf) {
        var c = $jscomp.setPrototypeOf;
        c(a, b)
    } else
        for (c in b)
            if ("prototype" != c)
                if (Object.defineProperties) {
                    var d = Object.getOwnPropertyDescriptor(b, c);
                    d && Object.defineProperty(a, c, d)
                } else a[c] = b[c]
};
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function (a) {
    if (!(a instanceof Object)) throw new TypeError("Iterator result " + a + " is not an object");
};
$jscomp.generator.Context = function () {
    this.isRunning_ = !1;
    this.yieldAllIterator_ = null;
    this.yieldResult = void 0;
    this.nextAddress = 1;
    this.finallyAddress_ = this.catchAddress_ = 0;
    this.abruptCompletion_ = null
};
$jscomp.generator.Context.prototype.start_ = function () {
    if (this.isRunning_) throw new TypeError("Generator is already running");
    this.isRunning_ = !0
};
$jscomp.generator.Context.prototype.stop_ = function () {
    this.isRunning_ = !1
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function () {
    this.nextAddress = this.catchAddress_ || this.finallyAddress_
};
$jscomp.generator.Context.prototype.next_ = function (a) {
    this.yieldResult = a
};
$jscomp.generator.Context.prototype.throw_ = function (a) {
    this.abruptCompletion_ = {
        exception: a,
        isException: !0
    };
    this.jumpToErrorHandler_()
};
$jscomp.generator.Context.prototype.return = function (a) {
    this.abruptCompletion_ = {
        return: a
    };
    this.nextAddress = this.finallyAddress_
};
$jscomp.generator.Context.prototype.yield = function (a, b) {
    this.nextAddress = b;
    return {
        value: a
    }
};
$jscomp.generator.Context.prototype.jumpTo = function (a) {
    this.nextAddress = a
};
$jscomp.generator.Context.prototype.jumpToEnd = function () {
    this.nextAddress = 0
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function (a, b) {
    this.catchAddress_ = a;
    void 0 != b && (this.finallyAddress_ = b)
};
$jscomp.generator.Context.prototype.leaveTryBlock = function (a, b) {
    this.nextAddress = a;
    this.catchAddress_ = b || 0
};
$jscomp.generator.Context.prototype.enterCatchBlock = function (a) {
    this.catchAddress_ = a || 0;
    a = this.abruptCompletion_.exception;
    this.abruptCompletion_ = null;
    return a
};
$jscomp.generator.Context.PropertyIterator = function (a) {
    this.properties_ = [];
    for (var b in a) this.properties_.push(b);
    this.properties_.reverse()
};
$jscomp.generator.Engine_ = function (a) {
    this.context_ = new $jscomp.generator.Context;
    this.program_ = a
};
$jscomp.generator.Engine_.prototype.next_ = function (a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_.next, a, this.context_.next_);
    this.context_.next_(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.return_ = function (a) {
    this.context_.start_();
    var b = this.context_.yieldAllIterator_;
    if (b) return b = "return" in b ? b["return"] : function (c) {
        return {
            value: c,
            done: !0
        }
    }, this.yieldAllStep_(b, a, this.context_.return);
    this.context_.return(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.throw_ = function (a) {
    this.context_.start_();
    if (this.context_.yieldAllIterator_) return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"], a, this.context_.next_);
    this.context_.throw_(a);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function (a, b, c) {
    try {
        var d = a.call(this.context_.yieldAllIterator_, b);
        $jscomp.generator.ensureIteratorResultIsObject_(d);
        if (!d.done) return this.context_.stop_(), d;
        var e = d.value
    } catch (g) {
        return this.context_.yieldAllIterator_ = null, this.context_.throw_(g), this.nextStep_()
    }
    this.context_.yieldAllIterator_ = null;
    c.call(this.context_, e);
    return this.nextStep_()
};
$jscomp.generator.Engine_.prototype.nextStep_ = function () {
    for (; this.context_.nextAddress;) try {
        var a = this.program_(this.context_);
        if (a) return this.context_.stop_(), {
            value: a.value,
            done: !1
        }
    } catch (b) {
        this.context_.yieldResult = void 0, this.context_.throw_(b)
    }
    this.context_.stop_();
    if (this.context_.abruptCompletion_) {
        a = this.context_.abruptCompletion_;
        this.context_.abruptCompletion_ = null;
        if (a.isException) throw a.exception;
        return {
            value: a.return,
            done: !0
        }
    }
    return {
        value: void 0,
        done: !0
    }
};
$jscomp.generator.Generator_ = function (a) {
    this.next = function (b) {
        return a.next_(b)
    };
    this.throw = function (b) {
        return a.throw_(b)
    };
    this.return = function (b) {
        return a.return_(b)
    };
    this[Symbol.iterator] = function () {
        return this
    }
};
$jscomp.generator.createGenerator = function (a, b) {
    b = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));
    $jscomp.setPrototypeOf && a.prototype && $jscomp.setPrototypeOf(b, a.prototype);
    return b
};
$jscomp.polyfill("Reflect", function (a) {
    return a ? a : {}
}, "es6", "es3");
$jscomp.polyfill("Reflect.construct", function () {
    return $jscomp.construct
}, "es6", "es3");
$jscomp.polyfill("Reflect.setPrototypeOf", function (a) {
    if (a) return a;
    if ($jscomp.setPrototypeOf) {
        var b = $jscomp.setPrototypeOf;
        return a = function (c, d) {
            try {
                return b(c, d), !0
            } catch (e) {
                return !1
            }
        }
    }
    return null
}, "es6", "es5");
$jscomp.initSymbol = function () {};
$jscomp.polyfill("Symbol", function (a) {
    if (a) return a;
    var b = function (e, g) {
        this.$jscomp$symbol$id_ = e;
        $jscomp.defineProperty(this, "description", {
            configurable: !0,
            writable: !0,
            value: g
        })
    };
    b.prototype.toString = function () {
        return this.$jscomp$symbol$id_
    };
    var c = 0,
        d = function (e) {
            if (this instanceof d) throw new TypeError("Symbol is not a constructor");
            return new b("jscomp_symbol_" + (e || "") + "_" + c++, e)
        };
    return d
}, "es6", "es3");
$jscomp.initSymbolIterator = function () {};
$jscomp.polyfill("Symbol.iterator", function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = $jscomp.global[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && $jscomp.defineProperty(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function () {
                    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
                }
            })
        }
        return a
    }, "es6",
    "es3");
$jscomp.initSymbolAsyncIterator = function () {};
$jscomp.iteratorPrototype = function (a) {
    a = {
        next: a
    };
    a[Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.polyfill("Object.setPrototypeOf", function (a) {
    return a || $jscomp.setPrototypeOf
}, "es6", "es5");
$jscomp.owns = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
$jscomp.assign = $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.assign ? Object.assign : function (a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (d)
            for (var e in d) $jscomp.owns(d, e) && (a[e] = d[e])
    }
    return a
};
$jscomp.polyfill("Object.assign", function (a) {
    return a || $jscomp.assign
}, "es6", "es3");
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (a) {
    function b() {
        this.batch_ = null
    }

    function c(f) {
        return f instanceof g ? f : new g(function (l) {
            l(f)
        })
    }
    if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a;
    b.prototype.asyncExecute = function (f) {
        if (null == this.batch_) {
            this.batch_ = [];
            var l = this;
            this.asyncExecuteFunction(function () {
                l.executeBatch_()
            })
        }
        this.batch_.push(f)
    };
    var d = $jscomp.global.setTimeout;
    b.prototype.asyncExecuteFunction = function (f) {
        d(f, 0)
    };
    b.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length;) {
            var f =
                this.batch_;
            this.batch_ = [];
            for (var l = 0; l < f.length; ++l) {
                var h = f[l];
                f[l] = null;
                try {
                    h()
                } catch (m) {
                    this.asyncThrow_(m)
                }
            }
        }
        this.batch_ = null
    };
    b.prototype.asyncThrow_ = function (f) {
        this.asyncExecuteFunction(function () {
            throw f;
        })
    };
    var e = {
            PENDING: 0,
            FULFILLED: 1,
            REJECTED: 2
        },
        g = function (f) {
            this.state_ = e.PENDING;
            this.result_ = void 0;
            this.onSettledCallbacks_ = [];
            var l = this.createResolveAndReject_();
            try {
                f(l.resolve, l.reject)
            } catch (h) {
                l.reject(h)
            }
        };
    g.prototype.createResolveAndReject_ = function () {
        function f(m) {
            return function (n) {
                h ||
                    (h = !0, m.call(l, n))
            }
        }
        var l = this,
            h = !1;
        return {
            resolve: f(this.resolveTo_),
            reject: f(this.reject_)
        }
    };
    g.prototype.resolveTo_ = function (f) {
        if (f === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (f instanceof g) this.settleSameAsPromise_(f);
        else {
            a: switch (typeof f) {
                case "object":
                    var l = null != f;
                    break a;
                case "function":
                    l = !0;
                    break a;
                default:
                    l = !1
            }
            l ? this.resolveToNonPromiseObj_(f) : this.fulfill_(f)
        }
    };
    g.prototype.resolveToNonPromiseObj_ = function (f) {
        var l = void 0;
        try {
            l = f.then
        } catch (h) {
            this.reject_(h);
            return
        }
        "function" == typeof l ? this.settleSameAsThenable_(l, f) : this.fulfill_(f)
    };
    g.prototype.reject_ = function (f) {
        this.settle_(e.REJECTED, f)
    };
    g.prototype.fulfill_ = function (f) {
        this.settle_(e.FULFILLED, f)
    };
    g.prototype.settle_ = function (f, l) {
        if (this.state_ != e.PENDING) throw Error("Cannot settle(" + f + ", " + l + "): Promise already settled in state" + this.state_);
        this.state_ = f;
        this.result_ = l;
        this.executeOnSettledCallbacks_()
    };
    g.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
            for (var f =
                    0; f < this.onSettledCallbacks_.length; ++f) k.asyncExecute(this.onSettledCallbacks_[f]);
            this.onSettledCallbacks_ = null
        }
    };
    var k = new b;
    g.prototype.settleSameAsPromise_ = function (f) {
        var l = this.createResolveAndReject_();
        f.callWhenSettled_(l.resolve, l.reject)
    };
    g.prototype.settleSameAsThenable_ = function (f, l) {
        var h = this.createResolveAndReject_();
        try {
            f.call(l, h.resolve, h.reject)
        } catch (m) {
            h.reject(m)
        }
    };
    g.prototype.then = function (f, l) {
        function h(q, r) {
            return "function" == typeof q ? function (u) {
                    try {
                        m(q(u))
                    } catch (v) {
                        n(v)
                    }
                } :
                r
        }
        var m, n, p = new g(function (q, r) {
            m = q;
            n = r
        });
        this.callWhenSettled_(h(f, m), h(l, n));
        return p
    };
    g.prototype.catch = function (f) {
        return this.then(void 0, f)
    };
    g.prototype.callWhenSettled_ = function (f, l) {
        function h() {
            switch (m.state_) {
                case e.FULFILLED:
                    f(m.result_);
                    break;
                case e.REJECTED:
                    l(m.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + m.state_);
            }
        }
        var m = this;
        null == this.onSettledCallbacks_ ? k.asyncExecute(h) : this.onSettledCallbacks_.push(h)
    };
    g.resolve = c;
    g.reject = function (f) {
        return new g(function (l, h) {
            h(f)
        })
    };
    g.race = function (f) {
        return new g(function (l, h) {
            for (var m = $jscomp.makeIterator(f), n = m.next(); !n.done; n = m.next()) c(n.value).callWhenSettled_(l, h)
        })
    };
    g.all = function (f) {
        var l = $jscomp.makeIterator(f),
            h = l.next();
        return h.done ? c([]) : new g(function (m, n) {
            function p(u) {
                return function (v) {
                    q[u] = v;
                    r--;
                    0 == r && m(q)
                }
            }
            var q = [],
                r = 0;
            do q.push(void 0), r++, c(h.value).callWhenSettled_(p(q.length - 1), n), h = l.next(); while (!h.done)
        })
    };
    return g
}, "es6", "es3");
$jscomp.iteratorFromArray = function (a, b) {
    a instanceof String && (a += "");
    var c = 0,
        d = !1,
        e = {
            next: function () {
                if (!d && c < a.length) {
                    var g = c++;
                    return {
                        value: b(g, a[g]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
    e[Symbol.iterator] = function () {
        return e
    };
    return e
};
$jscomp.polyfill("Array.prototype.keys", function (a) {
    return a ? a : a = function () {
        return $jscomp.iteratorFromArray(this, function (b) {
            return b
        })
    }
}, "es6", "es3");
$jscomp.checkStringArgs = function (a, b, c) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.endsWith", function (a) {
    return a ? a : a = function (b, c) {
        var d = $jscomp.checkStringArgs(this, b, "endsWith");
        b += "";
        void 0 === c && (c = d.length);
        c = Math.max(0, Math.min(c | 0, d.length));
        for (var e = b.length; 0 < e && 0 < c;)
            if (d[--c] != b[--e]) return !1;
        return 0 >= e
    }
}, "es6", "es3");
var goog = goog || {};
goog.global = this || self;
goog.exportPath_ = function (a, b, c, d) {
    a = a.split(".");
    d = d || goog.global;
    a[0] in d || "undefined" == typeof d.execScript || d.execScript("var " + a[0]);
    for (var e; a.length && (e = a.shift());)
        if (a.length || void 0 === b) d = d[e] && d[e] !== Object.prototype[e] ? d[e] : d[e] = {};
        else if (!c && goog.isObject(b) && goog.isObject(d[e]))
        for (var g in b) b.hasOwnProperty(g) && (d[e][g] = b[g]);
    else d[e] = b
};
goog.define = function (a, b) {
    return a = b
};
goog.FEATURESET_YEAR = 2012;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.DISALLOW_TEST_ONLY_CODE = !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function (a) {
    if (goog.isInModuleLoader_()) throw Error("goog.provide cannot be used within a module.");
    goog.constructNamespace_(a)
};
goog.constructNamespace_ = function (a, b, c) {
    goog.exportPath_(a, b, c)
};
goog.getScriptNonce = function (a) {
    if (a && a != goog.global) return goog.getScriptNonce_(a.document);
    null === goog.cspNonce_ && (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document));
    return goog.cspNonce_
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.cspNonce_ = null;
goog.getScriptNonce_ = function (a) {
    return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(a) ? a : ""
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function (a) {
    if ("string" !== typeof a || !a || -1 == a.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
    if (!goog.isInGoogModuleLoader_()) throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    goog.moduleLoaderState_.moduleName = a
};
goog.module.get = function () {
    return null
};
goog.module.getInternal_ = function () {
    return null
};
goog.ModuleType = {
    ES6: "es6",
    GOOG: "goog"
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function () {
    return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_()
};
goog.isInGoogModuleLoader_ = function () {
    return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG
};
goog.isInEs6ModuleLoader_ = function () {
    var a = !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6;
    return a ? !0 : (a = goog.global.$jscomp) ? "function" != typeof a.getCurrentModulePath ? !1 : !!a.getCurrentModulePath() : !1
};
goog.module.declareLegacyNamespace = function () {
    goog.moduleLoaderState_.declareLegacyNamespace = !0
};
goog.declareModuleId = function (a) {
    if (goog.moduleLoaderState_) goog.moduleLoaderState_.moduleName = a;
    else {
        var b = goog.global.$jscomp;
        if (!b || "function" != typeof b.getCurrentModulePath) throw Error('Module with namespace "' + a + '" has been loaded incorrectly.');
        b = b.require(b.getCurrentModulePath());
        goog.loadedModules_[a] = {
            exports: b,
            type: goog.ModuleType.ES6,
            moduleId: a
        }
    }
};
goog.setTestOnly = function (a) {
    if (goog.DISALLOW_TEST_ONLY_CODE) throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
};
goog.forwardDeclare = function () {};
goog.getObjectByName = function (a, b) {
    a = a.split(".");
    b = b || goog.global;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]], null == b) return null;
    return b
};
goog.addDependency = function () {};
goog.useStrictRequires = !1;
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function (a) {
    goog.global.console && goog.global.console.error(a)
};
goog.require = function () {};
goog.requireType = function () {
    return {}
};
goog.basePath = "";
goog.nullFunction = function () {};
goog.abstractMethod = function () {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function () {};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !1;
goog.TRANSPILE = "detect";
goog.ASSUME_ES_MODULES_TRANSPILED = !1;
goog.TRANSPILE_TO_LANGUAGE = "";
goog.TRANSPILER = "transpile.js";
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function () {
    if (null == goog.hasBadLetScoping) {
        try {
            var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')
        } catch (b) {
            a = !1
        }
        goog.hasBadLetScoping = a
    }
    return goog.hasBadLetScoping
};
goog.workaroundSafari10EvalBug = function (a) {
    return "(function(){" + a + "\n;})();\n"
};
goog.loadModule = function (a) {
    var b = goog.moduleLoaderState_;
    try {
        goog.moduleLoaderState_ = {
            moduleName: "",
            declareLegacyNamespace: !1,
            type: goog.ModuleType.GOOG
        };
        var c = {},
            d = c;
        if (goog.isFunction(a)) d = a.call(void 0, d);
        else if ("string" === typeof a) goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)), d = goog.loadModuleFromSource_.call(void 0, d, a);
        else throw Error("Invalid module definition");
        var e = goog.moduleLoaderState_.moduleName;
        if ("string" === typeof e && e) {
            goog.moduleLoaderState_.declareLegacyNamespace ?
                (a = c !== d, goog.constructNamespace_(e, d, a)) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof d && null != d && Object.seal(d);
            var g = {
                exports: d,
                type: goog.ModuleType.GOOG,
                moduleId: goog.moduleLoaderState_.moduleName
            };
            goog.loadedModules_[e] = g
        } else throw Error('Invalid module name "' + e + '"');
    } finally {
        goog.moduleLoaderState_ = b
    }
};
goog.loadModuleFromSource_ = function (a, b) {
    eval(b);
    return a
};
goog.normalizePath_ = function (a) {
    a = a.split("/");
    for (var b = 0; b < a.length;) "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    return a.join("/")
};
goog.loadFileSync_ = function (a) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    try {
        var b = new goog.global.XMLHttpRequest;
        b.open("get", a, !1);
        b.send();
        return 0 == b.status || 200 == b.status ? b.responseText : null
    } catch (c) {
        return null
    }
};
goog.transpile_ = function (a, b, c) {
    var d = goog.global.$jscomp;
    d || (goog.global.$jscomp = d = {});
    var e = d.transpile;
    if (!e) {
        var g = goog.basePath + goog.TRANSPILER,
            k = goog.loadFileSync_(g);
        if (k) {
            (function () {
                (0, eval)(k + "\n//# sourceURL=" + g)
            }).call(goog.global);
            if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
            goog.global.$jscomp.transpile =
                goog.global.$gwtExport.$jscomp.transpile;
            d = goog.global.$jscomp;
            e = d.transpile
        }
    }
    if (!e) {
        var f = " requires transpilation but no transpiler was found.";
        f += ' Please add "//javascript/closure:transpiler" as a data dependency to ensure it is included.';
        e = d.transpile = function (l, h) {
            goog.logToConsole_(h + f);
            return l
        }
    }
    return e(a, b, c)
};
goog.typeOf = function (a) {
    var b = typeof a;
    return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
};
goog.isArrayLike = function (a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function (a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isFunction = function (a) {
    return "function" == goog.typeOf(a)
};
goog.isObject = function (a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
};
goog.getUid = function (a) {
    return Object.prototype.hasOwnProperty.call(a, goog.UID_PROPERTY_) && a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.hasUid = function (a) {
    return !!a[goog.UID_PROPERTY_]
};
goog.removeUid = function (a) {
    null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_]
    } catch (b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.cloneObject = function (a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if ("function" === typeof a.clone) return a.clone();
        b = "array" == b ? [] : {};
        for (var c in a) b[c] = goog.cloneObject(a[c]);
        return b
    }
    return a
};
goog.bindNative_ = function (a, b, c) {
    return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function (a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e)
        }
    }
    return function () {
        return a.apply(b, arguments)
    }
};
goog.bind = function (a, b, c) {
    goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
    return goog.bind.apply(null, arguments)
};
goog.partial = function (a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
        var d = c.slice();
        d.push.apply(d, arguments);
        return a.apply(this, d)
    }
};
goog.mixin = function (a, b) {
    for (var c in b) a[c] = b[c]
};
goog.now = Date.now;
goog.globalEval = function (a) {
    (0, eval)(a)
};
goog.getCssName = function (a, b) {
    if ("." == String(a).charAt(0)) throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
    var c = function (e) {
            return goog.cssNameMapping_[e] || e
        },
        d = function (e) {
            e = e.split("-");
            for (var g = [], k = 0; k < e.length; k++) g.push(c(e[k]));
            return g.join("-")
        };
    d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function (e) {
        return e
    };
    a = b ? a + "-" + d(b) : d(a);
    return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a) : a
};
goog.setCssNameMapping = function (a, b) {
    goog.cssNameMapping_ = a;
    goog.cssNameMappingStyle_ = b
};
goog.getMsg = function (a, b, c) {
    c && c.html && (a = a.replace(/</g, "&lt;"));
    b && (a = a.replace(/\{\$([^}]+)}/g, function (d, e) {
        return null != b && e in b ? b[e] : d
    }));
    return a
};
goog.getMsgWithFallback = function (a) {
    return a
};
goog.exportSymbol = function (a, b, c) {
    goog.exportPath_(a, b, !0, c)
};
goog.exportProperty = function (a, b, c) {
    a[b] = c
};
goog.inherits = function (a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a
};
goog.scope = function (a) {
    if (goog.isInModuleLoader_()) throw Error("goog.scope is not supported within a module.");
    a.call(goog.global)
};
goog.defineClass = function (a, b) {
    var c = b.constructor,
        d = b.statics;
    c && c != Object.prototype.constructor || (c = function () {
        throw Error("cannot instantiate an interface (no constructor defined).");
    });
    c = goog.defineClass.createSealingConstructor_(c, a);
    a && goog.inherits(c, a);
    delete b.constructor;
    delete b.statics;
    goog.defineClass.applyProperties_(c.prototype, b);
    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    return c
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function (a) {
    if (!goog.defineClass.SEAL_CLASS_INSTANCES) return a;
    var b = function () {
        var c = a.apply(this, arguments) || this;
        c[goog.UID_PROPERTY_] = c[goog.UID_PROPERTY_];
        return c
    };
    return b
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function (a, b) {
    for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
};
goog.TRUSTED_TYPES_POLICY_NAME = "goog";
goog.identity_ = function (a) {
    return a
};
goog.createTrustedTypesPolicy = function (a) {
    var b = null,
        c = goog.global.trustedTypes;
    if (!c || !c.createPolicy) return b;
    try {
        b = c.createPolicy(a, {
            createHTML: goog.identity_,
            createScript: goog.identity_,
            createScriptURL: goog.identity_
        })
    } catch (d) {
        goog.logToConsole_(d.message)
    }
    return b
};
var module$exports$google3$third_party$javascript$tslib$tslib = {},
    module$contents$google3$third_party$javascript$tslib$tslib_extendStatics = Object.setPrototypeOf || {
        __proto__: []
    }
instanceof Array && function (a, b) {
    a.__proto__ = b
} || function (a, b) {
    for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
};
module$exports$google3$third_party$javascript$tslib$tslib.__extends = function (a, b) {
    function c() {
        this.constructor = a
    }
    module$contents$google3$third_party$javascript$tslib$tslib_extendStatics(a, b);
    a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
};
module$exports$google3$third_party$javascript$tslib$tslib.__assign = Object.assign || function (a) {
    for (var b, c = 1, d = arguments.length; c < d; c++) {
        b = arguments[c];
        for (var e in b) Object.prototype.hasOwnProperty.call(b, e) && (a[e] = b[e])
    }
    return a
};
module$exports$google3$third_party$javascript$tslib$tslib.__rest = function (a, b) {
    var c = {},
        d;
    for (d in a) Object.prototype.hasOwnProperty.call(a, d) && 0 > b.indexOf(d) && (c[d] = a[d]);
    if (null != a && "function" === typeof Object.getOwnPropertySymbols) {
        var e = 0;
        for (d = Object.getOwnPropertySymbols(a); e < d.length; e++) 0 > b.indexOf(d[e]) && (c[d[e]] = a[d[e]])
    }
    return c
};
module$exports$google3$third_party$javascript$tslib$tslib.__decorate = function (a, b, c, d) {
    var e = arguments.length,
        g = 3 > e ? b : null === d ? d = Object.getOwnPropertyDescriptor(b, c) : d,
        k;
    if ("object" === typeof Reflect && Reflect && "function" === typeof Reflect.decorate) g = Reflect.decorate(a, b, c, d);
    else
        for (var f = a.length - 1; 0 <= f; f--)
            if (k = a[f]) g = (3 > e ? k(g) : 3 < e ? k(b, c, g) : k(b, c)) || g;
    return 3 < e && g && Object.defineProperty(b, c, g), g
};
module$exports$google3$third_party$javascript$tslib$tslib.__metadata = function (a, b) {
    if ("object" === typeof Reflect && Reflect && "function" === typeof Reflect.metadata) return Reflect.metadata(a, b)
};
module$exports$google3$third_party$javascript$tslib$tslib.__param = function (a, b) {
    return function (c, d) {
        b(c, d, a)
    }
};
module$exports$google3$third_party$javascript$tslib$tslib.__awaiter = function (a, b, c, d) {
    return new(c || (c = Promise))(function (e, g) {
        function k(h) {
            try {
                l(d.next(h))
            } catch (m) {
                g(m)
            }
        }

        function f(h) {
            try {
                l(d["throw"](h))
            } catch (m) {
                g(m)
            }
        }

        function l(h) {
            h.done ? e(h.value) : (new c(function (m) {
                m(h.value)
            })).then(k, f)
        }
        l((d = d.apply(a, b)).next())
    })
};
module$exports$google3$third_party$javascript$tslib$tslib.__generator = function (a, b) {
    function c(h) {
        return function (m) {
            return d([h, m])
        }
    }

    function d(h) {
        if (g) throw new TypeError("Generator is already executing.");
        for (; e;) try {
            if (g = 1, k && (f = k[h[0] & 2 ? "return" : h[0] ? "throw" : "next"]) && !(f = f.call(k, h[1])).done) return f;
            if (k = 0, f) h = [0, f.value];
            switch (h[0]) {
                case 0:
                case 1:
                    f = h;
                    break;
                case 4:
                    return e.label++, {
                        value: h[1],
                        done: !1
                    };
                case 5:
                    e.label++;
                    k = h[1];
                    h = [0];
                    continue;
                case 7:
                    h = e.ops.pop();
                    e.trys.pop();
                    continue;
                default:
                    if (!(f =
                            e.trys, f = 0 < f.length && f[f.length - 1]) && (6 === h[0] || 2 === h[0])) {
                        e = 0;
                        continue
                    }
                    if (3 === h[0] && (!f || h[1] > f[0] && h[1] < f[3])) e.label = h[1];
                    else if (6 === h[0] && e.label < f[1]) e.label = f[1], f = h;
                    else if (f && e.label < f[2]) e.label = f[2], e.ops.push(h);
                    else {
                        f[2] && e.ops.pop();
                        e.trys.pop();
                        continue
                    }
            }
            h = b.call(a, e)
        } catch (m) {
            h = [6, m], k = 0
        } finally {
            g = f = 0
        }
        if (h[0] & 5) throw h[1];
        return {
            value: h[0] ? h[1] : void 0,
            done: !0
        }
    }
    var e = {
            label: 0,
            sent: function () {
                if (f[0] & 1) throw f[1];
                return f[1]
            },
            trys: [],
            ops: []
        },
        g, k, f, l;
    return l = {
        next: c(0),
        "throw": c(1),
        "return": c(2)
    }, "function" === typeof Symbol && (l[Symbol.iterator] = function () {
        return l
    }), l
};
module$exports$google3$third_party$javascript$tslib$tslib.__exportStar = function (a, b) {
    for (var c in a) b.hasOwnProperty(c) || (b[c] = a[c])
};
module$exports$google3$third_party$javascript$tslib$tslib.__values = function (a) {
    var b = "function" === typeof Symbol && a[Symbol.iterator],
        c = 0;
    return b ? b.call(a) : {
        next: function () {
            a && c >= a.length && (a = void 0);
            return {
                value: a && a[c++],
                done: !a
            }
        }
    }
};
module$exports$google3$third_party$javascript$tslib$tslib.__read = function (a, b) {
    var c = "function" === typeof Symbol && a[Symbol.iterator];
    if (!c) return a;
    a = c.call(a);
    var d, e = [];
    try {
        for (;
            (void 0 === b || 0 < b--) && !(d = a.next()).done;) e.push(d.value)
    } catch (k) {
        var g = {
            error: k
        }
    } finally {
        try {
            d && !d.done && (c = a["return"]) && c.call(a)
        } finally {
            if (g) throw g.error;
        }
    }
    return e
};
module$exports$google3$third_party$javascript$tslib$tslib.__spread = function () {
    for (var a = [], b = 0; b < arguments.length; b++) a = a.concat(module$exports$google3$third_party$javascript$tslib$tslib.__read(arguments[b]));
    return a
};
module$exports$google3$third_party$javascript$tslib$tslib.__await = function (a) {
    return this instanceof module$exports$google3$third_party$javascript$tslib$tslib.__await ? (this.v = a, this) : new module$exports$google3$third_party$javascript$tslib$tslib.__await(a)
};
module$exports$google3$third_party$javascript$tslib$tslib.__asyncGenerator = function (a, b, c) {
    function d(n) {
        l[n] && (h[n] = function (p) {
            return new Promise(function (q, r) {
                1 < m.push([n, p, q, r]) || e(n, p)
            })
        })
    }

    function e(n, p) {
        try {
            var q = l[n](p);
            q.value instanceof module$exports$google3$third_party$javascript$tslib$tslib.__await ? Promise.resolve(q.value.v).then(g, k) : f(m[0][2], q)
        } catch (r) {
            f(m[0][3], r)
        }
    }

    function g(n) {
        e("next", n)
    }

    function k(n) {
        e("throw", n)
    }

    function f(n, p) {
        (n(p), m.shift(), m.length) && e(m[0][0], m[0][1])
    }
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var l = c.apply(a, b || []),
        h, m = [];
    return h = {}, d("next"), d("throw"), d("return"), h[Symbol.asyncIterator] = function () {
        return this
    }, h
};
module$exports$google3$third_party$javascript$tslib$tslib.__asyncDelegator = function (a) {
    function b(e, g) {
        a[e] && (c[e] = function (k) {
            return (d = !d) ? {
                value: new module$exports$google3$third_party$javascript$tslib$tslib.__await(a[e](k)),
                done: "return" === e
            } : g ? g(k) : k
        })
    }
    var c, d;
    return c = {}, b("next"), b("throw", function (e) {
        throw e;
    }), b("return"), c[Symbol.iterator] = function () {
        return c
    }, c
};
module$exports$google3$third_party$javascript$tslib$tslib.__asyncValues = function (a) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var b = a[Symbol.asyncIterator];
    return b ? b.call(a) : "function" === typeof __values ? __values(a) : a[Symbol.iterator]()
};
module$exports$google3$third_party$javascript$tslib$tslib.__makeTemplateObject = function (a, b) {
    Object.defineProperty ? Object.defineProperty(a, "raw", {
        value: b
    }) : a.raw = b;
    return a
};
module$exports$google3$third_party$javascript$tslib$tslib.__classPrivateFieldGet = function (a, b) {
    if (!b.has(a)) throw new TypeError("attempted to get private field on non-instance");
    return b.get(a)
};
module$exports$google3$third_party$javascript$tslib$tslib.__classPrivateFieldSet = function (a, b, c) {
    if (!b.has(a)) throw new TypeError("attempted to set private field on non-instance");
    b.set(a, c);
    return c
};
var module$exports$google3$third_party$mediapipe$web$default_demo_api = {};
module$exports$google3$third_party$mediapipe$web$default_demo_api.ready = window.DemoApiPromise;
var module$contents$google3$third_party$mediapipe$web$default_demo_NAMESPACE_REGEX = /\[type\.googleapis\.com\/mediapipe\.(.*)\]/g,
    module$contents$google3$third_party$mediapipe$web$default_demo_CONFIG_FILENAME = window.CONFIG_FILENAME,
    module$contents$google3$third_party$mediapipe$web$default_demo_TEXT_SUPPORT = window.CONFIG_TEXT_SUPPORT || !1;
void 0 === module$contents$google3$third_party$mediapipe$web$default_demo_CONFIG_FILENAME && console.warn("Set window.CONFIG_FILENAME to your json path before including this", "script.");

function module$contents$google3$third_party$mediapipe$web$default_demo_loadFile(a, b) {
    return new Promise(function (c, d) {
        var e = new XMLHttpRequest;
        e.onload = function () {
            200 === e.status ? c(b ? e.response : e.responseText) : d("Error: " + e.status)
        };
        e.onerror = function (g) {
            d(g)
        };
        b && (e.responseType = "arraybuffer");
        e.open("GET", a);
        e.send()
    })
}

function module$contents$google3$third_party$mediapipe$web$default_demo_readLocalFile(a) {
    return new Promise(function (b, c) {
        var d = new FileReader;
        d.onload = function (e) {
            e.target && e.target.result ? b(e.target.result) : c()
        };
        d.readAsArrayBuffer(a)
    })
}

function module$contents$google3$third_party$mediapipe$web$default_demo_getDemoFileList() {
    return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(this, void 0, void 0, function b() {
        var c, d;
        return $jscomp.generator.createGenerator(b, function (e) {
            if (1 == e.nextAddress) return c = "demo_videos/filelist.txt", e.yield(module$contents$google3$third_party$mediapipe$web$default_demo_loadFile(c, !1), 2);
            d = e.yieldResult;
            return e.return(d.split("\n").filter(function (g) {
                return 0 < g.length
            }))
        })
    })
}

function module$contents$google3$third_party$mediapipe$web$default_demo_hasWebGlSupport() {
    try {
        var a = document.createElement("canvas"),
            b = a.getContext("webgl");
        return null !== b
    } catch (c) {
        return !1
    }
}

function module$contents$google3$third_party$mediapipe$web$default_demo_loadJsonFile(a) {
    return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(this, void 0, void 0, function c() {
        var d, e;
        return $jscomp.generator.createGenerator(c, function (g) {
            return 1 == g.nextAddress ? (d = JSON, e = d.parse, g.yield(module$contents$google3$third_party$mediapipe$web$default_demo_loadFile(a), 2)) : g.return(e.call(d, g.yieldResult))
        })
    })
}

function module$contents$google3$third_party$mediapipe$web$default_demo_stop(a) {
    a.stopPropagation();
    a.preventDefault()
}
var module$contents$google3$third_party$mediapipe$web$default_demo_Controller = function (a, b) {
    this.config = a;
    this.element = document.getElementById(b);
    this.messageElement = this.element.getElementsByClassName("message")[0];
    this.canvas = this.element.getElementsByClassName("displayCanvas")[0]
};
module$contents$google3$third_party$mediapipe$web$default_demo_Controller.prototype.show = function () {
    this.element.style.display = "block"
};
module$contents$google3$third_party$mediapipe$web$default_demo_Controller.prototype.loadGraphFiles = function (a) {
    return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(this, void 0, void 0, function c() {
        var d, e = this,
            g, k, f, l, h, m, n, p, q, r, u, v;
        return $jscomp.generator.createGenerator(c, function (t) {
            switch (t.nextAddress) {
                case 1:
                    d = {
                        runnable: void 0,
                        subgraphs: []
                    };
                    g = e.config.basePath || "";
                    if (e.config.binaryGraph && !module$contents$google3$third_party$mediapipe$web$default_demo_TEXT_SUPPORT) return u =
                        "" + g + e.config.binaryGraph, v = d, t.yield(module$contents$google3$third_party$mediapipe$web$default_demo_loadFile(u, !0), 10);
                    if (!e.config.source) {
                        t.jumpTo(3);
                        break
                    }
                    k = $jscomp.makeIterator(e.config.source);
                    f = k.next();
                case 5:
                    if (f.done) {
                        t.jumpTo(3);
                        break
                    }
                    l = f.value;
                    h = "" + g + l.path;
                    m = "source_code." + h;
                    if (n = window.sessionStorage.getItem(m)) {
                        p = JSON.parse(n).data;
                        t.jumpTo(8);
                        break
                    }
                    return t.yield(module$contents$google3$third_party$mediapipe$web$default_demo_loadFile(h), 9);
                case 9:
                    p = t.yieldResult;
                case 8:
                    q = p;
                    var x = a;
                    var y = q.replace(module$contents$google3$third_party$mediapipe$web$default_demo_NAMESPACE_REGEX, "[drishti.$1.ext]").replace(/\bnode_options\s*:/g, "options:");
                    if (void 0 !== x)
                        for (var z = $jscomp.makeIterator(Object.keys(x)), w = z.next(); !w.done; w = z.next()) {
                            w = w.value;
                            var A = new RegExp(w, "g");
                            y = y.replace(A, x[w])
                        }
                    r = x = y;
                    !d.runnable && l.runnable ? d.runnable = r : d.subgraphs.push(r);
                    f = k.next();
                    t.jumpTo(5);
                    break;
                case 10:
                    v.runnable = t.yieldResult;
                case 3:
                    return t.return(d)
            }
        })
    })
};
$jscomp.global.Object.defineProperties(module$contents$google3$third_party$mediapipe$web$default_demo_Controller.prototype, {
    message: {
        configurable: !0,
        enumerable: !0,
        set: function (a) {
            this.messageElement.textContent = a
        }
    }
});
var module$contents$google3$third_party$mediapipe$web$default_demo_VideoController = function (a, b, c, d) {
    module$contents$google3$third_party$mediapipe$web$default_demo_Controller.call(this, a, b);
    this.loadedModule = c;
    this.queryParams = d;
    this.api = c.api;
    this.videoElement = this.element.getElementsByClassName("video")[0];
    this.controlsElement = this.element.getElementsByClassName("controls")[0];
    this.demoSelectorElement = this.element.getElementsByClassName("demo-selector")[0];
    this.populateDemoSelector();
    a = a.context &&
        a.context.videoUrl;
    (a = (b = this.queryParams.get("videoUrl")) || a) && this.replaceVideo(a);
    this.videoProcessor = new this.loadedModule.VideoProcessor(this.config, 1, !0, !0, !0)

};
$jscomp.inherits(module$contents$google3$third_party$mediapipe$web$default_demo_VideoController, module$contents$google3$third_party$mediapipe$web$default_demo_Controller);
module$contents$google3$third_party$mediapipe$web$default_demo_VideoController.prototype.populateDemoSelector = function () {
    var a = this;
    if (this.config.demos && 0 < this.config.demos.length) {
        var b = document.createElement("option");
        b.value = "camera";
        b.text = "Camera";
        this.demoSelectorElement.add(b);
        b = $jscomp.makeIterator(this.config.demos);
        for (var c = b.next(); !c.done; c = b.next()) {
            c = c.value;
            var d = document.createElement("option");
            d.value = c;
            d.text = c;
            this.demoSelectorElement.add(d)
        }
        this.controlsElement.style.display =
            "block";
        this.demoSelectorElement.onchange = function () {
            var e = a.demoSelectorElement.value;
            "camera" === e ? a.replaceVideo() : a.replaceVideo("demo_videos/" + e)
        }
    } else this.controlsElement.style.display = "none"
};
module$contents$google3$third_party$mediapipe$web$default_demo_VideoController.prototype.run = function () {
    return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(this, void 0, void 0, function b() {
        var c = this,
            d;
        return $jscomp.generator.createGenerator(b, function (e) {
            d = c;
            if (!window.isSecureContext) return alert('Camera is unavailable due to security. If you are using Chrome, you can add this web address to chrome://flags under "Insecure origins tpreated as secure" and enable that feature.'), e.return();
            setTimeout(function () {
                return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(d, void 0, void 0, function k() {
                    var f = this,
                        l, h;
                    return $jscomp.generator.createGenerator(k, function (m) {
                        if (1 == m.nextAddress) return l = f, f.videoProcessor.initialize(f.canvas), f.videoProcessor.setFrameProcessor(f.api), f.videoProcessor.setOutputProcessor({
                            process: function (n) {
                                n && 0 < n.currentMspf ? (n = (1E3 / n.mspf).toFixed(1) + " fps (Processing " + n.currentMspf.toFixed(1) + "ms, " + (1E3 / n.currentMspf).toFixed(1) + " fps)", l.message = n) : l.message = "No detections"
                                console.log(n);
                            }
                        }), m.yield(f.loadGraphFiles({}), 2);
                        h = m.yieldResult;
                        h.runnable && (f.config.binaryGraph && !module$contents$google3$third_party$mediapipe$web$default_demo_TEXT_SUPPORT ? f.api.setGraph(h.runnable, !0) : (f.api.setSubgraphs(h.subgraphs), f.api.setGraph(h.runnable, !1)));
                        m.jumpToEnd()
                    })
                })
            }, 1);
            e.jumpToEnd()
        })
    })
};
module$contents$google3$third_party$mediapipe$web$default_demo_VideoController.prototype.replaceVideo = function (a) {
    for (this.videoProcessor.stop(); this.videoElement.lastElementChild;) this.videoElement.removeChild(this.videoElement.lastElementChild);
    if (a) {
        var b = document.createElement("source");
        b.setAttribute("type", "video/mp4");
        b.setAttribute("src", a);
        this.videoElement.appendChild(b);
        this.videoElement.load();
        this.videoProcessor.startVideo()
    } else this.videoProcessor.startCamera()
};
var module$contents$google3$third_party$mediapipe$web$default_demo_SingleFrameController = function (a, b, c) {
    module$contents$google3$third_party$mediapipe$web$default_demo_Controller.call(this, a, b);
    this.rightIris = this.leftIris = "0cm";
    this.dropTarget = this.element.getElementsByClassName("drop-target")[0];
    this.uploadInput = this.element.getElementsByClassName("input-file")[0];
    this.frameInstructions = this.element.getElementsByClassName("frame_instructions")[0];
    this.singleOutput = this.element.getElementsByClassName("single_output")[0];
    this.api = c.api
};
$jscomp.inherits(module$contents$google3$third_party$mediapipe$web$default_demo_SingleFrameController, module$contents$google3$third_party$mediapipe$web$default_demo_Controller);
module$contents$google3$third_party$mediapipe$web$default_demo_SingleFrameController.prototype.attachListeners = function () {
    var a = this,
        b = this.dropTarget;
    b.addEventListener("click", function (c) {
        a.uploadInput.click();
        module$contents$google3$third_party$mediapipe$web$default_demo_stop(c)
    });
    b.addEventListener("dragover", function (c) {
        b.classList.add("hover-red");
        module$contents$google3$third_party$mediapipe$web$default_demo_stop(c)
    });
    b.addEventListener("dragenter", function (c) {
        b.classList.add("hover-red");
        module$contents$google3$third_party$mediapipe$web$default_demo_stop(c)
    });
    b.addEventListener("dragleave", function (c) {
        b.classList.remove("hover-red");
        module$contents$google3$third_party$mediapipe$web$default_demo_stop(c)
    });
    b.addEventListener("drop", function (c) {
        a.processRawFile(c.dataTransfer.files.item(0));
        module$contents$google3$third_party$mediapipe$web$default_demo_stop(c)
    });
    this.api.attachListener("facelandmarkfrontcpu__image_size", {
        onSize: function (c, d) {
            console.log("onSize", c, d)
        }
    });
    this.api.attachListener("irisanddepthrenderercpu__left_iris_depth_mm", {
        onNumber: function (c, d) {
            a.leftIris = "" + (d / 10).toFixed(0) + "cm"
            console.log(a);
        }
    });
    this.api.attachListener("irisanddepthrenderercpu__right_iris_depth_mm", {
        onNumber: function (c, d) {
            a.rightIris = "" + (d / 10).toFixed(0) + "cm"
            console.log(a);
        }
    })
};
module$contents$google3$third_party$mediapipe$web$default_demo_SingleFrameController.prototype.run = function () {
    return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(this, void 0, void 0, function b() {
        var c = this,
            d;
        return $jscomp.generator.createGenerator(b, function (e) {
            d = c;
            if (!module$contents$google3$third_party$mediapipe$web$default_demo_hasWebGlSupport()) return c.frameInstructions.innerText = "Your browser does not support WebGl, which is required for this demo.", c.message = "Sorry!",
                e.return();
            c.api.setGlCanvas(c.canvas);
            c.uploadInput.addEventListener("input", function (g) {
                (g = g.target && g.target) && null !== g.files && d.processRawFile(g.files.item(0))
            });
            c.attachListeners();
            e.jumpToEnd()
        })
    })
};
module$contents$google3$third_party$mediapipe$web$default_demo_SingleFrameController.prototype.setFrameToIdle = function (a) {
    a ? this.element.classList.add("idle") : this.element.classList.remove("idle")
};
module$contents$google3$third_party$mediapipe$web$default_demo_SingleFrameController.prototype.processRawFile = function (a) {
    return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(this, void 0, void 0, function c() {
        var d = this,
            e, g, k, f, l, h, m, n;
        return $jscomp.generator.createGenerator(c, function (p) {
            switch (p.nextAddress) {
                case 1:
                    if (null === a) return p.return();
                    d.message = "Processing..." + a.name.toLowerCase();
                    if (!a.name.toLowerCase().endsWith("jpg") && !a.name.toLowerCase().endsWith(".jpeg")) {
                        d.message =
                            "Error: Not jpeg or jpg";
                        d.setFrameToIdle(!0);
                        p.jumpTo(0);
                        break
                    }
                    return p.yield(module$contents$google3$third_party$mediapipe$web$default_demo_readLocalFile(a), 3);
                case 3:
                    e = p.yieldResult;
                    g = !1;
                    k = d.api.getExifInfo(e);
                    if (!(0 < k.imageWidth || 0 < k.imageHeight)) {
                        p.jumpTo(4);
                        break
                    }
                    l = (f = 6 === k.orientation || 8 === k.orientation) ? k.imageWidth / k.imageHeight : k.imageHeight / k.imageWidth;
                    h = Math.round(l * d.singleOutput.width);
                    return p.yield(d.loadGraphFiles({
                            '"#OUTPUT_WIDTH#"': d.singleOutput.width.toString(),
                            '"#OUTPUT_HEIGHT#"': h.toString()
                        }),
                        5);
                case 5:
                    if (m = p.yieldResult, m.runnable && (d.config.binaryGraph && !module$contents$google3$third_party$mediapipe$web$default_demo_TEXT_SUPPORT ? d.api.setGraph(m.runnable, !0) : (d.singleOutput.height = h, d.api.setSubgraphs(m.subgraphs), d.api.setGraph(m.runnable, !1)), n = d.api.processRawBytes(new Uint8Array(e)))) d.message = "Left: " + d.leftIris + ", Right: " + d.rightIris, g = !0, d.setFrameToIdle(!1);
                case 4:
                    g || (d.message = "Error (missing EXIF info?)", d.setFrameToIdle(!0)), p.jumpToEnd()
            }
        })
    })
};

function module$contents$google3$third_party$mediapipe$web$default_demo_loadConfig(a) {
    return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(this, void 0, void 0, function c() {
        var d, e, g, k;
        return $jscomp.generator.createGenerator(c, function (f) {
            if (1 == f.nextAddress) return d = "workspace", (e = window.sessionStorage.getItem(d)) ? (g = JSON.parse(e).data, f.jumpTo(2)) : f.yield(module$contents$google3$third_party$mediapipe$web$default_demo_loadJsonFile(a), 3);
            2 != f.nextAddress && (g = f.yieldResult);
            k = g;
            return f.return(k)
        })
    })
}

function module$contents$google3$third_party$mediapipe$web$default_demo_run(a) {
    return (0, module$exports$google3$third_party$javascript$tslib$tslib.__awaiter)(this, void 0, void 0, function c() {
        var d, e, g, k, f, l, h;
        return $jscomp.generator.createGenerator(c, function (m) {
            switch (m.nextAddress) {
                case 1:
                    return d = new URLSearchParams(window.location.search.slice(1)), m.yield(module$contents$google3$third_party$mediapipe$web$default_demo_loadConfig(a), 2);
                case 2:
                    return e = m.yieldResult, e.basePath = window.location.pathname.replace(/[^\\\/]*$/,
                        ""), e.demos || (e.demos = []), m.setCatchFinallyBlocks(3), g = e, k = e.demos, f = k.concat, m.yield(module$contents$google3$third_party$mediapipe$web$default_demo_getDemoFileList(), 5);
                case 5:
                    g.demos = f.call(k, m.yieldResult);
                    m.leaveTryBlock(4);
                    break;
                case 3:
                    m.enterCatchBlock();
                case 4:
                    return m.yield(module$exports$google3$third_party$mediapipe$web$default_demo_api.ready, 6);
                case 6:
                    return l = m.yieldResult, h = e.singleFrame ? new module$contents$google3$third_party$mediapipe$web$default_demo_SingleFrameController(e, "frame_interface",
                        l) : new module$contents$google3$third_party$mediapipe$web$default_demo_VideoController(e, "video_interface", l, d), h.show(), m.yield(h.run(), 0)
            }
        })
    })
}
module$contents$google3$third_party$mediapipe$web$default_demo_run(module$contents$google3$third_party$mediapipe$web$default_demo_CONFIG_FILENAME);