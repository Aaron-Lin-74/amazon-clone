import React from 'react';
import NumberFormat from 'react-number-format';
import { AiFillCheckCircle } from 'react-icons/ai';
import { getCartTotal, getCartItemNumber } from '../../../store/reducer';
import { useStateValue } from '../../StateProvider';
import './Subtotal.scss';

function Subtotal() {
  const [{ cart }] = useStateValue();
  const subtotal = getCartTotal(cart);
  const numberOfItems = getCartItemNumber(cart);
  return (
    <div className='subtotal'>
      <div className='subtotal__alert'>
        <AiFillCheckCircle />
        <div className='subtotal__alertText'>
          <span>Your order qualifies for FREE Delivery</span>
          <span>Choose this option at checkout.</span>
        </div>
      </div>
      <div className='subtotal__label'>
        Subtotal ({numberOfItems} {numberOfItems <= 1 ? 'item' : 'items'} ):{' '}
        <strong>
          <NumberFormat
            value={subtotal}
            thousandSeparator
            prefix='$'
            displayType='text'
            decimalScale={2}
            fixedDecimalScale
          />
        </strong>
      </div>
      <div className='subtotal__gift'>
        <label htmlFor='sc-buy-box-gift-checkbox'>
          <input
            id='sc-buy-box-gift-checkbox'
            type='checkbox'
            name='isToBeGiftWrapped'
            value='1'
          />
          <span className='gift__text'>This order contains a gift</span>
        </label>
      </div>

      <button type='button' className='subtotal__btn'>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
