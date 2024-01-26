import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get('x-vercel-revalidation-key');

  if (secret !== process.env.CONTENTFUL_REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();

  const tag = body.tag;
  const path = body.path;

  if (!tag && !path) {
    return NextResponse.json({ message: 'No tag provided' }, { status: 400 });
  }

  if (path) {
    revalidatePath(path);
    console.log(`Revalidated path: ${path} at ${Date.now()}`);
  }

  if (tag) {
    revalidateTag(tag);
    console.log(`Revalidated tag: ${tag} at ${Date.now()}`);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
