import React, { ReactNode, useState, useEffect } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import NumberFormat from 'react-number-format';
import { useParams } from 'react-router-dom';
import sanityClient, { urlFor } from '../../lib/sanityClient';
import { ProductType } from '../../types';
// import PRODUCTS from '../../constants/products';
import Gallery from './Gallery/Gallery';
import Panel from './Panel/Panel';
import './Product.scss';

function Product() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "product" && slug.current == $slug]`, { slug })
      .then((data) => setProduct(data[0]))
      .catch(console.error);
  }, [slug]);
  const ratingToStars = (rating: number): ReactNode => {
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
    <div className='product'>
      {product && (
        <>
          <div className='product__container'>
            <div className='container__rightColumn'>
              <Panel
                id={product._id}
                title={product.title}
                image={urlFor(product.images[0])}
                price={product.price}
                price_id={product.price_id}
                stock={product.stock}
                slug={product.slug.current}
              />
            </div>
            <div className='container__leftColumn'>
              <Gallery images={product.images} />
            </div>
            <div className='container__centerColumn'>
              <h1 className='product__title'>{product && product.title}</h1>
              <div
                className='productCard__rating'
                title={`${product.rating} out of 5 stars`}
              >
                {ratingToStars(product.rating)}
                <span className='productCard__comments'>
                  {product.comments}
                </span>
              </div>
              <hr />
              <p className='product__price'>
                <small>$</small>
                <strong>
                  <NumberFormat
                    value={product.price}
                    thousandSeparator
                    displayType='text'
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </strong>
              </p>
              <div className='product__icons'>
                <div className='icons__wrapper'>
                  <div className='icons__container'>
                    <img
                      src='https://images-na.ssl-images-amazon.com/images/G/35/A2I-Convert/mobile/IconFarm/icon-secure-transaction._CB404390905_.png'
                      alt='Secure transaction'
                    />
                    <p> Secure transaction </p>
                  </div>
                  <div className='icons__container'>
                    <img
                      src='https://images-na.ssl-images-amazon.com/images/G/35/A2I-Convert/mobile/IconFarm/icon-returns._CB406595515_.png'
                      alt='Returns Policy'
                    />
                    <p> Returns Policy </p>
                  </div>
                  <div className='icons__container'>
                    <img
                      src='https://images-na.ssl-images-amazon.com/images/G/35/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB406595515_.png'
                      alt='Amazon-managed Delivery'
                    />
                    <p> Amazon-managed Delivery </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className='product__featureOverview'>
                <table>
                  <tbody>
                    {product &&
                      product.overview.map((item, idx) => {
                        return (
                          // eslint-disable-next-line react/no-array-index-key
                          <React.Fragment key={idx}>
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.value}</td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <hr />
              <div className='product__featureBullets'>
                <h3 className='featureBullets__about'>About this item</h3>
                <ul>
                  {product.features?.map((feature, idx) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <li key={idx}>{feature}</li>;
                  })}
                </ul>
              </div>
            </div>
            <hr />
          </div>
          <div className='product__description'>
            {product.description?.map((image, idx) => {
              return (
                <img
                  className='description__image'
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  src={urlFor(image)}
                  alt=''
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
