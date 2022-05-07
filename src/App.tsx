import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from 'firebase/auth';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Subheader from './components/Subheader/Subheader';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import './App.css';
import SignIn from './pages/SignIn/SignIn';
import { auth, onAuthStateChanged } from './firebase';
import { UserActions } from './store/types';
import { useStateValue } from './components/StateProvider';
import ErrorFallback from './pages/ErrorFallback/ErrorFallback';
import Demo from './pages/Demo/Demo';
import Product from './pages/Product/Product';
import Footer from './components/Footer/Footer';
import NotFound from './pages/NotFound/NotFound';
import Success from './pages/Success/Success';
import Orders from './pages/Orders/Orders';

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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route
            path='/'
            element={
              <>
                <Header />
                <Subheader />
                <Home />
                <Footer />
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
                <Footer />
              </>
            }
          />
          <Route
            path='/product/:slug'
            element={
              <>
                <Header />
                <Subheader />
                <Product />
                <Footer />
              </>
            }
          />
          <Route path='/signin' element={<SignIn />} />
          <Route
            path='/demo'
            element={
              <>
                <Header />
                <Subheader />
                <Demo />
                <Footer />
              </>
            }
          />
          <Route
            path='/success/:sessionId'
            element={
              <>
                <Header />
                <Subheader />
                <Success />
                <Footer />
              </>
            }
          />
          <Route
            path='/order-history'
            element={
              <>
                <Header />
                <Subheader />
                <Orders />
                <Footer />
              </>
            }
          />
        </Routes>
        <Toaster
          containerStyle={{
            top: 100,
          }}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;
