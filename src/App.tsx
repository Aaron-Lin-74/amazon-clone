import React from 'react';
import Header from './components/Header/Header';
import Subheader from './components/Subheader/Subheader';
import Home from './components/Home/Home';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <Subheader />
      <Home />
    </div>
  );
}

export default App;
