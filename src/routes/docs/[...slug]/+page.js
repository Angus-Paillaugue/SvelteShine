import { error } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';

export async function load({ params }) {
  const post = await pageBySlug(params.slug);

  if (!post) error(404, 'Post not found');
  const component = await import(/* @vite-ignore */ '/docs/' + post.slug + '.md');

  return {
    component: component.default,
    slug: params.slug,
    ...post
  };
}
