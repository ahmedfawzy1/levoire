import { BlogDetail } from '@/app/types/blog';
import { urlFor } from '@/lib/sanity';
import generateSEO from '@/lib/seo';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { getBlogDetail } from '../action';

interface pageParams {
  params: Promise<{ slug: string }>;
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
}

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
    <section className='mt-8'>
      <span className='block text-center text-red-600 font-semibold tracking-wide uppercase'>
        Levoire Blog
      </span>
      <h1 className='mt-2 text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl'>
        {post.title}
      </h1>
      <Image
        src={urlFor(post.image).url()}
        width={800}
        height={800}
        alt={post.title}
        priority
        className='mt-8 rounded-lg'
      />

      <div className='mt-16'>
        <PortableText value={post.content} />
      </div>
    </section>
  );
}
