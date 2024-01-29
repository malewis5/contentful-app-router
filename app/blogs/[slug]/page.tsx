import { getAllBlogs, getBlog } from '@/lib/contentful/api';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Blog } from '@/components/article';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

export interface ContentfulBlogProps {
  sys: {
    id: string;
  };
  slug: string;
  title: string;
  summary: string;
  author: string;
  heroImage?: {
    url: string;
  };
  categoryName: string;
  date: Date;
  details: {
    json: any;
  };
}

export async function generateStaticParams() {
  const allBlogs = await getAllBlogs();

  return allBlogs.map((blog: ContentfulBlogProps) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPage({ params }: { params: any }) {
  const { isEnabled } = draftMode();
  const blog = await getBlog(params.slug, isEnabled);

  if (!blog) {
    notFound();
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'>
      <section className='w-full'>
        <div className='container space-y-12 px-4 md:px-6'>
          <ContentfulLivePreviewProvider locale='en-US'>
            <Blog blog={blog} />
          </ContentfulLivePreviewProvider>
        </div>
      </section>
    </main>
  );
}
