/**
 * Calculate estimated reading time in minutes for given content string.
 * Standard estimation is ~200 words per minute.
 */
export function getReadingTime(content: string): string {
  if (!content) return '1 min read';
  
  // Strip code blocks and Markdown syntax to approximate actual reading words
  const clean = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`.*?`/g, '')
    .replace(/[#*_\-[\]()]/g, ' ')
    .trim();

  const words = clean.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);

  return `${Math.max(1, minutes)} min read`;
}
