var App = require('../index.js').App,
    app = new App();

app.get('/about',function(req,res){
    res.write('my name is about');
    res.end();
});


app.get('/contact/*/:id/ok',function(req,res){
    res.write('my name is contact');
    res.end();
});

app.listen(3300);


