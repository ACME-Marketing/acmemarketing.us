/* empty css                                 */
import { f as createComponent, m as maybeRenderHead, r as renderTemplate, e as createAstro, h as addAttribute, k as renderComponent } from '../chunks/astro/server_Ci1ivB3A.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DJybL96h.mjs';
import 'clsx';
import { g as graphQLClient } from '../chunks/graphql_DzNVuGaG.mjs';
import { g as getCta } from '../chunks/loadCtaData_DZsNvsdf.mjs';
/* empty css                                 */
import { gql } from 'graphql-request';
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-black text-white py-24 px-6 md:px-12 text-center relative overflow-hidden"> <div class="max-w-4xl mx-auto z-10 relative"> <h1 class="text-4xl md:text-6xl font-bold leading-tight">
AI-Powered Marketing. <br>
Human-Level Strategy.
</h1> <p class="mt-6 text-lg md:text-xl text-gray-400">
We help brands automate intelligently, convert faster, and grow smarter — powered by next-gen AI.
</p> <div class="mt-8 flex justify-center gap-4"> <a href="#" id="open-consultation-modal-hero" class="bg-cyan-400 text-black px-6 py-3 rounded-full font-medium hover:bg-cyan-300 transition">
Get a Demo
</a> <a href="/services" class="border border-gray-500 px-6 py-3 rounded-full text-gray-300 hover:text-white hover:border-white transition">
What We Do
</a> </div> </div> <!-- Background glow effect --> <div class="absolute inset-0 z-0 pointer-events-none"> <div class="absolute w-[40rem] h-[40rem] bg-cyan-400 blur-[150px] opacity-20 left-1/2 -translate-x-1/2 top-0"></div> </div> </section>`;
}, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/components/Hero.astro", void 0);

const $$Astro$1 = createAstro("https://acmemarketing.us");
const $$HomepagePosts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HomepagePosts;
  const { posts } = Astro2.props;
  console.log("HomepagePosts component received posts:", posts.length);
  console.log("HomepagePosts posts array:", posts);
  const uriCounts = {};
  posts.forEach((post) => {
    uriCounts[post.uri] = (uriCounts[post.uri] || 0) + 1;
  });
  console.log("HomepagePosts URI counts:", uriCounts);
  posts.forEach((post, index) => {
    console.log(`Rendering post ${index + 1}: "${post.title}" (${post.uri})`);
  });
  return renderTemplate`${maybeRenderHead()}<main class="container mx-auto px-4 py-16"> <h2 class="text-3xl font-bold text-center mb-12">Latest Insights</h2> ${posts.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${posts.map((post, index) => renderTemplate`<a${addAttribute(`/posts/${post.uri.replace(/^\/|\/$/g, "")}`, "href")}${addAttribute(`bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transform hover:scale-105 transition duration-300 flex flex-col ${post.featuredImage?.node?.sourceUrl ? "h-[650px]" : "h-[550px]"} group`, "class")}> ${post.featuredImage?.node?.sourceUrl && renderTemplate`<img${addAttribute(post.featuredImage.node.sourceUrl, "src")}${addAttribute(post.featuredImage.node.altText || post.title, "alt")}${addAttribute(post.featuredImage.node.mediaDetails.width, "width")}${addAttribute(post.featuredImage.node.mediaDetails.height, "height")} class="w-full h-56 object-cover border-b border-gray-200">`} <div class="p-6 flex flex-col flex-grow"> <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors"> ${post.title} </h3> <div class="text-gray-700 text-base mb-5 flex-grow"> ${post.content ? post.content.replace(/<[^>]*>/g, "").replace(/&[#\w]+;/g, (match) => {
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
  }).replace(/\n+/g, " ").replace(/\s+/g, " ").trim().length > 180 ? "..." : "") : "No content available"} </div> <div class="mt-auto"> <span class="text-cyan-600 font-medium group-hover:text-cyan-700 transition-colors">
Read More →
</span> </div> </div> </a>`)} </div>` : renderTemplate`<p class="text-center text-gray-600">
No posts found. Please add some posts in your WordPress CMS with the tag <code>"acmemarketing"</code> or <code>"all"</code>.
</p>`} </main>`;
}, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/components/HomepagePosts.astro", void 0);

const $$Astro = createAstro("https://acmemarketing.us");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const GET_POSTS = gql`
  query GetPosts {
    posts(where: { tagSlugIn: ["acmemarketing", "all"] }) {
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
        tags {
          nodes {
            name
            slug
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
    console.log("Fetched posts for acmemarketing.us:", posts);
    console.log("Post details:");
    posts.forEach((post, index) => {
      console.log(`${index + 1}. Title: "${post.title}" | URI: "${post.uri}"`);
    });
    const uriCounts = {};
    posts.forEach((post) => {
      uriCounts[post.uri] = (uriCounts[post.uri] || 0) + 1;
    });
    console.log("URI counts:", uriCounts);
    const uniquePosts = posts.filter(
      (post, index, self) => index === self.findIndex((p) => p.uri === post.uri)
    );
    if (uniquePosts.length !== posts.length) {
      console.log(`Removed ${posts.length - uniquePosts.length} duplicate posts`);
      console.log("Final unique posts:");
      uniquePosts.forEach((post, index) => {
        console.log(`${index + 1}. Title: "${post.title}" | URI: "${post.uri}"`);
      });
    }
    posts = uniquePosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  getCta({ page: "home", location: "hero" });
  getCta({ page: "home", location: "sidebar" });
  const bottomCta = getCta({ page: "home", location: "bottom" });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "ACME Marketing", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, { "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<div class="w-full relative overflow-hidden" data-astro-cid-j7pv25f6> <!-- Gradient pulse background --> <div class="absolute inset-0 animate-gradient bg-gradient-to-br from-cyan-500 via-blue-700 to-fuchsia-600 opacity-15 pointer-events-none" data-astro-cid-j7pv25f6></div> <!-- Content with relative positioning to stay above wave --> <div class="relative z-10" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "HomepagePosts", $$HomepagePosts, { "posts": posts, "data-astro-cid-j7pv25f6": true })} </div> </div>  <section class="w-full flex justify-center mt-16 mb-0" data-astro-cid-j7pv25f6> <div class="max-w-2xl w-full bg-gradient-to-br from-cyan-500 to-blue-700 text-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-4 border-2 border-blue-200" data-astro-cid-j7pv25f6> <h3 class="text-3xl font-bold mb-2 text-center" data-astro-cid-j7pv25f6>${bottomCta["TITLE"]}</h3> <p class="text-lg mb-4 text-center" data-astro-cid-j7pv25f6>${bottomCta["DESCRIPTION"]}</p> <a href="#" id="open-ebook-modal-bottom" class="inline-block bg-white text-blue-800 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow"${addAttribute(bottomCta["BOOK ID"], "data-book-id")} data-astro-cid-j7pv25f6> ${bottomCta["BUTTON TEXT"]} </a> </div> </section> ` })} `;
}, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/index.astro", void 0);

const $$file = "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
