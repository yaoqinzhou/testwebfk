/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
var url = require('url'),
    fs = require('fs');

function url2path(url_path){
    var urlObj = url.parse(url_path);

    return urlObj.path;
}

module.exports = function staticUrl(parent_path){
    return function(req,res,next){
        var urlPath = url2path(req.url);
        console.log('staticUrl urlPath = ' + urlPath);

        function readFileCallback(err,data){
            if(err){
                //res.statusCode = '404';
                next();
            }else{
                res.write(data);
            }

            res.end();
        }

        fs.readFile(parent_path+urlPath,readFileCallback);
    };
};