type Links = { name: string; href: string }[];
type Sidemenu = { title: string; links: Links }[];

const SIDEMENU: Sidemenu = [
  {
    title: 'Trending',
    links: [
      { name: 'Best Sellers', href: '/demo' },
      { name: 'New Releases', href: '/demo' },
      { name: 'Movers and Shakers', href: '/demo' },
    ],
  },
  {
    title: 'Digital Content And Devices',
    links: [
      { name: 'Echo & Alexa', href: '/demo' },
      { name: 'Kindle E-readers & Books', href: '/demo' },
      { name: 'Amazon Fire TV', href: '/demo' },
      { name: 'Amazon Prime Video', href: '/demo' },
      { name: 'Amazon Music', href: '/demo' },
      { name: 'Audible Audiobooks', href: '/demo' },
    ],
  },
  {
    title: 'Shop By Department',
    links: [
      { name: 'Books', href: '/demo' },
      { name: 'Clothing & Accessories', href: '/demo' },
      { name: 'Music, Movies & TV Shows', href: '/demo' },
      { name: 'Computers', href: '/demo' },
      { name: 'See All', href: '/demo' },
    ],
  },
  {
    title: 'Programs & Features',
    links: [
      { name: 'Amazon Global Store', href: '/demo' },
      { name: 'Gift Cards', href: '/demo' },
      { name: 'Amazon Launchpad', href: '/demo' },
      { name: 'Amazon Outlet', href: '/demo' },
      { name: 'See All', href: '/demo' },
    ],
  },
  {
    title: 'Help & Settings',
    links: [
      { name: 'Your Account', href: '/demo' },
      { name: 'Customer Service', href: '/demo' },
    ],
  },
];

export default SIDEMENU;
