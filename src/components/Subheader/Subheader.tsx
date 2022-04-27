import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
// import NAVBARLINKS from '../../constants/navbarLinks';
import './Subheader.scss';
import Sidemenu from './Sidemenu/Sidemenu';
import sanityClient from '../../client';
import { NavbarLink } from '../../types';

function Subheader() {
  const [isSidemenuOpen, setIsSidemenuOpen] = useState<boolean>(false);
  const [navbarLinks, setNavbarLinks] = useState<NavbarLink[] | null>(null);

  useEffect(() => {
    sanityClient
      .fetch('*[_type == "navbarLink"] | order(id asc)')
      .then((data) => setNavbarLinks(data))
      .catch(console.error);
  }, []);

  const toggleSidemenu = (): void => {
    setIsSidemenuOpen(!isSidemenuOpen);
  };
  const closeSidemenu = (): void => {
    setIsSidemenuOpen(false);
  };
  return (
    <nav className='navbar'>
      <div
        className='navbar__left'
        onClick={toggleSidemenu}
        onKeyDown={toggleSidemenu}
        role='button'
        tabIndex={0}
      >
        <FaBars />
        <span>All</span>
      </div>
      <div className='navbar__main' id='navbar_main_links'>
        {navbarLinks &&
          navbarLinks.map((link) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Link to={link.href} key={link.id} className='navbar__link'>
                {link.name}
              </Link>
            );
          })}
      </div>
      <div className='navbar__right'>
        <Link to='/'>
          <img
            alt='Createspace'
            src='https://images-fe.ssl-images-amazon.com/images/G/35/Kindle/merch/AU/gateway/KCP-graphics-swms-c-au-400x39_01._CB485946680_.png'
          />
        </Link>
      </div>
      <Sidemenu isSidemenuOpen={isSidemenuOpen} closeSidemenu={closeSidemenu} />
    </nav>
  );
}

export default Subheader;
