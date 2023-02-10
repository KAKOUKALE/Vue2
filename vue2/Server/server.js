const express = require('express')

const app = express()
app.use(express.static(__dirname + '/static'))

app.get('/person', (req, res) => {
    res.send({
        name: 'Leah',
        age: 23
    })
})

app.listen(5005, (err) => {//端口监听
    if(!err) console.log('服务器启动成功！')
})