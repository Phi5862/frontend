import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import ProductDetail from './ProductDetail';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
