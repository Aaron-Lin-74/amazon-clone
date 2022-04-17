import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Subheader from './Subheader';

describe('Subheader component', () => {
  test('should render the component', () => {
    render(<Subheader />, { wrapper: BrowserRouter });
    const navbar = document.getElementById('navbar_main_links')!;
    screen.getByRole('button', {
      name: /all/i,
    });
    within(navbar).getByRole('link', {
      name: /best sellers/i,
    });
    within(navbar).getByRole('link', {
      name: /customer service/i,
    });
    within(navbar).getByRole('link', {
      name: /today's deals/i,
    });
    within(navbar).getByRole('link', {
      name: /prime/i,
    });
    within(navbar).getByRole('link', {
      name: /fashion/i,
    });
    within(navbar).getByRole('link', {
      name: /music/i,
    });
    within(navbar).getByRole('link', {
      name: /new releases/i,
    });
    screen.getByRole('img', {
      name: /createspace/i,
    });
  });
  test('should open sidemenu when click all button', () => {
    render(<Subheader />, { wrapper: BrowserRouter });
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    const sidemenu = document.querySelector('.sidemenu');
    expect(sidemenu).not.toHaveClass('sidemenu--visible');
    userEvent.click(allBtn);
    expect(sidemenu).toHaveClass('sidemenu--visible');
  });
});
