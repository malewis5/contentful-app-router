'use client';

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

export function ContentfulPreviewProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <ContentfulLivePreviewProvider locale={locale}>
      {children}
    </ContentfulLivePreviewProvider>
  );
}
