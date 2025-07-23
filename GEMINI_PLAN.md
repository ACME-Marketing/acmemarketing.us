# Project Plan: AI Marketing Course Platform

This document serves as the central source of truth for the project strategy, architecture, and progress.

## 1. High-Level Strategy

The core strategy is to establish `acmemarketing.us` as a premier online destination for AI-powered marketing education. The previous "Pillar and Niche" model is deprecated. The new focus is on creating and selling high-quality online courses.

## 2. Technical Architecture

- **Backend:** Supabase (Postgres, Auth, Storage, Edge Functions)
- **Frontend Framework:** Astro
- **Deployment & Hosting:** Render.com
- **Email/Notifications:** Supabase integrated with an SMTP service for transactional emails.
- **Code Repository:** GitHub (ACME-Marketing Organization) - Local path: `/Users/waynesheppard/Development/ACME-Marketing/`

## 3. Credentials & URLs

- **GitHub Organization:** `https://github.com/ACME-Marketing`
- **Production Site:** `https://acmemarketing.us`
- **Supabase Project:** (Details in `.env` file)

## 4. Project Task List

### Phase 1: Foundational Setup (Complete)

- [x] Create GitHub account & `ACME-Marketing` Organization
- [x] Create `acmemarketing.us` GitHub Repo
- [x] Develop initial Astro frontend for `acmemarketing.us`

### Phase 2: Supabase Backend & Course Features (In Progress)

- [x] Set up Supabase project
- [x] Create database schema for courses, episodes, enrollments, and user profiles (`create-supabase-tables.sql`)

- [x] Implement user authentication using Supabase Auth

- [x] Create frontend modal for course notification sign-ups (`src/components/CourseNotificationModal.astro`)
- [x] Set up Supabase Edge Function to handle sending course notifications (`supabase/functions/send-course-notification/index.ts`)
- [x] Create database triggers to automatically send emails on new sign-ups (`create_email_trigger.sql`, `create_email_trigger_simple.sql`)
- [ ] Develop UI for displaying courses and course content
- [ ] Implement payment processing for course enrollments (Stripe integration)
- [ ] Build user dashboard for managing enrolled courses
- [ ] Develop admin interface for managing courses and students

### Phase 3: Content & Marketing

- [ ] Create content for initial set of courses
- [ ] Develop marketing strategy to attract students
- [ ] Implement analytics and tracking to measure performance

## 5. Key Scripts & Tooling

- `check-database.js`: A script to quickly check the status of Supabase tables.
- `cleanup-unused-files.js`: An interactive script to identify and remove unused files from the project.
- `test-api.js`, `test-curl.sh`, `test-edge-function.js`, `test-email.js`, `test-smtp-options.js`: Various scripts for testing the API, edge functions, and email functionality.