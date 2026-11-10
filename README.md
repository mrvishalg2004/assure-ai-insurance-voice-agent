# AssureAI — Enterprise Voice AI Agent for Insurance & Outbound Campaigns

<div align="center">

![AssureAI Platform Banner](docs/readme-assets/hero/02_assureai_readme_hero_banner.png)

<p align="center">
  <strong>Autonomous Outbound Voice Calling • Live Call Telemetry & Transcripts • Conversational Insurance Advisory • Multi-Format Contact Ingestion</strong>
</p>

<p align="center">
  <a href="#-product-presentation-video">🎬 Video Demo</a> •
  <a href="#-project-introduction">Overview</a> •
  <a href="#-visual-project-showcase">UI Showcase</a> •
  <a href="#-key-features--functionalities">Key Features</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-application-workflows">Workflows</a> •
  <a href="#-database-architecture">Database Schema</a> •
  <a href="#-installation--setup-guide">Setup Guide</a> •
  <a href="#-api-documentation">API Docs</a>
</p>

---

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.0-green?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bolna.ai](https://img.shields.io/badge/Bolna.ai-Voice_API-indigo?style=for-the-badge&logo=phone&logoColor=white)](https://bolna.dev/)
[![Google Genkit](https://img.shields.io/badge/Google_Genkit-Gemini_2.0_Flash-orange?style=for-the-badge&logo=google&logoColor=white)](https://firebase.google.com/docs/genkit)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📋 Table of Contents

1. [🎬 Product Presentation Video](#-product-presentation-video)
2. [Project Introduction](#-project-introduction)
   - [Executive Summary](#executive-summary)
   - [Problem Statement](#problem-statement)
   - [Project Objectives](#project-objectives)
   - [Target Audience](#target-audience)
   - [What Makes AssureAI Unique](#what-makes-assureai-unique)
3. [Visual Project Showcase](#-visual-project-showcase)
4. [Key Features & Functionalities](#-key-features--functionalities)
   - [1. Bulk Outbound Voice Calling Engine](#1-bulk-outbound-voice-calling-engine)
   - [2. Deep Call Telemetry & Interaction Analytics](#2-deep-call-telemetry--interaction-analytics)
   - [3. Multi-Format Contact Ingestion & Validation](#3-multi-format-contact-ingestion--validation)
   - [4. Resilient Rate-Limited Background Queue](#4-resilient-rate-limited-background-queue)
   - [5. Dual-Engine Insurance Advisory Chatbot](#5-dual-engine-insurance-advisory-chatbot)
   - [6. In-Browser Voice Processing Assistant](#6-in-browser-voice-processing-assistant)
   - [7. Role-Based Administration & User Governance](#7-role-based-administration--user-governance)
   - [8. Comprehensive Call Audit Trail](#8-comprehensive-call-audit-trail)
   - [9. Authentication & User Profile Management](#9-authentication--user-profile-management)
5. [Application Screenshots & UI Showcase](#-application-screenshots--ui-showcase)
   - [Dashboard & Campaign Operations](#dashboard--campaign-operations)
   - [Voice Call Interaction & Telemetry Drawer](#voice-call-interaction--telemetry-drawer)
   - [Administrative User Governance](#administrative-user-governance)
   - [Mobile Responsive Experience](#mobile-responsive-experience)
   - [AI Insurance Advisory Assistant](#ai-insurance-advisory-assistant)
   - [Interaction Audit Log](#interaction-audit-log)
   - [Public Portal & Onboarding](#public-portal--onboarding)
6. [Technology Stack](#-technology-stack)
7. [System Architecture](#-system-architecture)
8. [Application Workflows](#-application-workflows)
   - [Authentication & Role Verification Flow](#authentication--role-verification-flow)
   - [Bulk Voice Calling & Telemetry Lifecycle](#bulk-voice-calling--telemetry-lifecycle)
   - [Multi-Model Conversational Chat Pipeline](#multi-model-conversational-chat-pipeline)
9. [Database Architecture & Data Models](#-database-architecture--data-models)
   - [Entity-Relationship Diagram](#entity-relationship-diagram)
   - [Collection Specifications](#collection-specifications)
10. [Project Directory Structure](#-project-directory-structure)
11. [Installation & Setup Guide](#-installation--setup-guide)
    - [Prerequisites](#prerequisites)
    - [Step-by-Step Local Setup](#step-by-step-local-setup)
    - [Database Seeding](#database-seeding)
    - [Running with Bolna Mock Mode](#running-with-bolna-mock-mode-zero-cost-testing)
12. [Environment Variables](#-environment-variables)
13. [API Documentation](#-api-documentation)
    - [Authentication Endpoints](#authentication-endpoints)
    - [Bulk Calls & Telemetry Endpoints](#bulk-calls--telemetry-endpoints)
    - [Chat & Advisory Endpoints](#chat--advisory-endpoints)
    - [Admin Governance Endpoints](#admin-governance-endpoints)
    - [Conversation History Endpoints](#conversation-history-endpoints)
14. [Data Flow & Module Integration](#-data-flow--module-integration)
15. [3D & Visualization Assets](#-3d--visualization-assets)
16. [Testing & Quality Assurance](#-testing--quality-assurance)
17. [Deployment Guide](#-deployment-guide)
18. [Security Considerations](#-security-considerations)
19. [Future Improvements & Roadmap](#-future-improvements--roadmap)
20. [Contributing](#-contributing)
21. [License & Acknowledgments](#-license--acknowledgments)

---

## 🎬 Product Presentation Video

<div align="center">

<video src="docs/Presentation_video.mp4" controls="controls" muted="muted" width="100%" poster="docs/readme-assets/hero/02_assureai_readme_hero_banner.png" style="max-height: 620px; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
  <a href="docs/Presentation_video.mp4">
    <img src="docs/readme-assets/hero/02_assureai_readme_hero_banner.png" alt="AssureAI Presentation Video Poster" width="100%" />
  </a>
</video>

<p align="center">
  <sub><strong>🎥 AssureAI Feature Presentation (1080p Full HD • 20s with Music & SFX)</strong></sub><br />
  <sub><em>Demonstrating 1-Click Campaign Ingestion, Live Telemetry Transcripts, 3m 05s Call Playback, and AI Policy Advisory.</em></sub><br />
  <sub>▶️ If the embedded player is not supported by your Markdown viewer, <strong><a href="docs/Presentation_video.mp4">Click Here to Open / Download Presentation_video.mp4</a></strong>.</sub>
</p>

</div>

---

## 🌟 Project Introduction

### Executive Summary

**AssureAI** is an enterprise-grade AI telephony and conversational advisory platform engineered specifically for the modern insurance ecosystem. Combining the **MERN stack** (MongoDB, Express.js, React, Node.js) with **Next.js 14 App Router**, **Bolna.ai API**, **Google Genkit (Gemini 2.0 Flash)**, and **OpenRouter**, AssureAI bridges the gap between cold manual insurance lead outreach and intelligent, automated customer engagement.

The platform empowers insurance brokerages, carriers, and underwriters to upload lead sheets via CSV or Excel, automatically orchestrate high-throughput, human-sounding outbound AI phone calls, and immediately review full call telemetry—including verbatim audio recordings, bilingual dialog transcripts, cost breakdowns, and structured customer intent extraction.

### Problem Statement

Traditional insurance outbound operations face severe structural bottlenecks:
1. **High Overhead & Low Contact Rates**: Human agents spend 60-70% of their day dialing unanswered numbers, leaving voicemails, or navigating IVRs.
2. **Delayed Follow-ups on Renewals**: Policy expirations (motor, health, term life) require immediate touchpoints. When delayed, customer attrition surges.
3. **Lack of Granular Call Telemetry**: Disconnected call centers fail to capture machine-readable intent, call durations, exact customer objections, or cost attribution.
4. **Disjointed Policy Advisory**: Customers with complex questions about Section 80D tax deductions, pre-existing conditions, or claim settlements are forced to navigate fragmented FAQ portals.

### Project Objectives

- **Automate Outbound Campaigns**: Enable one-click dispatch of hundreds of outbound policy follow-ups with customizable delay throttling to prevent telecom rate-limiting.
- **Provide Instant Transparency**: Retrieve and display live execution statuses, MP3 audio recordings, verbatim transcripts, and synthesized customer intent directly inside an administrative workspace.
- **Deliver 24/7 Policy Advisory**: Provide a multi-turn AI chat assistant capable of answering complex health, term life, and motor insurance queries with fallback multi-model routing.
- **Ensure Enterprise Security**: Implement robust JSON Web Token (JWT) authentication, Role-Based Access Control (RBAC), and clean data isolation.

### Target Audience

| Persona | Primary Use Case in AssureAI |
| :--- | :--- |
| **Insurance Brokers & Agencies** | Uploading renewal lists (motor, health) to dispatch AI calls to thousands of policyholders simultaneously. |
| **Claims & Underwriting Teams** | Reviewing call transcripts, customer confirmation of pre-existing diseases, and verified contact numbers. |
| **Operations & Call Managers** | Monitoring campaign success rates, retrying failed dispatches, and analyzing telephony cost breakdowns. |
| **Policyholders & End Users** | Interacting with the AI chat and voice assistant to receive unbiased policy comparisons, deductible advice, and tax benefit breakdowns. |

### What Makes AssureAI Unique

- **Full Telemetry Observability**: Unlike generic dialers, AssureAI integrates deeply with Bolna.ai execution IDs to fetch audio recordings, token cost breakdowns (LLM, network, synthesizer, transcriber), and exact hangup reasons (`customer`, `agent`, or `timeout`).
- **Resilient Batch Processing Engine**: Features an asynchronous, state-managed background worker that processes contacts with a 2-second rate-limiting delay, preventing API throttling.
- **Zero-Cost Mock Mode**: Built-in mock mode (`MOCK_BOLNA_CALLS=true`) generates realistic call executions, durations, transcripts, and audio players without depleting live telecom credits during testing or recruiter evaluation.
- **Indian Insurance Domain Adaptation**: Pre-configured with Indian E.164 phone number formatting (`+91`), policy terminology (Section 80D, NCB, cashless networks, HDFC ERGO, Star Health), and bilingual conversational intelligence.

---

## 🖼️ Visual Project Showcase

<div align="center">

![AssureAI Complete Showcase](docs/readme-assets/mockups/07_complete_website_showcase.png)
*Figure 1: AssureAI multi-surface portfolio showcase combining the Public Landing Portal, Bulk Call Operations Console, Deep Call Telemetry Drawer, User Management Directory, and AI Chat Assistant.*

</div>

---

## ⚡ Key Features & Functionalities

### 1. Bulk Outbound Voice Calling Engine
- **Target Route**: `/admin/bulk-calls`
- **Backend Service**: `server/services/bolna.ts` & `server/jobs/callProcessor.ts`
- **Description**: Allows administrators to trigger AI voice agents that dial policyholders directly over carrier telephony networks.
- **Capabilities**:
  - Upload contacts via spreadsheet or run ad-hoc single calls.
  - Automatic status tracking across states: `pending` ➔ `processing` ➔ `completed` / `failed`.
  - Individual call retry and one-click bulk retry for all failed campaign records.
  - API error clearing utility to quickly unblock queues after configuration updates.

### 2. Deep Call Telemetry & Interaction Analytics
- **Component**: `components/CallInteractionDialog.tsx`
- **Backend Route**: `GET /api/bulk-calls/:id/interaction`
- **Description**: Clicking the inspection button on any campaign row opens a detailed diagnostic drawer that synchronizes local record data with Bolna.ai's execution API.
- **Capabilities**:
  - **Audio Player Tab**: Embedded HTML5 audio player streaming the exact stereo call recording (`.mp3`).
  - **Verbatim Dialog Transcript**: Scrollable, labeled dialog transcript separating Agent prompts from Customer responses.
  - **Extracted Customer Intent**: Structured JSON summary capturing customer interest level, preferred plan tier, callback requests, and quoted premiums.
  - **Telephony Metadata & Financials**: Call duration (minutes and seconds), termination party (`hangup_by`), hangup reason (`normal_clearance`), and a cost breakdown across LLM tokens, telephony network, voice synthesizer, and transcriber.

### 3. Multi-Format Contact Ingestion & Validation
- **Component**: `components/BulkCallUpload.tsx`
- **Utility**: `server/utils/fileParser.ts`
- **Description**: Handles file intake supporting `.csv`, `.xlsx`, and `.xls` files with a 5MB size limit.
- **Capabilities**:
  - Flexible column header mapping (`Name`, `Full Name`, `Mobile`, `Phone Number`, `City`, `Notes`).
  - Indian telephone standardizer: detects 10-digit mobile inputs and prepends the standard E.164 country code (`+91`).
  - Automatic duplicate phone number detection with pre-ingestion warnings.
  - Granular row-by-row error reporting indicating malformed phone numbers or empty records.

### 4. Resilient Rate-Limited Background Queue
- **Engine**: `server/jobs/callProcessor.ts`
- **Description**: An in-memory queue manager with per-user mutex locking prevents duplicate concurrent worker threads.
- **Capabilities**:
  - Fetches pending records in batches of 5.
  - Enforces a mandatory 2,000ms delay between call dispatches to comply with telecom rate limits.
  - Automatically records error messages on failures and updates attempt counters (`callAttempts`).

### 5. Dual-Engine Insurance Advisory Chatbot
- **Target Route**: `/chat`
- **Backend Route**: `POST /api/chat`
- **Description**: A multi-turn conversational AI dedicated to insurance policy guidance, underwriting rules, and claim procedures.
- **Capabilities**:
  - **Multi-Model Support**: Connects to **OpenRouter** with intelligent auto-routing across high-speed models (e.g. `qwen/qwen3-4b:free`, `qwen/qwen3-coder:free`), falling back gracefully to **Google Gemini 2.0 Flash**.
  - **Context-Aware Memory**: Ingests up to 5 preceding dialogue turns from MongoDB to maintain continuity across multi-step questions.
  - Pre-prompted with deep insurance domain logic (deductibles, waiting periods, room-rent capping, Section 80D tax limits).

### 6. In-Browser Voice Processing Assistant
- **Target Route**: `/assistant`
- **AI Engine**: `ai/genkit.ts` & `ai/flows/voice-query-processing.ts`
- **Description**: Voice-enabled web interface for users who prefer speaking their queries rather than typing.
- **Capabilities**:
  - Captures microphone streams using browser `MediaRecorder` APIs.
  - Browser Speech Recognition fallback (`processVoiceInBrowser`) using Web Speech API.
  - Integration with Google Genkit flows for voice query analysis and response synthesis.

### 7. Role-Based Administration & User Governance
- **Target Route**: `/admin/users`
- **Backend Route**: `server/routes/admin.ts`
- **Description**: Enterprise user directory providing complete administrative oversight.
- **Capabilities**:
  - Real-time search across names and email addresses.
  - Instant account activation/deactivation toggle switches.
  - Role management enabling promotion and demotion between `user` and `admin`.
  - Account deletion with defensive confirmation modals (`AlertDialog`).

### 8. Comprehensive Call Audit Trail
- **Target Route**: `/history`
- **Backend Route**: `GET /api/bulk-calls?limit=100`
- **Description**: Centralized logging system for customer support representatives to verify past interactions, timestamps, and customer remarks.

### 9. Authentication & User Profile Management
- **Routes**: `/login`, `/register`, `/settings`
- **Backend Service**: `server/routes/auth.ts`
- **Description**: Secure credential-based authentication using **bcryptjs** (10 salt rounds) and signed **JWT** bearer tokens stored securely in client state. Includes profile updating and voice/language preference controls.

---

## 📸 Application Screenshots & UI Showcase

The following high-resolution screenshots reflect the live AssureAI application running locally with authentic Indian insurance enterprise test data.

### Dashboard & Campaign Operations

The Campaign Dashboard is the command center for insurance administrators. It renders real-time metric cards (Total, Completed, Processing, Pending, Failed), an interactive drag-and-drop file uploader, search filters, and an active dispatch table with caller contact data.

| Desktop Browser Mockup | Actual Application Viewport Capture |
| :---: | :---: |
| ![Dashboard Browser Mockup](docs/readme-assets/mockups/02_dashboard_browser_showcase.png) | ![Dashboard Actual Capture](docs/screenshots/dashboard.png) |
| *Figure 2A: Campaign Operations Console featuring metric cards and queue.* | *Figure 2B: 1:1 Viewport capture of `/admin/bulk-calls` with live dispatch status.* |

---

### Voice Call Interaction & Telemetry Drawer

AssureAI's flagship capability: clicking **View Interaction** on any call launches a comprehensive telemetry drawer. Administrators can stream recorded calls via the embedded HTML5 audio player, inspect verbatim dialog transcripts, and evaluate extracted customer interest indicators and telephony cost breakdowns.

| Telemetry Modal Presentation | Main Interaction Workflow Viewport |
| :---: | :---: |
| ![Call Interaction Showcase](docs/readme-assets/mockups/03_call_interaction_showcase.png) | ![Main Workflow Actual Capture](docs/screenshots/main-workflow.png) |
| *Figure 3A: Telemetry drawer showing audio playback and dialogue transcript.* | *Figure 3B: Verbatim transcript and call duration for motor insurance renewal.* |

---

### Administrative User Governance

The administrative directory grants superusers granular control over user accounts, permissions, role elevations (`user` ↔ `admin`), and status toggles.

| User Governance Mockup | Admin Console Viewport Capture |
| :---: | :---: |
| ![User Management Showcase](docs/readme-assets/mockups/04_user_management_showcase.png) | ![Admin Panel Actual Capture](docs/screenshots/admin-panel.png) |
| *Figure 4A: Administrative directory with role tags and active toggles.* | *Figure 4B: Live `/admin/users` management console showing registered accounts.* |

---

### Mobile Responsive Experience

AssureAI is engineered with a mobile-first philosophy using Tailwind CSS responsive breakpoints. The full suite of campaign monitoring, chat consultation, and administrative tools operates seamlessly on smartphones and tablets.

<div align="center">

![AssureAI Mobile View](docs/screenshots/mobile-view.png)
*Figure 5: Mobile-optimized interface illustrating responsive typography, collapsible sheet navigation, and touch-friendly controls.*

</div>

---

### AI Insurance Advisory Assistant

The conversational intelligence module provides instant, context-aware policy consultations. Users can ask questions regarding waiting periods, pre-existing conditions, cashless hospital networks, and tax exemptions.

<div align="center">

![Chat Assistant Showcase](docs/readme-assets/mockups/05_chat_assistant_showcase.png)
*Figure 6: Interactive AI chat consultation regarding HDFC ERGO My:Health Suraksha, pre-existing diseases, sub-limits, and Section 80D tax deductions.*

</div>

---

### Interaction Audit Log

The historical interaction log provides complete transparency into all past voice calls, with search capabilities, status filters, and instant links to call recordings.

<div align="center">

![Call History Showcase](docs/readme-assets/mockups/06_call_history_showcase.png)
*Figure 7: Complete call history audit trail displaying recipient names, phone numbers, cities, and session outcomes.*

</div>

---

### Public Portal & Onboarding

A high-converting landing page showcasing value propositions, key capabilities, and frictionless sign-up and login workflows.

| Landing Page Presentation | Login & Authentication Portal |
| :---: | :---: |
| ![Homepage Showcase](docs/readme-assets/mockups/01_homepage_browser_showcase.png) | ![Login Portal](docs/readme-assets/actual/02_login_viewport.png) |
| *Figure 8A: AssureAI public landing page.* | *Figure 8B: Secure JWT-authenticated sign-in portal.* |

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose & Architectural Role |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **Next.js** | `14.2.5` | React framework utilizing App Router, Server Components, and client hydration. |
| **UI Library** | **React** | `18.3.1` | Core declarative component rendering engine. |
| **Programming Language** | **TypeScript** | `^5.0.0` | Strict end-to-end type safety across both frontend and backend modules. |
| **Styling & Design** | **Tailwind CSS** | `^3.4.1` | Utility-first CSS framework with custom animations (`tailwindcss-animate`). |
| **Primitive Components** | **Radix UI** | Latest | Accessible, unstyled UI primitives (Dialog, Tabs, DropdownMenu, Avatar, Switch). |
| **Iconography** | **Lucide React** | `^0.400.0` | Comprehensive open-source icon suite for enterprise telemetry. |
| **Backend Server** | **Express.js** | `^4.18.2` | High-performance HTTP REST API gateway running independently on Node.js. |
| **Process Execution** | **tsx** | `^4.20.6` | TypeScript execution environment for hot-reloading server processes (`tsx watch`). |
| **Database Engine** | **MongoDB** | `^8.0.3` | Document-oriented NoSQL database for rapid schema iteration and nested data. |
| **Object Data Modeling** | **Mongoose** | `^8.0.3` | Typed schema enforcement, validation middleware, and query indexing. |
| **Voice Telephony AI** | **Bolna.ai API** | Cloud REST | Carrier-grade outbound AI voice call orchestration and speech synthesis. |
| **Generative AI** | **Google Genkit** | `^1.24.0` | Google's open-source framework for building and running Gemini flows. |
| **LLM Inference** | **Gemini 2.0 Flash** | Experimental | High-speed multi-modal reasoning engine for voice and text query processing. |
| **Multi-Model Routing** | **OpenRouter API** | Cloud REST | Dynamic fallback routing across high-availability open-source LLMs (Qwen/Gemma). |
| **Spreadsheet Parsing** | **xlsx** & **csv-parser**| `^0.18.5` / `^3.0.0` | High-speed parsing of uploaded CSV, XLS, and XLSX contact files. |
| **File Upload Gateway** | **Multer** | `^1.4.5-lts.1`| Multipart/form-data middleware handling temporary file staging. |
| **Security & Auth** | **jsonwebtoken** & **bcryptjs** | `^9.0.2` / `^2.4.3` | Password hashing (10 salt rounds) and stateless JWT bearer token verification. |
| **End-to-End Automation**| **Playwright** | `^1.65.0` | Headless browser automation for automated UI validation and screenshot auditing. |

---

## 🏛️ System Architecture

The following diagram illustrates the structural boundaries, network communication protocols, and data pathways across AssureAI's client, server, AI service, and database tiers.

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Layer (Next.js 14 App Router - Port 3001)"]
        UI_Landing["Public Landing Page<br/>('/')"]
        UI_Auth["Auth Portal<br/>('/login', '/register')"]
        UI_Bulk["Bulk Calling Dashboard<br/>('/admin/bulk-calls')"]
        UI_Modal["Call Telemetry Drawer<br/>('CallInteractionDialog')"]
        UI_Chat["Insurance Chat Assistant<br/>('/chat')"]
        UI_Users["User Management Console<br/>('/admin/users')"]
        UI_Hist["Audit History Log<br/>('/history')"]
    end

    subgraph GatewayLayer ["Backend API Gateway (Express.js + TypeScript - Port 5001)"]
        MW_CORS["CORS & Request Logger"]
        MW_Auth["JWT Authentication Middleware"]
        MW_Multer["Multer File Staging Engine<br/>('/uploads')"]
        
        API_Auth["/api/auth"]
        API_Bulk["/api/bulk-calls"]
        API_Chat["/api/chat"]
        API_Admin["/api/admin"]
        API_Conv["/api/conversations"]
    end

    subgraph ServiceLayer ["Business Logic & Async Workers"]
        PARSER["File Parser Utility<br/>('fileParser.ts')"]
        QUEUE["Throttled Call Queue Worker<br/>('callProcessor.ts')"]
        BOLNA_SVC["Bolna Telephony Service<br/>('services/bolna.ts')"]
        CHAT_SVC["Multi-Model Router<br/>(OpenRouter & Gemini)"]
    end

    subgraph ExternalServices ["External AI & Cloud Telephony"]
        EXT_BOLNA["Bolna.ai Cloud Platform<br/>(Outbound Calls & Execution API)"]
        EXT_OPENROUTER["OpenRouter Inference API<br/>(Qwen / Free LLM Endpoints)"]
        EXT_GEMINI["Google Gemini 2.0 Flash<br/>(Genkit Flow Engine)"]
    end

    subgraph PersistenceLayer ["Persistence Layer (MongoDB - Port 27017 / Atlas)"]
        DB_USERS[("Users Collection<br/>• Credentials<br/>• Roles & Status")]
        DB_CALLS[("BulkCallQueue Collection<br/>• Contact Data<br/>• Execution Status<br/>• Audio & Transcripts")]
        DB_CONV[("Conversations Collection<br/>• Multi-turn History<br/>• Timestamps")]
    end

    %% Client to Gateway
    UI_Landing --> MW_CORS
    UI_Auth --> API_Auth
    UI_Bulk --> MW_Multer --> API_Bulk
    UI_Modal --> API_Bulk
    UI_Chat --> API_Chat
    UI_Users --> API_Admin
    UI_Hist --> API_Bulk

    %% Gateway to Middleware
    API_Bulk --> MW_Auth
    API_Chat --> MW_Auth
    API_Admin --> MW_Auth
    API_Conv --> MW_Auth

    %% Gateway to Services
    API_Bulk --> PARSER
    API_Bulk --> QUEUE
    API_Bulk --> BOLNA_SVC
    API_Chat --> CHAT_SVC

    %% Services to External APIs
    BOLNA_SVC <-->|Trigger Call / Fetch Execution| EXT_BOLNA
    CHAT_SVC <-->|Streaming Inference| EXT_OPENROUTER
    CHAT_SVC <-->|Genkit Flows| EXT_GEMINI

    %% Services to Database
    API_Auth <--> DB_USERS
    API_Admin <--> DB_USERS
    PARSER -->|Insert New Contacts| DB_CALLS
    QUEUE <-->|Fetch Pending / Update State| DB_CALLS
    BOLNA_SVC -->|Cache Telemetry & Recording| DB_CALLS
    CHAT_SVC <-->|Fetch Context / Save Turn| DB_CONV
```

---

## 🔄 Application Workflows

### Authentication & Role Verification Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Admin
    participant Client as Next.js Client
    participant API as Express Auth Router
    participant DB as MongoDB (Users)

    User->>Client: Enters Email & Password
    Client->>API: POST /api/auth/login { email, password }
    API->>DB: Query User by Email
    alt User Not Found
        API-->>Client: 401 Unauthorized (Invalid credentials)
    else User Exists
        API->>API: bcrypt.compare(password, user.password)
        alt Password Mismatch
            API-->>Client: 401 Unauthorized (Invalid credentials)
        else Password Valid
            API->>API: jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '7d' })
            API-->>Client: 200 OK { token, user: { id, name, email, role } }
            Client->>Client: Store token in localStorage
            Client->>Client: Redirect to /admin/bulk-calls (if admin) or /chat
        end
    end
```

---

### Bulk Voice Calling & Telemetry Lifecycle

```mermaid
flowchart TD
    START([Admin uploads CSV/XLSX]) --> UPLOAD[POST /api/bulk-calls/upload]
    UPLOAD --> VALIDATE{Validate File & Structure}
    
    VALIDATE -->|Invalid Format / Empty| ERR_RESP[Return 400 Bad Request]
    VALIDATE -->|Valid File| PARSE[Parse rows & normalize phone numbers to +91]
    
    PARSE --> DUP_CHECK{Check for duplicates?}
    DUP_CHECK -->|Yes| FILTER_DUP[Flag duplicate phone numbers]
    DUP_CHECK -->|No| SAVE_DB[Save contacts to BulkCallQueue as 'pending']
    FILTER_DUP --> SAVE_DB
    
    SAVE_DB --> TRIGGER_BG[Trigger processCallQueue in background]
    SAVE_DB --> UI_RESP[Return 200 Upload Summary to UI]
    
    subgraph BackgroundWorker ["Async Queue Processor (callProcessor.ts)"]
        TRIGGER_BG --> CHECK_LOCK{Is worker active for this user?}
        CHECK_LOCK -->|Yes| EXIT_QUEUE[Exit: Avoid duplicate worker]
        CHECK_LOCK -->|No| ACQUIRE_LOCK[Acquire mutex lock]
        
        ACQUIRE_LOCK --> FETCH_BATCH[Fetch next batch of 5 'pending' calls]
        FETCH_BATCH --> BATCH_EMPTY{Batch empty?}
        BATCH_EMPTY -->|Yes| RELEASE_LOCK[Release mutex lock & terminate]
        
        BATCH_EMPTY -->|No| PROCESS_CALL[For each call: Set status to 'processing']
        PROCESS_CALL --> BOLNA_CALL[Call Bolna.ai POST /call]
        
        BOLNA_CALL --> CALL_RESULT{Bolna Success?}
        CALL_RESULT -->|Success| MARK_COMPLETED[Update status = 'completed'<br/>Save bolnaCallId]
        CALL_RESULT -->|Failure| MARK_FAILED[Update status = 'failed'<br/>Save errorMessage]
        
        MARK_COMPLETED --> DELAY[Wait 2000ms rate-limit delay]
        MARK_FAILED --> DELAY
        DELAY --> FETCH_BATCH
    end

    subgraph TelemetryInspection ["Telemetry Inspection (CallInteractionDialog.tsx)"]
        UI_CLICK([Admin clicks 'View Interaction']) --> REQ_TELEMETRY[GET /api/bulk-calls/:id/interaction]
        REQ_TELEMETRY --> BOLNA_EXEC[Query Bolna GET /executions/:id]
        BOLNA_EXEC --> SAVE_TELEMETRY[Save transcript, recording URL,<br/>intent, and cost breakdown to MongoDB]
        SAVE_TELEMETRY --> RENDER_MODAL[Render audio player & dialog transcript in UI]
    end
```

---

### Multi-Model Conversational Chat Pipeline

```mermaid
flowchart LR
    A([User submits query]) --> B[POST /api/chat]
    B --> C[Retrieve conversation context from MongoDB]
    C --> D{Is OPENROUTER_API_KEY set?}
    
    D -->|Yes| E[Query OpenRouter Model Pool]
    E --> F{Model Response OK?}
    F -->|Yes| G[Return AI Response]
    F -->|No / Timeout| H[Fallback: Google Gemini 2.0 Flash]
    
    D -->|No| H
    H --> G
    
    G --> I[Append turn to MongoDB Conversation]
    I --> J([Stream response to Chat UI])
```

---

## 🗄️ Database Architecture & Data Models

AssureAI uses MongoDB via Mongoose ODM for schematized data consistency, indexing, and high-speed write throughput.

### Entity-Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ BULK_CALL_QUEUE : "initiates"
    USER ||--o{ CONVERSATION : "owns"
    CONVERSATION ||--|{ MESSAGE : "contains"

    USER {
        ObjectId _id PK
        string name
        string email UK "Indexed"
        string password "Bcrypt Hash"
        string role "user | admin"
        boolean isActive
        Date createdAt
        Date updatedAt
    }

    BULK_CALL_QUEUE {
        ObjectId _id PK
        string userId FK "Indexed"
        string name
        string phone "Indexed (+91 standard)"
        string city
        string email
        string notes
        string status "pending | processing | completed | failed (Indexed)"
        string bolnaCallId "Bolna Execution ID"
        string errorMessage
        int callAttempts
        Date lastAttemptAt
        int conversationTime "Duration in seconds"
        string transcript "Verbatim dialog"
        string recordingUrl "MP3 URL"
        string callStatus "completed | busy | no-answer"
        string hangupBy "customer | agent | system"
        mixed extractedData "Customer intent JSON"
        Date createdAt "Indexed"
        Date updatedAt
    }

    CONVERSATION {
        ObjectId _id PK
        string userId FK "Indexed"
        Date createdAt "Indexed"
        Date updatedAt "Indexed"
    }

    MESSAGE {
        string role "user | assistant"
        string content
        Date timestamp
    }
```

### Collection Specifications

#### 1. `users` Collection
Stores registered user identities, hashed passwords, and authorization roles.
- `_id`: Unique MongoDB ObjectID (`Primary Key`).
- `name`: Full user name (`String`, 2-50 chars).
- `email`: Normalized lowercase unique email (`String`, Indexed).
- `password`: Salted hash via bcrypt (`String`, omitted from JSON output via `.toJSON()`).
- `role`: Authorization scope (`'user' | 'admin' | 'student' | 'teacher' | 'hod' | 'principal'`).
- `isActive`: Boolean flag for administrative account deactivation.
- `timestamps`: Automatic `createdAt` and `updatedAt`.

#### 2. `bulkcallqueues` Collection
Represents individual contact records slated for outbound AI voice dispatch, alongside execution telemetry.
- `_id`: Unique ObjectID (`Primary Key`).
- `userId`: Identifier of the administrator who staged the batch (`String`, Indexed).
- `name`: Recipient's full name (`String`).
- `phone`: E.164 formatted telephone number (`String`, Indexed).
- `city`, `email`, `notes`: Optional context passed into the Bolna agent metadata.
- `status`: Execution state machine (`'pending' | 'processing' | 'completed' | 'failed'`).
- `bolnaCallId`: The external execution identifier returned by Bolna.ai (`String`, Sparse Index).
- `conversationTime`: Call duration in seconds (`Number`).
- `transcript`: Verbatim transcript string containing turn-by-turn prompts and responses (`String`).
- `recordingUrl`: Direct HTTPS streaming URL to the stereo call recording audio file (`String`).
- `callStatus`: Network-level status returned by telephony carrier (`String`).
- `hangupBy`: Entity that disconnected the session (`'customer' | 'agent' | 'telephony'`).
- `extractedData`: Key-value JSON containing parsed customer sentiment, plan preference, and follow-up flags.

#### 3. `conversations` Collection
Stores multi-turn conversational records for the AI insurance advisory chatbot.
- `_id`: Unique ObjectID (`Primary Key`).
- `userId`: Owner of the consultation session (`String`, Indexed).
- `messages`: Embedded array of message subdocuments:
  - `role`: `'user' | 'assistant'`
  - `content`: Raw text body of the turn.
  - `timestamp`: Millisecond-accurate timestamp.

---

## 📁 Project Directory Structure

```text
INSURANCE-VOICE-AI-AGENT-USING-MERN-STACK-BOLNA.AI-API/
├── ai/                                    # Google Genkit Flow Definitions
│   ├── flows/
│   │   ├── text-query-processing.ts       # Text query pipeline using Gemini
│   │   ├── voice-query-processing.ts      # Voice query audio flow
│   │   └── voice-query-processing-browser.ts # Web Speech API fallback
│   ├── dev.ts                             # Local Genkit development runner
│   └── genkit.ts                          # Genkit & Google AI initialization
│
├── app/                                   # Next.js 14 App Router
│   ├── (app)/                             # Protected Authenticated Routes
│   │   ├── admin/                         # Administrative Module
│   │   │   ├── bulk-calls/page.tsx        # Bulk call operations & dashboard
│   │   │   ├── dashboard/page.tsx         # Admin KPI overview
│   │   │   └── users/page.tsx             # User governance & RBAC management
│   │   ├── assistant/page.tsx             # In-browser voice assistant
│   │   ├── chat/page.tsx                  # AI insurance chat assistant
│   │   ├── history/page.tsx               # Call audit log & past interactions
│   │   ├── settings/page.tsx              # User preferences & voice config
│   │   └── layout.tsx                     # Protected shell layout & navigation
│   │
│   ├── (auth)/                            # Public Authentication Routes
│   │   ├── login/page.tsx                 # Sign-in portal
│   │   ├── register/page.tsx              # New user onboarding portal
│   │   └── layout.tsx                     # Centered authentication shell
│   │
│   ├── globals.css                        # Tailwind CSS global styles & themes
│   ├── layout.tsx                         # Root HTML document & Toaster provider
│   └── page.tsx                           # Public enterprise landing page
│
├── components/                            # Reusable React UI Components
│   ├── ui/                                # Radix UI primitive implementations
│   │   ├── alert-dialog.tsx, badge.tsx, button.tsx, card.tsx
│   │   ├── dialog.tsx, dropdown-menu.tsx, input.tsx, progress.tsx
│   │   ├── select.tsx, switch.tsx, table.tsx, tabs.tsx, toast.tsx...
│   ├── BulkCallUpload.tsx                 # Drag-and-drop CSV/Excel uploader
│   ├── CallInteractionDialog.tsx          # Telemetry drawer & audio player
│   └── icons.tsx                          # AssureAI Veritas branding logos
│
├── docs/                                  # Repository Visual Documentation Assets
│   ├── readme-assets/
│   │   ├── actual/                        # Raw high-resolution application captures
│   │   ├── hero/                          # Top banner & branding graphics
│   │   ├── mockups/                       # Desktop browser showcase mockups
│   │   └── asset-index.md                 # Complete index of visual assets
│   └── screenshots/                       # GitHub visual deliverables
│       ├── admin-panel.png                # User administration console capture
│       ├── dashboard.png                  # Campaign operations dashboard capture
│       ├── main-workflow.png              # Call telemetry & audio modal capture
│       └── mobile-view.png                # Mobile responsive interface capture
│
├── hooks/                                 # Custom React Hooks
│   ├── use-mobile.tsx                     # Responsive viewport breakpoint hook
│   └── use-toast.ts                       # Toast notification dispatcher
│
├── lib/                                   # Shared Utility Libraries
│   ├── placeholder-images.ts              # UI fallback image definitions
│   └── utils.ts                           # Tailwind className merger (clsx + twMerge)
│
├── scripts/                               # Automation & Data Seeding Scripts
│   ├── captureAllScreenshots.ts           # Playwright UI capture automation
│   ├── generateMockups.py                 # macOS desktop mockup generator
│   └── seedIndianData.ts                  # Comprehensive Indian enterprise seeder
│
├── server/                                # Express.js REST API Server
│   ├── config/
│   │   └── db.ts                          # Mongoose connection & event hooks
│   ├── jobs/
│   │   └── callProcessor.ts               # Throttled queue worker (2s delay)
│   ├── middleware/
│   │   └── auth.ts                        # JWT verification & RBAC guard
│   ├── models/
│   │   ├── BulkCallQueue.ts               # Contact & telemetry Mongoose schema
│   │   ├── Conversation.ts                # Multi-turn chat Mongoose schema
│   │   └── User.ts                        # User credentials & RBAC schema
│   ├── routes/
│   │   ├── admin.ts                       # User CRUD & activation endpoints
│   │   ├── auth.ts                        # Register, login, profile, password
│   │   ├── bulk-calls.ts                  # Upload, queue, retry, telemetry
│   │   ├── chat.ts                        # AI insurance consultation endpoint
│   │   └── conversations.ts               # Chat session history endpoints
│   ├── services/
│   │   └── bolna.ts                       # Bolna.ai HTTP client & phone validator
│   ├── uploads/                           # Temporary staging directory for uploads
│   ├── utils/
│   │   └── fileParser.ts                  # CSV/Excel parser & duplicate finder
│   └── index.ts                           # Express server bootstrap & middleware
│
├── sample-contacts.csv                    # 10 pre-configured test contacts
├── package.json                           # Dependencies & workspace scripts
├── tailwind.config.ts                     # Tailwind CSS design system configuration
└── tsconfig.json                          # TypeScript compilation parameters
```

---

## 🚀 Installation & Setup Guide

### Prerequisites

Ensure the following tools are installed on your host system:
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **npm**: `v9.0.0` or higher
- **MongoDB**: A running local MongoDB instance (`mongodb://localhost:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URL.
- **Bolna.ai Account** *(Optional for testing)*: Register at [Bolna.ai](https://bolna.dev) to generate an API Key and Agent ID, or use AssureAI's built-in **Mock Mode**.

---

### Step-by-Step Local Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/assure-ai.git
cd assure-ai
```

#### 2. Install Project Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local  # If .env.example exists, or create manually
```

Populate `.env.local` with the following configuration:
```env
# ==============================================================================
# SERVER & CLIENT NETWORK CONFIGURATION
# ==============================================================================
PORT=5001
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:5001

# ==============================================================================
# DATABASE & SECURITY
# ==============================================================================
MONGODB_URI=mongodb://localhost:27017/assure-ai
JWT_SECRET=your-32-character-secure-random-jwt-secret-key-here

# ==============================================================================
# BOLNA.AI VOICE TELEPHONY CONFIGURATION
# ==============================================================================
BOLNA_API_KEY=your-bolna-api-key-here
BOLNA_AGENT_ID=your-bolna-agent-id-here

# Set to true to test full voice campaigns without spending Bolna credits:
MOCK_BOLNA_CALLS=false

# ==============================================================================
# GENERATIVE AI & ADVISORY CHATBOT CONFIGURATION
# ==============================================================================
OPENROUTER_API_KEY=your-openrouter-api-key-here
GOOGLE_API_KEY=your-google-ai-studio-api-key-here
```

---

### Database Seeding

To immediately experience AssureAI with realistic Indian insurance accounts, policyholders, and completed call telemetries without manual data entry, run the database seed script:

```bash
npx tsx scripts/seedIndianData.ts
```

This script will populate your database with:
- **Administrator Account**:
  - Email: `admin@assureai.com`
  - Password: `Password@123`
- **15 Registered Users** across diverse Indian locations.
- **14 Pre-Loaded Call Records** covering Comprehensive Motor, Health Suraksha, and Term Life renewals with realistic transcripts and audio links.

---

### Running the Application

You can start both the Next.js frontend and Express backend concurrently with one command:

```bash
npm run dev:all
```

Alternatively, run them in separate terminal sessions:

```bash
# Terminal 1: Express Backend API (Port 5001)
npm run server

# Terminal 2: Next.js Frontend App (Port 3001)
npm run dev
```

Visit **`http://localhost:3001`** in your browser. Log in using `admin@assureai.com` and `Password@123`.

---

### Running with Bolna Mock Mode (Zero-Cost Testing)

If you do not have active Bolna credits or wish to demonstrate the platform offline, enable mock mode in `.env.local`:

```env
MOCK_BOLNA_CALLS=true
```

With mock mode enabled:
1. You can upload any CSV/Excel contact file (or `sample-contacts.csv`).
2. The background worker simulates network dispatches with a 1,000ms delay.
3. Calls transition from `pending` ➔ `processing` ➔ `completed`.
4. Inspecting any call returns realistic mock conversational transcripts, audio players, and intent extractions.

---

## 🔐 Environment Variables

| Variable Name | Purpose & Function | Required | Default / Example Value |
| :--- | :--- | :---: | :--- |
| `PORT` | Port number on which the Express REST API listens. | No | `5001` |
| `NEXT_PUBLIC_APP_URL` | Client origin URL used for CORS authorization. | Yes | `http://localhost:3001` |
| `NEXT_PUBLIC_API_URL` | Endpoint URL targeted by client-side fetch requests. | Yes | `http://localhost:5001` |
| `MONGODB_URI` | MongoDB connection string (local daemon or Atlas). | Yes | `mongodb://localhost:27017/assure-ai` |
| `JWT_SECRET` | Cryptographic secret for signing and verifying JWTs. | Yes | `32-character-random-hex-string` |
| `BOLNA_API_KEY` | Bearer token for authenticating with Bolna.ai Voice API. | Yes* | `bn-xxxxxxxxxxxxxxxxxxxxxxxx` |
| `BOLNA_AGENT_ID` | Voice agent configuration ID from the Bolna console. | Yes* | `agent_xxxxxxxxxxxx` |
| `MOCK_BOLNA_CALLS` | Toggles synthetic telephony simulations for testing. | No | `false` |
| `OPENROUTER_API_KEY` | Primary inference key for multi-model advisory chat. | No | `sk-or-v1-xxxxxxxxxxxxxxxxxxxx` |
| `GOOGLE_API_KEY` | Gemini API key for Genkit voice and text processing. | No | `AIzaSyxxxxxxxxxxxxxxxxxxxxx` |
| `NODE_ENV` | Application environment lifecycle mode. | No | `development` |

*\*Not required if `MOCK_BOLNA_CALLS=true`.*

---

## 📡 API Documentation

All administrative and conversational endpoints require an `Authorization: Bearer <JWT_TOKEN>` header, obtained via `/api/auth/login`.

### Authentication Endpoints

#### `POST /api/auth/register`
Creates a new user account.
- **Request Body**:
  ```json
  {
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response `(201 Created)`**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6730592994e6da2e03290b11",
      "name": "Aarav Sharma",
      "email": "aarav@example.com",
      "role": "user"
    }
  }
  ```

#### `POST /api/auth/login`
Authenticates existing credentials.
- **Request Body**:
  ```json
  {
    "email": "admin@assureai.com",
    "password": "Password@123"
  }
  ```
- **Response `(200 OK)`**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6730592994e6da2e03290b10",
      "name": "Admin Aarav",
      "email": "admin@assureai.com",
      "role": "admin"
    }
  }
  ```

#### `GET /api/auth/me`
Retrieves current authenticated session details.
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Response `(200 OK)`**: User profile object excluding password hash.

---

### Bulk Calls & Telemetry Endpoints

#### `POST /api/bulk-calls/upload`
Uploads a `.csv`, `.xlsx`, or `.xls` spreadsheet and enqueues contacts.
- **Headers**: `Authorization: Bearer <TOKEN>`, `Content-Type: multipart/form-data`
- **Form Data**:
  - `file`: Selected file (Binary, max 5MB)
  - `checkDuplicates`: `"true"` or `"false"`
- **Response `(200 OK)`**:
  ```json
  {
    "message": "File uploaded and processed successfully",
    "summary": {
      "totalRows": 10,
      "validRows": 10,
      "savedContacts": 10,
      "errors": 0,
      "duplicatesFound": 0
    },
    "contacts": [
      {
        "id": "6730595294e6da2e03290b25",
        "name": "Rahul Sharma",
        "phone": "+919711288390",
        "status": "pending"
      }
    ]
  }
  ```

#### `GET /api/bulk-calls`
Fetches paginated call records with filtering and metrics.
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Records per page (default: `50`)
  - `status`: Filter by status (`all`, `pending`, `processing`, `completed`, `failed`)
  - `search`: Case-insensitive search across name and phone
- **Response `(200 OK)`**:
  ```json
  {
    "calls": [...],
    "pagination": { "page": 1, "limit": 50, "total": 14, "pages": 1 },
    "summary": {
      "total": 14,
      "pending": 2,
      "processing": 2,
      "completed": 8,
      "failed": 2
    }
  }
  ```

#### `GET /api/bulk-calls/:id/interaction`
Fetches complete Bolna.ai telemetry, dialogue transcript, and audio recording.
- **Path Parameter**: `:id` — Mongoose ObjectID of the call record.
- **Response `(200 OK)`**:
  ```json
  {
    "callId": "6730595294e6da2e03290b25",
    "name": "Rahul Sharma",
    "phone": "+919711288390",
    "status": "completed",
    "conversationTime": 185,
    "transcript": "Agent: Namaste Rahul ji, calling from AssureAI regarding your car policy...\nCustomer: Yes, I was looking for the renewal quote with zero depreciation.",
    "recordingUrl": "https://example.com/recordings/call-rec-97112.mp3",
    "callStatus": "completed",
    "hangupBy": "customer",
    "hangupReason": "normal_clearance",
    "extractedData": {
      "interested": true,
      "callback_needed": false,
      "preferred_plan": "Comprehensive Zero-Dep Renewal"
    },
    "costBreakdown": {
      "llm": 120,
      "network": 45,
      "synthesizer": 80,
      "transcriber": 40
    }
  }
  ```

#### `POST /api/bulk-calls/retry` & `POST /api/bulk-calls/retry-all`
Resets failed calls back to `pending` status and re-triggers the background processor.
- **Request Body (for `/retry`)**: `{ "callIds": ["6730595294e6da2e03290b25"] }`
- **Response `(200 OK)`**: `{ "message": "1 calls queued for retry" }`

---

### Chat & Advisory Endpoints

#### `POST /api/chat`
Sends a customer prompt to the insurance advisory intelligence engine.
- **Request Body**:
  ```json
  {
    "message": "What is the waiting period for pre-existing diabetes in HDFC ERGO My:Health Suraksha?",
    "conversationId": "6730599a94e6da2e03290b40"
  }
  ```
- **Response `(200 OK)`**:
  ```json
  {
    "response": "Under the HDFC ERGO My:Health Suraksha plan, the standard waiting period for pre-existing conditions like diabetes is typically 36 to 48 months of continuous coverage, unless a specific reduction rider has been opted for.",
    "conversationId": "6730599a94e6da2e03290b40"
  }
  ```

---

### Admin Governance Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/users` | List registered users with pagination and search. |
| `PATCH`| `/api/admin/users/:id/activate` | Re-enable an inactive user account. |
| `PATCH`| `/api/admin/users/:id/deactivate` | Temporarily suspend a user account. |
| `PATCH`| `/api/admin/users/:id/role` | Elevate or demote user role (`{ "role": "admin" }`). |
| `DELETE`| `/api/admin/users/:id` | Permanently remove a user from the database. |

---

## 🔄 Data Flow & Module Integration

The following sequence diagram tracks the end-to-end data flow when an administrator uploads a spreadsheet, dispatches calls through Bolna.ai, and reviews telemetry.

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrator
    participant UI as Next.js Dashboard
    participant API as Express API
    participant Worker as Background Call Worker
    participant Bolna as Bolna.ai API
    participant DB as MongoDB

    Admin->>UI: Selects & uploads contacts.xlsx
    UI->>API: POST /api/bulk-calls/upload
    API->>API: Parse file & validate phone format (+91)
    API->>DB: Insert records with status='pending'
    API->>Worker: Trigger processCallQueue(userId)
    API-->>UI: Return upload summary (rows, valid, duplicates)

    loop Every 2000ms per record
        Worker->>DB: Fetch next 'pending' record
        Worker->>DB: Update status='processing', increment attempts
        Worker->>Bolna: POST https://api.bolna.ai/call { agent_id, recipient_phone_number }
        Bolna-->>Worker: Return { execution_id }
        Worker->>DB: Update status='completed', save bolnaCallId
    end

    Admin->>UI: Clicks "View Interaction" for contact
    UI->>API: GET /api/bulk-calls/:id/interaction
    API->>Bolna: GET https://api.bolna.ai/executions/:execution_id
    Bolna-->>API: Return { transcript, recording_url, duration, intent }
    API->>DB: Cache transcript & recording_url in record
    API-->>UI: Return full telemetry payload
    UI->>Admin: Display audio player, transcript, and intent badges
```

---

## 🧊 3D & Visualization Assets

> [!NOTE]
> **Implementation Status**: AssureAI is currently focused on low-latency voice telemetry, audio waveform streaming, and high-throughput data processing. No Three.js, React Three Fiber, or `.gltf` / `.glb` 3D rendering engines are present in the active codebase. Telemetry visualization is delivered via responsive CSS design systems, Recharts, and accessible Radix UI primitives.

---

## 🧪 Testing & Quality Assurance

AssureAI incorporates automated verification scripts and Playwright headless browser automation to maintain stability and prevent regression.

### Implemented Test & Verification Utilities

1. **Bolna API Integration Verification**:
   ```bash
   node test-bolna.js
   ```
   Validates network connectivity with `https://api.bolna.ai`, verifies API token validity, triggers a test call payload, and polls execution statuses.

2. **Database & Role Verification**:
   ```bash
   npx tsx check-users.ts
   npx tsx test-admin.ts
   ```
   Audits the MongoDB `users` collection, verifies password hashing integrity, and validates administrative role assignment.

3. **Playwright UI Screenshot & Automation Engine**:
   ```bash
   npx tsx scripts/captureAllScreenshots.ts
   ```
   Uses Playwright to launch a headless Chromium instance at 2x device pixel ratio (2880 × 1800), perform automated authentication, navigate across administrative and user routes, and capture pixel-accurate UI assets.

### Recommended Future Test Suites

- **Unit Testing**: Implement [Vitest](https://vitest.dev/) for testing utility functions (`fileParser.ts`, phone formatting, duplicate detection).
- **API Integration Tests**: Implement [Supertest](https://github.com/ladjs/supertest) with MongoDB Memory Server for end-to-end endpoint validation.
- **Component Tests**: Implement React Testing Library for verifying dialog interactions, upload progress bars, and table pagination.

---

## 🌐 Deployment Guide

AssureAI is structured with a decoupled frontend and backend, enabling flexible cloud deployment.

### Recommended Production Topology

```mermaid
flowchart LR
    Browser([Client Browser]) -->|HTTPS / Port 443| Vercel[Vercel / Next.js Frontend]
    Browser -->|API Calls / Port 443| Render[Render / AWS ECS Express API]
    Render -->|TLS Port 27017| Atlas[(MongoDB Atlas Cluster)]
    Render -->|HTTPS REST| BolnaCloud[Bolna.ai Voice API]
    Render -->|HTTPS REST| OpenRouterCloud[OpenRouter Inference]
```

### Production Checklist

1. **Frontend Deployment (Vercel)**:
   - Root directory: `./`
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Output directory: `.next`
   - Set environment variables:
     - `NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app`
     - `NEXT_PUBLIC_API_URL=https://api.your-domain.com`

2. **Backend Deployment (Render / Railway / AWS EC2)**:
   - Root directory: `./`
   - Build command: `npm install`
   - Start command: `npx tsx server/index.ts`
   - Set environment variables:
     - `PORT=5001`
     - `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/assure-ai`
     - `JWT_SECRET=super-secure-production-secret`
     - `BOLNA_API_KEY=bn-production-key`
     - `BOLNA_AGENT_ID=agent-production-id`
     - `NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app`

---

## 🛡️ Security Considerations

- **Password Hashing**: Uses **bcryptjs** with 10 salt rounds. Passwords are never stored or logged in plain text.
- **Field Stripping**: The Mongoose `UserSchema` implements an automatic `.toJSON()` transform that deletes the `password` field before documents are serialized in responses.
- **Stateless Bearer Tokens**: Authentication relies on standard RFC 7519 JSON Web Tokens (JWT) signed with HMAC SHA-256 and an explicit 7-day expiration.
- **CORS Domain Whitelisting**: The Express gateway restricts incoming origins using the `cors` package, locked to `NEXT_PUBLIC_APP_URL`.
- **Upload File Validation**:
  - File extension checking (`.csv`, `.xlsx`, `.xls` only).
  - Multer file size capping at **5 megabytes**.
  - Temporary files are removed from the disk immediately after parsing.
- **Phone Number Normalization**: All contact entries undergo regex scrubbing to strip non-numeric characters before telephony dispatch, mitigating injection vulnerabilities.

---

## 🔮 Future Improvements & Roadmap

- [ ] **Bolna Webhook Ingestion**: Replace client-side polling with persistent inbound webhooks (`POST /api/webhooks/bolna`) to receive instant call completion notifications.
- [ ] **Live WebRTC In-Browser Voice**: Upgrade `/assistant` with full-duplex WebRTC streaming for latency-free conversational voice directly in the browser.
- [ ] **Multi-Lingual Voice Agent Synthesis**: Expand phone prompts to support regional Indian languages (Hindi, Tamil, Marathi, Bengali, Telugu).
- [ ] **Campaign Scheduling Engine**: Enable delayed batch calls with scheduled time-window dispatches (e.g., dispatch only between 10:00 AM and 6:00 PM IST).
- [ ] **Predictive Conversion Scoring**: Train an LLM classifier to evaluate call transcripts and automatically assign lead conversion probabilities.

---

## 🤝 Contributing

Contributions to AssureAI are welcome. Please follow these steps:

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat: implement webhook streaming for call completion"
   ```
4. **Push to the Branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** describing your changes, motivation, and any testing performed.

---

## 📄 License & Acknowledgments

This project is licensed under the **MIT License**.

### Acknowledgments
- [Bolna.ai](https://bolna.dev/) for outbound AI voice agent telephony APIs.
- [Google Genkit](https://firebase.google.com/docs/genkit) for generative AI orchestration.
- [OpenRouter](https://openrouter.ai/) for resilient multi-model LLM routing.
- [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/) for UI primitives.

<div align="center">

---

**Built with precision for the modern insurance enterprise.**

</div>
