/**
 * Created by yaoqing.zhou on 2015/2/5.
 */
var fk = require('../index.js'),
    App = fk.App,
    app = new App(),
    static_middle = fk.static,
    post = fk.post;

app.use(static_middle(__dirname + '../../public'));
app.use(post);

app.post('/post',function (req,res){
   /* try{
        var title = req.body.title;
        var content = req.body.content;

        console.log('title = ' + title + ' content = ' + content);

        res.write('title = ' + title + ' content = ' + content);
        res.end();

    }catch(e){
        console.log(e.stack);
    }*/


});

app.listen(3355);