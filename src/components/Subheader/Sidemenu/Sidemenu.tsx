import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useStateValue } from '../../StateProvider';
import './Sidemenu.scss';
import SIDEMENU from '../../../constants/sidemenu';

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
            {SIDEMENU.map((category) => {
              return (
                <React.Fragment key={category.title}>
                  <li>
                    <span className='sidemenu__item sidemenu__title'>
                      {category.title}
                    </span>
                  </li>
                  {category.links.map((link) => {
                    return (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className='sidemenu__item'
                          onClick={closeSidemenu}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
