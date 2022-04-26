type LinkType = {
  id: number;
  title: string;
  links: { id: number; name: string; href: string }[];
};
const FOOTERlINKS: LinkType[] = [
  {
    id: 0,
    title: 'Get to Know Us',
    links: [
      { id: 0, name: 'About Us', href: '/demo' },
      { id: 1, name: 'Career', href: '/demo' },
      { id: 2, name: 'Corporate Information', href: '/demo' },
      { id: 3, name: 'Press Releases', href: '/demo' },
      { id: 4, name: 'Amazon Science', href: '/demo' },
    ],
  },
  {
    id: 1,
    title: 'Make Money with Us',
    links: [
      { id: 0, name: 'Independently Publish with Us', href: '/demo' },
      { id: 1, name: 'Sell on Amazon', href: '/demo' },
      { id: 2, name: 'Fulfilment by Amazon', href: '/demo' },
      { id: 3, name: 'Drive with Amazon Flex', href: '/demo' },
      { id: 4, name: 'Advertise Your Products', href: '/demo' },
      { id: 5, name: 'Associates Program', href: '/demo' },
      { id: 6, name: 'Host an Amazon Hub', href: '/demo' },
    ],
  },
  {
    id: 2,
    title: 'Let Us Help You',
    links: [
      { id: 0, name: 'COVID-19 and Amazon', href: '/demo' },
      { id: 0, name: 'Your Account', href: '/demo' },
      { id: 0, name: 'Your Orders', href: '/demo' },
      { id: 0, name: 'Delivery Rates & Policies', href: '/demo' },
      { id: 0, name: 'Returns & Replacements', href: '/demo' },
      { id: 0, name: 'Manage Your Content and Devices', href: '/demo' },
      { id: 0, name: 'Help', href: '/demo' },
    ],
  },
];

export default FOOTERlINKS;
