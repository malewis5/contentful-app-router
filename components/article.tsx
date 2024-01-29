'use client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { ContentfulBlogProps } from '@/app/blogs/[slug]/page';

export const Blog = ({ blog }: { blog: ContentfulBlogProps }) => {
  const updatedBlog = useContentfulLiveUpdates(blog);

  return (
    <main className='bg-white dark:bg-gray-900'>
      <section className='relative h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px]'>
        <Image
          alt='Article Image'
          className='absolute inset-0 w-full h-full object-cover'
          height='900'
          style={{
            aspectRatio: '1600/900',
            objectFit: 'cover',
          }}
          src={updatedBlog?.heroImage?.url ?? 'https://placehold.co/650x365'}
          width='1600'
          {...ContentfulLivePreview.getProps({
            entryId: blog.sys.id,
            fieldId: 'articleImage',
          })}
        />
        <div className='absolute inset-0 bg-black bg-opacity-50' />
        <div className='relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start'>
          <h1
            {...ContentfulLivePreview.getProps({
              entryId: blog.sys.id,
              fieldId: 'title',
            })}
            className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl'
          >
            {updatedBlog.title}
          </h1>
          <p className='mt-4 text-lg text-gray-300'>{updatedBlog.summary}</p>
          <p
            className='mt-4 text-md text-gray-400'
            {...ContentfulLivePreview.getProps({
              entryId: blog.sys.id,
              fieldId: 'author',
            })}
          >
            By {updatedBlog.author}
          </p>
        </div>
      </section>
      <section className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <article
          className='mx-auto'
          {...ContentfulLivePreview.getProps({
            entryId: blog.sys.id,
            fieldId: 'details',
          })}
        >
          {documentToReactComponents(updatedBlog.details.json)}
        </article>
      </section>
    </main>
  );
};
