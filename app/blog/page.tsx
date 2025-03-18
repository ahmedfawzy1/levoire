import { urlFor } from '@/lib/sanity';
import generateSEO from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { BlogOverview } from '../types/blog';
import { getAllBlogs } from './action';

export async function generateMetadata() {
  return generateSEO({
    title: 'Levoire Blog | Fashion Trends, Style Tips & Inspiration',
    description:
      'Read the latest fashion insights and trends on the Levoire Blog. Stay updated with style tips, outfit inspirations, and fashion guides to elevate your wardrobe.',
  });
}

export default async function page() {
  const data: BlogOverview[] = await getAllBlogs();
  const [featuredPost, ...latestPosts] = data;

  return (
    <section className='py-10'>
      <div className='pb-12'>
        <h1 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center pb-12'>
          Blogs
        </h1>
        {featuredPost && (
          <div key={featuredPost.slug} className='w-full flex gap-7'>
            <div className='basis-1/2'>
              <Link href={`/blog/${featuredPost.slug}`} className='w-full'>
                <Image
                  src={urlFor(featuredPost.image).url()}
                  width={500}
                  height={500}
                  alt={featuredPost.title}
                  className='w-full rounded-xl'
                />
              </Link>
            </div>
            <div className='max-w-[450px] flex flex-col justify-center basis-1/2'>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className='text-2xl font-bold'
              >
                {featuredPost.title}
              </Link>
              <p className='text-base text-slate-500'>
                {featuredPost.short_description}
              </p>
            </div>
          </div>
        )}
      </div>
      <hr className='bg-gray-400' />
      <div className='pt-10'>
        <h2 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center pb-12'>
          Latest Article
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {latestPosts.map(post => (
            <div key={post.slug}>
              <Link href={`/blog/${post.slug}`} className='w-full'>
                <Image
                  src={urlFor(post.image).url()}
                  width={500}
                  height={500}
                  alt={post.title}
                  className='w-full rounded-xl'
                />
              </Link>
              <Link
                href={`/blog/${post.slug}`}
                className='text-lg font-semibold'
              >
                {post.title}
              </Link>
              <p className='text-sm text-slate-500'>{post.short_description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
