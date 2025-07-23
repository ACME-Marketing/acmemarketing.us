import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_Ci1ivB3A.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DWVhtjJD.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/","cacheDir":"file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/node_modules/.astro/","outDir":"file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/dist/","srcDir":"file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/","publicDir":"file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/public/","buildClientDir":"file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/dist/client/","buildServerDir":"file:///Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.B2dvnIdm.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/course-notifications","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/course-notifications\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"course-notifications","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/course-notifications.ts","pathname":"/api/course-notifications","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.B2dvnIdm.css"}],"routeData":{"route":"/courses","isIndex":false,"type":"page","pattern":"^\\/courses\\/?$","segments":[[{"content":"courses","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/courses.astro","pathname":"/courses","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.B2dvnIdm.css"},{"type":"inline","content":"@keyframes gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}to{background-position:0% 50%}}.animate-gradient[data-astro-cid-fjqfnjxi]{background-size:200% 200%;animation:gradient 8s ease-in-out infinite;animation-fill-mode:both;animation-iteration-count:infinite}@keyframes typewriter{0%{width:0}to{width:100%}}.animate-typewriter[data-astro-cid-fjqfnjxi]{display:inline-block;overflow:hidden;white-space:nowrap;border-right:2px solid #fff;width:0;animation:typewriter 2.5s steps(40,end) .5s 1 normal both}@keyframes fadein{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fadein[data-astro-cid-fjqfnjxi]{animation:fadein 1.2s 1.5s both}@keyframes ai-pulse{0%,to{filter:drop-shadow(0 0 0px #fff)}50%{filter:drop-shadow(0 0 16px #fff)}}.animate-ai-pulse[data-astro-cid-fjqfnjxi]{animation:ai-pulse 2.5s infinite}@keyframes spin-slow{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.animate-spin-slow[data-astro-cid-fjqfnjxi]{transform-origin:40px 40px;animation:spin-slow 8s linear infinite}@keyframes cta-pulse{0%,to{box-shadow:0 0 #3b82f666}50%{box-shadow:0 0 0 12px #3b82f61a}}.animate-cta-pulse[data-astro-cid-fjqfnjxi]{animation:cta-pulse 2.2s infinite}\n"}],"routeData":{"route":"/posts","isIndex":true,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/index.astro","pathname":"/posts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.B2dvnIdm.css"}],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.B2dvnIdm.css"},{"type":"inline","content":"@keyframes float{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}.animate-float[data-astro-cid-ucd2ps2b]{animation:float 3s ease-in-out infinite}\n"}],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.B2dvnIdm.css"},{"type":"inline","content":"@keyframes gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}to{background-position:0% 50%}}.animate-gradient[data-astro-cid-j7pv25f6]{background-size:200% 200%;animation:gradient 8s ease-in-out infinite;animation-fill-mode:both;animation-iteration-count:infinite}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://acmemarketing.us","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/courses.astro",{"propagation":"none","containsHead":true}],["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/posts/[...slug].astro",{"propagation":"none","containsHead":true}],["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/posts/index.astro",{"propagation":"none","containsHead":true}],["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/services.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/course-notifications@_@ts":"pages/api/course-notifications.astro.mjs","\u0000@astro-page:src/pages/courses@_@astro":"pages/courses.astro.mjs","\u0000@astro-page:src/pages/posts/index@_@astro":"pages/posts.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CAcfpNGW.mjs","/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DtdUhiOh.mjs","@astrojs/react/client.js":"_astro/client.Co0vMr8l.js","/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/pages/courses.astro?astro&type=script&index=0&lang.ts":"_astro/courses.astro_astro_type_script_index_0_lang.Dz4h_2wM.js","/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.Bclmo1en.js","/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/components/CourseNotificationModal.astro?astro&type=script&index=0&lang.ts":"_astro/CourseNotificationModal.astro_astro_type_script_index_0_lang.BR-JyUzj.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","const L=document.querySelectorAll('[id^=\"open-ebook-modal\"]'),d=document.getElementById(\"lead-form-modal\"),r=document.getElementById(\"close-ebook-modal\"),B=document.getElementById(\"ebook-page-of-click\"),m=document.getElementById(\"ebook-book-id\"),f=document.getElementById(\"open-consultation-modal\"),v=document.getElementById(\"open-consultation-modal-contact\"),E=document.getElementById(\"open-consultation-modal-hero\"),y=document.getElementById(\"open-consultation-modal-services\"),p=document.getElementById(\"open-consultation-modal-services-cta\"),t=document.getElementById(\"consultation-form-modal\"),b=document.getElementById(\"close-consultation-modal\"),s=document.getElementById(\"consultation-page-of-click\");function a(e,i){e.classList.remove(\"hidden\"),e.classList.add(\"flex\"),document.body.style.overflow=\"hidden\",i&&(i.value=window.location.href)}function u(e){e.classList.add(\"hidden\"),e.classList.remove(\"flex\"),document.body.style.overflow=\"\"}r&&d&&(r.addEventListener(\"click\",()=>u(d)),d.addEventListener(\"click\",e=>{e.target===d&&u(d)}));f&&f.addEventListener(\"click\",e=>{e.preventDefault(),a(t,s)});v&&v.addEventListener(\"click\",e=>{e.preventDefault(),a(t,s)});E&&E.addEventListener(\"click\",e=>{e.preventDefault(),a(t,s)});y&&y.addEventListener(\"click\",e=>{e.preventDefault(),a(t,s)});p&&p.addEventListener(\"click\",e=>{e.preventDefault(),a(t,s)});b&&b.addEventListener(\"click\",()=>u(t));t&&t.addEventListener(\"click\",e=>{e.target===t&&u(t)});function k(){document.querySelectorAll('#ebook-form input[type=\"text\"], #ebook-form input[type=\"email\"]').forEach(i=>{const l=document.querySelector(`label[for=\"${i.id}\"]`);if(!l)return;const c=i;function n(){if(!l)return;const o=l;c.value.trim()!==\"\"?(o.style.opacity=\"0\",o.style.visibility=\"hidden\"):(o.style.opacity=\"1\",o.style.visibility=\"visible\")}n(),c.addEventListener(\"input\",n),c.addEventListener(\"focus\",function(){if(!l)return;const o=l;this.value.trim()===\"\"&&(o.style.opacity=\"1\",o.style.visibility=\"visible\")}),c.addEventListener(\"blur\",n),c.addEventListener(\"change\",n),c.addEventListener(\"animationstart\",function(o){o.animationName===\"onAutoFillStart\"&&n()}),setTimeout(n,100),setTimeout(n,500),setTimeout(n,1e3)})}L.forEach(e=>{e.addEventListener(\"click\",i=>{if(i.preventDefault(),d&&(a(d,B),setTimeout(k,100)),m){const l=m;l.value=e.getAttribute(\"data-book-id\")||\"\"}})});document.addEventListener(\"DOMContentLoaded\",()=>{setInterval(()=>{const e=document.getElementById(\"ebook-form\");e&&!e.classList.contains(\"hidden\")&&k()},2e3)});"],["/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/src/components/CourseNotificationModal.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"course-notification-modal\"),r=document.getElementById(\"close-course-notification-modal\"),o=document.getElementById(\"course-notification-form\"),l=document.getElementById(\"notification-success\"),d=document.getElementById(\"close-notification-success\");function f(){e&&(e.classList.remove(\"hidden\"),e.classList.add(\"flex\"),document.body.style.overflow=\"hidden\")}function n(){e&&(e.classList.add(\"hidden\"),e.classList.remove(\"flex\"),document.body.style.overflow=\"\")}r&&r.addEventListener(\"click\",n);e&&e.addEventListener(\"click\",s=>{s.target===e&&n()});o&&o.addEventListener(\"submit\",async s=>{s.preventDefault();const t=new FormData(o),i={email:t.get(\"email\"),first_name:t.get(\"first_name\"),last_name:t.get(\"last_name\"),company:t.get(\"company\")};try{const a=await(await fetch(\"/api/course-notifications\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(i)})).json();a.success?(o.classList.add(\"hidden\"),l.classList.remove(\"hidden\")):alert(a.error||\"There was an error subscribing to notifications.\")}catch(c){console.error(\"Error subscribing to notifications:\",c),alert(\"There was an error subscribing to notifications. Please try again.\")}});d&&d.addEventListener(\"click\",()=>{l.classList.add(\"hidden\"),o.classList.remove(\"hidden\"),n()});window.showCourseNotificationModal=f;o&&o.querySelectorAll(\"input\").forEach(t=>{const i=document.querySelector(`label[for=\"${t.id}\"]`);i&&t.addEventListener(\"input\",()=>{t.value.trim()?(i.style.opacity=\"0\",i.style.visibility=\"hidden\"):(i.style.opacity=\"1\",i.style.visibility=\"visible\")})});"]],"assets":["/_astro/about.B2dvnIdm.css","/acmemarketing logo1.jpg","/ai-automation.svg","/global.css","/hero-background.svg","/workflow-automation.svg","/_astro/client.Co0vMr8l.js","/_astro/courses.astro_astro_type_script_index_0_lang.Dz4h_2wM.js","/fonts/Brolink DEMO.otf","/fonts/MrsSheppards-Regular.ttf","/fonts/abastina.otf"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"SvCKCtNnkw0HGSuPQft1S3URnybSxvtm6j04yvWVK7M=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/waynesheppard/Development/ACME-Marketing/acmemarketing.us/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
