import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Rdirect } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import Categories from './pages/categories';
import Products from './pages/products';
import Addcustomer from './pages/addCustomer';
import Addusers from './pages/addUser';
import Addcategory from './pages/addCategory';
import Profile from './pages/profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './component/login';
import Sidebarhead from './component/Sidebarhead/sidebarHead';
import DashboardNew from './pages/dashboardNew';
import ProfileNew from './pages/profileNew';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        {/* <PrivateRoute exact path="/pages/dashboard">
          <Dashboard />
        </PrivateRoute> */}
        <Route path="/pages/dashboard" element={<ProtectedRoute />}>
          <Route exact path="/pages/dashboard" element={<Dashboard />} />
        </Route>
        {/* <Route path="/pages/dashboard" element={<Dashboard />} exact /> */}
        <Route path="/pages/users" element={<ProtectedRoute />}>
          <Route exact path="/pages/users" element={<Users />} />
        </Route>
        <Route path="/pages/categories" element={<ProtectedRoute />}>
          <Route exact path="/pages/categories" element={<Categories />} />
        </Route>
        <Route path="/pages/products" element={<ProtectedRoute />}>
          <Route exact path="/pages/products" element={<Products />} />
        </Route>
        <Route path="/addcustomer" element={<ProtectedRoute />}>
          <Route exact path="/addcustomer" element={<Addcustomer />} />
        </Route>
        <Route path="/addusers" element={<ProtectedRoute />}>
          <Route exact path="/addusers" element={<Addusers />} />
        </Route>
        <Route path="/addcategory" element={<ProtectedRoute />}>
          <Route exact path="/addcategory" element={<Addcategory />} />
        </Route>
        <Route path="/pages/profile" element={<ProtectedRoute />}>
          <Route exact path="/pages/profile" element={<Profile />} />
        </Route>
        <Route path="/pages/profileNew" element={<ProtectedRoute />}>
          <Route exact path="/pages/profileNew" element={<ProfileNew />} />
        </Route>
        <Route path="/pages/dashboardNew" element={<ProtectedRoute />}>
          <Route exact path="/pages/dashboardNew" element={<DashboardNew />} />
        </Route>
        {/* <Route path="/pages/users" element={<Users />} exact />
        <Route path="/pages/categories" element={<Categories />} exact />
        <Route path="/pages/products" element={<Products />} exact />
        <Route path="/pages/addcustomer" element={<Addcustomer />} exact />
        <Route path="/pages/addusers" element={<Addusers />} exact />
        <Route path="/pages/addcategory" element={<Addcategory />} exact />
        <Route path="/pages/profile" element={<Profile />} exact /> */}
        {/* <Route path="/Sidebarhead/sidebarHead" element={<Sidebarhead />} exact />
        <Route path="/pages/dashboardNew" element={<DashboardNew />} exact />  */}
        <Route path="/pages/profileNew" element={<ProfileNew />} exact /> 

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
