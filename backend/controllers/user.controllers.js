const db = require('../config/db.config');

exports.findAll = (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("err",{ message: err.message });
      return;
    }
    res.status(200).send(results);
  });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (results.length === 0) {
      res.status(404).send({ message: 'User not found.' });
      return;
    }

    res.status(200).send(results[0]);
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role } = req.body;

  const query = 'UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?';
  db.query(query, [name, email, phone, role, id], (err, results) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send({ message: 'User not found.' });
      return;
    }

    res.status(200).send({ message: 'User updated successfully.' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send({ message: 'User not found.' });
      return;
    }

    res.status(200).send({ message: 'User deleted successfully.' });
  });
};
