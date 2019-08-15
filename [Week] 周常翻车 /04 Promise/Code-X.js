
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