import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import './Panel.scss';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useStateValue } from '../../../components/StateProvider';
import { CartActions } from '../../../store/types';

type Props = {
  id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
};
function Panel({ id, title, image, price, stock }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [{ cart }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // Remove any toast notification when back to the page.
  useEffect(() => {
    toast.remove();
  }, []);

  const addToCart = () => {
    // Check whether the product has been added to the cart
    if (cart.find((item) => item.id === id) !== undefined) {
      dispatch({
        type: CartActions.ADD_AGAIN,
        payload: {
          id,
          quantity,
        },
      });
    } else {
      dispatch({
        type: CartActions.ADD,
        payload: {
          item: {
            id,
            title,
            image,
            price,
            quantity,
            stock,
          },
        },
      });
    }
    toast.success(
      <div style={{ display: 'flex' }}>
        <img
          src={image}
          alt={title}
          style={{ width: '40px', objectFit: 'contain', paddingRight: '10px' }}
        />
        <Link
          to='/checkout'
          style={{ textDecoration: 'none', color: '#0f1111' }}
        >
          <span>
            Successfully added {title} &times; {quantity} to cart.
          </span>
        </Link>
      </div>,
      {
        duration: 4000,
        position: 'top-right',
        style: {
          width: '400px',
        },
      }
    );
  };
  const buyNow = () => {
    // Check whether the product has been added to the cart
    if (cart.find((item) => item.id === id) === undefined) {
      addToCart();
      toast.remove();
    }
    navigate('/checkout');
  };

  // Free delivery would take arbitrary 14 days.
  const getFreeDeliveryDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toLocaleString('en-AU', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  // Fast delivery would take arbitrary 7 days.
  const getDeliveryDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleString('en-AU', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };
  return (
    <div className='panel'>
      <p className='panel__price'>
        <small>$</small>
        <strong>
          <NumberFormat
            value={price}
            thousandSeparator
            displayType='text'
            decimalScale={2}
            fixedDecimalScale
          />
        </strong>
      </p>
      <div className='panel__delivery'>
        <p>
          <span className='delivery__text'>FREE delivery:</span>{' '}
          <strong>{getFreeDeliveryDate()}</strong>
        </p>
        <p>
          <span>Fastest delivery:</span> <strong>{getDeliveryDate()}</strong>
        </p>
        <p>
          <HiOutlineLocationMarker />
          <span className='delivery__location'>Select delivery location</span>
        </p>
      </div>
      <div className='panel__cart'>
        <p className='panel__text'>
          {stock > 0 ? 'In stock.' : 'Out of stock'}
        </p>
        <label htmlFor='product__quantity'>
          <span>Quantity:</span>
          <select
            id='product__quantity'
            name='quantity'
            tabIndex={0}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </label>
        <div className='panel__btnContainer'>
          <button
            className='panel__btn panel__btn--yellow'
            type='button'
            onClick={addToCart}
          >
            Add to Cart
          </button>
          <button
            className='panel__btn panel__btn--orange'
            type='button'
            onClick={buyNow}
          >
            Buy now
          </button>
        </div>
        <p className='panel__shippment'>Ships from Amazon</p>
        <div className='panel__gift'>
          <input type='checkbox' name='isToBeGiftWrapped' value='1' />
          <span>Add a gift receipt for easy returns</span>
        </div>
        <hr />
        <Link to='/demo'>
          <button className='wishList__btn' type='button'>
            Add to Wish List
          </button>
        </Link>
      </div>
      <Toaster
        containerStyle={{
          top: 100,
        }}
      />
    </div>
  );
}

export default Panel;
