//
// Promise-Code 2
//
function Promise(executor) {
  this.promiseStatus = 'pending';
  this.promiseValue = undefined;
  const resolve = (resolvedValue) => {
    this.promiseStatus = 'resolved';
    this.promiseValue = resolvedValue;
  }
  const reject = (rejectedValue) => {
    this.promiseStatus = 'rejected';
    this.promiseValue = rejectedValue;
  }
  executor(resolve, reject);
}
Promise.prototype.then = function(onfulfilled = Function.prototype, onrejected = Function.prototype) {
  if (this.promiseStatus === 'pending') {
    return;
  }
  if (this.promiseStatus === 'resolved') {
    onfulfilled(this.promiseValue);
  } else {
    onrejected(this.promiseValue);
  }
}
// test
var p = new Promise(resolve => resolve('A'));
p.then(val => console.log(val));