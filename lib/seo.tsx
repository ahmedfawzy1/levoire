import type { Metadata } from 'next';

const defaultSEO: Metadata = {
  metadataBase: new URL('https://levoire.shop'),
  title: 'Shop Trendy & Elegant Clothing - Levoire',
  description:
    'Explore the latest fashion trends with Levoire. Shop high-quality, stylish, and elegant clothing for every occasion with secure and seamless shopping.',
  openGraph: {
    type: 'website',
    url: 'https://levoire.shop',
    title: 'Shop Trendy & Elegant Clothing - Levoire',
    siteName: 'Levoire',
    description:
      'Explore the latest fashion trends with Levoire. Shop high-quality, stylish, and elegant clothing for every occasion with secure and seamless shopping.',
    locale: 'en_US',
    images: [
      {
        url: 'https://levoire.com/images/opengraph.webp',
        alt: 'Levoire Fashion Store',
      },
    ],
  },
  twitter: {
    creator: '@levoire_fashion',
    site: 'https://levoire.shop',
    card: 'summary_large_image',
  },
};

export default function generateSEO(props: Metadata = {}): Metadata {
  const seo: Metadata = { ...defaultSEO, ...props };
  seo.title += ' | Levoire';
  seo.openGraph = {
    ...seo.openGraph,
    title: seo.title || undefined,
    description: seo.description || undefined,
  };
  seo.twitter = {
    ...seo.twitter,
    site: seo.openGraph?.url?.toString(),
    title: seo.openGraph.title || undefined,
    images: seo.openGraph.images,
    description: seo.openGraph.description,
  };
  return { ...seo, ...props };
}
