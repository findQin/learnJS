//
// Promise-Code 5-B
//
// Reason
// var p = new Promise(resolve => resolve('A'));p;debugger;
// 此时resolved值已经设置在Promise容器中，而在reolsve中使用setTimeout则无法实现
//
function Promise(executor) {
  this.promiseStatus = 'pending';
  this.promiseValue = undefined;
  this.isPending = () => this.promiseStatus === 'pending';
  // new code-4 
  this.resolveFuncs = [];
  this.rejectFuncs = [];
  this.execCachedFuncs = arr => {
    arr.forEach(fun => fun(this.promiseValue));
    arr.splice(0, arr.length);
  }
  const resolve = (resolvedValue) => {
    if (this.isPending()) {
      this.promiseStatus = 'resolved';
      this.promiseValue = resolvedValue;
      this.execCachedFuncs(this.resolveFuncs);
    }
  }
  const reject = (rejectedValue) => {
    if (this.isPending()) {
      this.promiseStatus = 'rejected';
      this.promiseValue = rejectedValue;
      this.execCachedFuncs(this.rejectFuncs);
    }
  }
  executor(resolve, reject);
}
Promise.prototype.then = function(onfulfilled = data => data, onrejected = error => {throw error}) {
  if (this.promiseStatus === 'pending') {
    this.resolveFuncs.push(onfulfilled);
    this.rejectFuncs.push(onrejected);
    return;
  }
  if (this.promiseStatus === 'resolved') {
    setTimeout(() => onfulfilled(this.promiseValue));
  } else {
    setTimeout(() => onrejected(this.promiseValue));
  }
}

// test
let promise = new Promise((resolve, reject) => {
  resolve('data')
})

promise.then(data => {
  console.log(data)
})

console.log('end');