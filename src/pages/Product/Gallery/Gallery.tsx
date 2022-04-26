import React, { useState } from 'react';
import './Gallery.scss';

type Props = {
  images: { thumbnail: string; image: string }[];
};
function Gallery({ images }: Props) {
  const magnifierHeight: number = 500;
  const magnifierWidth: number = 500;
  const zoomLevel: number = 2;

  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState<[number, number]>([0, 0]);

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
        <div className='images__container'>
          <ul>
            {images.map((image, idx) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={idx} className={setImageClassName(idx)}>
                  <img
                    className='product__image'
                    src={image.image}
                    alt='product'
                    onMouseEnter={(e) => {
                      // update image size and turn-on magnifier
                      const elem = e.currentTarget;
                      const { width, height } = elem.getBoundingClientRect();
                      setSize([width, height]);
                      setShowMagnifier(true);
                    }}
                    onMouseMove={(e) => {
                      // update cursor position
                      const elem = e.currentTarget;
                      const { top, left } = elem.getBoundingClientRect();
                      // calculate cursor position on the image
                      const curX = e.pageX - left - window.pageXOffset;
                      const curY = e.pageY - top - window.pageYOffset;
                      setXY([curX, curY]);
                    }}
                    onMouseLeave={() => {
                      setShowMagnifier(false);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: 'none',

          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          top: '0',
          left: '100%',
          opacity: '1',
          border: '1px solid lightgray',
          backgroundColor: 'white',
          backgroundImage: `url('${images[imageIndex].image}')`,
          backgroundRepeat: 'no-repeat',

          // calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          // calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </div>
  );
}

export default Gallery;
