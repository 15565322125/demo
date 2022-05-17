const http = require('http')
const fs = require('fs')

// fs.readdir('./', (err, data) => {
// 	console.log(err, data)
// })

// fs.stat('./about.html', (err, stats) => {
// 	console.log(err, stats, stats.isFile())
// })

function getDirTree(path){
	let dirs = fs.readdirSync(path)
	return dirs.map(item => {
		let stats = fs.statSync(path + item), child = []
		if (!stats.isFile()) {
			child = getDirTree(path + item + '/')
		}
		return {
			label: item,
			children: child
		}
	})
}
// console.log(getDirTree('../'))



http.createServer((req, res) => {
	// res.setHeader("Access-Control-Allow-Origin","*");
	res.writeHeader(200, {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json; charset=utf-8'
	})
	res.end(JSON.stringify(getDirTree('../')));
}).listen(8088)