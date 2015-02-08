var qs = require("querystring");

module.exports = function post(req,res,next){

    var body_data ="";

    req.files = {};
    req.body = {};

    req.on("data",function(chunk){
        body_data += chunk;
    });

    req.on("end",function(){

        try{
            var contentType = req.headers['content-type'];

            var isMulti = /(boundary=)/gi.test(contentType);

            if(isMulti){
                var boundary = RegExp["$'"];

                var boundaryStandard = '--' + boundary + '\r\n';
                var boundaryEnd = boundaryStandard + '--';

                body_data = body_data.substring(boundaryStandard.length,body_data.length - boundaryEnd.length);

                var fields = body_data.split(boundaryStandard);

                var RN = '\r\n';

                fields.forEach(function (field){
                    console.log('field = ' + field);

                    var index = field.indexOf(RN);

                    var header = field.substring(0,index);

                    /name=\"(.*?)\"/g.test(header);

                    var fieldName = RegExp.$1;

                    //判断头部字符串中是否有filename字符串，如果有就是文件
                    var isFile = /filename/g.test(header);

                    var body = field.substring(index + RN.length);

                    if(isFile){
                        var index2 = body.indexOf(RN);

                        body = body.substring(index2 + (RN.length * 2),body.length - RN.length / 2);

                        req.files[fieldName] = new Buffer(body);

                        /filename=\"(.*?)\"/g.test(header);

                        req.files[fieldName].fileName = RegExp.$1;
                    }else{
                        body = body.substring(0,body.length - RN.length / 2);

                        req.body[fieldName] = body;
                    }

                });

            }else{
                req.body = qs.parse(body_data);
            }

        }catch(e){

            console.log(e.stack);
        }
        next();
    });
};
