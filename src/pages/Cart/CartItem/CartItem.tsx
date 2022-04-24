import React from 'react';
import NumberFormat from 'react-number-format';
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

  const removeFromBasket = (): void => {
    // remove the item from the basket
    dispatch({
      type: CartActions.DELETE,
      payload: { id },
    });
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedQty = parseInt(e.target.value, 10);
    if (selectedQty === 0) {
      removeFromBasket();
    }
    dispatch({
      type: CartActions.CHANGE_QUANTITY,
      payload: { id, quantity: selectedQty },
    });
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
            <select
              className='quantity__dropdown'
              name='quantity'
              tabIndex={0}
              title='quantity'
              value={quantity}
              onChange={handleQuantityChange}
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
              <option value={10}>10</option>
            </select>
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
