# Shtcut — Social Content Operations Platform

Shtcut is a **social content operations platform** that helps teams plan, collaborate, publish, and measure social media content, all in one structured workflow.

Shtcut is a Social Content Operating System for small teams & solo builders.

Instead of juggling multiple tools for scheduling, files, approvals, chats, and analytics, Shtcut treats social media as an **operational pipeline**, from idea → asset → post → outcome.
---

## Why Shtcut?

Most social media tools focus on **posting**.

Real teams struggle with:
- Scattered assets
- Unclear ownership
- Broken approval flows
- Manual multi-platform publishing
- Vanity metrics instead of real outcomes

Shtcut solves this by bringing **workflow, collaboration, publishing, and insights** together — centered around content and links.
---

## What Shtcut Is (and Is Not)

### What it is
- A **social media workflow platform**
- Built for **teams, agencies, and growing brands**
- Focused on **distribution and outcomes**
- Link-centric and analytics-aware

### What it is not
- Not a generic “all-in-one marketing tool”
- Not a project management replacement
- Not an email marketing platform (yet)
- Not a website builder

Everything in Shtcut exists to support **social content execution**.

---

## Core Capabilities

### Social Posts & Scheduling
- Create and manage posts across multiple social platforms
- Platform-specific formatting and previews
- Schedule posts or publish instantly
- One-click publishing to all connected accounts
- Publishing status, retries, and logs

---

### Content Calendar
- Visual calendar view of scheduled and published posts
- Drag-and-drop rescheduling
- Team-wide visibility of content plans

---

### Media Library (Assets)
- Centralized storage for images, videos, and captions
- Attach assets directly to posts or tasks
- Avoid “final_v2_final.png” chaos
- Reuse assets across campaigns

---

### Team Collaboration
- Comments and discussions on posts and tasks
- Context-aware chats tied to content
- Reduce Slack/DM noise
---

### Smart Links & URL Shortener
- Built-in URL shortener
- Auto-generated tracking links per post
- Campaign-aware links
- Measure what content actually drives clicks

---

### Analytics & Reports
- Performance per post, platform, and campaign
- Click-through analytics from shared links
- Understand what works — not just what looks good
- Exportable reports for teams and clients

---

Shtcut will progressively add:
- Automatic performance insights
- Content and platform comparisons
- Clear, explainable recommendations
- Waste and efficiency detection

No black-box AI.  
Insights are **transparent, assistive, and practical**.

---

## Who Is Shtcut For?

- Marketing teams
- Social media managers
- Agencies
- Startups and scale-ups
- Content-driven businesses

If you manage social content collaboratively, Shtcut is built for you.

---

## Tech Stack
- **Backend:** NestJS
- **Frontend:** React / Next.js
- **Database:** MongoDB
- **Cache & Queues:** Redis
- **Architecture:** Modular, event-driven
- **Deployment:** Cloud-ready (Docker-friendly)

---

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn
- MongoDB
- Redis
- BullMQ
- NestJS

---

### Installation

```bash
git clone https://github.com/yourusername/shtcut.git
cd shtcut
npm install
```
---

### Configuration
Create a `.env` file at the root:

```env
DATABASE_URL=mongodb://localhost:27017/shtcut
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret
```
---

### Run Locally

```bash
cd web
yarn dev
```

Visit: http://localhost:3000
---


## License

MIT License
---
## Support
Open an issue on GitHub or email **technical@shtcut.co**
