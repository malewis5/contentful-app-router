'use client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { ContentfulBlogProps } from '@/app/blogs/[slug]/page';

export const Blog = ({ blog }: { blog: ContentfulBlogProps }) => {
  const updatedBlog = useContentfulLiveUpdates(blog);

  return (
    <>
      <div className='space-y-4'>
        <h1
          className='text-4xl font-bold tracking-tighter sm:text-5xl'
          {...ContentfulLivePreview.getProps({
            entryId: blog.sys.id,
            fieldId: 'title',
          })}
        >
          {updatedBlog.title}
        </h1>
        <div className='flex justify-between flex-col md:flex-row'>
          <p
            className='max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'
            {...ContentfulLivePreview.getProps({
              entryId: blog.sys.id,
              fieldId: 'summary',
            })}
          >
            {updatedBlog.summary}
          </p>
          <p
            className='text-zinc-500 md:text-lg/relaxed lg:text-sm/relaxed xl:text-lg/relaxed dark:text-zinc-400 italic'
            {...ContentfulLivePreview.getProps({
              entryId: blog.sys.id,
              fieldId: 'authorName',
            })}
          >
            by: {updatedBlog.author}
          </p>
        </div>
      </div>
      <div className='space-y-8 lg:space-y-10'>
        <Image
          alt='Article Image'
          className='aspect-video w-full overflow-hidden rounded-xl object-cover'
          height='365'
          src={updatedBlog?.heroImage?.url ?? 'https://placehold.co/650x365'}
          width='650'
          {...ContentfulLivePreview.getProps({
            entryId: blog.sys.id,
            fieldId: 'articleImage',
          })}
        />
        <div className='space-y-4 md:space-y-6'>
          <div className='space-y-2'>
            <div
              className='max-w-[900px] '
              {...ContentfulLivePreview.getProps({
                entryId: blog.sys.id,
                fieldId: 'details',
              })}
            >
              {documentToReactComponents(updatedBlog.details.json)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
