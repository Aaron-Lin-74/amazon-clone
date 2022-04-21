import React, { useState } from 'react';
import './SignIn.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '../../firebase';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Go back to previous page
      navigate(-1);
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(err.message);
      } else {
        // eslint-disable-next-line no-alert
        alert(String(err));
      }
    }
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // Go back to previous page
      if (user) navigate(-1);
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(err.message);
      } else {
        // eslint-disable-next-line no-alert
        alert(String(err));
      }
    }
  };

  return (
    <div className='signIn'>
      <Link to='/'>
        <div className='signIn__logo'>
          <img
            className=''
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
            alt='logo'
          />
        </div>
      </Link>
      <div className='signIn__container'>
        <h1>Sign-In</h1>

        <form onSubmit={signIn}>
          <label htmlFor='email'>
            E-mail
            <input
              id='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label htmlFor='password'>
            Password
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type='submit' className='signIn__btn'>
            Sign In
          </button>
        </form>

        <p className='signIn__legal'>
          By continuing, you agree to Amazon CLONE&apos;s Conditions of Use and
          Privacy Notice.
        </p>
      </div>
      <div className='signIn__divider'>
        <p>New to Amazon?</p>
      </div>
      <button type='button' onClick={register} className='signIn__registerBtn'>
        Create your Amazon Account
      </button>
      <div className='signIn__sectionDivider' />
      <span className='signIn__footer'>
        © 1996-2022, Amazon CLONE for demostration only
      </span>
    </div>
  );
}

export default SignIn;
