//
// Promise-Code 4
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
    onfulfilled(this.promiseValue);
  } else {
    onrejected(this.promiseValue);
  }
}

// test
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('data')
  }, 2000)
})

promise.then(data => {
  console.log(data)
})