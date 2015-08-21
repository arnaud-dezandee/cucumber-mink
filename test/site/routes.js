var _ = require('lodash');

///////////////////

var Routes = module.exports = {};

///////////////////

function postWithId (id) {
  return {
    id:          id,
    title:       'Post-' + id,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
}

function postsGen (n) {
  return _.range(1, n + 1).map(function(index) {
    return postWithId(index);
  });
}

///////////////////

Routes.responsive = function(request, reply) {
  reply.view('responsive');
};

Routes.index = function(request, reply) {
  reply.view('index', {'posts': postsGen(3)});
};

Routes.action = function(request, reply) {
  reply.view('action');
};

Routes.generate = function(request, reply) {
  var number = parseInt(encodeURIComponent(request.params.number));
  reply.view('index', {'posts': postsGen(number)});
};

Routes.post = function(request, reply) {
  var id = encodeURIComponent(request.params.id);
  reply.view('post', {'post': postWithId(id)});
};

Routes.form = function(request, reply) {
  reply.view('form', {});
};

Routes.result = function(request, reply) {
  request.payload.cb = !!request.payload.cb;

  reply.view('result', {
    'request': request.payload
  });
};

Routes.keys = function(request, reply) {
  reply.view('keys');
};

Routes.angular = function(request, reply) {
  reply.view('angular');
};

Routes.angularData = function(request, reply) {
  setTimeout(function() {
    reply('OK !');
  }, 1000);
};
