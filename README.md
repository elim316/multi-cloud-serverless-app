# Multi-Cloud Serverless App

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/) 
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=FFD62E)](https://vitejs.dev/) 
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=fff)](https://supabase.com/) 
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)



A full-stack serverless web application built with **React + Vite (frontend on Vercel)** and **Supabase (backend database + realtime + auth)**.  

The project demonstrates:
- Serverless CRUD operations
- Realtime subscriptions (insert, update, delete)
- Authentication with Supabase
- Cloud portability (frontend on Vercel, backend on Supabase)

---

## Features

- **Frontend**: React + Vite  
- **Backend**: Supabase (Postgres, Auth, Realtime)  
- **CRUD**: Create, Read, Update, Delete messages  
- **Realtime**: Live updates across browser tabs  
- **Authentication**: Email/Password login and signup (Supabase Auth)  
- **Deployment**: Frontend deployed on Vercel  

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/multi-cloud-serverless-app.git
cd multi-cloud-serverless-app
```

### 2. Install frontend dependencies
```bash
cd frontend
npm install
```

### 3. Setup environment variables
Create a .env.local file in the frontend/ directory with:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
Don’t commit this file — your keys should stay local.

### 4. Run the dev server
```bash
npm run dev
```
This starts Vite on http://localhost:5173.

### 5. Build for production
```bash
npm run build
npm run preview
```

---

## Project Structure
```pgsql
frontend/
  ├── public/          # static assets (favicon, logo)
  ├── src/
  │   ├── App.jsx      # main app with CRUD + session handling
  │   ├── Auth.jsx     # authentication component
  │   ├── supabaseClient.js
  │   └── index.css
  ├── .env.local       # local Supabase credentials
  └── package.json
infra/                 # Terraform/Pulumi infra-as-code
```

---
