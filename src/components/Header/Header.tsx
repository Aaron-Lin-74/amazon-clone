import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiFillCaretDown } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsCart3 } from 'react-icons/bs';
import './Header.scss';

function Header() {
  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to='/' className='logo__link'>
          <img
            src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
            alt='logo'
            className='logo__img'
          />
          <span className='logo__text'>.com.au</span>
        </Link>
      </div>
      <div className='header__location' role='button' tabIndex={0}>
        <HiOutlineLocationMarker className='location__icon' />
        <div className='location__text'>
          <span>Hello</span>
          <span>Select your address</span>
        </div>
      </div>
      <div className='header__search'>
        <form className='search__form'>
          <span
            id='searchDropdownDescription'
            className='search__attribute'
            style={{ display: 'none' }}
          >
            Select the department you want to search in
          </span>
          <select
            aria-describedby='searchDropdownDescription'
            className='search__dropdown'
            name='url'
            tabIndex={0}
            title='Search in'
          >
            <option value='search-alias=aps'>All</option>
            <option value='search-alias=alexa-skills'>Alexa Skills</option>
            <option value='search-alias=amazon-devices'>Amazon Devices</option>
            <option value='search-alias=amazon-global-store'>
              Amazon Global Store
            </option>
            <option value='search-alias=baby'>Baby</option>
            <option value='search-alias=beauty'>Beauty</option>
            <option value='search-alias=stripbooks'>Books</option>
            <option value='search-alias=popular'>CDs & Vinyl</option>
            <option value='search-alias=fashion'>
              Clothing, Shoes & Accessories
            </option>
            <option value='search-alias=fashion-womens'>
              &#160;&#160;&#160;Women
            </option>
            <option value='search-alias=fashion-mens'>
              &#160;&#160;&#160;Men
            </option>
            <option value='search-alias=fashion-girls'>
              &#160;&#160;&#160;Girls
            </option>
            <option value='search-alias=fashion-boys'>
              &#160;&#160;&#160;Boys
            </option>
            <option value='search-alias=fashion-baby'>
              &#160;&#160;&#160;Baby
            </option>
          </select>
          <input className='search__input' type='text' aria-label='search' />
          <button
            type='submit'
            aria-label='go'
            className='search__button'
            title='go'
          >
            <AiOutlineSearch className='search__icon' />
          </button>
        </form>
      </div>
      <nav className='header__nav'>
        <div className='header__option' role='button' tabIndex={0}>
          <span>Hello, Sign in</span>
          <span>
            Account & Lists
            <AiFillCaretDown />
          </span>
        </div>
        <div className='header__option' role='button' tabIndex={0}>
          <span>Returns</span>
          <span>& Orders</span>
        </div>
        <div className='header__cart' role='button' tabIndex={0}>
          <BsCart3 className='header__cartLogo' />
          <span className='header__optionCart'>0</span>
          <span>Cart</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
