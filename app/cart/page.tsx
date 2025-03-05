import Cart from './client';
import generateSEO from '@/lib/seo';

export const generateMetadata = async () => {
  return generateSEO({
    title: 'Your Shopping Cart | Secure Checkout & Best Deals | Levoire',
    description:
      'Review your selected fashion items and proceed to a secure checkout at Levoire. Enjoy exclusive deals on high-quality clothing, footwear, and accessories!',
  });
};

export default function page() {
  return <Cart />;
}
