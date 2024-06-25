module.exports = (app) => {
    const users = require('../controllers/user.controllers.js');
    const authJwt  = require('../middleware/auth.middleware.js');
  
    app.get('/api/users', [authJwt.verifyToken], users.findAll);
    app.get('/api/users/:id', [authJwt.verifyToken], users.findOne);
    app.put('/api/users/:id', [authJwt.verifyToken], users.update);
    app.delete('/api/users/:id', [authJwt.verifyToken], users.delete);
    // app.get('/api/users', users.findAll);
    // app.get('/api/users/:id', users.findOne);
    // app.put('/api/users/:id',  users.update);
    // app.delete('/api/users/:id',  users.delete);
  };
  