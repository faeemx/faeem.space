import { visit } from 'unist-util-visit';

/**
 * Remark plugin to support Obsidian-style Wikilinks and Image embeds in Astro:
 * - ![[image.jpg]] or ![[image.jpg|Alt Text]] -> <img src="/images/image.jpg" alt="Alt Text" />
 * - [[essay-slug]] or [[essay-slug|Custom Title]] -> <a href="/blog/essay-slug">Custom Title</a>
 * - Normalizes relative image paths like ../../../public/images/file.png -> /images/file.png
 */
export function remarkObsidian() {
  return (tree: any) => {
    // 1. Normalize standard Markdown image nodes if Obsidian saved relative paths
    visit(tree, 'image', (node: any) => {
      if (node.url) {
        node.url = node.url
          .replace(/^(\.\.\/)+public\/images\//, '/images/')
          .replace(/^public\/images\//, '/images/');
      }
    });

    // 2. Transform text nodes containing ![[...]] and [[...]]
    visit(tree, 'text', (node: any, index: any, parent: any) => {
      if (!parent || !node.value) return;

      const text: string = node.value;
      const pattern = /(!?\[\[(.*?)\]\])/g;
      if (!pattern.test(text)) return;

      pattern.lastIndex = 0;
      const newNodes: any[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.exec(text)) !== null) {
        const fullMatch = match[1];
        const inner = match[2];
        const isEmbed = fullMatch.startsWith('!');
        const matchStart = match.index;

        if (matchStart > lastIndex) {
          newNodes.push({
            type: 'text',
            value: text.slice(lastIndex, matchStart),
          });
        }

        const parts = inner.split('|');
        const target = parts[0].trim();
        const label = parts[1] ? parts[1].trim() : target;

        if (isEmbed) {
          // Image embed: ![[photo.jpg]] or ![[photo.jpg|alt]]
          const imgFilename = target
            .replace(/^(\.\.\/)+public\/images\//, '')
            .replace(/^public\/images\//, '');
          const cleanUrl =
            imgFilename.startsWith('/') || imgFilename.startsWith('http')
              ? imgFilename
              : `/images/${imgFilename}`;

          newNodes.push({
            type: 'image',
            url: cleanUrl,
            alt: label !== target ? label : target,
          });
        } else {
          // Wiki link: [[slug]] or [[slug|Label]]
          const slug = target
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/\.md$/, '');

          newNodes.push({
            type: 'link',
            url: `/blog/${slug}`,
            children: [{ type: 'text', value: label }],
          });
        }

        lastIndex = pattern.lastIndex;
      }

      if (lastIndex < text.length) {
        newNodes.push({
          type: 'text',
          value: text.slice(lastIndex),
        });
      }

      parent.children.splice(index, 1, ...newNodes);
      return index + newNodes.length;
    });
  };
}
