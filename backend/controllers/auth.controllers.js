const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, phone, role, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, phone, role, hashedPassword], (err, results) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'User registered successfully!' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).send({ message: 'User not found.' });
      return;
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
      return;
    }

    const token = jwt.sign({ id: user.id }, 'secret-key', {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  });
};

exports.logout = (req, res) => {
  res.status(200).send({ message: 'Logout successful.' });
};
