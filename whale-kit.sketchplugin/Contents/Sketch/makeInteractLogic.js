var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/makeInteractLogic.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(/*! ./timeout */ "./node_modules/@skpm/timers/timeout.js")

function setImmediate(func, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return timeout.setTimeout(func, 0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
}

function clearImmediate(id) {
  return timeout.clearTimeout(id)
}

module.exports = {
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
}


/***/ }),

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(/*! ./runtime.js */ "./node_modules/cocoascript-class/lib/runtime.js");

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),

/***/ "./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),

/***/ "./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, setImmediate) {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/immediate.js */ "./node_modules/@skpm/timers/immediate.js")["setImmediate"]))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/browser-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var COLOR_CLASSES = [
  'NSColor',
  'NSCachedWhiteColor',
  'NSColorSpaceColor',
  'NSDynamicSystemColor',
  'NSCachedColorSpaceColor',
]
function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      color.class &&
      COLOR_CLASSES.indexOf(String(color.class())) !== -1
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (panel.delegate().utils.parentWindow) {
      var shouldClose = true
      browserWindow.emit('close', {
        get defaultPrevented() {
          return !shouldClose
        },
        preventDefault: function() {
          shouldClose = false
        },
      })
      if (shouldClose) {
        panel.delegate().utils.parentWindow.endSheet(panel)
      }
      return
    }

    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    if (panel.delegate().utils.parentWindow) {
      return panel.delegate().utils.parentWindow.beginSheet_completionHandler(
        panel,
        __mocha__.createBlock_function('v16@?0q8', function() {
          browserWindow.emit('closed')
        })
      )
    }

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    // TODO: Check size constraints since setFrame does not check it.
    var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(bounds.origin.x, 0, size.width, size.height)
    // Flip coordinates based on the primary screen.
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y =
      NSHeight(screen.frame()) - size.height - bounds.origin.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    return panel.frame()
  }

  browserWindow.setContentBounds = function(/* bounds, animate */) {
    // TODO:
  }

  browserWindow.getContentBounds = function() {
    // TODO:
  }

  browserWindow.setSize = function(width, height, animate) {
    var bounds = browserWindow.getBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    var bounds = browserWindow.getContentBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setContentBounds(bounds, animate)
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMaxSize(minSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    bounds.origin.x = x
    bounds.origin.y = Math.round(NSHeight(mainScreenRect) - y)

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return [
      bounds.origin.x,
      Math.round(NSHeight(mainScreenRect) - bounds.origin.y),
    ]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!https?|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url =
          'file://' +
          __command
            .pluginBundle()
            .urlForResourceNamed(url)
            .path()
      }
    }

    if (/^file:\/\/.*\.html?$/.test(url)) {
      webview.loadFileURL_allowingReadAccessToURL(
        NSURL.fileURLWithPath(url),
        NSURL.fileURLWithPath('file:///')
      )
      return
    }

    const properURL = NSURL.URLWithString(url)
    const urlRequest = NSURLRequest.requestWithURL(properURL)

    webview.loadRequest(urlRequest)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.isOpaque = false
    webview.setBackgroundColor(NSColor.clearColor())
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  var x = point.x
  var y = webView.frame().size.height - point.y // the coord start from the bottom instead of the top
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    x +
    ', ' +
    y +
    '); ' +
    'if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/fitSubview.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(/*! events */ "events")
var buildBrowserAPI = __webpack_require__(/*! ./browser-api */ "./node_modules/sketch-module-web-view/lib/browser-api.js")
var buildWebAPI = __webpack_require__(/*! ./webview-api */ "./node_modules/sketch-module-web-view/lib/webview-api.js")
var fitSubviewToView = __webpack_require__(/*! ./fitSubview */ "./node_modules/sketch-module-web-view/lib/fitSubview.js")
var dispatchFirstClick = __webpack_require__(/*! ./dispatch-first-click */ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js")
var injectClientMessaging = __webpack_require__(/*! ./inject-client-messaging */ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js")
var setDelegates = __webpack_require__(/*! ./set-delegates */ "./node_modules/sketch-module-web-view/lib/set-delegates.js")

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (options.modal && !options.parent) {
    throw new Error('A modal needs to have a parent.')
  }

  // Long-running script
  var fiber = coscript.createFiber()

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var wkwebviewConfig = WKWebViewConfiguration.alloc().init()
  var webView = WKWebView.alloc().initWithFrame_configuration(
    CGRectMake(0, 0, options.width || 800, options.height || 600),
    wkwebviewConfig
  )
  injectClientMessaging(webView)
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)
  setDelegates(browserWindow, panel, webView, options)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  const title =
    options.title ||
    (typeof __command !== 'undefined' && __command.pluginBundle()
      ? __command.pluginBundle().name()
      : undefined)
  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  options.webPreferences = options.webPreferences || {}

  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.devTools !== false,
      'developerExtrasEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.devTools !== false,
      'javaScriptEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(!!options.webPreferences.plugins, 'plugInsEnabled')
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.minimumFontSize || 0,
      'minimumFontSize'
    )

  if (options.webPreferences.zoomFactor) {
    webView.setMagnification(options.webPreferences.zoomFactor)
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents
          .executeJavaScript(dispatchFirstClick(webView, event))
          .catch(() => {})
      }
    })
  }

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    fiber.cleanup()
  })

  threadDictionary[identifier] = panel

  fiber.onCleanup(function() {
    if (!browserWindow._destroyed) {
      browserWindow.destroy()
    }
  })

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    return BrowserWindow.fromPanel(threadDictionary[identifier], identifier)
  }

  return undefined
}

BrowserWindow.fromPanel = function(panel, identifier) {
  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (!panel || !panel.contentView) {
    throw new Error('needs to pass an NSPanel')
  }

  var webView = panel.contentView().subviews()[0]

  if (!webView) {
    throw new Error('The NSPanel needs to have a webview')
  }

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  return browserWindow
}

module.exports = BrowserWindow


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/inject-client-messaging.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(webView) {
  var source =
    'window.originalPostMessage = window.postMessage;' +
    'window.postMessage = function(actionName) {' +
    'if (!actionName) {' +
    "throw new Error('missing action name')" +
    '}' +
    'window.webkit.messageHandlers.' +
    CONSTANTS.JS_BRIDGE +
    '.postMessage(' +
    'JSON.stringify([].slice.call(arguments))' +
    ');' +
    '}'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments[0])
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/set-delegates.js":
/*!******************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/set-delegates.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js").default
var parseWebArguments = __webpack_require__(/*! ./parseWebArguments */ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js")
var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

// We create one ObjC class for ourselves here
var WindowDelegateClass
var NavigationDelegateClass
var WebScriptHandlerClass

// TODO: events
// - 'page-favicon-updated'
// - 'new-window'
// - 'did-navigate-in-page'
// - 'will-prevent-unload'
// - 'crashed'
// - 'unresponsive'
// - 'responsive'
// - 'destroyed'
// - 'before-input-event'
// - 'certificate-error'
// - 'found-in-page'
// - 'media-started-playing'
// - 'media-paused'
// - 'did-change-theme-color'
// - 'update-target-url'
// - 'cursor-changed'
// - 'context-menu'
// - 'select-bluetooth-device'
// - 'paint'
// - 'console-message'

module.exports = function(browserWindow, panel, webview, options) {
  if (!WindowDelegateClass) {
    WindowDelegateClass = ObjCClass({
      classname: 'WindowDelegateClass',
      utils: null,
      panel: null,

      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      'windowShouldClose:': function() {
        var shouldClose = true
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = false
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', this.panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  if (!NavigationDelegateClass) {
    NavigationDelegateClass = ObjCClass({
      classname: 'NavigationDelegateClass',
      state: NSMutableDictionary.dictionaryWithDictionary({
        wasReady: 0,
      }),
      utils: null,

      // // Called when the web view begins to receive web content.
      'webView:didCommitNavigation:': function(webView) {
        this.utils.emit('will-navigate', {}, String(String(webView.URL())))
      },

      // // Called when web content begins to load in a web view.
      'webView:didStartProvisionalNavigation:': function() {
        this.utils.emit('did-start-navigation')
        this.utils.emit('did-start-loading')
      },

      // Called when a web view receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalNavigation:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // // Called when the web view needs to respond to an authentication challenge.
      // 'webView:didReceiveAuthenticationChallenge:completionHandler:': function(
      //   webView,
      //   challenge,
      //   completionHandler
      // ) {
      //   function callback(username, password) {
      //     completionHandler(
      //       0,
      //       NSURLCredential.credentialWithUser_password_persistence(
      //         username,
      //         password,
      //         1
      //       )
      //     )
      //   }
      //   var protectionSpace = challenge.protectionSpace()
      //   this.utils.emit(
      //     'login',
      //     {},
      //     {
      //       method: String(protectionSpace.authenticationMethod()),
      //       url: 'not implemented', // TODO:
      //       referrer: 'not implemented', // TODO:
      //     },
      //     {
      //       isProxy: !!protectionSpace.isProxy(),
      //       scheme: String(protectionSpace.protocol()),
      //       host: String(protectionSpace.host()),
      //       port: Number(protectionSpace.port()),
      //       realm: String(protectionSpace.realm()),
      //     },
      //     callback
      //   )
      // },

      // Called when an error occurs during navigation.
      // 'webView:didFailNavigation:withError:': function(
      //   webView,
      //   navigation,
      //   error
      // ) {},

      // Called when an error occurs while the web view is loading content.
      'webView:didFailProvisionalNavigation:withError:': function(
        webView,
        navigation,
        error
      ) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when the navigation is complete.
      'webView:didFinishNavigation:': function() {
        if (this.state.wasReady == 0) {
          this.utils.emitBrowserEvent('ready-to-show')
          this.state.setObject_forKey(1, 'wasReady')
        }
        this.utils.emit('did-navigate')
        this.utils.emit('did-frame-navigate')
        this.utils.emit('did-stop-loading')
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
      },

      // Called when the web view’s web content process is terminated.
      'webViewWebContentProcessDidTerminate:': function() {
        this.utils.emit('dom-ready')
      },

      // Decides whether to allow or cancel a navigation.
      // webView:decidePolicyForNavigationAction:decisionHandler:

      // Decides whether to allow or cancel a navigation after its response is known.
      // webView:decidePolicyForNavigationResponse:decisionHandler:
    })
  }

  if (!WebScriptHandlerClass) {
    WebScriptHandlerClass = ObjCClass({
      classname: 'WebScriptHandlerClass',
      utils: null,
      'userContentController:didReceiveScriptMessage:': function(_, message) {
        var webArguments = JSON.parse(String(message.body()))
        var args = this.utils.parseWebArguments([JSON.stringify(webArguments)])
        if (!args) {
          return
        }

        this.utils.emit.apply(this, args)
      },
    })
  }

  var navigationDelegate = NavigationDelegateClass.new()
  navigationDelegate.utils = NSDictionary.dictionaryWithDictionary({
    setTitle: browserWindow.setTitle.bind(browserWindow),
    emitBrowserEvent() {
      try {
        browserWindow.emit.apply(browserWindow, arguments)
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    emit() {
      try {
        browserWindow.webContents.emit.apply(
          browserWindow.webContents,
          arguments
        )
      } catch (err) {
        console.error(err)
        throw err
      }
    },
  })
  // reset state as well
  navigationDelegate.state = NSMutableDictionary.dictionaryWithDictionary({
    wasReady: 0,
  })

  webview.setNavigationDelegate(navigationDelegate)

  var webScriptHandler = WebScriptHandlerClass.new()
  webScriptHandler.utils = NSDictionary.dictionaryWithDictionary({
    emit() {
      try {
        browserWindow.webContents.emit.apply(
          browserWindow.webContents,
          arguments
        )
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    parseWebArguments: parseWebArguments,
  })

  webview
    .configuration()
    .userContentController()
    .addScriptMessageHandler_name(webScriptHandler, CONSTANTS.JS_BRIDGE)

  var windowDelegate = WindowDelegateClass.new()
  var utils = {
    emit() {
      try {
        browserWindow.emit.apply(browserWindow, arguments)
      } catch (err) {
        console.error(err)
        throw err
      }
    },
  }
  if (options.modal) {
    // find the window of the document
    var msdocument
    if (options.parent.type === 'Document') {
      msdocument = options.parent.sketchObject
    } else {
      msdocument = options.parent
    }
    if (msdocument && String(msdocument.class()) === 'MSDocumentData') {
      // we only have an MSDocumentData instead of a MSDocument
      // let's try to get back to the MSDocument
      msdocument = msdocument.delegate()
    }
    utils.parentWindow = msdocument.windowForSheet()
  }

  windowDelegate.utils = NSDictionary.dictionaryWithDictionary(utils)
  windowDelegate.panel = panel

  panel.setDelegate(windowDelegate)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/webview-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {var EventEmitter = __webpack_require__(/*! events */ "events")

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL

  webContents.loadFile = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.downloadURL = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.getURL = function() {
    return String(webview.url())
  }

  webContents.getTitle = function() {
    return String(webview.title())
  }

  webContents.isDestroyed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.focus = browserWindow.focus
  webContents.isFocused = browserWindow.isFocused

  webContents.isLoading = function() {
    return !!webview.loading()
  }

  webContents.isLoadingMainFrame = function() {
    // TODO:
    return !!webview.loading()
  }

  webContents.isWaitingForResponse = function() {
    return !webview.loading()
  }

  webContents.stop = function() {
    webview.stopLoading()
  }
  webContents.reload = function() {
    webview.reload()
  }
  webContents.reloadIgnoringCache = function() {
    webview.reloadFromOrigin()
  }
  webContents.canGoBack = function() {
    return !!webview.canGoBack()
  }
  webContents.canGoForward = function() {
    return !!webview.canGoForward()
  }
  webContents.canGoToOffset = function(offset) {
    return !!webview.backForwardList().itemAtIndex(offset)
  }
  webContents.clearHistory = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.goBack = function() {
    webview.goBack()
  }
  webContents.goForward = function() {
    webview.goForward()
  }
  webContents.goToIndex = function(index) {
    var backForwardList = webview.backForwardList()
    var backList = backForwardList.backList()
    var backListLength = backList.count()
    if (backListLength > index) {
      webview.loadRequest(NSURLRequest.requestWithURL(backList[index]))
      return
    }
    var forwardList = backForwardList.forwardList()
    if (forwardList.count() > index - backListLength) {
      webview.loadRequest(
        NSURLRequest.requestWithURL(forwardList[index - backListLength])
      )
      return
    }
    throw new Error('Cannot go to index ' + index)
  }
  webContents.goToOffset = function(offset) {
    if (!webContents.canGoToOffset(offset)) {
      throw new Error('Cannot go to offset ' + offset)
    }
    webview.loadRequest(
      NSURLRequest.requestWithURL(webview.backForwardList().itemAtIndex(offset))
    )
  }
  webContents.isCrashed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setUserAgent = function(/* userAgent */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.getUserAgent = function() {
    const userAgent = webview.customUserAgent()
    return userAgent ? String(userAgent) : undefined
  }
  webContents.insertCSS = function(css) {
    var source =
      "var style = document.createElement('style'); style.innerHTML = " +
      css.replace(/"/, '\\"') +
      '; document.head.appendChild(style);'
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.insertJS = function(source) {
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.executeJavaScript = function(script, userGesture, callback) {
    if (typeof userGesture === 'function') {
      callback = userGesture
      userGesture = false
    }
    var fiber = coscript.createFiber()

    // if the webview is not ready yet, defer the execution until it is
    if (webview.navigationDelegate().valueForKey('state').wasReady == 0) {
      return new Promise(function(resolve) {
        browserWindow.on('ready-to-show', function() {
          fiber.cleanup()
          resolve()
        })
      }).then(function() {
        return webContents.executeJavaScript(script, userGesture, callback)
      })
    }

    return new Promise(function(resolve, reject) {
      webview.evaluateJavaScript_completionHandler(
        script,
        __mocha__.createBlock_function('v28@?0@8c16@"NSError"20', function(
          result,
          err
        ) {
          var isError =
            err &&
            err.class &&
            (String(err.class()) === 'NSException' ||
              String(err.class()) === 'NSError')
          if (callback) {
            try {
              callback(isError ? err : null, result)
            } catch (error) {
              // /shrug
            }
            resolve()
          } else if (isError) {
            reject(err)
          } else {
            resolve(result)
          }
          fiber.cleanup()
        })
      )
    })
  }
  webContents.setIgnoreMenuShortcuts = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setAudioMuted = function(/* muted */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.isAudioMuted = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setZoomFactor = function(factor) {
    webview.setMagnification_centeredAtPoint(factor, CGPointMake(0, 0))
  }
  webContents.getZoomFactor = function(callback) {
    callback(Number(webview.magnification()))
  }
  webContents.setZoomLevel = function(level) {
    // eslint-disable-next-line no-restricted-properties
    webContents.setZoomFactor(Math.pow(1.2, level))
  }
  webContents.getZoomLevel = function(callback) {
    // eslint-disable-next-line no-restricted-properties
    callback(Math.log(Number(webview.magnification())) / Math.log(1.2))
  }
  webContents.setVisualZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setLayoutZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  // TODO:
  // webContents.undo = function() {
  //   webview.undoManager().undo()
  // }
  // webContents.redo = function() {
  //   webview.undoManager().redo()
  // }
  // webContents.cut = webview.cut
  // webContents.copy = webview.copy
  // webContents.paste = webview.paste
  // webContents.pasteAndMatchStyle = webview.pasteAsRichText
  // webContents.delete = webview.delete
  // webContents.replace = webview.replaceSelectionWithText

  webContents.send = function() {
    const script =
      'window.postMessage({' +
      'isSketchMessage: true,' +
      "origin: '" +
      String(__command.identifier()) +
      "'," +
      'args: ' +
      JSON.stringify([].slice.call(arguments)) +
      '}, "*")'
    webview.evaluateJavaScript_completionHandler(script, null)
  }

  webContents.getNativeWebview = function() {
    return webview
  }

  browserWindow.webContents = webContents
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/remote.js":
/*!*******************************************************!*\
  !*** ./node_modules/sketch-module-web-view/remote.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSThread */
var BrowserWindow = __webpack_require__(/*! ./lib */ "./node_modules/sketch-module-web-view/lib/index.js")

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.getWebview = BrowserWindow.fromId

module.exports.isWebviewPresent = function isWebviewPresent(identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview(
  identifier,
  evalString,
  callback
) {
  if (!module.exports.isWebviewPresent(identifier)) {
    return undefined
  }

  // in case there is no callback, lightweight path
  if (!callback) {
    var panel = threadDictionary[identifier]
    var webview = panel.contentView().subviews()[0]
    if (!webview || !webview.evaluateJavaScript_completionHandler) {
      throw new Error('Webview ' + identifier + ' not found')
    }

    webview.evaluateJavaScript_completionHandler(evalString, null)
    return undefined
  }

  var browserView = module.exports.getWebview(identifier)

  if (!browserView) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  return browserView.webContents.executeJavaScript(evalString, callback)
}


/***/ }),

/***/ "./src/arrows/createArrow.js":
/*!***********************************!*\
  !*** ./src/arrows/createArrow.js ***!
  \***********************************/
/*! exports provided: createArrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArrow", function() { return createArrow; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _draw_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw.js */ "./src/arrows/draw.js");



var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings"); // Main Function


function createArrow(firstObjectID, secondObjectID, style, type, direction, conditionID, isCondition, document, docData) {
  // Refactored
  var localDirection = direction == "Auto" ? getDirection(firstObjectID, secondObjectID, document) : direction; // Main Operations based on the settings

  updateSpacing(firstObjectID, secondObjectID, localDirection, document);
  autoAlignLayer(firstObjectID, secondObjectID, localDirection, document); // Making an Arrow 

  var arrow = Object(_draw_js__WEBPACK_IMPORTED_MODULE_1__["drawConnection"])(firstObjectID, secondObjectID, style, type, localDirection, conditionID, isCondition, document, docData); // Storage for current connection

  var connection = {
    firstObject: firstObjectID,
    secondObject: secondObjectID,
    style: arrow.style,
    condition: arrow.conditionID,
    isCondition: isCondition,
    type: arrow.type,
    direction: localDirection,
    line: arrow.line.objectID()
  };
  return connection;
}

function getDirection(firstObjectID, secondObjectID, document) {
  // Refactored
  // Get direction from the source object
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var firstObjectMidX = firstObject.frame.x + firstObject.frame.width / 2;
  var firstObjectMidY = firstObject.frame.y + firstObject.frame.height / 2;
  var secondObjectMidX = secondObject.frame.x + secondObject.frame.width / 2;
  var secondObjectMidY = secondObject.frame.y + secondObject.frame.height / 2;
  var diffX = firstObjectMidX - secondObjectMidX;
  var diffY = firstObjectMidY - secondObjectMidY;
  var absDiffX = Math.abs(diffX);
  var absDiffY = Math.abs(diffY);
  var direction;

  if (secondObjectMidX > firstObjectMidX) {
    // Right Half
    if (secondObjectMidY > firstObjectMidY) {
      // Bottom quarter
      direction = diffX > diffY ? "Down" : "Right";
    } else {
      // Top quarter
      direction = absDiffX > absDiffY ? "Right" : "Up";
    }
  } else {
    // Left Half
    if (secondObjectMidY > firstObjectMidY) {
      // Bottom quarter
      direction = absDiffX > absDiffY ? "Left" : "Down";
    } else {
      // Top quarter
      direction = diffX > diffY ? "Left" : "Up";
    }
  }

  return direction;
}

function updateSpacing(sourceObjectID, childObjectID, direction, document) {
  var sourceObject = document.getLayerWithID(sourceObjectID);
  var childObject = document.getLayerWithID(childObjectID);

  if (Settings.settingForKey("arrowSpacing") && Settings.settingForKey("arrowSpacing") != 0) {
    var currentSpacing = Settings.settingForKey("arrowSpacing");

    if (direction == "Right") {
      childObject.frame.x = sourceObject.frame.x + sourceObject.frame.width + currentSpacing;
    }

    if (direction == "Down") {
      childObject.frame.y = sourceObject.frame.y + sourceObject.frame.height + currentSpacing;
    }

    if (direction == "Left") {
      childObject.frame.x = sourceObject.frame.x - childObject.frame.width - currentSpacing;
    }

    if (direction == "Up") {
      childObject.frame.y = sourceObject.frame.y - childObject.frame.height - currentSpacing;
    }
  }
}

function autoAlignLayer(sourceObjectID, childObjectID, direction, document) {
  var sourceObject = document.getLayerWithID(sourceObjectID);
  var childObject = document.getLayerWithID(childObjectID);
  var sourceMidY, childMidY, sourceMidX, childMidX, diff;

  if (Settings.settingForKey("autoAlign")) {
    if (Settings.settingForKey("autoAlign") == true) {
      // If user turned on Auto-Align settings
      if (direction == "Right" || direction == "Left") {
        sourceMidY = sourceObject.frame.y + sourceObject.frame.height / 2;
        childMidY = childObject.frame.y + childObject.frame.height / 2;
        diff = sourceMidY - childMidY;

        if (diff > -6 && diff < 6) {
          childObject.frame.y = childObject.frame.y + diff;
        }
      }

      if (direction == "Down" || direction == "Up") {
        sourceMidX = sourceObject.frame.x + sourceObject.frame.width / 2;
        childMidX = childObject.frame.x + childObject.frame.width / 2;
        diff = sourceMidX - childMidX;

        if (diff > -6 && diff < 6) {
          childObject.frame.x = childObject.frame.x + diff;
        }
      }
    }
  }
}

/***/ }),

/***/ "./src/arrows/draw.js":
/*!****************************!*\
  !*** ./src/arrows/draw.js ***!
  \****************************/
/*! exports provided: drawConnection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawConnection", function() { return drawConnection; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities_styling_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/styling.js */ "./src/arrows/utilities/styling.js");
/* harmony import */ var _utilities_conditions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/conditions.js */ "./src/arrows/utilities/conditions.js");
/* harmony import */ var _utilities_groups_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilities/groups.js */ "./src/arrows/utilities/groups.js");





var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui"); // let document = sketch.fromNative(context.document);
// let docData = context.document.documentData();
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
// Main Function


function drawConnection(firstObjectID, secondObjectID, style, type, localDirection, conditionID, isCondition, document, docData) {
  // Refactored
  // Process of creating new connection  
  var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
  var firstObject = document.getLayerWithID(firstObjectID);
  var secondObject = document.getLayerWithID(secondObjectID);
  var connectionPos = getConnectionPos(firstObject, secondObject, localDirection, currentParentGroup);
  var connection = {
    line: [],
    conditionID: [],
    type: [],
    style: [] // Type  

  };
  connection.type = type == null ? Settings.settingForKey("arrowType") : type;

  if (connection.type == "Angled" || connection.type == null) {
    connection.line = drawAngledLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.middlePosX, connectionPos.middlePosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  }

  if (connection.type == "Straight") {
    connection.line = drawStraightLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  }

  if (connection.type == "Curved") {
    connection.line = drawCurvedLine(connectionPos.firstLayerPosX, connectionPos.firstLayerPosY, connectionPos.secondLayerPosX, connectionPos.secondLayerPosY, localDirection);
  } // Condition


  if (isCondition == true) {
    if (document.getLayerWithID(conditionID)) {
      connection.conditionID = Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_2__["updateCondition"])(conditionID, connectionPos.middlePosX, connectionPos.middlePosY, document, docData);
    } else {
      connection.conditionID = Object(_utilities_conditions_js__WEBPACK_IMPORTED_MODULE_2__["addCondition"])("#con", connectionPos.middlePosX, connectionPos.middlePosY, document, docData);
    }
  } else {
    connection.conditionID = null;
  } // Style


  connection.style = Object(_utilities_styling_js__WEBPACK_IMPORTED_MODULE_1__["styleLine"])(connection.line, style, docData); // Add to group

  Object(_utilities_groups_js__WEBPACK_IMPORTED_MODULE_3__["addToArrowsGroup"])(connection.line, currentParentGroup);
  return connection;
} // Positions

function getConnectionPos(firstObject, secondObject, direction, currentParentGroup) {
  // Refactored
  var firstObjectAbsPos = firstObject.frame.changeBasis({
    from: firstObject.parent,
    to: currentParentGroup
  });
  var secondObjectAbsPos = secondObject.frame.changeBasis({
    from: secondObject.parent,
    to: currentParentGroup
  });
  var currentGroup = Object(_utilities_groups_js__WEBPACK_IMPORTED_MODULE_3__["checkForGroup"])("Arrows", currentParentGroup);
  var diffX, diffY;

  if (currentGroup) {
    diffX = currentGroup.frame().x();
    diffY = currentGroup.frame().y();
  } else {
    diffX = 0;
    diffY = 0;
  }

  var connectionPos = {
    firstLayerPosX: null,
    firstLayerPosY: null,
    secondLayerPosX: null,
    secondLayerPosY: null,
    middlePosX: null,
    middlePosY: null // Getting all the positions

  };

  if (direction == "Up") {
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x + firstObjectAbsPos.width / 2 - diffX;
    connectionPos.firstLayerPosY = firstObjectAbsPos.y - diffY; // Second Layer Position End Point Position

    connectionPos.secondLayerPosX = secondObjectAbsPos.x + secondObjectAbsPos.width / 2 - diffX;
    connectionPos.secondLayerPosY = secondObjectAbsPos.y + secondObjectAbsPos.height - diffY; // Middle Points

    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX) / 2;
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY) / 2;
  }

  if (direction == "Right") {
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x + firstObjectAbsPos.width - diffX;
    connectionPos.firstLayerPosY = firstObjectAbsPos.y + firstObjectAbsPos.height / 2 - diffY; // Second Layer Position End Point Position

    connectionPos.secondLayerPosX = secondObjectAbsPos.x - diffX;
    connectionPos.secondLayerPosY = secondObjectAbsPos.y + secondObjectAbsPos.height / 2 - diffY; // Middle Points

    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX) / 2;
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY) / 2;
  }

  if (direction == "Down") {
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = secondObjectAbsPos.x + secondObjectAbsPos.width / 2 - diffX;
    connectionPos.firstLayerPosY = secondObjectAbsPos.y + secondObjectAbsPos.height - diffY; // Second Layer Position End Point Position

    connectionPos.secondLayerPosX = firstObjectAbsPos.x + firstObjectAbsPos.width / 2 - diffX;
    connectionPos.secondLayerPosY = firstObjectAbsPos.y - diffY; // Middle Points

    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX) / 2;
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY) / 2;
  }

  if (direction == "Left") {
    // First Layer Position Start Point Position
    connectionPos.firstLayerPosX = firstObjectAbsPos.x - diffX;
    connectionPos.firstLayerPosY = firstObjectAbsPos.y + firstObjectAbsPos.height / 2 - diffY; // Second Layer Position End Point Position

    connectionPos.secondLayerPosX = secondObjectAbsPos.x + secondObjectAbsPos.width - diffX;
    connectionPos.secondLayerPosY = secondObjectAbsPos.y + secondObjectAbsPos.height / 2 - diffY; // Middle Points

    connectionPos.middlePosX = (connectionPos.firstLayerPosX + connectionPos.secondLayerPosX) / 2;
    connectionPos.middlePosY = (connectionPos.firstLayerPosY + connectionPos.secondLayerPosY) / 2;
  }

  return connectionPos;
} // Drawing Types


function drawAngledLine(firstLayerPosX, firstLayerPosY, middlePosX, middlePosY, secondLayerPosX, secondLayerPosY, direction) {
  // Refactored
  var path = NSBezierPath.bezierPath();

  if (direction == "Up") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Right") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Down") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(firstLayerPosX, middlePosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, middlePosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Left") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(middlePosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(middlePosX, secondLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  var line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
  var points = line.layers().firstObject().points();
  points[1].cornerRadius = 20;
  points[2].cornerRadius = 20;
  line.setName("Angled Arrow"); // line.layers[0].style.borders[0].color = "#52C41A";

  return line;
}

function drawStraightLine(firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, direction) {
  // Refactored
  var path = NSBezierPath.bezierPath();

  if (direction == "Up") {
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Right") {
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Down") {
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  if (direction == "Left") {
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY));
  }

  var line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
  line.setName("Straight Arrow");
  return line;
}

function drawCurvedLine(firstLayerPosX, firstLayerPosY, secondLayerPosX, secondLayerPosY, direction) {
  // Refactored
  var path = NSBezierPath.bezierPath();
  var line;

  if (direction == "Up") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
    var points = line.layers().firstObject().points();
    points[0].curveMode = 4;
    points[1].curveMode = 4;
    points[0].hasCurveFrom = true;
    points[1].hasCurveTo = true;

    if (firstLayerPosX < secondLayerPosX) {
      points[0].curveFrom = {
        x: 0,
        y: 0.5
      };
      points[0].curveTo = {
        x: -0.5,
        y: 1
      };
      points[1].curveFrom = {
        x: 1,
        y: 1
      };
      points[1].curveTo = {
        x: 1,
        y: 0.5
      };
    } else {
      points[0].curveFrom = {
        x: 1,
        y: 0.5
      };
      points[0].curveTo = {
        x: -0.5,
        y: 1
      };
      points[1].curveFrom = {
        x: 1,
        y: 1
      };
      points[1].curveTo = {
        x: 0,
        y: 0.5
      };
    }
  }

  if (direction == "Right") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

    var _points = line.layers().firstObject().points();

    _points[0].curveMode = 4;
    _points[1].curveMode = 4;
    _points[0].hasCurveFrom = true;
    _points[1].hasCurveTo = true;

    if (firstLayerPosY < secondLayerPosY) {
      _points[0].curveFrom = {
        x: 0.5,
        y: 0
      };
      _points[0].curveTo = {
        x: -0.5,
        y: 1
      };
      _points[1].curveFrom = {
        x: 1,
        y: 1
      };
      _points[1].curveTo = {
        x: 0.5,
        y: 1
      };
    } else {
      _points[0].curveFrom = {
        x: 0.5,
        y: 1
      };
      _points[0].curveTo = {
        x: -0.5,
        y: 1
      };
      _points[1].curveFrom = {
        x: 1,
        y: 1
      };
      _points[1].curveTo = {
        x: 0.5,
        y: 0
      };
    }
  }

  if (direction == "Down") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

    var _points2 = line.layers().firstObject().points();

    _points2[0].curveMode = 4;
    _points2[1].curveMode = 4;
    _points2[0].hasCurveFrom = true;
    _points2[1].hasCurveTo = true;

    if (firstLayerPosX < secondLayerPosX) {
      _points2[0].curveFrom = {
        x: 0,
        y: 0.5
      };
      _points2[0].curveTo = {
        x: -0.5,
        y: 1
      };
      _points2[1].curveFrom = {
        x: 1,
        y: 1
      };
      _points2[1].curveTo = {
        x: 1,
        y: 0.5
      };
    } else {
      _points2[0].curveFrom = {
        x: 1,
        y: 0.5
      };
      _points2[0].curveTo = {
        x: -0.5,
        y: 1
      };
      _points2[1].curveFrom = {
        x: 1,
        y: 1
      };
      _points2[1].curveTo = {
        x: 0,
        y: 0.5
      };
    }
  }

  if (direction == "Left") {
    // Connecting points
    path.moveToPoint(NSMakePoint(firstLayerPosX, firstLayerPosY));
    path.lineToPoint(NSMakePoint(secondLayerPosX, secondLayerPosY)); // Painting the line

    line = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));

    var _points3 = line.layers().firstObject().points();

    _points3[0].curveMode = 4;
    _points3[1].curveMode = 4;
    _points3[0].hasCurveFrom = true;
    _points3[1].hasCurveTo = true;

    if (firstLayerPosY < secondLayerPosY) {
      _points3[0].curveFrom = {
        x: 0.5,
        y: 0
      };
      _points3[0].curveTo = {
        x: -0.5,
        y: 1
      };
      _points3[1].curveFrom = {
        x: 1,
        y: 1
      };
      _points3[1].curveTo = {
        x: 0.5,
        y: 1
      };
    } else {
      _points3[0].curveFrom = {
        x: 0.5,
        y: 1
      };
      _points3[0].curveTo = {
        x: -0.5,
        y: 1
      };
      _points3[1].curveFrom = {
        x: 1,
        y: 1
      };
      _points3[1].curveTo = {
        x: 0.5,
        y: 0
      };
    }
  } // Providing Settings for the arrow


  line.setName("Curved Arrow");
  return line;
}

/***/ }),

/***/ "./src/arrows/utilities/conditions.js":
/*!********************************************!*\
  !*** ./src/arrows/utilities/conditions.js ***!
  \********************************************/
/*! exports provided: addCondition, updateCondition, deleteCondition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCondition", function() { return addCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCondition", function() { return updateCondition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteCondition", function() { return deleteCondition; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _groups_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./groups.js */ "./src/arrows/utilities/groups.js");



var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui"); // let docData = context.document.documentData();
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();


function addCondition(keyword, x, y, document, docData) {
  var libraries = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getLibraries();
  var libraryObject, symbolReferences, symbol;
  var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();

  for (var g = 0; g < libraries.length; g++) {
    symbolReferences = libraries[g].getImportableSymbolReferencesForDocument(document);

    for (var i = 0; i < symbolReferences.length; i++) {
      if (symbolReferences[i].name.includes(keyword)) {
        libraryObject = symbolReferences[i];
      }
    }
  }

  if (libraryObject == null) {
    symbol = null;
    UI.alert("Condition symbol is not found", 'If you would like to add arrows with specific conditions, you need to specify them in your libraries. You can download the library that works well with the plugin by going into Plugins -> Connection Arrows -> Get Free Library. Conditions are taken from the library based on their names. Make sure to name symbol as "#condition" so it will be added here');
  } else {
    var symbolMaster = libraryObject.import();
    symbol = symbolMaster.createNewInstance();
    symbol = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["addToConditionGroup"])(symbol, x, y, currentParentGroup);
  }

  return symbol;
}
function updateCondition(conditionID, x, y, document, docData) {
  var currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();
  var condition = document.getLayerWithID(conditionID);
  var conGroup = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["checkForGroup"])("Conditions", currentParentGroup);
  var arGroup = Object(_groups_js__WEBPACK_IMPORTED_MODULE_1__["checkForGroup"])("Arrows", currentParentGroup);
  var arGroupX = arGroup != null ? arGroup.frame().x() : 0;
  var arGroupY = arGroup != null ? arGroup.frame().y() : 0;

  if (conGroup) {
    condition.frame.x = x - condition.frame.width / 2 - (conGroup.frame().x() - arGroupX);
    condition.frame.y = y - condition.frame.height / 2 - (conGroup.frame().y() - arGroupY);
    conGroup.fixGeometryWithOptions(1);
  } else {
    condition.frame.x = x - condition.frame.width / 2;
    condition.frame.y = y - condition.frame.height / 2;
  }

  return condition.id;
}
function deleteCondition(conditionID, document) {
  var conditionObject = document.getLayerWithID(conditionID);
  var selectedGroup;

  if (conditionObject) {
    selectedGroup = conditionObject.parent;
    conditionObject.remove();

    if (selectedGroup.layers.length == 0) {
      selectedGroup.remove();
    }
  }
}

/***/ }),

/***/ "./src/arrows/utilities/groups.js":
/*!****************************************!*\
  !*** ./src/arrows/utilities/groups.js ***!
  \****************************************/
/*! exports provided: checkForGroup, addToArrowsGroup, addToConditionGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkForGroup", function() { return checkForGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToArrowsGroup", function() { return addToArrowsGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToConditionGroup", function() { return addToConditionGroup; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);


var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui"); // let document = sketch.fromNative(context.document);
// let docData = context.document.documentData();
// let currentParentGroup = docData.currentPage().currentArtboard() || docData.currentPage();


function checkForGroup(groupName, currentParentGroup) {
  // refactored
  var currentGroup = null; // Checking all the groups that we have

  for (var i = 0; i < currentParentGroup.layers().count(); i++) {
    if (currentParentGroup.layers()[i].name() == groupName) {
      currentGroup = currentParentGroup.layers()[i];
    }
  }

  return currentGroup;
}
function addToArrowsGroup(line, currentParentGroup) {
  var currentGroup = checkForGroup("Arrows", currentParentGroup);

  if (currentGroup) {
    currentGroup.addLayers([line]);
    currentGroup.fixGeometryWithOptions(1);
  } else {
    var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

    var group = new Group({
      parent: currentParentGroup,
      name: 'Arrows',
      locked: true,
      layers: [line]
    });
    group.moveToBack();
    group.adjustToFit();
  }
}
function addToConditionGroup(condition, x, y, currentParentGroup) {
  var conGroup = checkForGroup("Conditions", currentParentGroup);
  var arGroup = checkForGroup("Arrows", currentParentGroup);
  var arGroupX = arGroup != null ? arGroup.frame().x() : 0;
  var arGroupY = arGroup != null ? arGroup.frame().y() : 0;

  if (conGroup) {
    condition.frame.x = x - condition.frame.width / 2 - (conGroup.frame().x() - arGroupX);
    condition.frame.y = y - condition.frame.height / 2 - (conGroup.frame().y() - arGroupY);
    condition.parent = conGroup;
    conGroup.fixGeometryWithOptions(1);
  } else {
    condition.frame.x = x - condition.frame.width / 2 + arGroupX;
    condition.frame.y = y - condition.frame.height / 2 + arGroupY;

    var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

    var group = new Group({
      parent: currentParentGroup,
      name: "Conditions",
      layers: [condition]
    });
    group.moveToBack();
    group.adjustToFit();
  }

  return condition.id;
}

/***/ }),

/***/ "./src/arrows/utilities/styling.js":
/*!*****************************************!*\
  !*** ./src/arrows/utilities/styling.js ***!
  \*****************************************/
/*! exports provided: styleLine, getLayerStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleLine", function() { return styleLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLayerStyles", function() { return getLayerStyles; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var pluginKey = "flowArrows"; // let document = sketch.fromNative(context.document);
// let docData = context.document.documentData();

function styleLine(line, style, docData) {
  // Refactored
  var localStyle;

  if (style != null) {
    // For updates
    if (getLayerStyles(style, docData) != null && style != "Default Style") {
      // If style is specified
      localStyle = style;
      var ownStyle = getLayerStyles(style, docData);
      line.sharedStyle = ownStyle[0];
    } else {
      // if there is no specific style
      localStyle = "Default Style";
      var border = line.style().addStylePartOfType(1);
      border.color = MSColor.colorWithRGBADictionary({
        r: 0.89,
        g: 0.89,
        b: 0.89,
        a: 1
      });
      border.thickness = 2;
      line.style().endMarkerType = 2;
    }
  } else {
    // For creating new
    if (context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey) != null && context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey) != "Default Style") {
      // we have settins almost all the time and it's not default
      localStyle = getLayerStyles(context.command.valueForKey_onLayer_forPluginIdentifier("arrowStyle", docData, pluginKey), docData);
      line.sharedStyle = localStyle[0];
      localStyle = localStyle[0].name();
    } else {
      localStyle = "Default Style";

      var _border = line.style().addStylePartOfType(1);

      _border.color = MSColor.colorWithRGBADictionary({
        r: 0.89,
        g: 0.89,
        b: 0.89,
        a: 1
      });
      _border.thickness = 2;
      line.style().endMarkerType = 2;
    }
  }

  return localStyle;
}
function getLayerStyles(name, docData) {
  // Refactored
  var allStyles = docData.allLayerStyles();
  var keyword = "$arrow";
  var styles = [];

  for (var i = 0; i < allStyles.count(); i++) {
    if (name == null) {
      if (allStyles[i].name().includes(keyword)) {
        styles.push(allStyles[i]);
      }
    } else {
      if (allStyles[i].name() == name) {
        styles.push(allStyles[i]);
      }
    }
  }

  return styles;
}

/***/ }),

/***/ "./src/lib/arrangeArtboards.js":
/*!*************************************!*\
  !*** ./src/lib/arrangeArtboards.js ***!
  \*************************************/
/*! exports provided: DrawArtboards, DrawArtboardsRows, getDescendants, getBrothers, sortArtboardsFunction, getFullArtboardList, zoomToView, ShowConfirmation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawArtboards", function() { return DrawArtboards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawArtboardsRows", function() { return DrawArtboardsRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDescendants", function() { return getDescendants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBrothers", function() { return getBrothers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortArtboardsFunction", function() { return sortArtboardsFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFullArtboardList", function() { return getFullArtboardList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoomToView", function() { return zoomToView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowConfirmation", function() { return ShowConfirmation; });
var alreadyProcessed = [];
var artboardList = [];
function DrawArtboards(artboards, x, y, horizontalGutter, verticalGutter) {
  var incrementY = 0;

  for (var i = 0; i < artboards.length; i++) {
    if (alreadyProcessed.indexOf(artboards[i]) < 0) {
      //console.log(who+": Allocating "+artboards[i].name()+" to ("+x+","+(y+incrementY)+")"); 
      var yAcc = 0;
      var descendants = [];
      var brothers = [];
      var hadChildren = false;
      var hadBrothers = false;
      artboards[i].frame().x = x;
      artboards[i].frame().y = y + incrementY;
      var nodes = artboards[i].name().split("/").map(function (name) {
        return name.trim();
      });
      var prefix = "";
      var fullPrefix = "";

      for (var j = 0; j < nodes.length; j++) {
        if (j < nodes.length - 1) prefix += nodes[j] + "/";
        fullPrefix += nodes[j] + "/";
      }

      descendants = getDescendants(fullPrefix);
      brothers = getBrothers(prefix);
      alreadyProcessed.push(artboards[i]);
      var yDescendants = DrawArtboards(descendants, x + artboards[i].frame().width() + horizontalGutter, y + incrementY);
      if (yDescendants > artboards[i].frame().height()) incrementY += yDescendants;else incrementY += artboards[i].frame().height();
      if (i < artboards.length - 1) incrementY += verticalGutter;
      var yBrothers = DrawArtboards(brothers, x, y + incrementY);
      incrementY += yBrothers;
      if (i < artboards.length - 1 && brothers.length > 0) incrementY += verticalGutter;
    }
  }

  return incrementY;
}
function DrawArtboardsRows(artboards, x, y, horizontalGutter, verticalGutter) {
  var incrementX = 0;

  for (var i = 0; i < artboards.length; i++) {
    if (alreadyProcessed.indexOf(artboards[i]) < 0) {
      //console.log(who+": Allocating "+artboards[i].name()+" to ("+x+","+(y+incrementY)+")"); 
      var xAcc = 0;
      var descendants = [];
      var brothers = [];
      var hadChildren = false;
      var hadBrothers = false;
      artboards[i].frame().x = x + incrementX;
      artboards[i].frame().y = y;
      var nodes = artboards[i].name().split("/").map(function (name) {
        return name.trim();
      });
      var prefix = "";
      var fullPrefix = "";

      for (var j = 0; j < nodes.length; j++) {
        if (j < nodes.length - 1) prefix += nodes[j] + "/";
        fullPrefix += nodes[j] + "/";
      }

      descendants = getDescendants(fullPrefix);
      brothers = getBrothers(prefix);
      alreadyProcessed.push(artboards[i]);
      var xDescendants = DrawArtboardsRows(descendants, x + incrementX, y + artboards[i].frame().height() + verticalGutter);
      if (xDescendants > artboards[i].frame().width()) incrementX += xDescendants;else incrementX += artboards[i].frame().width();
      if (i < artboards.length - 1) incrementX += horizontalGutter;
      var xBrothers = DrawArtboardsRows(brothers, x + incrementX, y);
      incrementX += xBrothers;
      if (i < artboards.length - 1 && brothers.length > 0) incrementX += horizontalGutter;
    }
  }

  return incrementX;
}
function getDescendants(nodeName) {
  var descendants = [];
  artboardList.forEach(function (artboard) {
    var compareName = "";
    var nodes = artboard.name().split("/").map(function (name) {
      return name.trim();
    });

    for (var i = 0; i < nodes.length; i++) {
      compareName += nodes[i] + "/";
    }

    var startsbythis = compareName.startsWith(nodeName);

    if (startsbythis) {
      descendants.push(artboard);
    }
  });
  descendants.sort(sortArtboardsFunction); //console.log("Descendants of: "+nodeName);
  //descendants.forEach(function(artboard){ console.log("  "+artboard.name()); });

  return descendants;
}
function getBrothers(nodeName) {
  var brothers = [];
  var slashCount = nodeName.split("/").length;
  artboardList.forEach(function (artboard) {
    var startsbythis = artboard.name().startsWith(nodeName);

    if (startsbythis && artboard.name().split("/").length == slashCount) {
      brothers.push(artboard);
    }
  });
  brothers.sort(sortArtboardsFunction); //console.log("Brothers of: "+nodeName);
  //brothers.forEach(function(artboard){ console.log("  "+artboard.name()); });

  return brothers;
}
function sortArtboardsFunction(a, b) {
  if (a.name() === b.name()) {
    return 0;
  } else {
    return a.name() < b.name() ? -1 : 1;
  }
}
function getFullArtboardList(context) {
  var page = context.document.currentPage();
  var doc = context.document;
  var artboardList = page.artboards();
  artboardList.sort(sortArtboardsFunction);
  return artboardList;
}
function zoomToView(context) {
  var view;

  if (MSApplicationMetadata.metadata().appVersion < 48) {
    view = context.document.currentView();
  } else {
    view = context.document.contentDrawView();
  }

  view.centerLayersInCanvas();
}
function ShowConfirmation(context, message) {
  context.document.showMessage(message);
}

/***/ }),

/***/ "./src/lib/config.js":
/*!***************************!*\
  !*** ./src/lib/config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.identifier = 'identifier_whale_kit'; //change color state 颜色组

module.exports.stateColor = {
  active: "#767272",
  noamal: "#D8D8D8",
  disabled: "#857D7D"
}; //change color state 颜色组

module.exports.StateColorAmt = 20; //change color state 常量

module.exports.STATE_ACTIVE = "active";
module.exports.STATE_DISABLED = "disabled"; //convert to grayscaleCommand type 常量

module.exports.AllType = "all";
module.exports.PartType = "part";
module.exports.SymbolsType = "symbols";
module.exports.PageType = "page"; //generate tags 常量

module.exports.TAG_INDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; //generate Element 常量

module.exports.ElementNameList = ["项目描述", "交互约定", "设计要素", "致谢", "版本记录", "修订记录"];

/***/ }),

/***/ "./src/makeInteractLogic.js":
/*!**********************************!*\
  !*** ./src/makeInteractLogic.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return onRun; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sketch/settings */ "sketch/settings");
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sketch_settings__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/config */ "./src/lib/config.js");
/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lib_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _arrows_createArrow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./arrows/createArrow */ "./src/arrows/createArrow.js");
/* harmony import */ var _lib_arrangeArtboards__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/arrangeArtboards */ "./src/lib/arrangeArtboards.js");








var Group = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Group;
var Document = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Document;
var Rectangle = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Rectangle;
var ShapePath = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.ShapePath;
var Text = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Text;
var Artboard = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Artboard;
var Page = sketch_dom__WEBPACK_IMPORTED_MODULE_1___default.a.Page;
var document = Document.getSelectedDocument();
var selectedPage = document.selectedPage;
var selectedArtBoards = selectedPage.layers;
var allPages = document.pages;
var horizontalGutter = 100;
var verticalGutter = 30;
var docData = context.document.documentData();
var settingFlowKey = "settingFlowKey";
var settingFlowData = [];
var flowArtboard = {};
var flowPage = {};
var flowBoards = [];
var newFlowBlock = [];
var dist = {};
var flowName = "交互流程";
var hasFlowPage = false;
var interactDescriptionWidth = 0;
var initPositnX = 100;
var initPositnY = 100;
var flowArtBoardTilteHeight = 140;
var flowArtBoardTilteMarginBottom = 80;
var titleFontSize = 40;
var flowNameFontSize = 16;
var flowNameDist = 12;
var flowNameColor = "#333";
var titleBold = 600;
var titleColor = "#fff";

var createPageAndArtboard = function createPageAndArtboard() {
  //创建交互流程页面与Artboard
  flowPage = doPage();
  var flowArtboardFrame = getFlowArtboardFrame();
  var newArtBordFrameX = doNewArtBordFrameX(flowPage);
  var flowFrame = {
    x: newArtBordFrameX,
    y: 0,
    width: flowArtboardFrame.width + interactDescriptionWidth + initPositnX * 2,
    height: flowArtboardFrame.height + flowArtBoardTilteHeight + flowArtBoardTilteMarginBottom * 2
  };
  flowArtboard = new Artboard({
    name: flowName,
    parent: flowPage,
    frame: flowFrame
  }); //建立title

  createPageAndArtboardTitle(); //建立交互流程

  makeInteractLogic();
};

var currentFlowArtboardSelected = function currentFlowArtboardSelected() {
  //
  document.selectedPage = flowPage;

  for (var i = 0; i < flowPage.layers.length; i++) {
    flowPage.layers[i].selected = false;
  }

  ;
  flowArtboard.selected = true;
};

var clearFlowPageSelected = function clearFlowPageSelected() {
  //
  // document.selectedPage = currentSelectedPage;
  for (var i = 0; i < flowPage.layers.length; i++) {
    flowPage.layers[i].selected = false;
  }

  ;
};

var doNewArtBordFrameX = function doNewArtBordFrameX(flowPage) {
  //设置flowArtBord的frame.x 
  var artBordMaxX = 0;
  var artBordMaxXWidth = 0;
  var flowPageLayers = flowPage.layers;

  if (flowPageLayers.length > 0) {
    artBordMaxX = flowPageLayers[0].frame.x;
    artBordMaxXWidth = flowPageLayers[0].frame.x + flowPageLayers[0].frame.width + 100;

    for (var i = 0; i < flowPageLayers.length; i++) {
      if (flowPageLayers[i].frame.x > artBordMaxX) {
        artBordMaxX = flowPageLayers[i].frame.x;
        artBordMaxXWidth = flowPageLayers[i].frame.x + flowPageLayers[i].frame.width + 100;
      }
    }

    ;
  }

  return artBordMaxXWidth;
};

var doPage = function doPage() {
  //判断是否有“交互流程”的页面
  var flowPageItem = "";

  for (var i = 0; i < allPages.length; i++) {
    if (allPages[i].name === "交互流程") {
      flowPageItem = allPages[i];
      hasFlowPage = true;
      break;
    }
  }

  ;

  if (!flowPageItem) {
    flowPageItem = new Page({
      name: '交互流程',
      parent: document
    });
  }

  flowPageItem.selected = false;
  return flowPageItem;
};

var createPageAndArtboardTitle = function createPageAndArtboardTitle() {
  //创建交互流程artboard的title
  //Title Group
  var titleGroup = new Group({
    name: "Title",
    parent: flowArtboard
  }); //Title 背景框bg
  // var rectTitleFrame = new Rectangle(0, 0, flowArtboard.frame.width, flowArtBoardTilteHeight);

  var rectTitleBg = new ShapePath({
    name: "title",
    frame: {
      x: 0,
      y: 0,
      width: flowArtboard.frame.width,
      height: flowArtBoardTilteHeight
    },
    shapeType: ShapePath.ShapeType.Rectangle,
    parent: titleGroup,
    style: {
      fills: [{
        color: '#000'
      }]
    }
  }); //Title text

  var titleText = new Text({
    text: flowName,
    frame: {
      x: initPositnX,
      y: 42,
      width: 300,
      height: titleFontSize
    },
    parent: titleGroup,
    name: "title/name"
  });
  titleText.style.fontSize = titleFontSize;
  titleText.style.fontWeight = titleBold;
  titleText.style.textColor = titleColor;
};

var getFlowArtboardFrame = function getFlowArtboardFrame(data) {
  //计算flowArtboard的frame
  var maxY = 0;
  var maxYIndex = 0;
  var widthFrame = 0;
  var heightFrame = 0;
  var widthFrameBoard = 0;
  var heightFrameBoard = 0;
  var flowArtboardFrame = {};

  for (var i = 0; i < flowBoards.length; i++) {
    var flowBoardInst = findArtBoardById(flowBoards[i].list[0].abId);
    widthFrameBoard += flowBoardInst.frame.width;

    if (flowBoards[i].length > maxY) {
      maxY = flowBoards[i].length;
      maxYIndex = i;
    }
  }

  ;
  widthFrame = widthFrameBoard + (flowBoards.length - 1) * dist.step;
  var maxYList = flowBoards[maxYIndex].list;

  for (var j = 0; j < maxYList.length; j++) {
    var flowBoardInst = findArtBoardById(maxYList[j].abId);
    heightFrameBoard += flowBoardInst.frame.height;
  }

  ;
  heightFrame = heightFrameBoard + (maxYList.length - 1) * dist.branch;
  flowArtboardFrame = {
    width: widthFrame,
    height: heightFrame
  };
  return flowArtboardFrame;
};

var makeInteractLogic = function makeInteractLogic() {
  //建立交互流程
  var abId = "";
  var id = "";
  var positonIndex = {};

  for (var i = 0; i < flowBoards.length; i++) {
    if (flowBoards[i].list.length > 0) {
      var child = flowBoards[i].list;

      for (var j = 0; j < child.length; j++) {
        abId = child[j].abId;
        id = child[j].id;
        positonIndex = {
          x: i,
          y: j
        };
        doPageFlow(id, abId, positonIndex, child[j].fillType);
      }

      ;
    }
  }

  ;
};

var doPageFlow = function doPageFlow(id, abId, positon, fillType) {
  //移动页面到flowArtboard
  var currentArtboard = findArtBoardById(abId); //创建移动新组，包含当前Artboard和当前Artboard的框

  var flowGroup = new Group({
    name: currentArtboard.name,
    frame: getCurrentArtboardFrame(positon, currentArtboard)
  });

  if (!fillType) {
    //拷贝当前Artboard
    var copyBoard = currentArtboard.duplicate();
    var copyBoardFrame = {
      x: 0,
      y: 0,
      width: copyBoard.frame.width,
      height: copyBoard.frame.height
    };
    copyBoard.frame = copyBoardFrame;
    copyBoard.parent = flowGroup; //Arrow 数据组

    var newBlock = {
      blockId: flowGroup.id,
      abId: abId,
      id: id
    };
    newFlowBlock.push(newBlock); // const artBoardGroup = new Group({
    //     name: currentArtboard.name,
    //     frame: copyBoard.frame,
    //     layers: copyBoard.layers
    // });
    // artBoardGroup.parent = flowGroup;
    // copyBoard.delete();
    //创建当前Artboard的框（拷贝图层后，是没有框）

    var rectBgFrame = new Rectangle(0, 0, copyBoard.frame.width, copyBoard.frame.height);
    var rectBg = new ShapePath({
      name: "layput",
      frame: rectBgFrame,
      shapeType: ShapePath.ShapeType.Rectangle,
      parent: flowGroup,
      style: {
        borders: [{
          color: '#C9C9C9'
        }]
      }
    }); //Title text

    var flowNameText = new Text({
      text: copyBoard.name,
      frame: {
        x: rectBgFrame.x,
        y: rectBgFrame.y - flowNameFontSize - flowNameDist,
        width: 88,
        height: flowNameFontSize
      },
      parent: flowGroup,
      name: copyBoard.name
    });
    flowNameText.style.fontSize = flowNameFontSize;
    flowNameText.style.lineHeight = flowNameFontSize;
    flowNameText.style.textColor = flowNameColor; //将flowGroup移动到flowArtboard中

    flowGroup.parent = flowArtboard;
  }
};

var findArtBoardById = function findArtBoardById(abId) {
  //通过abId查找artBoard
  for (var i = 0; i < selectedArtBoards.length; i++) {
    if (selectedArtBoards[i].id === abId) {
      return selectedArtBoards[i];
    }
  }

  ;
};

var createArrows = function createArrows(arrowIds) {
  //创建arrows
  if (arrowIds.blockIds.length > 0 && arrowIds.firstBlock) {
    var firstObjectID = arrowIds.firstBlock.blockId;

    for (var i = 0; i < arrowIds.blockIds.length; i++) {
      if (arrowIds.blockIds[i].blockId != firstObjectID) {
        var secondObjectID = String(arrowIds.blockIds[i].blockId);
        currentFlowArtboardSelected();
        var connection = Object(_arrows_createArrow__WEBPACK_IMPORTED_MODULE_6__["createArrow"])(firstObjectID, secondObjectID, null, null, "Right", null, false, document, docData);
      }
    }
  } else {
    // When user didn't select anything
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select more than two layers. Artboards are coming soon 🥳");
  }

  flowArtboard.selected = false;
};

var doFlowArrows = function doFlowArrows() {
  //创建flow arrows
  var blockIds = [];

  for (var i = 0; i < flowBoards.length; i++) {
    if (i < flowBoards.length - 1) {
      var firstFlowArr = getFlowArr(i, 0, flowBoards[i].list.length);

      for (var j = 0; j < firstFlowArr.length; j++) {
        var firstBlock = firstFlowArr[j];

        if (j === firstFlowArr.length - 1) {
          blockIds = getFlowArr(i + 1, firstFlowArr[j].index, flowBoards[i + 1].list.length);
        } else {
          blockIds = getFlowArr(i + 1, firstFlowArr[j].index, firstFlowArr[j + 1].index);
        }

        var arrowIds = {
          firstBlock: firstBlock,
          blockIds: blockIds
        };
        console.log("firstBlockId-" + arrowIds.firstBlock.blockId);

        for (var k = 0; k < arrowIds.blockIds.length; k++) {
          console.log("arrowIds-" + k + "--" + arrowIds.blockIds[k].blockId);
        }

        createArrows(arrowIds);
      }
    }
  }
};

var getFlowArr = function getFlowArr(index, startIndex, endIndex) {
  //创建flow arrows
  var firstArr = [];

  for (var i = startIndex; i < endIndex; i++) {
    if (flowBoards[index] && flowBoards[index].list[i]) {
      if (!flowBoards[index].list[i].fillType) {
        var item = {
          index: i,
          blockId: findFlowBlockId(flowBoards[index].list[i].id)
        };
        firstArr.push(item);
      }
    }
  }

  return firstArr;
};

var findFlowBlockId = function findFlowBlockId(id) {
  //通过abId查找artBoard
  for (var i = 0; i < newFlowBlock.length; i++) {
    if (newFlowBlock[i].id === id) {
      return newFlowBlock[i].blockId;
    }
  }

  ;
};

var getCurrentArtboardFrame = function getCurrentArtboardFrame(positon, currentArtboard) {
  //获取当前Artboard在flowArtboard的位置，frame参数
  var frame = {
    x: initPositnX,
    y: initPositnY,
    width: currentArtboard.frame.width,
    height: currentArtboard.frame.height
  };
  frame.x = getCurrentArtboardFrameX(positon, currentArtboard) + initPositnX;
  frame.y = getCurrentArtboardFrameY(positon, currentArtboard) + flowArtBoardTilteHeight + flowArtBoardTilteMarginBottom;
  return frame;
};

var getCurrentArtboardFrameX = function getCurrentArtboardFrameX(positon) {
  //获取当前Artboard在flowArtboard的位置，frame x参数
  var ArtboardDist = 0;
  var stepDist = 0;
  var distX = 0;

  for (var i = 0; i < positon.x; i++) {
    var artboardItemId = flowBoards[i].list[0].abId;
    var artboardItem = findArtBoardById(artboardItemId);
    ArtboardDist += artboardItem.frame.width; //每一列的第一个元素
  }

  ;
  stepDist = dist.step * positon.x;
  distX = ArtboardDist + stepDist;
  return distX;
};

var getCurrentArtboardFrameY = function getCurrentArtboardFrameY(positon) {
  //获取当前Artboard在flowArtboard的位置，frame y参数
  var ArtboardDist = 0;
  var branchDist = 0;
  var distY = 0;
  var positonX = positon.x;
  var positonY = positon.y;
  var column = flowBoards[positonX];
  var columnList = column.list;
  var positonX = positon.x;
  var positonY = positon.y;

  for (var i = 0; i < positonY; i++) {
    var column = flowBoards[positonX];
    var columnList = column.list;
    var artboardItemId = columnList[i].abId;
    var artboardItem = findArtBoardById(artboardItemId);
    ArtboardDist += artboardItem.frame.height;
  }

  ;
  branchDist = dist.branch * positon.y;
  distY = ArtboardDist + branchDist;
  return distY;
};

var arrangeArtboards = function arrangeArtboards(context) {
  //重排Artboards
  var artboardList = Object(_lib_arrangeArtboards__WEBPACK_IMPORTED_MODULE_7__["getFullArtboardList"])(context);
  Object(_lib_arrangeArtboards__WEBPACK_IMPORTED_MODULE_7__["DrawArtboardsRows"])(artboardList, 0, 0, horizontalGutter, verticalGutter);
};

function onRun(context) {
  if (selectedPage && selectedArtBoards.length > 0) {
    //打开Webview
    openPannel(context);
  } else {
    //选择一个ArtBoard
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please select an Page!");
  }
}

function openPannel(context) {
  //打开Webview
  var existingWebview = Object(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_5__["getWebview"])(_lib_config__WEBPACK_IMPORTED_MODULE_4__["identifier"]);

  if (existingWebview) {
    if (existingWebview.isVisible()) {
      // close the devtool if it's open
      existingWebview.close();
    }
  }

  var win = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_3___default.a({
    identifier: _lib_config__WEBPACK_IMPORTED_MODULE_4__["identifier"],
    width: 1350,
    height: 800,
    title: "Interact Logic UI",
    resizable: true,
    minimizable: true,
    maximizable: true,
    closable: true,
    alwaysOnTop: true
  });
  win.on('closed', function () {
    win = null;
  });
  var Panel = "http://localhost:8000/interactLogic.html#".concat(Math.random());
  win.loadURL(Panel); // win.loadURL('http://www.jingwhale.com/whalekit/interactLogic.html?'+Math.random());

  var closeWin = function closeWin() {
    win.destroy();
    win.close();
  };

  var contents = win.webContents; //监听webview的事件：webview->plugin

  contents.on('fromwebview', function (data) {
    console.log("data.checkSave---" + data);

    if (data.type === "updateFlowData") {
      settingFlowData = data.settingFlowData || [];
      sketch_settings__WEBPACK_IMPORTED_MODULE_2___default.a.setDocumentSettingForKey(document, settingFlowKey, settingFlowData);
    } else if (data.type === "doFlow") {
      arrangeArtboards(context); //重排Artboards

      dist = data.dist;
      dist.branch = dist.step;
      flowBoards = data.items;
      flowName = data.flowName || "交互流程";
      createPageAndArtboard();
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Successfully flowed pages！");
      settingFlowData = data.settingFlowData || [];

      if (!!data.checkSave) {
        var settingFlowDataItem = {
          id: 'flow' + new Date().getTime(),
          name: flowName,
          items: data.items
        };
        settingFlowData.push(settingFlowDataItem);
        sketch_settings__WEBPACK_IMPORTED_MODULE_2___default.a.setDocumentSettingForKey(document, settingFlowKey, settingFlowData);
      }

      if (data.hasArrow) {
        doFlowArrows();
      } else {
        currentFlowArtboardSelected();
      }

      clearFlowPageSelected();
      closeWin();
    }
  });
  contents.on('closed', function (s) {
    closeWin();
  }); // 向Webview传送selectedArtBoards数据

  setSelectedArtBoards(contents);
} //向Webview传送selectedArtBoards数据


var setSelectedArtBoards = function setSelectedArtBoards(contents) {
  var treeBook = doSerializData(selectedArtBoards);
  settingFlowData = sketch_settings__WEBPACK_IMPORTED_MODULE_2___default.a.documentSettingForKey(document, settingFlowKey) || [];
  var setData = [];
  setData.push(treeBook);
  setData.push(settingFlowData);
  var selectedArtBoardsData = JSON.stringify(setData);
  contents.executeJavaScript("someGlobalFunctionDefinedInTheWebview(".concat(selectedArtBoardsData, ")")).then(function (res) {
    // do something with the result
    console.log("send data success,from plugin to webview!");
  });
}; //格式化selectedArtBoards数据


var doSerializData = function doSerializData(selectedArtBoards) {
  var serializDatas = [];

  for (var i = 0; i < selectedArtBoards.length; i++) {
    serializDatas.push({
      id: selectedArtBoards[i].id,
      abId: selectedArtBoards[i].id,
      content: selectedArtBoards[i].name,
      fillType: selectedArtBoards[i].fillType || false
    });
  }

  ;
  return serializDatas;
};

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=makeInteractLogic.js.map