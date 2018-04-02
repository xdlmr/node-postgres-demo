const express = require('express')
const Router = express.Router()

var pgclient = require('./db');// 引用上述文件  
pgclient.getConnection();  
  
// 调用上述四个函数即可  


Router.get('/list',function(req, res){
	const {userid} = req.query
	const sql = 'select * from code_type where id <3';
    pgclient.getAll(sql,res);  
    // pgclient.select('code_type',{'typeid': 'gender'},[],res) 
})
Router.post('/login', function(req,res){
  return res.json({code:0,data:"userid"})
})


module.exports = Router
