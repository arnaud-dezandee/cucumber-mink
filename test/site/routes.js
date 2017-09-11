/**
 * Dependencies
 */

const range = require('lodash.range');

function postWithId(id) {
  return {
    id,
    title: `Post-${id}`,
    description: 'Lorem ipsum',
  };
}

function postsGen(number) {
  return range(1, number + 1).map(postWithId);
}

function responsive(req, res) {
  res.render('responsive');
}

function index(req, res) {
  res.render('index', { posts: postsGen(3) });
}

function action(req, res) {
  res.render('action');
}

function generate(req, res) {
  const number = parseInt(encodeURIComponent(req.params.number), 10);
  res.render('index', { posts: postsGen(number) });
}

function post(req, res) {
  const id = encodeURIComponent(req.params.id);
  res.render('post', { post: postWithId(id) });
}

function form(req, res) {
  res.render('form', {});
}

function result(req, res) {
  const { body } = req;
  body.cb = !!body.cb;

  res.render('result', {
    request: body,
  });
}

function keys(req, res) {
  res.render('keys');
}

module.exports = {
  index,
  responsive,
  action,
  generate,
  post,
  form,
  result,
  keys,
};
