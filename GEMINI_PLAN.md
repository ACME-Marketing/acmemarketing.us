 1 # Project Plan: Interlinked Marketing & SEO Ecosystem
    2 
    3 This document serves as the central source of truth for the project strategy, architecture, and progress.
    4 
    5 ## 1. High-Level Strategy
    6 
    7 The core strategy is a "Pillar and Niche" model to build a powerful, synergistic online presence and drive SEO
      authority to a central brand.
    8 
    9 - **Pillar Site:** The main brand, content hub, and primary call-to-action.
   10 - **Niche Sites:** Hyper-focused websites on specific sub-topics. They publish deep content and link *up* to the Pillar
      site to funnel authority.
   11 
   12 ### Domain Roles:
   13 
   14 - **Pillar:** `acmemarketing.us` (The main marketing agency brand)
   15 - **Niche 1:** `bemorefree.com` (Marketing automation and efficiency for solopreneurs)
   16 - **Niche 2:** `bamteamservices.com` (Case studies and services for B2B marketing)
   17 - **Niche 3:** `disendarkenment.com` (Psychedelic Facilitation, psychedelic journey, psychedelic integration, executive journey support, future trends, thought leadership, 1-on-1 intensives, small group psychedelic journeys)
   18 - **Niche 4:** `mindlooker.com` (Uses deep inquiry to facilitate resolving unwanted personal conditions, 1-on-1 sessions)
   19 - **Niche 5:** `ketohouse.com` (Marketing for health & wellness brands, extra focus on Keto friendly, recipes, Keto House branded products)
   20 - **Niche 6:** `healthcareactivist.org` (Marketing for non-profits and advocacy groups, advocates for nursing unions, rants against big insurance, advocates for personal Case Managers, promotes own staff of Case Managers)
   21 
   22 ## 2. Technical Architecture
   23 
   24 - **Content Backend:** Headless WordPress
   25 - **Frontend Framework:** Astro (Static Site Generator)
   26 - **Deployment & Hosting:** Vercel
   27 - **Code Repository:** GitHub (ACME-Marketing Organization)
   28 - **Automation Hub:** n8n
   29 
   30 ## 3. Credentials & URLs
   31 
   32 - **GitHub Organization:** `https://github.com/ACME-Marketing`
   33 - **Headless CMS URL:** `https://cms.acmemarketing.us`
   34 - **CMS Login Path:** (You will set this with WPS Hide Login)
   35 
   36 ## 4. Project Task List
   37 
   38 ### Phase 1: Infrastructure Setup (In Progress)
   39 
   40 - [x] Create GitHub account
   41 - [x] Create GitHub Organization: `ACME-Marketing`
   42 - [x] Set up Headless WordPress CMS on `cms.acmemarketing.us`
   43 - [x] Install & Configure WPGraphQL Plugin
   44 - [x] Install & Configure WPS Hide Login Plugin
   45 - [x] Set Permalinks in WordPress
   46 - [x] Create Pillar GitHub Repo: `acmemarketing.us`
   47 - [x] Create `GEMINI_PLAN.md`
   48 - [ ] Create Vercel Account and connect to GitHub
   49 - [ ] Develop initial Astro frontend for `acmemarketing.us`
   50 - [ ] Point `acmemarketing.us` domain to Vercel
   51 - [ ] Create remaining 6 GitHub repositories
   52 - [ ] Replicate Astro setup for all Niche sites
   53 
   54 ### Phase 2: Content & Automation
   55 
   56 - [ ] Develop n8n workflow for content repurposing
   57 - [ ] Develop n8n workflow for automated social sharing
   58 - [ ] Begin content creation based on the "Create Once, Repurpose Everywhere" model.

