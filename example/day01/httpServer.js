/**
 * Created by yaoqing.zhou on 2015/2/3.
 */
var http = require('http')
    ,fs = require('fs')
    ,url = require('url');

var server = http.createServer();

server.on('request',handle);

function handle(req,res){
    var urlPath = url2path(req.url);
    console.log('urlPath = ' + urlPath);

    fs.readFile(__dirname+'/public'+urlPath,function (err,data){
        if(err){
            res.statusCode = '404';
        }else{
            res.write(data);
        }

        res.end();
    });


}

function url2path(url_path){
    var urlObj = url.parse(url_path);

    return urlObj.path;
}

server.listen(3300,function(){
    console.log('server is start!');
});

