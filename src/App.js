import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoList } from './pages/TodoList';
import { SignIn } from './pages/SignIn';
import { Login } from './pages/Login';


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path="/" element={<SignIn/>} />
          <Route path="/ToDoList" element={<TodoList/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );


}

export default App;