var express         = require('express'),
    errorhandler    = require('errorhandler'),
    bodyParser      = require('body-parser'),
    swig            = require('swig'),
    routes          = require('./routes'),
    http            = require('http');

var app = module.exports = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  app.use(errorhandler());
}

app.get('/', routes.index);
app.get('/form', routes.form);
app.post('/result', routes.result);
app.get('/post/:id', routes.post);
app.get('/generate/:number', routes.generatePost);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
