# Project Plan: Interlinked Marketing & SEO Ecosystem

This document serves as the central source of truth for the project strategy, architecture, and progress.

## 1. High-Level Strategy

The core strategy is a "Pillar and Niche" model to build a powerful, synergistic online presence and drive SEO authority to a central brand.

- **Pillar Site:** The main brand, content hub, and primary call-to-action.
- **Niche Sites:** Hyper-focused websites on specific sub-topics. They publish deep content and link *up* to the Pillar site to funnel authority.

### Domain Roles:

- **Pillar:** `acmemarketing.us` (The main marketing agency brand)
- **Niche 1:** `bemorefree.com` (Marketing automation and efficiency for solopreneurs)
- **Niche 2:** `bamteamservices.com` (Case studies and services for B2B marketing)
- **Niche 3:** `disendarkenment.com` (Psychedelic Facilitation, psychedelic journey, psychedelic integration, executive journey support, future trends, thought leadership, 1-on-1 intensives, small group psychedelic journeys)
- **Niche 4:** `mindlooker.com` (Uses deep inquiry to facilitate resolving unwanted personal conditions, 1-on-1 sessions)
- **Niche 5:** `ketohouse.com` (Marketing for health & wellness brands, extra focus on Keto friendly, recipes, Keto House branded products)
- **Niche 6:** `healthcareactivist.org` (Marketing for non-profits and advocacy groups, advocates for nursing unions, rants against big insurance, advocates for personal Case Managers, promotes own staff of Case Managers)

## 2. Technical Architecture

- **Content Backend:** Headless WordPress
- **Frontend Framework:** Astro (Static Site Generator)
- **Deployment & Hosting:** Netlify
- **Code Repository:** GitHub (ACME-Marketing Organization) - Local path: `/Users/waynesheppard/Development/ACME-Marketing/`
- **Automation Hub:** n8n

## 3. Credentials & URLs

- **GitHub Organization:** `https://github.com/ACME-Marketing`
- **Headless CMS URL:** `https://cms.acmemarketing.us`
- **CMS Login Path:** (You will set this with WPS Hide Login)

## 4. Project Task List

### Phase 1: Infrastructure Setup (Complete)

- [x] Create GitHub account
- [x] Create GitHub Organization: `ACME-Marketing`
- [x] Set up Headless WordPress CMS on `cms.acmemarketing.us`
- [x] Install & Configure WPGraphQL Plugin
- [x] Install & Configure WPS Hide Login Plugin
- [x] Set Permalinks in WordPress
- [x] Create Pillar GitHub Repo: `acmemarketing.us`
- [x] Create `GEMINI_PLAN.md`
- [x] Create Netlify Account and connect to GitHub
- [x] Develop initial Astro frontend for `acmemarketing.us`
- [x] Integrate WordPress GraphQL API into `acmemarketing.us`
- [x] Added `netlify.toml` for explicit build configuration to `acmemarketing.us`
- [x] Point `acmemarketing.us` domain to Netlify
- [x] Create GitHub Repo: `bemorefree.com`
- [x] Create GitHub Repo: `bamteamservices.com`
- [x] Create GitHub Repo: `disendarkenment.com`
- [x] Create GitHub Repo: `mindlooker.com`
- [x] Create GitHub Repo: `ketohouse.com`
- [x] Create GitHub Repo: `healthcareactivist.org`
- [x] Replicate Astro setup for `bemorefree.com`
- [x] Integrate WordPress GraphQL API into `bemorefree.com`
- [x] Replicate Astro setup for `bamteamservices.com`
- [x] Integrate WordPress GraphQL API into `bamteamservices.com`
- [x] Replicate Astro setup for `disendarkenment.com`
- [x] Integrate WordPress GraphQL API into `disendarkenment.com`
- [x] Replicate Astro setup for `mindlooker.com`
- [x] Integrate WordPress GraphQL API into `mindlooker.com`
- [x] Replicate Astro setup for `ketohouse.com`
- [x] Integrate WordPress GraphQL API into `ketohouse.com`
- [x] Replicate Astro setup for `healthcareactivist.org`
- [x] Integrate WordPress GraphQL API into `healthcareactivist.org`
- [x] Replicate Astro setup for all Niche sites
- [x] Integrate WordPress GraphQL API into all Niche sites
- [x] Point `bemorefree.com` domain to Netlify
- [x] Point `bamteamservices.com` domain to Netlify
- [x] Point `disendarkenment.com` domain to Netlify
- [x] Point `mindlooker.com` domain to Netlify
- [x] Point `ketohouse.com` domain to Netlify
- [x] Point `healthcareactivist.org` domain to Netlify

### Phase 2: Content & Automation (In Progress)

- [x] Verified WordPress content push (successful on `bemorefree.com`)
- [x] Created categories in WordPress for each niche site
- [x] n8n instance running at `https://n8n.srv874889.hstgr.cloud/`
- [x] WordPress webhook successfully posting to n8n
- [x] Developed n8n workflow for automated Netlify deployments
- [x] Added basic layout and global styling to all sites
  - [x] Troubleshooting: Styling not fully visible on live sites; `global.css` and `index.astro` updated and pushed, local cache cleared, dependencies reinstalled. (Resolved)
- [ ] Develop n8n workflow for automated social sharing
- [ ] Begin content creation based on the "Create Once, Repurpose Everywhere" model.

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
