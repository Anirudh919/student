import React, { useState } from 'react';
import AuthService from '../services/auth.service';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.register(form.name, form.email, form.phone, form.role, form.password)
      .then((response) => {
        console.log('User registered successfully:', response.data);
      })
      .catch((error) => {
        console.error('There was an error registering the user:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} required />

        <label>Role:</label>
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Institute">Institute</option>
        </select>

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
