import React, { useContext } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Container } from '@mui/material';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import MenuBar from './components/MenuBar';
import { AuthContext } from './context/auth';
import SinglePost from './pages/SinglePost';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <MenuBar />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/login'
            element={user ? <Navigate to='/' replace /> : <Login />}
          />
          <Route
            path='/register'
            element={user ? <Navigate to='/' replace /> : <Register />}
          />
          <Route path='/posts/:postId' element={<SinglePost />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
