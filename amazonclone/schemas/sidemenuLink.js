import footerLink from './footerLink';

export default {
  name: 'sidemenuLink',
  title: 'SidemenuLinks',
  type: 'document',
  fields: [
    { name: 'id', title: 'Id', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            { name: 'name', title: 'Title', type: 'string' },
            { name: 'href', title: 'Href', type: 'string' },
          ],
        },
      ],
    },
  ],
};
