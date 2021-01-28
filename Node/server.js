const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
	if(req.url === '/'){
		const html = fs.readFileSync('./index.html', 'utf8')
		res.writeHeader(200, {
			'Content-Type': 'text/html; charset=UTF-8'
		})
		res.end(html)
	}else if(req.url === '/about'){
		const html = fs.readFileSync('./about.html', 'utf8')
		res.writeHeader(200, {
			'Content-Type': 'text/html; charset=UTF-8'
		})
		res.end(html)
	}
}).listen(8888)