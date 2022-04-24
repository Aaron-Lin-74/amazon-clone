import React, { useState } from 'react';
import './Gallery.scss';

type Props = {
  images: { thumbnail: string; image: string }[];
};
function Gallery({ images }: Props) {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const setImageClassName = (idx: number): string => {
    if (idx === imageIndex) {
      return 'gallery__list gallery__list--active';
    }
    return 'gallery__list gallery__list--hidden';
  };
  return (
    <div className='gallery'>
      <div className='gallery__thumbnails'>
        <ul>
          {images.map((image, idx) => {
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className='thumbnails__list'
                onMouseEnter={() => setImageIndex(idx)}
              >
                <img src={image.thumbnail} alt='product thumbnail' />
              </li>
            );
          })}
        </ul>
      </div>
      <div className='gallery__images'>
        <div className='image__container'>
          <ul>
            {images.map((image, idx) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={idx} className={setImageClassName(idx)}>
                  <img
                    className='product__image'
                    src={image.image}
                    alt='product'
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
