const http = require('http')
// console.log(http)

// 创建web实例
const server = http.createServer()

// 为服务器绑定request时间，监听客户端的请求
server.on('request', (req, res) => {
    setTimeout(() => {
        res.end('Some visit our web server')
    }, 5000);
})
// 启动服务器
server.listen(8080, () => {
    console.log('server running at http://127.0.0.1:8080')
})