'use client';

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

export function ContentfulPreviewProvider({
  children,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <ContentfulLivePreviewProvider locale={'en-US'}>
      {children}
    </ContentfulLivePreviewProvider>
  );
}
