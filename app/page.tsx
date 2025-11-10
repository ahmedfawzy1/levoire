import Hero from './components/Landing/Hero/Hero';
import Brands from './components/Landing/Brands/Brands';
import NewArrivals from './components/Landing/NewArrivals/NewArrivals';
import BestSelling from './components/Landing/BestSelling/BestSelling';
import Category from './components/Landing/Category/Category';
import Reviews from './components/Landing/Reviews/Reviews';

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <NewArrivals />
      <BestSelling />
      <Category />
      <Reviews />
    </>
  );
}
