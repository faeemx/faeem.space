import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Returns all published blog posts sorted by publication date (newest first).
 * In accordance with content rules, draft articles are always filtered out.
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', (entry) => {
    return entry.data.draft !== true;
  });

  return posts.sort((a, b) => {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
  });
}

/**
 * Formats a Date object to a readable string (e.g. "Nov 13, 2026").
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}

export interface TagCount {
  name: string;
  count: number;
}

/**
 * Aggregates all unique tags from published posts along with post counts.
 */
export async function getAllTags(): Promise<TagCount[]> {
  const posts = await getPublishedPosts();
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags || []) {
      const normalized = tag.toLowerCase().trim();
      tagMap.set(normalized, (tagMap.get(normalized) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export interface CategoryCount {
  name: string;
  count: number;
  slug: string;
}

/**
 * Aggregates all unique categories from published posts along with counts.
 */
export async function getAllCategories(): Promise<CategoryCount[]> {
  const posts = await getPublishedPosts();
  const catMap = new Map<string, number>();

  for (const post of posts) {
    if (post.data.category) {
      const name = post.data.category.trim();
      catMap.set(name, (catMap.get(name) || 0) + 1);
    }
  }

  return Array.from(catMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/**
 * Calculates related posts based on overlapping tags and category match,
 * excluding the current post.
 */
export async function getRelatedPosts(currentPost: BlogPost, limit = 2): Promise<BlogPost[]> {
  const allPosts = await getPublishedPosts();
  const currentTags = new Set((currentPost.data.tags || []).map((t) => t.toLowerCase()));

  const scored = allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      let score = 0;
      // Category match bonus
      if (post.data.category && post.data.category === currentPost.data.category) {
        score += 2;
      }
      // Overlapping tags bonus
      for (const tag of post.data.tags || []) {
        if (currentTags.has(tag.toLowerCase())) {
          score += 3;
        }
      }
      return { post, score };
    })
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime());

  return scored.slice(0, limit).map((s) => s.post);
}
