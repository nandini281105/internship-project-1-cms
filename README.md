# Fullstack Portfolio & Custom Headless CMS

A production-grade, beautifully architected personal portfolio platform and custom-built CMS (Content Management System) from scratch. Built with **Vite**, **React**, **Tailwind CSS**, **Node.js + Express.js**, and **PostgreSQL** with **Prisma ORM**.

---

## 🏗️ Architecture Overview

The system is organized into three clean, decoupled modules:

```text
internshipProject/
├── backend/                  # REST API + Custom CMS Engine + PostgreSQL (Prisma)
│   ├── prisma/
│   │   ├── schema.prisma     # PostgreSQL schemas for all content models
│   │   └── seed.js           # Database seeder (Admin + sample content)
│   ├── src/
│   │   ├── config/           # Database & Prisma client setup
│   │   ├── controllers/      # REST API business logic
│   │   ├── middleware/       # JWT auth, Multer file upload & error handling
│   │   ├── routes/           # Express router endpoints
│   │   ├── utils/            # JWT helpers, hashing & email notifier
│   │   └── server.js         # Express app entry point
│   ├── uploads/              # Local media storage directory
│   ├── .env                  # Backend environment & database config
│   └── package.json
│
├── frontend/                 # Public Portfolio Website (Vite + React + Tailwind)
│   ├── src/
│   │   ├── components/       # Hero, About, Services, Skills, Experience, Projects, Testimonials, Blogs, Contact, Footer, Modals
│   │   ├── lib/api/          # API service with offline fallback support
│   │   ├── App.jsx           # Main portfolio layout
│   │   └── index.css         # Tailwind & custom glassmorphism styles
│   ├── .env                  # Frontend API URL configuration
│   └── package.json
│
├── admin/                    # Custom CMS Admin Dashboard (Vite + React + Tailwind)
│   ├── src/
│   │   ├── components/       # Sidebar, Header, StatCard, ImageUploadField
│   │   ├── context/          # JWT Auth Context & session management
│   │   ├── lib/api/          # Authenticated API client with Bearer token interceptor
│   │   ├── pages/            # Dashboard, About, Skills, Projects, Blogs, Experience, Testimonials, Services, Messages, Media
│   │   └── App.jsx           # Protected routing & admin dashboard shell
│   ├── .env                  # Admin API URL configuration
│   └── package.json
│
└── package.json              # Root orchestrator scripts (run dev, install, db setup)
```

---

## 🚀 Quick Start Guide

### 1. Configure PostgreSQL Database

Open `backend/.env` and verify your local PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/portfolio_cms?schema=public"
```

> **Note:** If your PostgreSQL password is `postgres`, `admin`, or something else, update `YOUR_POSTGRES_PASSWORD` with your actual password.

### 2. Set Up Database Schema & Seed Data

In the root directory, run:

```bash
npm run db:setup
```

Or step-by-step:
```bash
# Push schema tables into your PostgreSQL database
npm run db:push

# Populate database with Admin user and complete portfolio content
npm run db:seed
```

#### Default Admin Credentials:
- **Email:** `admin@portfolio.com`
- **Password:** `admin123`

---

### 3. Run the Entire Stack

From the root project folder:

```bash
npm run dev
```

This concurrently launches all three applications:
- 🌐 **Public Portfolio:** [http://localhost:5173](http://localhost:5173)
- 🔒 **CMS Admin Panel:** [http://localhost:5174](http://localhost:5174)
- ⚙️ **Backend REST API:** [http://localhost:5000/api](http://localhost:5000/api)
- 🩺 **Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 💻 Running Each Service Separately

You can also run any component independently:

```bash
# Start Backend API (Port 5000)
npm run dev:backend

# Start Public Frontend (Port 5173)
npm run dev:frontend

# Start Admin CMS (Port 5174)
npm run dev:admin
```

---

## 📡 REST API Reference

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | `POST` | Public | Authenticate admin, returns JWT token |
| `/api/auth/me` | `GET` | Protected | Verify active session & current admin |
| `/api/auth/profile` | `PUT` | Protected | Update admin profile details |
| `/api/auth/password` | `PUT` | Protected | Change admin password |
| `/api/stats` | `GET` | Protected | Fetch dashboard analytics & counts |
| `/api/about` | `GET` | Public | Get public portfolio biography & stats |
| `/api/about` | `PUT` | Protected | Update biography, avatar, and social links |
| `/api/skills` | `GET` | Public | List all technical skills |
| `/api/skills` | `POST` | Protected | Create a new skill badge |
| `/api/skills/:id` | `PUT` / `DELETE` | Protected | Update or delete a skill |
| `/api/projects` | `GET` | Public | List projects (supports `?featured=true`, `?tag=React`) |
| `/api/projects` | `POST` | Protected | Add a new project case study |
| `/api/projects/:id` | `PUT` / `DELETE` | Protected | Update or delete a project |
| `/api/blogs` | `GET` | Public | List published blog posts |
| `/api/blogs/:slug` | `GET` | Public | Read single article by slug |
| `/api/blogs` | `POST` | Protected | Publish a new technical article |
| `/api/blogs/:id` | `PUT` / `DELETE` | Protected | Edit or delete a blog post |
| `/api/experience` | `GET` | Public | List work experience timeline |
| `/api/experience` | `POST`, `PUT`, `DELETE` | Protected | Manage career milestones |
| `/api/testimonials` | `GET` | Public | List client endorsements & ratings |
| `/api/testimonials` | `POST`, `PUT`, `DELETE` | Protected | Manage client testimonials |
| `/api/services` | `GET` | Public | List development offerings & pricing |
| `/api/services` | `POST`, `PUT`, `DELETE` | Protected | Manage offered services |
| `/api/contact` | `POST` | Public | Submit contact form inquiry |
| `/api/messages` | `GET` | Protected | View received contact inquiries |
| `/api/messages/:id/read` | `PATCH` | Protected | Toggle message read/unread status |
| `/api/messages/:id` | `DELETE` | Protected | Delete an inquiry |
| `/api/upload` | `POST` | Protected | Upload image/file via Multer |
| `/api/media` | `GET` / `DELETE` | Protected | View uploaded assets & manage storage |

---

## 🛠️ Features Implemented

### 1. Custom CMS Admin Panel (`/admin`)
- **JWT Authentication:** Secure token-based login with auto-expiration handling and session validation.
- **Interactive Dashboard:** Live counts of projects, skills, blogs, messages, services, and testimonials with quick navigation.
- **Content CRUD Screens:** Full visual forms, modals, validation, and delete confirmations for all 7 content models.
- **Direct File Uploads:** Upload media files to the server using Multer with instant image preview.
- **Inquiries Inbox:** Read client messages sent from the portfolio, mark as read/unread, and reply with one-click mailto links.

### 2. Modern Portfolio Frontend (`/frontend`)
- **Responsive Design:** Mobile-first layout with smooth scrolling, animated navigation drawer, and modern typography.
- **Glassmorphism & Gradients:** Crafted with Tailwind CSS, custom color palettes, and ambient glow accents.
- **Dynamic Content Integration:** Fetches real-time content from the CMS backend with fallback support.
- **Interactive Modals:** Dedicated modals for reading complete project case studies and blog articles.
- **Live Contact Form:** Real-time form submission with instant feedback notifications and backend database storage.

---

## 🗓️ 2-Week Implementation Plan Compliance

- **Week 1 (Backend CMS, DB & Admin Panel):**
  - ✅ Day 1: Express project, PostgreSQL with Prisma schema & folder structure.
  - ✅ Day 2: Admin user model, JWT login, protected route middleware.
  - ✅ Day 3: Content models for About, Skills, Projects, Blogs, Experience, Testimonials, Services with CRUD APIs.
  - ✅ Day 4: Multer file upload system with `/upload` and static serving.
  - ✅ Day 5: React/Vite Admin Panel, Login screen, Dashboard stats.
  - ✅ Day 6: CRUD screens for About, Skills, Projects.
  - ✅ Day 7: CRUD screens for Blogs, Testimonials, Experience, Services, Messages & Media.

- **Week 2 (Portfolio Frontend & Integration):**
  - ✅ Day 8: Frontend repo initialized with Vite, React, and Tailwind CSS.
  - ✅ Day 9: Connected to CMS REST APIs; dynamic About, Skills, Projects.
  - ✅ Day 10: Services, Experience timeline, Testimonials, and Blog articles.
  - ✅ Day 11: Interactive Contact form connected to `POST /api/contact`.
  - ✅ Day 12-14: Modular architecture ready for deployment to Render/Railway (Backend) and Vercel/Netlify (Frontend & Admin).
