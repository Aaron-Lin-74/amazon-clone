import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';
import Gallery from './Gallery';

describe('Gallery component', () => {
  const mockImages = [
    {
      thumbnail: 'http://test.thumbnail1.jpg',
      image: 'http://test.image1.jpg',
    },
    {
      thumbnail: 'http://test.thumbnail2.jpg',
      image: 'http://test.image2.jpg',
    },
  ];

  test('should render the component', () => {
    render(<Gallery images={mockImages} />, { wrapper: BrowserRouter });
    expect(document.getElementsByClassName('gallery__list')[0]).toHaveClass(
      'gallery__list--active'
    );
    expect(document.getElementsByClassName('thumbnails__list')).toHaveLength(2);
    expect(document.getElementsByClassName('gallery__list')).toHaveLength(2);
  });

  test('should change image list class when hover the related thumbnail', () => {
    render(<Gallery images={mockImages} />, { wrapper: BrowserRouter });
    expect(document.getElementsByClassName('gallery__list')[0]).toHaveClass(
      'gallery__list--active'
    );
    expect(document.getElementsByClassName('gallery__list')[1]).toHaveClass(
      'gallery__list--hidden'
    );
    const secondThumbnail =
      document.getElementsByClassName('thumbnails__list')[1];
    userEvent.hover(secondThumbnail);
    const firstGalleryList =
      document.getElementsByClassName('gallery__list')[0];
    const secondGalleryList =
      document.getElementsByClassName('gallery__list')[1];

    expect(firstGalleryList).toHaveClass('gallery__list--hidden');
    expect(secondGalleryList).toHaveClass('gallery__list--active');
  });
});
