import { error } from '@sveltejs/kit';
import { postBySlug } from '$lib/pages';

export async function load({ params }) {
  const post = await postBySlug(params.slug);
  if (!post) error(404, 'Post not found');
  const component = await import(/* @vite-ignore */ '/docs/' + post.slug + '.md');

  return {
    component: component.default,
    ...post
  };
}
