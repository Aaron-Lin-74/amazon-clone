import { MdShoppingCart } from 'react-icons/md';
export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: MdShoppingCart,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    { name: 'price', title: 'Price', type: 'number' },
    {
      name: 'price_id',
      title: 'Price ID',
      type: 'string',
      description: 'This is the price id generate from stripe product',
    },
    { name: 'rating', title: 'Rating', type: 'number' },
    { name: 'comments', title: 'Comments', type: 'number' },
    { name: 'stock', title: 'Stock', type: 'number' },
    { name: 'delivery', title: 'Delivery', type: 'string' },
    {
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [
        {
          name: 'spec',
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      option: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 90 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'image' }],
      option: { hotspot: true },
    },
  ],
};
