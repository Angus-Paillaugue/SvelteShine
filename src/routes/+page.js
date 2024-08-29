import { pages } from '$conf';

export async function load() {
  const docsHomePage = pages.filter((page) => !page?.children)[0];
  return { docsHomePage };
}
