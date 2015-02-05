/**
 * Created by yaoqing.zhou on 2015/2/5.
 */
var fk = require('../index.js'),
    App = fk.App,
    app = new App(),
    query = fk.query;


app.use(query);

app.get('/about/:id/:name',function(req,res){
    res.write('my name is ' + req.params.name);
    res.write('my id is ' + req.params.id);
    res.end();
});

app.listen(3300);