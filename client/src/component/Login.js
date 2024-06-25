import React, { useState } from 'react';
import AuthService from '../services/auth.service';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
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
    AuthService.login(form.email, form.password)
      .then((response) => {
        localStorage.setItem('userToken', response.data.accessToken);
        console.log('User logged in successfully:', response.data);
      })
      .catch((error) => {
        console.error('There was an error logging in:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
