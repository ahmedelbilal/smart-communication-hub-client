# Frontend – Smart Communication Hub

This is the **frontend** of the Smart Communication Hub project, built with **Next.js**.
It connects to the backend API and supports real-time messaging through WebSockets.

---

## Environment Setup

Before running the app, create a `.env.local` file in the project root and add the following variables:

```env
EXTERNAL_API_BASE="http://localhost:3000/api"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3000"
```

> These values point to the backend running locally.
> When deployed, replace them with your production URLs.

---

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Run the development server**

   ```bash
   pnpm dev
   ```

3. Open your browser at:
   [http://localhost:3000](http://localhost:3000)

---

## Features

- Real-time chat powered by WebSockets
- User authentication and profiles
- AI-generated conversation insights
- Responsive and modern UI with Next.js

---

## Build for Production

```bash
pnpm build
pnpm start
```

---

## Live Application

The Frontend is deployed and actively running at:
https://smart-communication-hub.ahmedelbilal.com

The backend is deployed and actively running at:
https://api.smart-communication-hub.ahmedelbilal.com/api/docs
