/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
var fk = require('../index.js'),
    App = fk.App,
    app = new App(),
    middle01 = require('./middle01'),
    middle02 = require('./middle02'),
    static_middle = fk.static;

console.log('dirname = ' + __dirname);

app.use(static_middle(__dirname + '../../public'));

app.get(function(req,res){
    res.write('this is from get');
    res.end();
});

app.post(function(req,res){
    res.write('this is from post');
    res.end();
});

app.listen(3300);


