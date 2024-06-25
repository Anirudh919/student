import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Register from '../src/component/Regsiter';
import Login from '../src/component/Login';
import UserList from '../src/component/UserList';
import io from 'socket.io-client';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // const sendMessage = () => {
  //   if (message.trim()) {
  //     socket.emit('sendMessage', message);
  //     setMessage('');
  //   }
  // };

  const sendMessage = () => {
    if (message.trim() && name.trim()) {
      socket.emit('sendMessage', { name, message });
      setMessage('');
    }
  };


  const handleLogin = () => {
    if (name.trim()) {
      setLoggedIn(true);
    }
  };

  return (
    
    <Router>
     
      <div>
        <nav>
          <ul>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/users">User List</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/users" element={<UserList/>} />
        </Routes>
      </div>
      <div>
    {/* <h1>Real-Time Chat</h1>
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div> */}
    {/* <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
    />
    <button onClick={sendMessage}>Send</button> */}
  </div>
  <Container className="mt-5">
      {!loggedIn ? (
        <div>
          <h2 className="mb-4">Enter your name</h2>
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin} className="mt-3" block>
            Enter Chat
          </Button>
        </div>
      ) : (
        <div>
          <h2 className="mb-4">Real-Time Chat</h2>
          <ListGroup>
            {messages.map((msg, index) => (
              <ListGroup.Item key={index}>
                <strong>{msg.name}:</strong> {msg.message}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form.Group controlId="formMessage" className="mt-4">
            <Form.Control
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
          </Form.Group>
          <Button variant="primary" onClick={sendMessage} className="mt-3" block>
            Send
          </Button>
        </div>
      )}
    </Container>
  
    </Router>
  );
}

export default App;
