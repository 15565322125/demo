const https = require('https')

https.get('https://www.baidu.com', res => {
	res.on('data', chunk => {
		console.log(chunk)
	})
	res.on('end', () => {
		console.log('end')
	})
}).on('error', e => {
	console.log(error)
})