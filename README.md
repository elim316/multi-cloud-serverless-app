# Multi-Cloud Serverless Application

A full-stack serverless web application built with React and Vite on Vercel, backed by Supabase (PostgreSQL, Authentication, and Realtime subscriptions) and AWS infrastructure provisioned with Terraform.

## Overview

This project demonstrates cloud-portable CRUD workflows, real-time state synchronisation across browser sessions, and reproducible Infrastructure-as-Code deployment:

- Frontend: React and Vite single-page application deployed on Vercel.
- Backend: Supabase PostgreSQL database with Row Level Security, email and password authentication, and Realtime channel subscriptions for live insert, update, and delete propagation across open browser tabs.
- Infrastructure (`infra/`): Terraform configuration and automated GitHub Actions workflows for provisioning cloud resources.

## Project Structure

```text
frontend/
  ├── public/              # Static assets
  ├── src/
  │   ├── App.jsx          # Main application with CRUD and realtime subscriptions
  │   ├── Auth.jsx         # Supabase authentication workflow
  │   ├── supabaseClient.js
  │   └── index.css
  └── package.json
infra/                     # Terraform Infrastructure-as-Code definitions
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/elim316/multi-cloud-serverless-app.git
cd multi-cloud-serverless-app
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Configure environment variables

Create a `.env.local` file inside `frontend/` with your Supabase project credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Keep `.env.local` uncommitted so credentials remain local.

### 4. Run the development server

```bash
npm run dev
```

This starts Vite on [http://localhost:5173](http://localhost:5173).

### 5. Build for production

```bash
npm run build
npm run preview
```
