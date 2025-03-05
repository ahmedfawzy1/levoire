'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getReviews } from '@/app/lib/review';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactStars from 'react-rating-star-with-type';

interface Review {
  id: number;
  rating: number;
  comment: string;
  User: {
    id: number;
    username: string;
    email: string;
  };
  Product: {
    id: number;
    description: string;
  };
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [scrollRight, setScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { reviews } = await getReviews();
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    };

    fetchReviews();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 372;
      const scrollAmount = cardWidth;
      scrollRef.current.scrollTo({
        left:
          direction === 'left'
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollLeft(scrollLeft > 0);
      setScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollButtons);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateScrollButtons);
      }
    };
  }, [reviews]);

  return (
    <section className='px-5 py-10'>
      <div className='flex justify-between items-center'>
        <h5 className='text-3xl md:text-[42px] font-semibold font-integralCF'>
          OUR HAPPY CUSTOMERS
        </h5>

        <div className='flex flex-nowrap flex-row gap-5 pt-1'>
          <button
            onClick={() => scroll('left')}
            aria-label='Scroll left'
            disabled={!scrollLeft}
          >
            <ArrowLeft color={scrollLeft ? '#000' : '#ccc'} />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label='Scroll right'
            disabled={!scrollRight}
          >
            <ArrowRight color={scrollRight ? '#000' : '#ccc'} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className='w-full mt-10 flex gap-3 overflow-x-auto scrollbar-hide'
      >
        {reviews?.length > 0 &&
          reviews.map((review, index) => (
            <div
              key={index}
              className='w-[360px] md:w-96 px-5 md:px-7 py-6 md:py-6 border border-black/10 rounded-2xl'
            >
              <ReactStars
                value={review.rating}
                isEdit={false}
                size={18}
                activeColors={[
                  'red',
                  'orange',
                  '#FFCE00',
                  '#9177FF',
                  '#FFC633',
                ]}
              />
              <div className='flex gap-1 pt-3 pb-1.5'>
                <p className='text-xl font-bold'>{review.User.username}.</p>
                <Image
                  src={'/images/icons/badgecheck.svg'}
                  alt='badgecheck'
                  width={24}
                  height={28}
                />
              </div>
              <span className='w-80 max-h-24 block text-black/60 font-normal overflow-hidden'>
                "{review.comment}"
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}
