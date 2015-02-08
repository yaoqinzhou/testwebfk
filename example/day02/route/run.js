/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
var App = require('../index.js').App,
    app = new App();

app.get('/about',function(req,res){
    res.write('my path is about');
    res.end();
});

app.get('/contact',function(req,res){
    res.write('my path is contact');
    res.end();
});

app.listen(3300);