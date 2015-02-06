/**
 * Created by yaoqing.zhou on 2015/2/5.
 */
var fk = require('../index.js'),
    App = fk.App,
    app = new App(),
    static_middle = fk.static,
    post = fk.post,
    fs = require('fs');

app.use(static_middle(__dirname + '../../public'));
app.use(post);

app.post('/post',function (req,res){

    fs.writeFile(__dirname + '/public/file.txt',req.files.txt,function(){
        res.write('upload ok');
        res.end();
    });

});

app.listen(3355);