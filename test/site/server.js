const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes.js');

const app = express();
const config = {
  port: 3000,
};

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
  express: app,
});

app.get('/', routes.index);
app.get('/action', routes.action);
app.get('/responsive', routes.responsive);
app.get('/form', routes.form);
app.get('/keys', routes.keys);
app.post('/result', routes.result);
app.get('/post/:id', routes.post);
app.get('/generate/:number', routes.generate);

app.listen(config.port, () => {
  console.log(`App server running at http://localhost:${config.port}`);
});
