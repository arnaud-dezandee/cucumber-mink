import express from 'express';
import body from 'body-parser';
import swig from 'swig';
import routes from './routes.js';

const app = express();

app.use(body.json());
app.use(body.urlencoded({ extended: true }));

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.get('/', routes.index);
app.get('/action', routes.action);
app.get('/responsive', routes.responsive);
app.get('/form', routes.form);
app.get('/keys', routes.keys);
app.post('/result', routes.result);
app.get('/post/:id', routes.post);
app.get('/generate/:number', routes.generate);

app.listen(3000);

/* eslint no-console: 0 */
console.log('Server running at:', 'http://localhost:3000/');
