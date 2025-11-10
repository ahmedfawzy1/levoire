import { BlogDetail } from '@/app/types/blog';
import { urlFor } from '@/lib/sanity';
import generateSEO from '@/lib/seo';
import BlogContent from '@/app/components/BlogContent';
import Image from 'next/image';
import { getBlogDetail } from '../action';

interface pageParams {
  params: Promise<{ slug: string }>;
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export const generateMetadata = async (props: GenerateMetadataProps) => {
  const { slug } = await props.params;
  const data: BlogDetail = await getBlogDetail(slug);

  if (!slug) {
    return generateSEO({
      title: 'Product Not Found | Levoire',
      description:
        'Oops! The product you are looking for is unavailable. Explore our latest fashion collections at Levoire.',
    });
  }

  return generateSEO({
    title: `${data.title} | Levoire Blog`,
    description: `${data.short_description} and explore in-depth fashion insights, on the Levoire Blog.`,
  });
};

export default async function page(props: pageParams) {
  const { slug } = await props.params;
  const post: BlogDetail = await getBlogDetail(slug);

  return (
    <section className='py-10'>
      <div className='max-w-3xl mx-auto px-0 sm:px-6'>
        <h1 className='mt-2 text-2xl md:text-4xl text-center leading-8 font-bold tracking-tight'>
          {post.title}
        </h1>
        <div className='px-5 flex flex-col items-center'>
          <Image
            src={urlFor(post.image).url()}
            width={750}
            height={750}
            alt={post.title}
            priority
            className='mt-8 rounded-lg'
          />

          <div className='mt-8 max-w-[750px] prose prose-lg'>
            <BlogContent content={post.content} />
          </div>
        </div>
      </div>
    </section>
  );
}
