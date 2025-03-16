import Wishlist from './client';
import generateSEO from '@/lib/seo';

export const generateMetadata = async () => {
  return generateSEO({
    title: 'Your Wishlist | Save & Shop Your Favorite Fashion Picks | Levoire',
    description:
      'Keep track of your favorite fashion finds at Levoire. Save stylish clothing, footwear, and accessories to your wishlist and shop whenever you’re ready!',
  });
};

export default function page() {
  return <Wishlist />;
}
