import sanityClient, { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const cofiguredSanityClient: SanityClient = sanityClient({
  projectId: 'pnco4mio',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
});

export function urlFor(source: string): string {
  const builder = imageUrlBuilder(cofiguredSanityClient);
  return builder.image(source).url();
}

export function urlForThumbnail(source: string): string {
  const builder = imageUrlBuilder(cofiguredSanityClient);
  return builder.image(source).height(38).url();
}
export default cofiguredSanityClient;
