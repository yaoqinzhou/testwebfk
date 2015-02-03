/**
 * Created by yaoqing.zhou on 2015/2/3.
 */
var http = require('http');

var server = http.createServer();

server.on('request',handle);

function handle(req,res){
    res.write('test req');
    res.end();
}

server.listen(3300,function(){
    console.log('server is start!');
});

