import React, { ReactNode } from 'react';
import './ProductCard.scss';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { useStateValue } from '../StateProvider';
import { CartActions } from '../../store/types';

interface Props {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  comments: number;
}

function ProductCard({ id, title, image, price, rating, comments }: Props) {
  const [{ cart }, dispatch] = useStateValue();
  const addToCart = () => {
    // Check whether the product has been added to the cart
    if (cart.find((item) => item.id === id) !== undefined) {
      dispatch({
        type: CartActions.ADD_AGAIN,
        payload: {
          id,
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
            rating,
            comments,
            quantity: 1,
            stock: 'In stock',
            freeShipping: true,
          },
        },
      });
    }
  };
  const ratingToStars = (): ReactNode => {
    const buffer: JSX.Element[] = [];
    for (let i = 0; i < Math.floor(rating); i += 1) {
      buffer.push(
        <span key={i}>
          <BsStarFill />
        </span>
      );
    }
    if (rating - Math.floor(rating) > 0) {
      buffer.push(
        <span key={Math.floor(rating)}>
          <BsStarHalf />
        </span>
      );
    }
    for (let j = Math.ceil(rating); j < 5; j += 1) {
      buffer.push(
        // eslint-disable-next-line react/no-array-index-key
        <span key={j}>
          <BsStar />
        </span>
      );
    }
    return buffer;
  };
  return (
    <div className='productCard' key={id}>
      <Link to={`/product/${id}`}>
        <img className='productCard__img' src={image} alt={title} />
      </Link>
      <div className='productCard__info'>
        <Link to={`/product/${id}`}>{title}</Link>
        <div className='productCard__rating' title={`${rating} out of 5 stars`}>
          {ratingToStars()}
          <span className='productCard__comments'>{comments}</span>
        </div>
        <p className='productCard__price'>
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
      </div>

      <button type='button' className='productCard__btn' onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
