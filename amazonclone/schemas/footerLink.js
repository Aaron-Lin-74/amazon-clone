export default {
  name: 'footerLink',
  title: 'FooterLinks',
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
          title: 'Link',
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'href', title: 'Href', type: 'string' },
          ],
        },
      ],
    },
  ],
};
