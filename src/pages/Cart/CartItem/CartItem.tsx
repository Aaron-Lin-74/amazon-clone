import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartActions } from '../../../store/types';
import { useStateValue } from '../../../components/StateProvider';
import './CartItem.scss';

interface Props {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
}
function CartItem({ id, image, title, price, quantity, stock }: Props) {
  const [, dispatch] = useStateValue();
  const [isMoreThanTen, setIsMoreThanTen] = useState<boolean>(() => {
    return quantity > 10;
  });
  const [inputQty, setInputQty] = useState<number>(quantity);
  useEffect(() => {
    toast.remove();
  }, []);
  const removeFromBasket = (): void => {
    // remove the item from the basket
    dispatch({
      type: CartActions.DELETE,
      payload: { id },
    });
    toast(
      <div style={{ display: 'flex' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '40px',
            objectFit: 'contain',
            paddingRight: '10px',
          }}
        />
        <span>Successfully delete {title} from cart.</span>
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

  const updateInputQty = (qty: number): void => {
    if (Number.isNaN(qty)) return;
    if (qty < 0) return;
    if (qty > stock) {
      toast(
        'The quantity you want exceed our current stock limit, please reduce the quantity.',
        { icon: '⚠️' }
      );
      return;
    }
    setInputQty(qty);
  };

  const handleQuantityChange = (qty: number): void => {
    if (qty === 0) {
      removeFromBasket();
      return;
    }

    // When the user clicked 10+, we use -1 for this option's value
    if (qty === -1) {
      setIsMoreThanTen(true);
      return;
    }

    // When the user input a quantity less than 10, change back to select
    if (qty < 10) {
      setIsMoreThanTen(false);
    }
    dispatch({
      type: CartActions.CHANGE_QUANTITY,
      payload: { id, quantity: qty },
    });
    setInputQty(qty);
  };

  return (
    <>
      <div className='cartItem'>
        <Link to={`/product/${id}`}>
          <img className='cartItem__image' src={image} alt={title} />
        </Link>

        <div className='cartItem__info'>
          <ul className='info__list'>
            <li>
              <Link to={`/product/${id}`}>
                <p className='info__title'>{title}</p>
              </Link>
            </li>
            <li>
              <p className='info__stock'>
                {stock > 0 ? 'In stock.' : 'Out of stock'}
              </p>
            </li>

            <li>
              <span className='info__shipping'>Eligible for FREE Shipping</span>
            </li>

            <li>
              <div className='info__gift'>
                <input type='checkbox' name='isToBeGiftWrapped' value='1' />
                <span className='gift__text'>This will be a gift</span>
              </div>
            </li>
          </ul>
          <div className='info__actionContainer'>
            <form aria-label='update quantity'>
              {isMoreThanTen && (
                <>
                  <input
                    className='quantity__input'
                    title='quantity'
                    aria-label='quantity'
                    type='number'
                    value={inputQty}
                    onChange={(e) =>
                      updateInputQty(parseInt(e.target.value, 10))
                    }
                    required
                  />
                  <button
                    type='button'
                    onClick={() => handleQuantityChange(inputQty)}
                  >
                    Update
                  </button>
                </>
              )}
              {!isMoreThanTen && (
                <select
                  className='quantity__dropdown'
                  name='quantity'
                  tabIndex={0}
                  title='quantity'
                  aria-label='update quantity'
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value, 10))
                  }
                >
                  <option value={0}>0 (Delete)</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  {/* We use value -1 to represent 10+ */}
                  <option value={-1}>10+</option>
                </select>
              )}
            </form>
            <span className='cartItem__delimiter'>|</span>
            <span
              className='cartItem__link'
              role='button'
              onClick={removeFromBasket}
              onKeyDown={removeFromBasket}
              tabIndex={0}
            >
              Delete
            </span>
            <span className='cartItem__delimiter'>|</span>
            <span className='cartItem__link'>Save for later</span>
          </div>
        </div>
        <p className='cartItem__price'>
          <strong>
            <NumberFormat
              value={price}
              thousandSeparator
              prefix='$'
              displayType='text'
              decimalScale={2}
              fixedDecimalScale
            />
          </strong>
        </p>
      </div>
      <div className='cart__row' />
    </>
  );
}

export default CartItem;
