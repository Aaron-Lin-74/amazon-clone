interface LinkType {
  id: number;
  name: string;
  href: string;
}
const NAVBARLINKS: LinkType[] = [
  { id: 0, name: 'Best Sellers', href: '/demo' },
  { id: 1, name: 'Customer Service', href: '/demo' },
  { id: 2, name: `Today's Deals`, href: '/demo' },
  { id: 3, name: 'Prime', href: '/demo' },
  { id: 4, name: 'Fashion', href: '/demo' },
  { id: 5, name: 'Music', href: '/demo' },
  { id: 6, name: 'New Releases', href: '/demo' },
  { id: 7, name: 'Kindle Books', href: '/demo' },
  { id: 8, name: 'Books', href: '/demo' },
  { id: 9, name: 'Electronics', href: '/demo' },
  { id: 10, name: 'Home', href: '/demo' },
];

export default NAVBARLINKS;
