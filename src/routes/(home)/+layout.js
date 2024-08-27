import { pages } from '$conf';

/** @type {import('./$types').LayoutLoad} */
export async function load() {
  const docsHomePage = pages.filter((page) => !page?.children)[0];
  return { docsHomePage };
}
