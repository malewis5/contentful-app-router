import '@contentful/live-preview/style.css';
import { ContentfulPreviewProvider } from '@/components/contentful-preview-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ContentfulPreviewProvider>{children}</ContentfulPreviewProvider>;
}
