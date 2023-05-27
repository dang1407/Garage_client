import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import component
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';
import DeleteAcc from './pages/DeleteAcc/DeleteAcc';
import Home from './pages/Home/Home';
import ListEmployees from './components/ListEmployees/ListEmployees';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/updateacc' element={<UpdatePassword/>}></Route>
        <Route path='deleteacc' element={<DeleteAcc />}></Route>
        <Route path='listemployees' element={<ListEmployees />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
