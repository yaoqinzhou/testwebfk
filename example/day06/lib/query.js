/**
 * Created by yaoqing.zhou on 2015/2/5.
 */
var url = require('url'),
    qs = require('querystring');

function query(req,res,next){
    var querystring = url.parse(req.url).query;

    if(querystring){
        var queryobj = qs.parse(querystring);

        req.query = queryobj;
    }

    next();
}

module.exports = query;
