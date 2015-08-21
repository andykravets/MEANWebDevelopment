/**
 * Created by akravets on 8/20/15.
 */

var connect = require('connect');
var app = connect();

var logger = function(req, res, next) {
    console.log(req.method, req.url);

    next();
};

var helloWorld = function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
};

var goodbyeWorld = function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.write('Goodbye World!');
    res.end();
};

app.use(logger);
app.use('/goodbye', goodbyeWorld);
app.use('/hello', helloWorld);

app.listen(3000);

console.log('Server running at http://localhost:3000/');