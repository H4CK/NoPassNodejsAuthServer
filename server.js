/*-------------------VARIABLES-------------------------*/
var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');
   mysql=require('mysql');
/*-------------------------SERVER CODE START-----------------------------*/
var server = http.createServer(function (req,res){
                            
    var url_parts = url.parse(req.url,true);
    var body = '';
    if(req.method === 'POST'){
        console.log('POST method');     
        req.on('data', function (data) {
            body += data;
            console.log('got data:'+data);
        });
        req.on('end', function () {

            var POST = qs.parse(body);              //Extracting data
            console.log(POST);                      
            var onj={status:'1'};                   //node object
            console.log(JSON.stringify(onj));
            res.end(JSON.stringify(onj));           //Returning as json
            
        });
        
       
    } 
    else 
    {
    console.log('Request found with GET method');     
    req.on('data',function(data)
        { 
            res.end(' data event: '+data);
        });
    if(url_parts.pathname == '/')
    fs.readFile('./form.html',function(error,data)
    { 
        console.log('Serving the page form.html');
        res.end(data);    
    });

    else if(url_parts.pathname == '/getData'){
         console.log('Serving the Got Data.');
        getData(res,url_parts);
    }
    }
/*-------------------------SERVER CODE END-----------------------------*/
/*-------------------------MYSQL CODE START-----------------------------*/




var mysqlconn=mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'k14hack',
    user:'root',
    //password:'aravindh'
    //password:'root'
    password:'123456',
    socketPath  : '/var/run/mysqld/mysqld.sock'
});
mysqlconn.connect(function(err){
    if(err!=null)
        console.log(err);
    else
        console.log("Suc");
});


/*--------------------------------MYSQL INSERT AND SELECT START----------*/
var id=977986,
    email='arparthasarathi@gmail.com',
    publickey='ygjjhsgdhchsbdkvksjhhvkjsnvkjsh',
    md5='jjhfvglkdhfgvjkhdfguvidghvjkfhvusfvhjkhvsfhvkjfbvkjdfhvjkfdbvkjdhfvkjfdbnv',
    webapp='amazon',
    newmail='arparthasarathi@ymail.com';
//mysqlconn.query("INSERT INTO test_table (id,email,publickey,md5,webapp) VALUES ('"+id+"','"+email+"','"+publickey+"','"+md5+"','"+webapp+"')",function(error){


mysqlconn.query("UPDATE test_table SET email='"+newmail+"' where id='"+id+"'",function(error){    
    if(error){
        console.log(error);
    }
    else
    {
        console.log("Update success");
    }
});




mysqlconn.query("SELECT * FROM test_table", function (error, results, fields) {
    if (error) {
        //
    }
    if (results.length  > 0) {
        console.log(results);
    }
});
/*--------------------------------MYSQL INSERT AND SELECT END----------*/
/*-------------------------MYSQL CODE END-----------------------------*/




});
server.listen(8080);                                                    //STARTING NODE SERVER

//ON blank request to the server
function  getData(res,url_parts){
 console.log("Data submitted by the user name:"+url_parts.query.name+" and age:"+url_parts.query.age);
        res.end("Data submitted by the user name:"+url_parts.query.name+" and age:"+url_parts.query.age);
}



