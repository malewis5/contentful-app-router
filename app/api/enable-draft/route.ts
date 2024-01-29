import { getBlog } from '@/lib/contentful/api';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const bypass = searchParams.get('x-vercel-protection-bypass');

  if (!secret || !slug) {
    return new Response('Missing parameters', { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  const blog = await getBlog(slug);

  if (!blog) {
    return new Response('Blog not found', { status: 404 });
  }

  draftMode().enable();
  redirect(`/blogs/${blog.slug}?x-vercel-protection-bypass=${bypass}`);
}
