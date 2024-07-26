import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoList } from './pages/TodoList';
import { SignIn } from './pages/SignIn';
import { Login } from './pages/Login';
import { useState } from "react";


function App() {
  const [user,setUser]=useState();

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      setUser(user);
    })
  })

  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path="/" element={user ? <Navigate to ="/ToDoList" /> : <SignIn/>} />
          <Route path="/ToDoList" element={<TodoList/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );


}

export default App;