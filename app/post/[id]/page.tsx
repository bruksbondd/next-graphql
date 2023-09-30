import {
  GetPostDocument,
  GetPostsEdgesDocument,
} from '@/generates/gql/graphql';
import { client } from '@/lib/requestClient';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  const post = await getPost(id);
  return {
    title: post?.title,
  };
}

export async function generateStaticParams() {
  const { posts } = await client.request(GetPostsEdgesDocument);
  if (posts?.edges) {
    return posts?.edges.map((edge) => ({ id: edge.node.slug }));
  } else {
    return [];
  }
}

async function getPost(id: string) {
  const { post } = await client.request(GetPostDocument, { id });
  return post;
}
export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getPost(id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post?.title}</CardTitle>

        <CardDescription>
          By {post?.author?.node?.name}{' '}
          {post?.date &&
            'in ' + new Date(post?.date).toLocaleDateString('ru-Ru')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative h-96'>
          {post?.featuredImage?.node?.sourceUrl && (
            <Image
              alt={post.featuredImage.node.altText || 'Image'}
              src={post.featuredImage.node.sourceUrl}
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: post?.content ? post?.content : '',
          }}
          className='mt-6'
        ></div>
      </CardContent>
    </Card>
  );
}
