/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
var url = requie('url'),
    fs = requie('fs');

function url2path(url_path){
    var urlObj = url.parse(url_path);

    return urlObj.path;
}

module.exports = function staticUrl(parent_path){
    return function(req,res,next){
        var urlPath = url2path(req.url);
        console.log('staticUrl urlPath = ' + urlPath);

        fs.readFile(parent_path+urlPath,function (err,data){
            if(err){
                res.statusCode = '404';
            }else{
                res.write(data);
            }

            res.end();
        });
    };
};