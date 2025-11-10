import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProductBySlug } from '@/app/lib/product';
import { getReviewsByProductId } from '@/app/lib/review';
import Review from '@/app/components/shop/[slug]/Review';
import ImageGallery from '../../components/shop/[slug]/ImageGallery';
import Info from '../../components/shop/[slug]/Info';
import RelatedProducts from '@/app/components/shop/[slug]/RelatedProducts';
import generateSEO from '@/lib/seo';
import { generateProductSchema } from '@/lib/seo_schema';
import { Suspense } from 'react';
import Loading from '@/app/components/Loading';

interface PageParams {
  params: Promise<{ slug: string }>;
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export const generateMetadata = async (props: GenerateMetadataProps) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return generateSEO({
      title: 'Product Not Found | Levoire',
      description:
        'Oops! The product you are looking for is unavailable. Explore our latest fashion collections at Levoire.',
    });
  }

  return generateSEO({
    title: `${product.title} | Buy Online at Levoire`,
    description: `${
      product.description.length > 110
        ? `${product.description.substring(0, 110)}`
        : `${product.description}... Shop now for premium quality and exclusive designs.`
    }`,
  });
};

export default async function page(props: PageParams) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  const session = await getServerSession(authOptions);

  const userId = Number(session?.user.id);
  const userName = session?.user.username || session?.user.name || 'Guest';

  const allReview = await getReviewsByProductId(product?.id || 0);

  const jsonLD = generateProductSchema(product, slug);

  return (
    <section className='px-5 py-8'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <Suspense fallback={<Loading />}>
        {product && (
          <>
            <div className='flex flex-col md:flex-row gap-14 mb-5'>
              {product.image && (
                <ImageGallery
                  ImageUrls={product.image}
                  userId={userId}
                  productId={product.id}
                />
              )}
              <Info
                userId={userId}
                {...product}
                rating={product.averageRating}
              />
            </div>
            <>
              <Review
                allReview={allReview}
                productId={product?.id}
                userId={userId}
                userName={userName}
              />
              <RelatedProducts />
            </>
          </>
        )}
      </Suspense>
    </section>
  );
}
