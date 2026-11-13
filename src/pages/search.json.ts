import { getPublishedPosts, formatDate } from '../utils/posts';
import { getReadingTime } from '../utils/readingTime';

export async function GET() {
  const posts = await getPublishedPosts();

  const searchIndex = posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    description: post.data.description,
    pubDate: formatDate(post.data.pubDate),
    rawDate: post.data.pubDate.toISOString(),
    category: post.data.category,
    tags: post.data.tags || [],
    readingTime: getReadingTime(post.body || ''),
    url: `/blog/${post.id}`,
  }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
