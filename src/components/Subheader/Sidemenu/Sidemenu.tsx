import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useStateValue } from '../../StateProvider';
import './Sidemenu.scss';

interface Props {
  isSidemenuOpen: boolean;
  closeSidemenu: () => void;
}
function Sidemenu({ isSidemenuOpen, closeSidemenu }: Props) {
  const [{ user }] = useStateValue();
  return (
    <div
      className={` ${
        isSidemenuOpen ? 'sidemenu sidemenu--visible' : 'sidemenu'
      }`}
    >
      <div className='sidemenu__background'>
        <AiOutlineClose
          className='sidemenu__closeIcon'
          onClick={closeSidemenu}
          tabIndex={0}
          aria-label='close sidemenu'
          title='close sidemenu'
        />
      </div>
      <div className='sidemenu__canvas'>
        <Link
          to={user ? '/' : '/signin'}
          className='sidemenu__customerProfile'
          onClick={closeSidemenu}
        >
          <CgProfile />
          Hello, {user ? user.displayName || user.email : 'Sign in'}
        </Link>
        <div className='sidemenu__content'>
          <ul className='sidemenu__list'>
            <li>
              <span className='sidemenu__item sidemenu__title'>Trending</span>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                Best Sellers
              </Link>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                New Releases
              </Link>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                Movers and Shakers
              </Link>
            </li>
            <li className='sidemenu__separator' />
            <li>
              <span className='sidemenu__item sidemenu__title'>
                Digital Content And Devices
              </span>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                Echo & Alexa
              </Link>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                Kindle E-readers & Books
              </Link>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                Amazon Fire TV
              </Link>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                Amazon Prime Video
              </Link>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                Amazon Music
              </Link>
            </li>
            <li>
              <Link to='/' className='sidemenu__item' onClick={closeSidemenu}>
                Audible Audiobooks
              </Link>
            </li>
            <li className='sidemenu__separator' />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
