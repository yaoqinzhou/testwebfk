/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
var http = require('http');

module.exports = App;

function App(){
    //插件有序列表
    var middleList = this._middleList = [];

    function handle(req,res){
        if(middleList.length == 0){
            //没有插件
        }else{
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
                }
            }
        }
    }

    this._server = http.createServer(handle);
}

App.prototype.user = function (middle){
    this._middleList.push(middle);
};

App.prototype.listen = function (){
    this._server.listen.apply(this._server,arguments);
};