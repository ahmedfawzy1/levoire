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
    <section className='py-5'>
      <div>
        <h1 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center pb-12'>
          Blogs
        </h1>
        <div>
          {featuredPost && (
            <div key={featuredPost.slug} className='flex gap-7'>
              <div className=''>
                <Image
                  src={urlFor(featuredPost.image).url()}
                  width={500}
                  height={500}
                  alt={featuredPost.title}
                />
              </div>
              <div className='flex flex-col justify-center'>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className='font-bold text-2xl'
                >
                  {featuredPost.title}
                </Link>
                <p>{featuredPost.short_description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='pt-12'>
        <h2 className='text-3xl md:text-[42px] font-semibold font-integralCF text-center pb-12'>
          Latest Blog Posts
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {latestPosts.map(post => (
            <div key={post.slug} className=''>
              <div className='w-full h-auto'>
                <Image
                  src={urlFor(post.image).url()}
                  width={500}
                  height={500}
                  alt={post.title}
                />
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className='font-bold text-2xl mb-3'
              >
                {post.title}
              </Link>
              <p>{post.short_description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
