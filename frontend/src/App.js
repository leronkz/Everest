import './App.css';
import { Routes, Route } from 'react-router';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Main from './views/main/Main';
import Settings from './views/settings/Settings';
import Account from './views/account/Account';
import React from 'react';

function App() {
  return (
    <Routes>
        <Route exact path='' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/main' element={<Main/>}/>
        <Route path='/settings' element={<Settings/>} />
        <Route path='/account' element={<Account photo={''}/>} />
    </Routes>
  );
}

export default App;
