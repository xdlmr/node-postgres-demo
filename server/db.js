var pg = require('pg');  
var conString = "postgres://postgres:123456@localhost/chuxiong";  
var client = new pg.Client(conString);  
  
var PG = function(){  
    console.log("准备向****数据库连接...");  
};  
  
PG.prototype.getConnection = function(){  
    client.connect(function (err) {  
        if (err) {  
            return console.error('could not connect to postgres', err);  
        }  
        client.query('SELECT NOW() AS "theTime"', function (err, result) {  
            if (err) {  
                return console.error('error running query', err);  
            }  
            console.log("数据库连接成功...");  
        });  
    });  
};  
  
// 查询函数  
//@param str 查询语句  
//@param value 相关值  
//@param cb 回调函数  
var clientHelper = function(str,value,res){  
    // console.log(value);
    client.query(str,value,function(err,result){  
        // console.log(str);
        if(err) {  
            return res.json({code:300,data:result.rows})
            // console.log("查询失败");
        }  
        else{  
            // console.log(result);
            if(result.rows != undefined)  
                // cb(JSON.stringify(result.rows));
               // console.log(result.rows) ; 
               return res.json({code:200,data:result.rows})
            else  
               return res.json({code:300,data:result.rows})
               // return 0
        }  
    });  
}  
//增  
//@param tablename 数据表名称  
//@param fields 更新的字段和值，json格式  
//@param cb 回调函数  
PG.prototype.save = function(tablename,fields,cb){  
    if(!tablename) return;  
    var str = "insert into "+tablename+"(";  
    var field = [];  
    var value = [];  
    var num = [];  
    var count = 0;  
    for(var i in fields){  
        count++;  
        field.push(i);  
        value.push(fields[i]);  
        num.push("$"+count);  
    }  
    str += field.join(",") +") values("+num.join(",")+")";  
    clientHelper(str,value,cb);  
};  
  
//删除  
//@param tablename 数据表名称  
//@param fields 条件字段和值，json格式  
//@param cb 回调函数  
PG.prototype.remove = function(tablename,fields,cb){  
    if(!tablename) return;  
    var str = "delete from "+tablename+" where ";  
    var field = [];  
    var value = [];  
    var count = 0;  
    for(var i in fields){  
        count++;  
        field.push(i+"=$" +count);  
        value.push(fields[i]);  
    }  
    str += field.join(" and ");  
    clientHelper(str,value,cb);  
}  
  
//修改  
//@param tablename 数据表名称  
//@param fields 更新的字段和值，json格式  
//@param mainfields 条件字段和值，json格式  
PG.prototype.update = function(tablename,mainfields,fields,cb){  
    if(!tablename) return;  
    var str = "update "+tablename+" set ";  
    var field = [];  
    var value = [];  
    var count = 0;  
    for(var i in fields){  
        count++;  
        field.push(i+"=$"+count);  
        value.push(fields[i]);  
    }  
    str += field.join(",") +" where ";  
    field = [];  
    for(var j in mainfields){  
        count++;  
        field.push(j+"=$"+count);  
        value.push(mainfields[j]);  
    }  
    str += field.join(" and ");  
    clientHelper(str,value,cb);  
}  
  
//查询  
//@param tablename 数据表名称  
//@param fields 条件字段和值，json格式  
//@param returnfields 返回字段  
//@param cb 回调函数  
PG.prototype.select = function(tablename,fields,returnfields,cb){  
    if(!tablename) return;  
    var returnStr = "";  
    if(returnfields.length == 0)  
        returnStr = '*';  
    else  
        returnStr= returnfields.join(",");  
    var str = "select "+returnStr+ " from "+tablename+" where ";  
    var field = [];  
    var value = [];  
    var count = 0;  
    for(var i in fields){  
        count++;  
        field.push(i+"=$"+count);  
        value.push(fields[i]);  
    }  
    str += field.join(" and ");  
    clientHelper(str,value,cb); 
    
};  
PG.prototype.getAll = function(sql,res){
     client.query(sql,(err,result)=>{
        if(err) {  
            cb("查询失败");  
            // console.log("查询失败");
        }  
        else{  
            if(result.rows != undefined)  
              return res.json({code:200,data:result.rows})
            else  
               return 0 
        }  
     })
} 

PG.prototype.getone = function(sql){
    return sql;
} 
module.exports = new PG(); 