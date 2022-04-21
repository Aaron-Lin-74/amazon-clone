import React from 'react';
import { Link } from 'react-router-dom';
import './Demo.scss';

function Demo() {
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
        <Link to='/'>
          <button type='button' className='demo__btn'>
            Back to home
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Demo;
