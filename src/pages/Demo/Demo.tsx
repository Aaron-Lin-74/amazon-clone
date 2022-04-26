import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Demo.scss';

function Demo() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <main className='demo'>
      <div className='demo__container'>
        <h1>Amazon Clone Project</h1>
        <h2>This is for demonstration purpose only!</h2>
        <h3>- Developed by Aaron Lin</h3>
        <p>
          This full-stack e-commerce Amazon Clone Project is used to demonstrate
          my front-end and back-end development capbility. The main focus for
          this project is to implement the main functionalities of the
          E-commerce web application.
        </p>
        <div className='demoBtn__container'>
          <button
            type='button'
            className='demo__btn demo__btn--light'
            onClick={handleGoBack}
          >
            Back
          </button>
          <Link to='/'>
            <button type='button' className='demo__btn'>
              Go to home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Demo;
