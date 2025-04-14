import { Suspense } from 'react';
import Orders from '../components/Orders/Orders';
import generateSEO from '@/lib/seo';
import Loading from '../components/Loading';

export const generateMetadata = async () => {
  return generateSEO({
    title: 'Your Orders | Track & Manage Purchases | Levoire',
    description:
      'View and track your past and current orders at Levoire. Manage your purchases, check delivery status, and enjoy a seamless shopping experience!',
  });
};

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <Orders />
    </Suspense>
  );
}
