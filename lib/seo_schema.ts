export const generateProductSchema = (product: any, slug: string) => ({
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: product?.slug,
  image: product?.featuredImage?.url,
  description: product?.description?.replace(/<[^>]*>/g, ''),
  sku: product?.id,
  offers: {
    '@type': 'Offer',
    url: `${process.env.NEXTAUTH_URL}/${slug}`,
    priceCurrency: 'USD',
    price: product?.maxPrice,
    priceValidUntil: '2025-1-1',
    itemCondition: 'https://schema.org/NewCondition',
    availability: 'https://schema.org/InStock',
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      merchantReturnPolicy: `${process.env.NEXTAUTH_URL}/legal/refund`,
      returnPolicyCategory:
        'https://schema.org/MerchantReturnFiniteReturnWindow',
      applicableCountry: 'US',
      returnFees: {
        '@type': 'MonetaryAmount',
        value: '0.00',
        currency: 'USD',
      },
      returnMethod: `${process.env.NEXTAUTH_URL}/legal/refund`,
      merchantReturnDays: 7,
    },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0.00',
        currency: 'USD',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'US',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: '0',
          maxValue: '1',
          unitCode: 'd',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: '1',
          maxValue: '5',
          unitCode: 'd',
        },
        minimum: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'd',
        },
        maximum: {
          '@type': 'QuantitativeValue',
          value: 5,
          unitCode: 'd',
        },
      },
      transitTimeLabel: 'Standard shipping',
    },
  },
  category: 'Clothing',
  brand: {
    '@type': 'Brand',
    name: 'Levoire',
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: product?.description?.replace(/<[^>]*>/g, ''),
      author: {
        '@type': 'Person',
        name: 'Grace',
      },
      datePublished: product?.createdAt,
      dateModified: product?.updatedAt,
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: 'the product is so good',
      author: {
        '@type': 'Person',
        name: 'Lewis',
      },
      datePublished: '2025-01-1T16:45:00.000Z',
      dateModified: '2025-01-1T16:45:00.000Z',
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody:
        'Iam beyond impressed with this jacket! Its stylish, warm, and incredibly well-made.',
      author: {
        '@type': 'Person',
        name: 'Mark',
      },
      datePublished: '2025-01-15T15:30:00.000Z',
      dateModified: '2025-01-15T15:30:00.000Z',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '3',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${process.env.NEXTAUTH_URL}/${slug}`,
  },
  faq: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I track my order on Levoire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After placing your order, you will receive a confirmation email with a tracking link. You can click on that link anytime to see the real-time status of your shipment.',
        },
      },
      {
        '@type': 'Question',
        name: `Why is the ${product?.slug} considered a limited?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The ${product?.slug} is part of our limited edition ${product?.collections?.edges[0]?.node?.title} collection, released only during special seasonal drops. Once sold out, it won't be restocked.`,
        },
      },
      {
        '@type': 'Question',
        name: `What makes the ${product?.slug} a must-have?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The ${product?.slug} stands out for its high-quality fabric, trendy design, and attention to detail—making it a perfect addition to any fashion-forward wardrobe.`,
        },
      },
      {
        '@type': 'Question',
        name: `What makes the ${product?.slug} unique in the *${product?.title}* line?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `This item features exclusive tailoring, custom embroidery, and is available in limited quantities, making it a signature piece in the *${product?.title}* collection.`,
        },
      },
    ],
  },
  author: {
    '@type': 'Person',
    name: 'Jowe',
  },
});
