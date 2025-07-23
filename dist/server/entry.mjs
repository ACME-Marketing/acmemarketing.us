import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BCaNtSfV.mjs';
import { manifest } from './manifest_CAcfpNGW.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/course-notifications.astro.mjs');
const _page3 = () => import('./pages/courses.astro.mjs');
const _page4 = () => import('./pages/posts.astro.mjs');
const _page5 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page6 = () => import('./pages/privacy.astro.mjs');
const _page7 = () => import('./pages/services.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/course-notifications.ts", _page2],
    ["src/pages/courses.astro", _page3],
    ["src/pages/posts/index.astro", _page4],
    ["src/pages/posts/[...slug].astro", _page5],
    ["src/pages/privacy.astro", _page6],
    ["src/pages/services.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/dist/client/",
    "server": "file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
