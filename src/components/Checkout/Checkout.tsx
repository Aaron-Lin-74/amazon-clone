import React from 'react';
import './Checkout.scss';
import NumberFormat from 'react-number-format';
import Subtotal from './Subtotal/Subtotal';
import { getCartTotal, getCartItemNumber } from '../../store/reducer';

import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct/CheckoutProduct';

function Checkout() {
  const [{ cart }] = useStateValue();
  const subtotal = getCartTotal(cart);
  const numberOfItems = getCartItemNumber(cart);

  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <div className='cart'>
          <h1 className='cart__title'>
            {!cart.length ? 'Your Amazon Cart is empty.' : 'Shopping Cart'}
          </h1>
          <div className='cart__row cart__row--price' />
          {cart.map((item) => {
            return (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                stock={item.stock}
                freeShipping={item.freeShipping}
              />
            );
          })}
          <div className='cart__subtotalLabel subtotal__label'>
            Subtotal ({numberOfItems} {numberOfItems <= 1 ? 'item' : 'items'} ):
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
        </div>
        <div className='checkout__info'>
          <p>
            The price and availability of items at Amazon.com.au are subject to
            change. The Shopping Cart is a temporary place to store a list of
            your items and reflects each item&apos;s most recent price.
          </p>
          <p>
            Do you have a promotional code? We&apos;ll ask you to enter your
            claim code when it&apos;s time to pay.
          </p>
        </div>
      </div>
      <div className='checkout__right'>{!!cart.length && <Subtotal />}</div>
    </div>
  );
}

export default Checkout;
