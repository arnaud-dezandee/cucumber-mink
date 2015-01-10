var Hapi   = require('hapi'),
    Path   = require('path'),
    Routes = require('./routes');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.views({
  engines:  { swig: require('swig') },
  path:     Path.join(__dirname, 'views')
});

server.route({ method: 'GET',  path: '/',                   handler: Routes.index     });
server.route({ method: 'GET',  path: '/form',               handler: Routes.form      });
server.route({ method: 'POST', path: '/result',             handler: Routes.result    });
server.route({ method: 'GET',  path: '/post/{id}',          handler: Routes.post      });
server.route({ method: 'GET',  path: '/generate/{number}',  handler: Routes.generate  });

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
