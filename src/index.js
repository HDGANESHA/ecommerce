import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Addcustomer from './pages/Addcustomer';
import Addusers from './pages/Addusers';
import Addcategory from './pages/Addcategory';
import Profile from './pages/Profile';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/pages/dashboard" element={<Dashboard />} exact />
        <Route path="/pages/users" element={<Users />} exact />
        <Route path="/pages/categories" element={<Categories />} exact />
        <Route path="/pages/products" element={<Products />} exact />
        <Route path="/pages/addcustomer" element={<Addcustomer />} exact />
        <Route path="/pages/addusers" element={<Addusers />} exact />
        <Route path="/pages/addcategory" element={<Addcategory />} exact />
        <Route path="/pages/profile" element={<Profile />} exact />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
