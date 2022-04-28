import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const cofiguredSanityClient = sanityClient({
  projectId: 'pnco4mio',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
});

export function urlFor(source) {
  const builder = imageUrlBuilder(cofiguredSanityClient);
  return builder.image(source);
}

export default cofiguredSanityClient;
