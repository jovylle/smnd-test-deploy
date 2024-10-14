import Link from 'next/link';
import { getPostSlugs } from '../lib/markdown';

export default function Home ({ posts }) {
  return (
    <div>
      <h1>Welcome to SMND</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps () {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const post = require(`../content/${slug}`);
    return {
      slug: slug.replace(/\.md$/, ''),
      title: post.data.title,
    };
  });

  return {
    props: { posts },
  };
}
