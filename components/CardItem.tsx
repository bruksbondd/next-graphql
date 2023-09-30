import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import {
  GetPostsEdgesQuery,
  RootQueryToPostConnectionEdge,
} from '@/generates/gql/graphql';
import Link from 'next/link';

type Props = {
  edge: NonNullable<GetPostsEdgesQuery['posts']>['edges'][number];
};

export default function CardItem({ edge }: Props) {
  return (
    <Card>
      <CardHeader>
        {edge?.node?.slug && (
          <CardTitle>
            <Link href={`post/${edge?.node?.slug}`}>{edge?.node?.title}</Link>
          </CardTitle>
        )}
        <CardDescription>By {edge?.node?.author?.node?.name}</CardDescription>
      </CardHeader>
      <CardContent className='relative h-96'>
        {edge.node?.featuredImage?.node?.sourceUrl && (
          <Image
            alt={edge.node.featuredImage.node.altText || 'Image'}
            src={edge.node.featuredImage.node.sourceUrl}
            fill
          />
        )}
      </CardContent>
      <CardFooter className='mt-6'>
        {edge.node.date && new Date(edge.node.date).toLocaleDateString('ru-Ru')}
      </CardFooter>
    </Card>
  );
}
