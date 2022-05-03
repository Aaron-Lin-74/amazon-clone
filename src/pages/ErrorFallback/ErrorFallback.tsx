import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorFallback.scss';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <main className='error'>
      <Link to='/'>
        <div className='error__logo'>
          <img
            className=''
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
            alt='logo'
          />
        </div>
      </Link>
      <section className='error__info'>
        <div className='info__container'>
          <h1>Oops! Something goes wrong, please try again later.</h1>
          <Link to='/'>
            <button type='button' className='error__btn'>
              Go to home
            </button>
          </Link>
          <p>
            You can also try to reload the page.
            <button
              type='button'
              className='error__btn--light'
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </p>
          <div>
            <p>Error Message:</p>
            <strong>{error.message}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ErrorFallback;
