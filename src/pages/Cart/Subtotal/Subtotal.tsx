import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { AiFillCheckCircle } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { RedirectToCheckoutOptions } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import getStripe from '../../../lib/stripePayment';
import { getCartTotal, getCartItemNumber } from '../../../store/reducer';
import { useStateValue } from '../../../components/StateProvider';
import './Subtotal.scss';

function Subtotal() {
  const [{ cart, user }] = useStateValue();
  const [loading, setLoading] = useState<boolean>(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const subtotal = getCartTotal(cart);
  const numberOfItems = getCartItemNumber(cart);
  const navigate = useNavigate();

  const items = cart.map((item) => {
    return { price: item.price_id, quantity: item.quantity };
  });
  const checkoutOptions: RedirectToCheckoutOptions = {
    customerEmail: user ? user.email! : undefined,
    lineItems: items,
    mode: 'payment',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/checkout`,
    shippingAddressCollection: { allowedCountries: ['AU'] },
    clientReferenceId: 'id',
  };
  const redirectToCheckout = async () => {
    // Check if the client has signed in, if not redirect to sign in page
    if (!user) {
      navigate('/signin');
      return;
    }
    setLoading(true);
    try {
      const stripe = await getStripe();
      await stripe!.redirectToCheckout(checkoutOptions);
    } catch (err) {
      if (err instanceof Error) {
        setStripeError(err.message);
      } else {
        setStripeError(String(err));
      }
      toast.error(
        stripeError || 'Oops! Something goes wrong, please try later again'
      );
    } finally {
      setLoading(false);
    }
  };

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
      <button
        type='button'
        className='subtotal__btn'
        onClick={redirectToCheckout}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Proceed to Checkout'}
      </button>
    </div>
  );
}

export default Subtotal;
