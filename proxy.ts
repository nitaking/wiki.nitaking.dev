import { NextRequest, NextResponse } from 'next/server';
import { rewritePath } from 'fumadocs-core/negotiation';

const { rewrite: rewriteMdx } = rewritePath('{/*path}.mdx', '/llms.mdx{/*path}');
const { rewrite: rewriteMd } = rewritePath('{/*path}.md', '/llms.mdx{/*path}');

export default function proxy(request: NextRequest) {
  const result =
    rewriteMd(request.nextUrl.pathname) ?? rewriteMdx(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  return NextResponse.next();
}
