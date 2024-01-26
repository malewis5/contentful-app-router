import { getAllArticles, getArticle } from '@/lib/contentful/api';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Article } from '@/components/article';

export interface ContentfulArticleProps {
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
  details: {
    json: any;
  };
}

export async function generateStaticParams() {
  const allArticles = await getAllArticles();

  return allArticles.map((article: ContentfulArticleProps) => ({
    slug: article.slug,
  }));
}

export default async function KnowledgeArticlePage({
  params,
}: {
  params: any;
}) {
  const { isEnabled } = draftMode();
  const article = await getArticle(params.slug, isEnabled);

  if (!article) {
    notFound();
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'>
      <section className='w-full'>
        <div className='container space-y-12 px-4 md:px-6'>
          <Article article={article} />
        </div>
      </section>
    </main>
  );
}
