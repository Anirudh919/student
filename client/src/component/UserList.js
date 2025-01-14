import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users:', error);
      });
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
