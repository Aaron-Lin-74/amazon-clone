import { features } from 'process';

export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' },
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
    },
    {
      name: 'thumbnails',
      title: 'Thumbnails',
      type: 'array',
      of: [{ type: 'image' }],
      option: { hotspot: true },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 90 },
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
