## 5. Testing Content Push (WordPress to Astro/Netlify)

### The Content Flow:
1.  **WordPress as the Content Hub:** `cms.acmemarketing.us` stores content.
2.  **WPGraphQL as the API Layer:** Exposes WordPress content via `https://cms.acmemarketing.us/graphql`.
3.  **Astro Fetches Content:** Astro sites query this endpoint during build.
4.  **Static Site Generation:** Astro generates static HTML, CSS, JS.
5.  **Netlify Deployment:** Triggered to rebuild and deploy new static files.

### Test Procedure:
1.  **Create a Test Post in WordPress:**
    *   Go to your WordPress admin login: `https://cms.acmemarketing.us/[your-custom-login-path]/` (e.g., `/cortex/`).
    *   Log in.
    *   Go to **"Posts"** > **"Add New"**.
    *   **Title:** `My First Headless Post`
    *   **Content:** `This content is coming from my headless WordPress CMS!`
    *   Click **"Publish"**.
2.  **Manually Trigger Netlify Build:**
    *   Go to your Netlify dashboard: [https://app.netlify.com](https://app.netlify.com)
    *   Click on the `acmemarketing.us` site.
    *   In the "Deploys" section, click the **"Trigger deploy"** dropdown.
    *   Select **"Deploy site"** > **"Clear cache and deploy site"**.
3.  **Verify on Live Site:**
    *   Once the Netlify build shows "Published", visit your `acmemarketing.us` domain (or its Netlify temporary URL).
    *   You should see "My First Headless Post" displayed on the homepage.