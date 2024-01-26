'use client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { ContentfulLivePreview } from '@contentful/live-preview';
import { ContentfulArticleProps } from '@/app/articles/[slug]/page';

export const Article = ({ article }: { article: ContentfulArticleProps }) => {
  const updatedArticle = useContentfulLiveUpdates(article);

  return (
    <>
      <div className='space-y-4'>
        <h1
          className='text-4xl font-bold tracking-tighter sm:text-5xl'
          {...ContentfulLivePreview.getProps({
            entryId: article.sys.id,
            fieldId: 'title',
          })}
        >
          {updatedArticle.title}
        </h1>
        <div className='flex justify-between flex-col md:flex-row'>
          <p
            className='max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'
            {...ContentfulLivePreview.getProps({
              entryId: article.sys.id,
              fieldId: 'summary',
            })}
          >
            {updatedArticle.summary}
          </p>
          <p
            className='text-zinc-500 md:text-lg/relaxed lg:text-sm/relaxed xl:text-lg/relaxed dark:text-zinc-400 italic'
            {...ContentfulLivePreview.getProps({
              entryId: article.sys.id,
              fieldId: 'authorName',
            })}
          >
            by: {updatedArticle.author}
          </p>
        </div>
      </div>
      <div className='space-y-8 lg:space-y-10'>
        <Image
          alt='Article Image'
          className='aspect-video w-full overflow-hidden rounded-xl object-cover'
          height='365'
          src={updatedArticle?.heroImage?.url ?? 'https://placehold.co/650x365'}
          width='650'
          {...ContentfulLivePreview.getProps({
            entryId: article.sys.id,
            fieldId: 'articleImage',
          })}
        />
        <div className='space-y-4 md:space-y-6'>
          <div className='space-y-2'>
            <div
              className='max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'
              {...ContentfulLivePreview.getProps({
                entryId: article.sys.id,
                fieldId: 'details',
              })}
            >
              {documentToReactComponents(updatedArticle.details.json)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
