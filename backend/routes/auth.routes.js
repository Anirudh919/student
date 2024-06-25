module.exports = (app) => {
    const auth = require('../controllers/auth.controllers');
  
    app.post('/api/auth/register', auth.register);
    app.post('/api/auth/login', auth.login);
    app.post('/api/auth/logout', auth.logout);
  };
  