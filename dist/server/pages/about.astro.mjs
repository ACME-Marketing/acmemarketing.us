/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_Ci1ivB3A.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DJybL96h.mjs';
import { g as getCta } from '../chunks/loadCtaData_DZsNvsdf.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  const heroCta = getCta({ page: "about", location: "hero" });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About ACME Marketing" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-12"> <h1 class="text-4xl font-extrabold text-center mb-8 text-gray-900">About ACME Marketing</h1> <div class="prose lg:prose-xl mx-auto text-gray-700"> <p class="lead text-center text-xl mb-8">At ACME Marketing, we're not just another agency; we're your partners in navigating the dynamic digital landscape. We specialize in crafting cutting-edge online marketing strategies that don't just get noticed—they drive results.</p> <div class="flex flex-col md:flex-row items-center md:space-x-8 mb-12"> <div class="md:w-1/2"> <img src="/ai-automation.svg" alt="AI Boosted Content Generation" class="w-full h-auto rounded-lg shadow-md mb-6 md:mb-0"> </div> <div class="md:w-1/2"> <h2 class="text-3xl font-bold mb-4">Our Edge: AI-Boosted Content & Automation</h2> <p>What sets us apart is our innovative approach to content generation and marketing automation. We harness the power of artificial intelligence to supercharge your campaigns, ensuring your message resonates with precision and impact. From compelling copy to engaging visuals, our AI-boosted content creation process is designed for efficiency and effectiveness, allowing you to scale your marketing efforts like never before.</p> </div> </div> <div class="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-8 mb-12"> <div class="md:w-1/2"> <img src="/workflow-automation.svg" alt="Seamless Automation" class="w-full h-auto rounded-lg shadow-md mb-6 md:mb-0"> </div> <div class="md:w-1/2"> <h2 class="text-3xl font-bold mb-4">n8n Automation for Maximum Impact</h2> <p>Beyond content, we build intelligent automation workflows that streamline your marketing operations. Imagine lead nurturing sequences, personalized customer journeys, and data-driven insights, all working seamlessly in the background. This frees up your valuable time and resources, allowing you to focus on what you do best: growing your business.</p> </div> </div> <div class="text-center mt-12 p-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md"> <h3 class="text-3xl font-bold text-blue-800 mb-4">${heroCta["TITLE"]}</h3> <p class="text-lg text-gray-700 mb-6">${heroCta["DESCRIPTION"]}</p> <a href="#" id="open-ebook-modal-about" class="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"${addAttribute(heroCta["BOOK ID"], "data-book-id")}> ${heroCta["BUTTON TEXT"]} </a> </div> <h2 class="text-3xl font-bold mb-4 mt-12">Why Choose ACME Marketing?</h2> <ul> <li><strong>Innovation:</strong> We stay ahead of the curve, leveraging the latest AI and automation technologies.</li> <li><strong>Results-Driven:</strong> Our strategies are designed with your ROI in mind, focusing on measurable growth.</li> <li><strong>Partnership:</strong> We work closely with you, understanding your unique goals and tailoring solutions to fit.</li> <li><strong>Efficiency:</strong> Our automated processes save you time and money, delivering high-quality output at speed.</li> </ul> <p class="text-center text-xl mt-10">Ready to transform your online presence? Let's build something amazing together.</p> </div> </main> ` })}`;
}, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/about.astro", void 0);

const $$file = "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
