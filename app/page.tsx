import PostList from '@/components/PostList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List of post',
  description: 'List of post description',
};

export default async function Home() {
  return <PostList />;
}
