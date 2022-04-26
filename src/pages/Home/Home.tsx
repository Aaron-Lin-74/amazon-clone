import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Hero from './Hero/Hero';
import './Home.scss';

function Home() {
  return (
    <main className='home'>
      <div className='home__container'>
        <Hero />
        <div className='home__row'>
          <ProductCard
            id='12321341'
            title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback'
            price={11.96}
            rating={4.5}
            image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg'
            comments={180}
          />
          <ProductCard
            id='49538094'
            title='Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl'
            price={239.0}
            rating={4}
            image='https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg'
            comments={5}
          />
        </div>

        <div className='home__row'>
          <ProductCard
            id='4903850'
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image='https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg'
            comments={25}
          />
          <ProductCard
            id='23445930'
            title='Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric'
            price={98.99}
            rating={5}
            image='https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$'
            comments={1440}
          />
          <ProductCard
            id='3254354345'
            title='New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)'
            price={598.99}
            rating={4}
            image='https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg'
            comments={260}
          />
        </div>

        <div className='home__row'>
          <ProductCard
            id='90829332'
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            rating={4}
            image='https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg'
            comments={360}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
