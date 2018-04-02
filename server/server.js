var express = require('express')
var bodyParser = require('body-parser')
var userRouter = require('./user')

var app = express()
app.use(bodyParser.json())
app.use('/user',userRouter)


app.get('/',(req,res)=>{
	res.send('hello world')
})

var server = app.listen(3030,()=>{
	console.log('Node app start at port 3030')
})