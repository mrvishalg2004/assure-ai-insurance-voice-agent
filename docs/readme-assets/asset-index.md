# AssureAI — Readme Visual Asset Index

This document catalogues all visual assets generated for the AssureAI project. All assets are organized under `docs/readme-assets/` into three distinct categories:
- **`actual/`**: Raw high-resolution desktop captures (both viewport and full-page) taken directly from the live running application with realistic Indian insurance dummy data.
- **`mockups/`**: Professional desktop browser presentations featuring realistic macOS window chrome, authentic URL navigation bars, studio lighting, ambient gradients, and multi-layer dropshadows.
- **`hero/`**: Ultra-high-resolution website hero banner and ambient branding background designed specifically for the top fold of the GitHub repository README.

---

## 1. Hero & Branding Assets (`docs/readme-assets/hero/`)

| Filename | Dimensions | Type | Route / Component | Description |
| :--- | :--- | :--- | :--- | :--- |
| `01_website_hero_background.jpg` | 1376 × 768 | AI-Generated Ambient Background | Global Brand Identity | Deep navy/blue atmospheric gradient canvas with dynamic cybernetic wave geometry, representing conversational intelligence and cloud voice telemetry. |
| `02_assureai_readme_hero_banner.png` | 2880 × 1650 | Presentation Hero Mockup | Top Banner / Header | Flagship README hero banner featuring official typography, glowing status pill, subtitle, and an angled floating desktop browser displaying the live AssureAI campaign dashboard. |

---

## 2. Professional Desktop Showcase Mockups (`docs/readme-assets/mockups/`)

All mockups are rendered at ultra-high resolution (3200 × 2200 and 3840 × 2400) using true 1:1 desktop screenshots embedded in realistic macOS desktop browser chrome.

| Filename | Dimensions | Type | Target Route | Description |
| :--- | :--- | :--- | :--- | :--- |
| `01_homepage_browser_showcase.png` | 3200 × 2200 | Desktop Browser Mockup | `/` | Premium desktop presentation of the AssureAI landing page, showcasing the value proposition, 3D brain icon, and direct call-to-action buttons. |
| `02_dashboard_browser_showcase.png` | 3200 × 2200 | Desktop Browser Mockup | `/admin/bulk-calls` | High-impact view of the administrative bulk call operations console, displaying contact list upload, metrics cards (14 total, 8 completed, 2 processing, 2 pending, 2 failed), and the live call queue with Indian policyholder contacts. |
| `03_call_interaction_showcase.png` | 3200 × 2200 | Desktop Browser Mockup | `/admin/bulk-calls` (Modal) | Focused view of the Voice Call Interaction modal displaying full caller telemetry (Rahul Sharma, +91 97112 88390, duration 3m 5s), audio player tabs, and conversational transcripts for a car insurance policy renewal. |
| `04_user_management_showcase.png` | 3200 × 2200 | Desktop Browser Mockup | `/admin/users` | Comprehensive user administration dashboard displaying 16 registered Indian user accounts, role-based access tags (Admin / User), active toggle switches, and registration dates. |
| `05_chat_assistant_showcase.png` | 3200 × 2200 | Desktop Browser Mockup | `/chat` | Live AI conversational assistant interface displaying a multi-turn consultation regarding HDFC ERGO My:Health Suraksha, pre-existing conditions, sub-limits, and Section 80D tax deductions. |
| `06_call_history_showcase.png` | 3200 × 2200 | Desktop Browser Mockup | `/history` | Customer interaction history log showcasing historical voice agent sessions, completion tags, and transcript access. |
| `07_complete_website_showcase.png` | 3840 × 2400 | Multi-Screen Portfolio Composition | Multi-page Portfolio Composition | Comprehensive 5-screen desktop showcase combining the Landing Page, Bulk Calls Dashboard, Call Interaction Modal, User Management, and Chat Assistant into a cohesive portfolio visual. |

---

## 3. Actual Website Screenshots (`docs/readme-assets/actual/`)

Direct, pixel-accurate captures of the running Next.js application at `http://localhost:3001` paired with Express API at `http://localhost:5001`. Captured using Playwright at desktop viewport 1440 × 900 @ 2x device scale factor (2880 × 1800 raw pixels).

| Filename | Dimensions | Type | Route / State | Description |
| :--- | :--- | :--- | :--- | :--- |
| `01_homepage_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/` | Standard desktop viewport of the public landing page with modern hero section, CTA buttons, and feature pills. |
| `01_homepage_fullpage.png` | 2880 × 4782 | Actual Full-Page Screenshot | `/` | Complete end-to-end capture of the public homepage including Features, Architecture, How It Works, Testimonials, and Footer. |
| `02_login_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/login` | Authentication sign-in portal with email/password credentials input and brand graphics. |
| `03_register_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/register` | New account onboarding form with full name, email, phone number, and password fields. |
| `04_bulk_calls_dashboard_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/admin/bulk-calls` | Primary operational dashboard displaying campaign KPIs (Total, Pending, Processing, Completed, Failed) and contact dispatch controls. |
| `04_bulk_calls_dashboard_fullpage.png` | 2974 × 4600 | Actual Full-Page Screenshot | `/admin/bulk-calls` | Full-height campaign dashboard displaying upload wizard, format requirements, summary metrics, and the entire 14-record contact dispatch table. |
| `05_call_interaction_modal.png` | 2880 × 1800 | Actual Viewport Screenshot | `/admin/bulk-calls` (Modal Open) | Detailed interaction drawer showing call metadata, audio playback tab, and full agent-customer dialog transcript. |
| `06_user_management_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/admin/users` | Administration table showing 16 registered Indian users with status toggles and role assignments. |
| `06_user_management_fullpage.png` | 2880 × 3096 | Actual Full-Page Screenshot | `/admin/users` | Full-height user directory table showing all user records with Indian names, roles, joined dates, and actions. |
| `07_chat_assistant_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/chat` | Interactive AI customer support interface showing multi-turn insurance advice, policy queries, and tax benefit assistance. |
| `08_voice_assistant_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/voice` | Interactive voice assistant page featuring microphone input, real-time speech indicators, and session controls. |
| `09_admin_voice_console_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/admin` | Dedicated administrative voice supervision console. |
| `10_call_history_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/history` | Historical call session log with filters and detailed record view. |
| `10_call_history_fullpage.png` | 2880 × 2692 | Actual Full-Page Screenshot | `/history` | Full-height historical call logs showing all completed sessions and status indicators. |
| `11_settings_viewport.png` | 2880 × 1800 | Actual Viewport Screenshot | `/settings` | Application configuration and user preference settings page. |

---

## 4. Test Data & Simulation Context

All captured dashboards are populated with realistic local development dummy data representing an Indian insurance enterprise:
- **Admin User**: Aarav Sharma (`admin@assureai.com`)
- **Sample Policyholders**: Rahul Sharma, Sunita Agarwal, Vikram Malhotra, Priya Iyer, Amit Patel, Ananya Deshmukh, Rajesh Chauhan, Sneha Kulkarni, Suresh Nair, Kavita Joshi, Manoj Verma, Pooja Gupta, Deepak Patil, Neha Mukherjee
- **Simulated Insurance Products**: Comprehensive Motor Renewal, HDFC ERGO My:Health Suraksha, Term Life Protection, Senior Citizen Mediclaim
- **Database Engine**: Local MongoDB instance (`mongodb://localhost:27017/assure-ai`)
- **No Production Data Impact**: Exclusively created for documentation and GitHub portfolio presentation.
