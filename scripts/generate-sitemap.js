import dirTree from 'directory-tree';
import { writeFileSync } from 'fs';
import { project } from '../project.config.js';

const baseRoute = '/';
let routes = new Set(baseRoute);
let date = new Date().toISOString().split('T')[0];

function getSitemapXML(routes) {
	let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
	sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
	routes.forEach((route, index) => {
		sitemap += (index > 0 ? '\n' : '') + getSitemapUrl(project.domain + route);
	});
	sitemap += '\n</urlset>';
	return sitemap;
}

function getSitemapUrl(location) {
	let url =
		'  <url>\n' + `    <loc>${location}</loc>\n` + `    <lastmod>${date}</lastmod>\n` + '  </url>';
	return url;
}

function getEndpoints(tree, route) {
	tree.children.forEach((child) => {
		if (
			child.children != undefined &&
			child.children.length != 0
		) {
			let childRoute = (route + child.name)
				.replace(/\(.*?\)/g, '')
				.replace(/(^\/{2,})|(^\/)/, '/')
				.replace(/\/{2,}/g, '/')
				.replace(/\[([^\]]+)\]/g, '{$1}');

			if (child.children.some((e) => e.name === '+page.svelte') && !routes.has(childRoute)) {
				routes.add(childRoute);
			}
			getEndpoints(child, route + child.name + '/');
		}
	});
}

const tree = dirTree('./src/routes');

getEndpoints(tree, baseRoute);

const sitemap = getSitemapXML(Array.from(routes));

writeFileSync('static/sitemap.xml', sitemap);
