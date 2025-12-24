# 🎨 Retail Analytics Frontend (Next.js)

The **Retail Analytics Frontend** is a modern, premium web application designed to provide a seamless and interactive shopping experience. Built with Next.js 14, it features a glassmorphic design system, real-time notifications, and a sticky AI-powered assistant.

---

## ✨ Key Features

### 🌐 Dynamic Shopping Experience
- **Smart Components**: Premium card designs for products, orders, and reviews.
- **Persistent Cart Context**: A global cart state that synchronizes with the backend database, ensuring your basket follows you everywhere.
- **Glassmorphic UI**: High-end aesthetic using Tailwind CSS with subtle blur effects and vibrant gradients.

### 👤 User Intelligence
- **Profile Dashboard**: A centralized view of user data, featuring order history carousels and quick-access favorites.
- **Auth Guard**: Secure interaction flows that prompt users to log in before adding items to their basket or wishlist.

### 🤖 Integrated AI Assistant
- **Sticky Agent Bubble**: A persistent, animated chat widget available on every page.
- **n8n Orchestration**: Connects to an intelligent backend proxy that allows the agent to perform real commerce actions (Search, Cart, Favorites).
- **Thinking States**: Visual feedback during AI inference with animated loaders.

---

## 🛠️ Tech Stack
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Feedback**: [Sonner](https://sonner.stevenly.me/) (Toasts/Notifications)
- **State Management**: React Context API

---

## 📦 Installation & Setup

### 1. Requirements
Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### 2. Configure Environment
```bash
cp .env.example .env
# Set NEXT_PUBLIC_API_URL to your backend host
```

### 3. Run Development Server
```bash
npm install
npm run dev
```

---

## 📂 Project Structure

| Path | Description |
| :--- | :--- |
| `src/app` | Logic-heavy pages including Profiles, Products, and Login. |
| `src/components` | Reusable UI atoms (Navbar, AgentBubble, Modals). |
| `src/context` | Global state for Authentication and Cart synchronization. |
| `src/lib` | Axios client configured with base URL and interceptors. |
