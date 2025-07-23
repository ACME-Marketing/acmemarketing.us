/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_Ci1ivB3A.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DJybL96h.mjs';
import { g as graphQLClient } from '../chunks/graphql_DzNVuGaG.mjs';
import { g as getCta } from '../chunks/loadCtaData_DZsNvsdf.mjs';
/* empty css                                 */
import { gql } from 'graphql-request';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const GET_POSTS = gql`
  query GetPosts {
    posts(first: 100, where: { tagSlugIn: ["acmemarketing", "all"] }) {
      nodes {
        title
        uri
        content
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`;
  let posts = [];
  try {
    const data = await graphQLClient.request(GET_POSTS);
    posts = data.posts.nodes;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  const heroCta = getCta({ page: "post", location: "hero" });
  const sidebarCta = getCta({ page: "post", location: "sidebar" });
  const bottomCta = getCta({ page: "post", location: "bottom" });
  const sidebarPosts = posts.slice(0, 5);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog - ACME Marketing", "data-astro-cid-fjqfnjxi": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative overflow-hidden flex flex-col justify-center items-center text-center py-8 md:py-12 px-4" data-astro-cid-fjqfnjxi> <div class="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-cyan-500 via-blue-700 to-fuchsia-600 opacity-90" data-astro-cid-fjqfnjxi></div> <div class="relative z-10 mb-3 md:mb-4 flex justify-center" data-astro-cid-fjqfnjxi> <svg class="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-fjqfnjxi> <circle cx="40" cy="40" r="32" fill="#fff" fill-opacity="0.08" stroke="#22d3ee" stroke-width="2" data-astro-cid-fjqfnjxi></circle> <circle cx="40" cy="40" r="38" stroke="#22d3ee" stroke-width="1" fill="none" data-astro-cid-fjqfnjxi></circle> <line x1="40" y1="18" x2="40" y2="62" stroke="#fff" stroke-width="2" stroke-linecap="round" data-astro-cid-fjqfnjxi></line> <line x1="18" y1="40" x2="62" y2="40" stroke="#fff" stroke-width="2" stroke-linecap="round" data-astro-cid-fjqfnjxi></line> <line x1="40" y1="10" x2="40" y2="18" stroke="#22d3ee" stroke-width="1.5" data-astro-cid-fjqfnjxi></line> <line x1="40" y1="62" x2="40" y2="70" stroke="#22d3ee" stroke-width="1.5" data-astro-cid-fjqfnjxi></line> <line x1="10" y1="40" x2="18" y2="40" stroke="#22d3ee" stroke-width="1.5" data-astro-cid-fjqfnjxi></line> <line x1="62" y1="40" x2="70" y2="40" stroke="#22d3ee" stroke-width="1.5" data-astro-cid-fjqfnjxi></line> </svg> </div> <h1 class="relative z-10 text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight break-words whitespace-normal max-w-3xl mb-4 md:mb-6 mt-2" style="word-break: break-word;" data-astro-cid-fjqfnjxi>
Latest Insights
</h1> <div class="h-2 md:h-3" data-astro-cid-fjqfnjxi></div> <a href="#" id="open-ebook-modal-post" class="relative z-10 inline-block bg-white text-blue-800 font-bold py-2 md:py-2 px-5 md:px-6 rounded-full text-sm md:text-base hover:bg-gray-100 transition transform hover:scale-105 shadow mb-2 md:mb-3"${addAttribute(heroCta["BOOK ID"], "data-book-id")} data-astro-cid-fjqfnjxi> ${heroCta["BUTTON TEXT"]} </a> <div class="relative z-10 text-white/80 text-xs md:text-sm font-semibold mt-1 md:mt-2" data-astro-cid-fjqfnjxi> ${heroCta["DESCRIPTION"]} </div> </section>  <div class="w-full py-16 relative overflow-hidden" data-astro-cid-fjqfnjxi> <!-- Gradient pulse background --> <div class="absolute inset-0 animate-gradient bg-gradient-to-br from-cyan-500 via-blue-700 to-fuchsia-600 opacity-15 pointer-events-none" data-astro-cid-fjqfnjxi></div> <!-- Content with relative positioning to stay above wave --> <div class="container mx-auto px-4 flex flex-col lg:flex-row gap-12 relative z-10" data-astro-cid-fjqfnjxi> <main class="lg:w-3/4" data-astro-cid-fjqfnjxi> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" data-astro-cid-fjqfnjxi> ${posts.length > 0 ? posts.map((post) => renderTemplate`<a${addAttribute(`/posts/${post.uri.replace(/^\/|\/$/g, "")}`, "href")}${addAttribute(`bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transform hover:scale-105 transition duration-300 flex flex-col ${post.featuredImage?.node?.sourceUrl ? "h-[650px]" : "h-[550px]"} group`, "class")} data-astro-cid-fjqfnjxi> ${post.featuredImage?.node?.sourceUrl && renderTemplate`<img${addAttribute(post.featuredImage.node.sourceUrl, "src")}${addAttribute(post.featuredImage.node.altText || post.title, "alt")}${addAttribute(post.featuredImage.node.mediaDetails?.width || 600, "width")}${addAttribute(post.featuredImage.node.mediaDetails?.height || 400, "height")} class="w-full h-56 object-cover border-b border-gray-200" data-astro-cid-fjqfnjxi>`} <div class="p-7 flex flex-col flex-grow justify-between" data-astro-cid-fjqfnjxi> <div class="flex-grow" data-astro-cid-fjqfnjxi> <h3 class="text-2xl font-semibold mb-3 leading-tight text-gray-900 group-hover:text-blue-600 transition duration-300" data-astro-cid-fjqfnjxi>${post.title}</h3> <div class="text-gray-700 text-base mb-5" data-astro-cid-fjqfnjxi> ${post.content.replace(/<[^>]*>/g, "").replace(/&[#\w]+;/g, (match) => {
    const entities = {
      "&#8217;": "'",
      "&#8216;": "'",
      "&#8220;": '"',
      "&#8221;": '"',
      "&#8230;": "...",
      "&quot;": '"',
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&apos;": "'",
      "&nbsp;": " "
    };
    return entities[match] || match;
  }).replace(/\n+/g, " ").replace(/\s+/g, " ").trim().substring(0, 180) + (post.content.replace(/<[^>]*>/g, "").replace(/&[#\w]+;/g, (match) => {
    const entities = {
      "&#8217;": "'",
      "&#8216;": "'",
      "&#8220;": '"',
      "&#8221;": '"',
      "&#8230;": "...",
      "&quot;": '"',
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&apos;": "'",
      "&nbsp;": " "
    };
    return entities[match] || match;
  }).replace(/\n+/g, " ").replace(/\s+/g, " ").trim().length > 180 ? "..." : "")} </div> </div> </div> </a>`) : renderTemplate`<p class="text-center text-gray-600" data-astro-cid-fjqfnjxi>No posts found. Please check back later.</p>`} </div> <!-- Bottom CTA --> <section class="mt-10 mb-10 rounded-2xl p-6 bg-gradient-to-br from-cyan-500 to-blue-700 text-white shadow-xl flex flex-col items-center gap-3" data-astro-cid-fjqfnjxi> <h3 class="text-2xl font-bold mb-1 text-center" data-astro-cid-fjqfnjxi>${bottomCta["TITLE"]}</h3> <p class="text-base mb-3 text-center max-w-xl" data-astro-cid-fjqfnjxi>${bottomCta["DESCRIPTION"]}</p> <a href="#" id="open-ebook-modal-post" class="inline-block bg-white text-blue-800 font-bold py-2 px-6 rounded-full text-base hover:bg-gray-100 transition transform hover:scale-105 shadow"${addAttribute(bottomCta["BOOK ID"], "data-book-id")} data-astro-cid-fjqfnjxi> ${bottomCta["BUTTON TEXT"]} </a> </section> </main> <!-- Sidebar --> <aside class="lg:w-1/4 space-y-8" data-astro-cid-fjqfnjxi> <div class="bg-white p-6 rounded-3xl shadow-xl border border-blue-100" data-astro-cid-fjqfnjxi> <h3 class="text-2xl font-bold mb-4 text-gray-900" data-astro-cid-fjqfnjxi>Recent Posts</h3> <ul class="space-y-3" data-astro-cid-fjqfnjxi> ${sidebarPosts.map((p) => renderTemplate`<li data-astro-cid-fjqfnjxi> <a${addAttribute(`/posts/${p.uri.replace(/^\/|\/$/g, "")}`, "href")} class="text-blue-600 hover:underline font-medium" data-astro-cid-fjqfnjxi> ${p.title} </a> </li>`)} </ul> </div> <div class="bg-gradient-to-br from-cyan-100 to-blue-200 p-6 rounded-3xl border-l-4 border-blue-500 shadow-lg" data-astro-cid-fjqfnjxi> <h4 class="text-xl font-bold text-blue-800 mb-2" data-astro-cid-fjqfnjxi>${sidebarCta["TITLE"]}</h4> <p class="text-sm text-gray-800 mb-4" data-astro-cid-fjqfnjxi> ${sidebarCta["DESCRIPTION"]} </p> <a href="#" id="open-ebook-modal-sidebar" class="inline-block bg-blue-600 text-white font-bold py-2 px-5 rounded-full text-sm hover:bg-blue-700 transition"${addAttribute(sidebarCta["BOOK ID"], "data-book-id")} data-astro-cid-fjqfnjxi> ${sidebarCta["BUTTON TEXT"]} </a> </div> </aside> </div> </div> ` })}`;
}, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/posts/index.astro", void 0);

const $$file = "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/posts/index.astro";
const $$url = "/posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
