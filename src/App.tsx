import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from 'firebase/auth';
import Header from './components/Header/Header';
import Subheader from './components/Subheader/Subheader';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import { auth, onAuthStateChanged } from './firebase';
import { UserActions } from './store/types';
import { useStateValue } from './components/StateProvider';

function App() {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch({ type: UserActions.SIGN_IN, payload: { user } });
      } else {
        dispatch({ type: UserActions.SIGN_OUT });
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Subheader />
              <Home />
            </>
          }
        />
        <Route
          path='/checkout'
          element={
            <>
              <Header />
              <Subheader />
              <Cart />
            </>
          }
        />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
