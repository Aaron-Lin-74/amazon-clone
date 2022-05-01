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
  return builder.image(source).url();
}

export function urlForThumbnail(source) {
  const builder = imageUrlBuilder(cofiguredSanityClient);
  return builder.image(source).height(38).url();
}
export default cofiguredSanityClient;
