import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import sanityClient, { urlFor } from '../../../lib/sanityClient';
import './OrderItem.scss';

type ItemData = {
  title: string;
  slug: { current: string };
  price: number;
  image: string;
};
function OrderItem({
  id,
  quantity,
  date,
}: {
  id: string;
  quantity: number;
  date: string;
}) {
  const [itemData, setItemData] = useState<ItemData | null>(null);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "product" && _id == "${id}"][0] {title, slug, price, "image": images[0].asset}`
      )
      .then((data) => setItemData(data))
      .catch(console.error);
  }, [id]);

  const addReturnCloseDays = (days: number): string => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toDateString();
  };
  return (
    <div className='orderItem'>
      {itemData && (
        <div className='orderItem__container'>
          <div className='deliver__info'>
            <span>On the way</span>
          </div>
          <div className='orderItem__card'>
            <div className='image__container'>
              <Link to={`/product/${itemData.slug.current}`}>
                <img src={urlFor(itemData.image, 90)} alt='product' />
              </Link>
            </div>
            <div className='title__container'>
              <Link to={`/product/${itemData.slug.current}`}>
                <p>{itemData.title}</p>
              </Link>
              <span>Return window closed on {addReturnCloseDays(14)}</span>
              <Link to={`/product/${itemData.slug.current}`}>
                <button type='button'>Buy it again</button>
              </Link>
            </div>
            <div className='price__container'>
              <span>
                <NumberFormat
                  value={itemData.price}
                  thousandSeparator
                  prefix='$'
                  displayType='text'
                  decimalScale={2}
                  fixedDecimalScale
                />
              </span>
              <br />
              <span>Qty: {quantity}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderItem;
