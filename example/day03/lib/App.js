/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
var http = require('http'),
    pathRegexp = require('./pathRegexp'),
    url = require('url');

module.exports = App;

function App(){

    var self = this;

    this._route_get_handles = [];
    this._route_post_handles = [];

    //插件有序列表
    var middleList = this._middleList = [];

    function handle(req,res){
        var middleIndex = 0;

        execMiddle();

        function next(){
            middleIndex += 1;
            execMiddle();
        }

        function execMiddle(){
            var middle = middleList[middleIndex];

            if(middle){
                middle(req,res,next);
            }else{
                var handle;

                var path = url.parse(req.url).pathname;

                function findHandle(route_Handles){
                    for(var i = 0; i<route_Handles.length; i++){
                        var route_handle = route_Handles[i];

                        var pass = route_handle.route.test(path);

                        if(pass){
                            handle = route_handle.handle;
                            break;
                        }
                    }
                }

                switch (req.method){
                    case 'GET':
                        findHandle(self._route_get_handles);

                        break;
                    case 'POST':
                        findHandle(self._route_post_handles);

                        break;
                }

                if(handle){

                    handle(req,res);
                }else{
                    res.statusCode = 404;
                    res.end();
                }
            }
        }
    }

    this._server = http.createServer(handle);
}

App.prototype.use = function (middle){
    this._middleList.push(middle);
};

App.prototype.listen = function (){
    this._server.listen.apply(this._server,arguments);
};

App.prototype.get = function (route,handle){
    this._route_get_handles.push({route:pathRegexp(route),handle:handle});
};

App.prototype.post = function (route,handle){
    this._route_post_handles.push({route:pathRegexp(route),handle:handle});
};