/* empty css                                 */
import { f as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, k as renderComponent, h as addAttribute } from '../chunks/astro/server_Ci1ivB3A.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DJybL96h.mjs';
import 'clsx';
import { createClient } from '@supabase/supabase-js';
import { g as getCta } from '../chunks/loadCtaData_DZsNvsdf.mjs';
export { renderers } from '../renderers.mjs';

const $$CourseNotificationModal = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Course Notification Modal -->${maybeRenderHead()}<div id="course-notification-modal" class="fixed inset-0 bg-black/80 backdrop-blur-[6px] flex items-center justify-center z-50 hidden"> <div class="relative bg-gradient-to-br from-blue-900/90 to-cyan-900/90 border-2 border-cyan-400/40 rounded-2xl shadow-2xl max-w-lg w-full p-10 flex flex-col items-center animate-glass-modal"> <!-- Rifle Scope AI SVG Icon --> <div class="mb-4"> <svg class="w-16 h-16" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="40" cy="40" r="32" fill="#22d3ee" fill-opacity="0.18"></circle> <circle cx="40" cy="40" r="30" stroke="#fff" stroke-width="1.5" fill="none"></circle> <!-- Crosshairs --> <line x1="40" y1="20" x2="40" y2="60" stroke="#fff" stroke-width="2.5" stroke-linecap="round"></line> <line x1="20" y1="40" x2="60" y2="40" stroke="#fff" stroke-width="2.5" stroke-linecap="round"></line> <!-- Tick marks --> <line x1="40" y1="10" x2="40" y2="16" stroke="#fff" stroke-width="1.2"></line> <line x1="40" y1="64" x2="40" y2="70" stroke="#fff" stroke-width="1.2"></line> <line x1="10" y1="40" x2="16" y2="40" stroke="#fff" stroke-width="1.2"></line> <line x1="64" y1="40" x2="70" y2="40" stroke="#fff" stroke-width="1.2"></line> </svg> </div> <button id="close-course-notification-modal" class="absolute top-4 right-4 text-cyan-300 hover:text-fuchsia-400 text-3xl font-bold transition-all">&times;</button> <h2 class="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg tracking-tight break-words whitespace-normal leading-tight">
Get Course Notifications
</h2> <p class="text-center text-cyan-200 mb-6">
Be the first to know when new AI marketing courses launch. We'll notify you about:
</p> <ul class="text-cyan-200 mb-6 space-y-2"> <li class="flex items-center"> <span class="text-green-400 mr-2">✓</span>
New course releases
</li> <li class="flex items-center"> <span class="text-green-400 mr-2">✓</span>
Course updates and improvements
</li> <li class="flex items-center"> <span class="text-green-400 mr-2">✓</span>
Special launch discounts
</li> </ul> <form id="course-notification-form" class="w-full space-y-6 mt-2"> <div class="relative"> <input type="text" id="notification-first-name" name="first_name" class="peer bg-transparent border-b-2 border-cyan-300 text-white placeholder-transparent focus:outline-none focus:border-fuchsia-400 w-full py-3 px-2 transition-all" placeholder="First Name"> <label for="notification-first-name" class="absolute left-2 top-3 text-cyan-200 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-8 peer-focus:text-xs peer-focus:text-fuchsia-200 pointer-events-none">First Name</label> </div> <div class="relative"> <input type="text" id="notification-last-name" name="last_name" class="peer bg-transparent border-b-2 border-cyan-300 text-white placeholder-transparent focus:outline-none focus:border-fuchsia-400 w-full py-3 px-2 transition-all" placeholder="Last Name"> <label for="notification-last-name" class="absolute left-2 top-3 text-cyan-200 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-8 peer-focus:text-xs peer-focus:text-fuchsia-200 pointer-events-none">Last Name</label> </div> <div class="relative"> <input type="email" id="notification-email" name="email" class="peer bg-transparent border-b-2 border-cyan-300 text-white placeholder-transparent focus:outline-none focus:border-fuchsia-400 w-full py-3 px-2 transition-all" placeholder="Email" required> <label for="notification-email" class="absolute left-2 top-3 text-cyan-200 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-8 peer-focus:text-xs peer-focus:text-fuchsia-200 pointer-events-none">Email *</label> </div> <div class="relative"> <input type="text" id="notification-company" name="company" class="peer bg-transparent border-b-2 border-cyan-300 text-white placeholder-transparent focus:outline-none focus:border-fuchsia-400 w-full py-3 px-2 transition-all" placeholder="Company (Optional)"> <label for="notification-company" class="absolute left-2 top-3 text-cyan-200 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-8 peer-focus:text-xs peer-focus:text-fuchsia-200 pointer-events-none">Company (Optional)</label> </div> <div class="text-center mt-6"> <button type="submit" class="bg-gradient-to-r from-cyan-400 via-blue-600 to-fuchsia-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-fuchsia-500 hover:to-cyan-400 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 transition-all duration-300 text-lg tracking-wide">
Subscribe to Notifications
</button> </div> </form> <!-- Success Message (hidden by default) --> <div id="notification-success" class="hidden text-center"> <div class="text-6xl mb-4">🎉</div> <h3 class="text-2xl font-bold text-white mb-2">You're All Set!</h3> <p class="text-cyan-200 mb-6">
We'll notify you as soon as new courses are available. Check your email for a confirmation.
</p> <button id="close-notification-success" class="bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition duration-300">
Close
</button> </div> <!-- Tagline below CTA --> <div class="mt-8 text-center text-cyan-200 text-base font-semibold tracking-wide italic opacity-80">
AI First Marketing—Unleashed
</div> </div> </div> ${renderScript($$result, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/components/CourseNotificationModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/components/CourseNotificationModal.astro", void 0);

const supabaseUrl = "https://jnmancmdvjslsvkzaufo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubWFuY21kdmpzbHN2a3phdWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2ODQ1OTMsImV4cCI6MjA2NzI2MDU5M30.oiaztyJ64bZWFxDf1krcf8Ha0i6uKXwvzWm_9bMALZg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const $$Courses = createComponent(async ($$result, $$props, $$slots) => {
  getCta({ page: "courses", location: "hero" });
  let courses = [];
  try {
    const { data: coursesData, error: coursesError } = await supabase.from("courses").select("*").eq("is_active", true).order("created_at", { ascending: false });
    if (coursesError) {
      console.error("Error fetching courses:", coursesError);
    } else {
      courses = coursesData || [];
      console.log("Fetched courses:", courses.length, courses);
      for (let course of courses) {
        const { data: episodesData, error: episodesError } = await supabase.from("course_episodes").select("id, title, episode_number, is_free, description").eq("course_id", course.id).order("episode_number", { ascending: true });
        if (episodesError) {
          console.error(`Error fetching episodes for course ${course.id}:`, episodesError);
          course.course_episodes = [];
        } else {
          course.course_episodes = episodesData || [];
        }
      }
    }
  } catch (error) {
    console.error("Error in courses page:", error);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Courses - ACME Marketing" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-700 to-fuchsia-600 text-white py-20 px-6"> <div class="absolute inset-0 z-0"> <!-- Animated background elements --> <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div> <div class="absolute top-20 right-20 w-24 h-24 bg-cyan-300/20 rounded-full blur-lg animate-pulse delay-1000"></div> <div class="absolute bottom-10 left-1/4 w-40 h-40 bg-fuchsia-300/15 rounded-full blur-2xl animate-pulse delay-2000"></div> </div> <div class="relative z-10 container mx-auto max-w-6xl"> <div class="text-center"> <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
AI Marketing Courses
</h1> <p class="text-xl md:text-2xl mb-8 text-cyan-100 max-w-3xl mx-auto">
Master AI-powered marketing with our comprehensive courses. Start with free episodes, then unlock the full potential.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <button id="open-consultation-modal-courses" class="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-100 transition duration-300 shadow-lg">
Get Free Consultation
</button> <a href="#courses" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition duration-300">
Browse Courses
</a> </div> </div> </div> </section>  <section id="courses" class="py-16 px-6 bg-gray-50"> <div class="container mx-auto max-w-6xl"> <div class="text-center mb-12"> <h2 class="text-4xl font-bold text-gray-900 mb-4">Available Courses</h2> <p class="text-xl text-gray-600 max-w-2xl mx-auto">
Each course starts with a free episode so you can experience our teaching style before committing.
</p> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${courses.map((course) => {
    const freeEpisode = course.course_episodes?.find((ep) => ep.is_free);
    const totalEpisodes = course.course_episodes?.length || 0;
    const paidEpisodes = totalEpisodes - (freeEpisode ? 1 : 0);
    return renderTemplate`<div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"> <!-- Course Header --> <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white"> <h3 class="text-2xl font-bold mb-2">${course.title}</h3> <p class="text-blue-100 mb-4">${course.description}</p> <div class="flex items-center justify-between"> <span class="text-3xl font-bold">$${course.price}</span> <span class="bg-white/20 px-3 py-1 rounded-full text-sm"> ${totalEpisodes} Episodes
</span> </div> </div> <!-- Course Content --> <div class="p-6"> <div class="mb-4"> <h4 class="font-semibold text-gray-900 mb-2">What's Included:</h4> <ul class="text-gray-600 space-y-1"> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span>
Free first episode
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span> ${paidEpisodes} additional episodes
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span>
Lifetime access
</li> <li class="flex items-center"> <span class="text-green-500 mr-2">✓</span>
Certificate of completion
</li> </ul> </div> ${freeEpisode && renderTemplate`<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"> <h5 class="font-semibold text-green-800 mb-2">Free Episode Available:</h5> <p class="text-green-700 text-sm">
Episode ${freeEpisode.episode_number}: ${freeEpisode.title} </p> </div>`} <!-- Action Buttons --> <div class="space-y-3"> <a${addAttribute(`/courses/${course.id}`, "href")} class="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
View Course
</a> <button${addAttribute(`enrollInCourse('${course.id}', '${course.stripe_price_id}', ${course.price})`, "onclick")} class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
Enroll Now - $${course.price} </button> </div> </div> </div>`;
  })} </div> <!-- No Courses Message --> ${courses.length === 0 && renderTemplate`<div class="text-center py-12"> <div class="text-6xl mb-4">📚</div> <h3 class="text-2xl font-semibold text-gray-900 mb-2">Courses Coming Soon</h3> <p class="text-gray-600 mb-6">
We're preparing amazing AI marketing courses for you. Sign up to be notified when they launch!
</p> <button id="open-course-notification-modal" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
Get Notified
</button> </div>`} </div> </section>  <section class="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white"> <div class="container mx-auto max-w-4xl text-center"> <h2 class="text-3xl md:text-4xl font-bold mb-6">
Ready to Transform Your Marketing with AI?
</h2> <p class="text-xl mb-8 text-blue-100">
Join thousands of marketers who are already using AI to create better content, 
        reach more customers, and grow their businesses faster.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <button id="open-consultation-modal-courses-bottom" class="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-100 transition duration-300">
Start Your AI Journey
</button> <a href="/services" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition duration-300">
Learn More
</a> </div> </div> </section>  ${renderComponent($$result2, "CourseNotificationModal", $$CourseNotificationModal, {})} ` })} ${renderScript($$result, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/courses.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/courses.astro", void 0);

const $$file = "/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/courses.astro";
const $$url = "/courses";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Courses,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
