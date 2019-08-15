//
// Promise-Code 7
//
// 1. Promise.prototype.then返回值是promise实例
// 2. 方法支持链式调用
// 
// 问题：
// 1. 死循环问题
// 2. then传递null参数判断不正确
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
    if (resolvedValue instanceof Promise) {
      return resolvedValue.then(resolve, reject);
    }
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
  try {
    executor(resolve, reject);
  } catch(e) {
    reject(e);
  }
}
Promise.prototype.then = function(onfulfilled = data => data, onrejected = error => {throw error}) {
  if (this.promiseStatus === 'pending') {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
        this.resolveFuncs.push(() => resolve(onfulfilled(this.promiseValue)));
        this.rejectFuncs.push(() => resolve(onrejected(this.rejectedValue)));
      // }); 
    });
  }
  if (this.promiseStatus === 'resolved') {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(onfulfilled(this.promiseValue)));
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(onrejected(this.promiseValue)));
    });
  }
}

//
// test 1
// 
var p = new Promise(resolve => resolve('p-data'));
p
.then(
  // value => {
  //   console.log(value);
  //   return 'p-then';
  // }
)
.then(value => {
  console.log(value);
})

//
// test 2
//
var p = new Promise(resolve => resolve('p-data'));
p
.then(value => {
  console.log(value);
  return new Promise(resolve => setTimeout(() => resolve('p-then-promise'), 1000));
})
.then(value => {
  console.log(value);
});


//
// test 3
//
var p = new Promise(resolve => setTimeout(() => resolve('p-data'), 1000));
p
.then(value => {
  console.log(value);
  return new Promise(resolve => setTimeout(() => resolve('p-then-promise'), 1000));
})
.then(value => {
  console.log(value);
});