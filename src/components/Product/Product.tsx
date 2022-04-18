import React, { ReactNode } from 'react';
import './Product.scss';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  comments: number;
}
function Product({ id, title, image, price, rating, comments }: Props) {
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
    <div className='product' key={id}>
      <img className='product__img' src={image} alt={title} />
      <div className='product__info'>
        <Link to={`/product/${id}`}>{title}</Link>
        <div className='product__rating' title={`${rating} out of 5 stars`}>
          {ratingToStars()}
          <span className='product__comments'>{comments}</span>
        </div>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>

      <button type='button' className='product__btn'>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
