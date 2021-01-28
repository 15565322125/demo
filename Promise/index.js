//https://segmentfault.com/a/1190000016550260
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

myPromise.prototype.then = function(onFulfilled, onRejected){
	let promise2 = null
	promise2 = new myPromise((resolve, reject) => {
		if(this.state === PENDING){
			this.onFulfilledCallbacks.push(() => {
				setTimeout(() => {
					try{
						let x = onFulfilled(this.value)
						this.resolvePromise(promise2, x, resolve, reject)
					}catch(reason){
						reject(reason)
					}
				}, 0)
			})
			this.onRejectedCallbacks.push(() => {
				setTimeout(() => {
					try{
						let x = onRejected(this.reason)
						this.resolvePromise(promise2, x, resolve, reject)
					}catch(reason){
						reject(reason)
					}
				}, 0)
			})
		}

		if(this.state === FULFILLED){
			setTimeout(() => {
				try{
					let x = onFulfilled(this.value)
					this.resolvePromise(promise2, x, resolve, reject)
				}catch(reason){
					reject(reason)
				}
			}, 0)
		}

		if(this.state === REJECTED){
			setTimeout(() => {
				try{
					let x = onRejected(this.reason)
					this.resolvePromise(promise2, x, resolve, reject)
				}catch(reason){
					reject(reason)
				}
			}, 0)
		}
	})

	return promise2
}
myPromise.prototype.resolvePromise = function(promise2, x, resolve, reject){
	let self = this
	let called = false
	if(promise2 === x){
		return reject(new TypeError('循环引用'))
	}
	if(x !== null && (Object.prototype.toString.call(x) === '[object Object]' || Object.prototype.toString.call(x) === '[object Function]')){
		try{
			let then = x.then
			if(typeof(then) === 'function'){
				then.call(x, y => {
					if(called){
						return
					}
					called = true
					self.resolvePromise(promise2, y, resolve, reject)
				}, reason => {
					if(called){
						return
					}
					called = true
					reject(reason)
				})
			}else{
				if(called){
					return
				}
				called = true
				resolve(x)
			}
		}catch(reason){
			if(called){
				return
			}
			called = true
			reject(reason)
		}
	}else{
		resolve(x)
	}
}
function myPromise(executor){
	let self = this
	self.state = PENDING
	self.value = null
	self.reason = null
	self.onFulfilledCallbacks = []
	self.onRejectedCallbacks = []

	function resolve(value){
		if(self.state === PENDING){
			self.state = FULFILLED
			self.value = value
			self.onFulfilledCallbacks.forEach(function(fulfilledCallback){
				fulfilledCallback()
			})

		}
	}

	function reject(reason){
		if(self.state === PENDING){
			self.state = REJECTED
			self.reason = reason
			self.onRejectedCallbacks.forEach(function(rejectedCallback){
				rejectedCallback()
			})
		}
	}

	try{
		executor(resolve, reject)
	}catch(reason){
		reject(reason)
	}
}