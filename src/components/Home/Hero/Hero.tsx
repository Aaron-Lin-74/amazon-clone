import React, { useState } from 'react';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import HEROIMAGES from '../../../constants/heroImages';
import './Hero.scss';

function Hero() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const loopIndex = (num: number): number => {
    const lastIndex = HEROIMAGES.length - 1;
    if (num < 0) {
      return lastIndex;
    }
    if (num > lastIndex) {
      return 0;
    }
    return num;
  };
  const prevImage = (): void => {
    setCurrentIdx((cur) => loopIndex(cur - 1));
  };
  const nextImage = (): void => {
    setCurrentIdx((cur) => loopIndex(cur + 1));
  };
  const setClassName = (id: number): string => {
    if (id === currentIdx) {
      return 'hero__img';
    }
    if (
      id === currentIdx - 1 ||
      (currentIdx === 0 && id === HEROIMAGES.length - 1)
    ) {
      return 'hero__img hero__img--prev';
    }
    return 'hero__img hero__img--next';
  };

  return (
    <div className='hero'>
      <button
        type='button'
        className='hero__btn hero__btn--left'
        aria-label='previous hero'
        title='previous hero'
        onClick={prevImage}
      >
        <VscChevronLeft />
        <VscChevronLeft />
      </button>
      {HEROIMAGES.map((item) => {
        return (
          <Link to={item.href} key={item.id} className={setClassName(item.id)}>
            <img src={item.src} alt='hero' />
          </Link>
        );
      })}
      <button
        type='button'
        className='hero__btn hero__btn--right'
        aria-label='next hero'
        title='next hero'
        onClick={nextImage}
      >
        <VscChevronRight />
        <VscChevronRight />
      </button>
    </div>
  );
}

export default Hero;
