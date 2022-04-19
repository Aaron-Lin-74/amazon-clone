import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Subheader from './components/Subheader/Subheader';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Subheader />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='checkout' element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
