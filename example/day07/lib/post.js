var qs = require("querystring");

module.exports = function post(req,res,next){

    var body_data ="";

    req.files = {};
    req.body = {};

    req.on("data",function(chunk){
        console.log(chunk.toString());
        body_data += chunk;
    });

    req.on("end",function(){

        try{
            var contentType = req.headers['content-type'];

            console.log('contentType = ' + contentType);

            var isMulti = /(boundary=)/gi.test(contentType);

            if(isMulti){
                var boundary = RegExp["$'"];

                var boundaryStandard = '--' + boundary + '\r\n';
                var boundaryEnd = boundaryStandard + '--';

                body_data = body_data.substring(boundaryStandard.length,body_data.length - boundaryEnd.length);

                var fields = body_data.split(boundaryStandard);

                var RN = '\r\n';

                fields.forEach(function (field){
                    var index = field.indexOf(RN);

                    var header = field.substring(0,index);

                    console.log('header = ' + header);

                    var fileName = /\"(.*?)\"/g.test(header);

                    var fieldName = RegExp.$1;

                    console.log('fieldName = ' + fieldName);

                    var isFile = /fieldName/g.test(header);

                    console.log('isFile = ' + isFile);

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
