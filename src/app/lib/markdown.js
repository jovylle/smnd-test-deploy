import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostSlugs () {
  return fs.readdirSync(contentDirectory);
}

export function getPostBySlug (slug) {
  const fullPath = path.join(contentDirectory, slug);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    data,
    content,
  };
}

export async function markdownToHtml (markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
