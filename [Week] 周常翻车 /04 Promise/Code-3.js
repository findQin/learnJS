//
// Promise-Code 3
//
function Promise(executor) {
  this.promiseStatus = 'pending';
  this.promiseValue = undefined;
  this.isPending = () => this.promiseStatus === 'pending';
  const resolve = (resolvedValue) => {
    if (this.isPending()) {
      this.promiseStatus = 'resolved';
      this.promiseValue = resolvedValue;
    }
  }
  const reject = (rejectedValue) => {
    if (this.isPending()) {
      this.promiseStatus = 'rejected';
      this.promiseValue = rejectedValue;
    }
  }
  executor(resolve, reject);
}
Promise.prototype.then = function(onfulfilled = data => data, onrejected = error => {throw error}) {
  if (this.promiseStatus === 'pending') {
    return;
  }
  if (this.promiseStatus === 'resolved') {
    onfulfilled(this.promiseValue);
  } else {
    onrejected(this.promiseValue);
  }
}