
// 关于其他函数的实现
// Promise.prototype.catch
// Promise.resolve，Promise.reject
// Promise.all
// Promise.race

//
// Promise.prototype.catch
//
Promise.prototype.catch = function(catchFunc) {
  return this.then(null, catchFunc);
}

//
// Promise.resolve
//
Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
}

//
// Promise.reject
//
Promise.reject = function(value) {
  return new Promise((resolve, reject) => {
    reject(value);
  });
}

//
// Promise.all
//
Promise.all = function(taskList) {
  if (!Array.isArray(taskList)) {
    throw new TypeError('The arguments should be an array!')
  }
  return new Promise((resolve, reject) => {
    try {
      let results = [];
      for (let i = 0; i < taskList.length; i++) {
        taskList[i].then(data => {
          results.push(data);
          if (taskList.length === results.length) {
            resolve(results);
          }
        }, reject);
      }
    } catch(e) {
      reject(e);
    }
  });
}

//
// Promise.race
//
Promise.race = function(taskList) {
  if (!Array.isArray(taskList)) {
    throw new TypeError('The arguments should be an array!')
  }
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < taskList.length; i++) {
        taskList[i].then(resolve, reject);
      }
    } catch(e) {
      reject(e);
    }
  });
}

// MutationObserver
var observer = new MutationObserver(function(recoder) {
  debugger;
});
var node = document.createElement('div');
observer.observe(node, {attributes: true});
node.setAttribute('tag', 'A');

//
// https://www.promisejs.org/
// .then is to .done as .map is to .forEach
// https://github.com/then/promise
// https://github.com/kriskowal/asap
// https://github.com/kriskowal/asap/blob/master/browser-raw.js
//
// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;
function makeRequestCallFromMutationObserver(callback) {
  var toggle = 1;
  var observer = new BrowserMutationObserver(callback);
  var node = document.createTextNode("");
  observer.observe(node, {characterData: true});
  return function requestCall() {
      toggle = -toggle;
      node.data = toggle;
  };
}

var callback = () => {console.log('callback');}
var func = makeRequestCallFromMutationObserver(callback);
func();