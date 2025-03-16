import { client } from '@/lib/sanity';
import { BlogDetail } from '../types/blog';

export async function getAllBlogs() {
  const query = `
      *[_type == 'blog'] | order(_createdAt desc) {
    title,
    short_description,
    "slug": slug.current,
    image
    }`;

  const data = await client.fetch(query);
  return data;
}

export async function getBlogDetail(slug: string) {
  const qurey = `
      *[_type == "blog" && slug.current == "${slug}"]{
    "slug":slug.current,
      title,
      short_description,
      content,
      image
  }[0]
  `;
  const data: BlogDetail = await client.fetch(qurey);
  return data;
}
