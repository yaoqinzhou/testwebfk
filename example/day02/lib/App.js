/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
var http = require('http');

module.exports = App;

function App(){

    var self = this;

    this._route_get_handles = {};
    this._route_post_handles = {};

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

                switch (req.method){
                    case 'GET':
                        handle = self._route_get_handles[req.url];

                        break;
                    case 'POST':
                        handle = self._route_post_handles[req.url];

                        break;
                }

                console.log('handle = ' + handle);

                if(handle){

                    handle(req,res);
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
    this._route_get_handles[route] = handle;
};

App.prototype.post = function (route,handle){
    this._route_post_handles[route] = handle;
};