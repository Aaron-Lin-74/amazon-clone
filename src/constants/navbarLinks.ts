interface LinkType {
  id: number;
  name: string;
  href: string;
}
const navbarLinks: LinkType[] = [
  { id: 0, name: 'Best Sellers', href: '/' },
  { id: 1, name: 'Customer Service', href: '/' },
  { id: 2, name: `Today's Deals`, href: '/' },
  { id: 3, name: 'Prime', href: '/' },
  { id: 4, name: 'Fashion', href: '/' },
  { id: 5, name: 'Music', href: '/' },
  { id: 6, name: 'New Releases', href: '/' },
  { id: 7, name: 'Kindle Books', href: '/' },
  { id: 8, name: 'Books', href: '/' },
  { id: 9, name: 'Electronics', href: '/' },
  { id: 10, name: 'Home', href: '/' },
];

export default navbarLinks;
