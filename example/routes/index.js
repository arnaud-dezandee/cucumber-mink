
exports.index = function(req, res){
  res.render('index', {'posts': postsGen(3)});
};

exports.generatePost = function(req, res){
  var number = parseInt(req.params.number);
  res.render('index', {'posts': postsGen(number)});
};

exports.post = function(req, res) {
  var id = req.params.id;
  res.render('post', {'post': postWithId(id)});
};

exports.form = function(req, res) {
  res.render('form', {});
};

exports.result = function(req, res) {
  req.body.cb = !!req.body.cb;

  res.render('result', {
    'request': req.body
  });
};

////////////////////////////

function postsGen (n) {
  var data = [];
  for (var i = 1; i < n + 1; i++) {
    data.push(postWithId(i));
  }
  return data;
}

function postWithId (id) {
  return {
    id: id,
    title: "Post-" + id,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
}
