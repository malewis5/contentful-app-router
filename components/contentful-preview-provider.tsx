'use client';

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

export function ContentfulPreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentfulLivePreviewProvider locale='en-US' debugMode={true}>
      {children}
    </ContentfulLivePreviewProvider>
  );
}
