type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  comments?: number;
  delivery: string;
  stock: number;
  image: string;
  overview: { name: string; value: string }[];
  features?: string[];
  images: { thumbnail: string; image: string }[];
  description?: string[];
};
const PRODUCTS: Product[] = [
  {
    id: '12321341',
    title:
      'Anker Power Bank, PowerCore 26800mAh Portable Charger with Dual Input Port and Double-Speed Recharging, 3 USB Ports External Battery for iPhone, iPad, Samsung Galaxy, Android and Other Smart Devices',
    price: 90.99,
    rating: 4.7,
    comments: 27157,
    delivery: 'free',
    stock: 100,
    image: 'https://m.media-amazon.com/images/I/61vj2BPDpuL._AC_SX425_.jpg',
    overview: [
      {
        name: 'Compatible phone models',
        value: 'Apple Iphone 8, Lg Optimus 4X, Samsung Galaxy S8',
      },
      { name: 'Colour', value: 'Black' },
      { name: 'Brand', value: 'Anker' },
      { name: 'Connector type', value: 'Micro USB' },
      { name: 'Voltage', value: '5 Volts' },
    ],
    features: [
      'The Anker Advantage: Join the 30 million+ powered by our leading technology.',
      'Colossal Capacity: 26800mAh of power charges most phones over 6 times, tablets at least 2 times and any other USB device multiple times.',
      "High-Speed Charging: 3 USB output ports equipped with Anker's PowerIQ and VoltageBoost technology ensure high-speed charging for three devices—simultaneously (Not compatible with Qualcomm Quick Charge).",
      'Recharge 2X Faster: Dual Micro USB (20W) input offers recharge speeds up to twice as fast as standard portable chargers—a full recharge takes just over 6 hours while using both input ports (wall charger not included).',
      'What You Get: PowerCore 26800, 2X Micro USB Cable, Travel Pouch, Welcome Guide, our worry-free 18-month warranty and friendly customer service. USB-C cable and Lightning cable for iPhone / iPad sold separately.',
    ],

    images: [
      {
        thumbnail:
          'https://m.media-amazon.com/images/I/31wozazJiBL._AC_US40_.jpg',
        image: 'https://m.media-amazon.com/images/I/61vj2BPDpuL._AC_SX425_.jpg',
      },
      {
        thumbnail:
          'https://m.media-amazon.com/images/I/413IGh5oJxL._AC_US40_.jpg',
        image: 'https://m.media-amazon.com/images/I/61bcbzizqaL._AC_SX522_.jpg',
      },
      {
        thumbnail:
          'https://m.media-amazon.com/images/I/41VieDAC6IL._AC_US40_.jpg',
        image: 'https://m.media-amazon.com/images/I/61HRt5w9-pL._AC_SX522_.jpg',
      },
      {
        thumbnail:
          'https://m.media-amazon.com/images/I/41LMbMGkH0L._AC_US40_.jpg',
        image: 'https://m.media-amazon.com/images/I/61GzH7Lg6EL._AC_SX522_.jpg',
      },
      {
        thumbnail:
          'https://m.media-amazon.com/images/I/41dXHa4yPFL._AC_US40_.jpg',
        image: 'https://m.media-amazon.com/images/I/71nzvbcZ4WL._AC_SY450_.jpg',
      },
    ],
    description: [
      'https://m.media-amazon.com/images/S/aplus-media/sc/87e0e066-7708-475e-90e0-9ec4326c7d5f.__CR0,0,1940,600_PT0_SX970_V1___.jpg',
      'https://m.media-amazon.com/images/S/aplus-media/sc/87e0e066-7708-475e-90e0-9ec4326c7d5f.__CR0,0,1940,600_PT0_SX970_V1___.jpg',
      'https://m.media-amazon.com/images/S/aplus-media/sc/87e0e066-7708-475e-90e0-9ec4326c7d5f.__CR0,0,1940,600_PT0_SX970_V1___.jpg',
      'https://m.media-amazon.com/images/S/aplus-media/sc/87e0e066-7708-475e-90e0-9ec4326c7d5f.__CR0,0,1940,600_PT0_SX970_V1___.jpg',
      'https://m.media-amazon.com/images/S/aplus-media/sc/87e0e066-7708-475e-90e0-9ec4326c7d5f.__CR0,0,1940,600_PT0_SX970_V1___.jpg',
      'https://m.media-amazon.com/images/S/aplus-media/sc/87e0e066-7708-475e-90e0-9ec4326c7d5f.__CR0,0,1940,600_PT0_SX970_V1___.jpg',
    ],
  },
];

export default PRODUCTS;
