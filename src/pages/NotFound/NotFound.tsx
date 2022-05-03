import React from 'react';
import { Link } from 'react-router-dom';
import { BsQuestionCircle, BsCaretRightFill } from 'react-icons/bs';
import './NotFound.scss';

function NotFound() {
  return (
    <main className='notFound'>
      <Link to='/'>
        <div className='notFound__logo'>
          <img
            className=''
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
            alt='logo'
          />
        </div>
      </Link>
      <section className='notFound__info'>
        <div className='notFound__icon'>
          <BsQuestionCircle />
        </div>
        <div className='info__container'>
          <h1>Looking for something?</h1>
          <h2>
            We&apos;re sorry. The Web address you entered is not a functioning
            page on our site
          </h2>
          <p>
            <BsCaretRightFill />
            <strong>
              Go to Amazon.com&apos;s <Link to='/'>Home</Link> Page
            </strong>
          </p>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
