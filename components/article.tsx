'use client';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';

export const Article = ({ article, isEnabled }: any) => {
  const updatedArticle = useContentfulLiveUpdates(article);
  const data = isEnabled ? updatedArticle : article;

  return (
    <>
      <div className='space-y-4'>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl'>
          {data.title}
        </h1>
        <p className='max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'>
          {data.summary}
        </p>
      </div>
      <div className='space-y-8 lg:space-y-10'>
        <Image
          alt='Article Image'
          className='aspect-video w-full overflow-hidden rounded-xl object-cover'
          height='365'
          src={data.articleImage.url}
          width='650'
        />
        <div className='space-y-4 md:space-y-6'>
          <div className='space-y-2'>
            <div className='max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400'>
              {documentToReactComponents(data.details.json)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
