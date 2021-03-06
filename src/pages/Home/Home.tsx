import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Hero from './Hero/Hero';
import sanityClient, { urlFor } from '../../lib/sanityClient';
import { ProductType } from '../../types';
import './Home.scss';

function Home() {
  const [allProducts, setAllProducts] = useState<ProductType[] | null>(null);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "product"] {_id, title, slug, price, price_id, rating, images, comments, stock}`
      )
      .then((data) => setAllProducts(data))
      .catch(console.error);
  }, []);

  return (
    <main className='home'>
      <div className='home__container'>
        <Hero />
        <div className='home__grid'>
          {allProducts &&
            allProducts.map(
              ({
                _id,
                title,
                price,
                price_id,
                rating,
                images,
                stock,
                comments,
                slug,
              }) => {
                return (
                  <ProductCard
                    id={_id}
                    key={_id}
                    title={title}
                    price={price}
                    price_id={price_id}
                    rating={rating}
                    image={urlFor(images[0])}
                    comments={comments}
                    stock={stock}
                    slug={slug.current}
                  />
                );
              }
            )}
        </div>
      </div>
    </main>
  );
}

export default Home;
