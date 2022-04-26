import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import FOOTERlINKS from '../../constants/footerLinks';

function Footer() {
  const backToTop = (): void => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className='footer'>
      <button type='button' className='footer__btn' onClick={backToTop}>
        Back to top
      </button>
      <div className='footer__column'>
        {FOOTERlINKS.map((column) => {
          return (
            <div key={column.id} className='footer__linkCol'>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => {
                  return (
                    <li key={link.id}>
                      <Link to={link.href}>{link.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className='footer__line' />
      <div className='footer__logo'>
        <Link to='/'>
          <div className='logo__container' />
        </Link>
      </div>
      <div className='footer__bar'>
        <ul>
          <li>
            <Link to='/demo'>Conditions of Use & Sale</Link>
          </li>
          <li>
            <Link to='/demo'>Privacy Notice</Link>
          </li>
          <li>
            <Link to='/demo'>Interest-Based Ads Notice</Link>
          </li>
        </ul>
        <span> © 1996-2022, Amazon CLONE for demostration only</span>
      </div>
    </div>
  );
}

export default Footer;
