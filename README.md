# 📋 Inquiry Kanban Board

This project is a high-performance **Next.js (App Router)** application implementing an **Inquiry Kanban Board** for a B2B event management ERP system. It allows staff to visually manage hotel inquiries through multiple business phases with drag-and-drop, real-time filtering, and detailed analytics.

---

## ✨ Features

- **Kanban Workflow**: 4 distinct inquiry phases:  
  `New → Sent to Hotels → Offers Received → Completed`
- **Drag & Drop**: Seamlessly move inquiries between columns powered by `@dnd-kit`.
- **Real-time Filtering**:
  - Fuzzy search by Client Name.
  - Minimum potential value (CHF).
  - Event date range picker.
- **Dynamic Analytics**: Column totals for inquiry counts and total potential value per phase.
- **Inquiry Detail Modal**: Full data view with phase-change dropdowns and optimistic UI updates.
- **Persistent State**: Filters sync directly to URL query parameters for shareable views.

---

## 🛠 Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **Next.js 14+** | App Router, Route Handlers, and Server Components |
| **TypeScript** | Strict type safety across the full stack |
| **Zustand** | Lightweight global state management |
| **Tailwind CSS** | Utility-first styling & responsive design |
| **@dnd-kit** | Accessible, headless drag-and-drop primitives |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
# or
yarn install

2. Run the Development Server
Bash

npm run dev
3. Open the App
Visit http://localhost:3000 in your browser.

📂 Project Structure
Plaintext

app/
├─ api/
│  └─ inquiries/
│     ├─ route.ts        # GET inquiries with filters
│     ├─ [id]/route.ts   # PATCH inquiry (phase update)
│     └─ db.ts           # In-memory mock database
│
├─ _components/
│  ├─ board/             # DnD context, Columns, and Cards
│  ├─ filters/           # Search, Sliders, and Date Pickers
│  ├─ modal/             # Detail view implementation
│  └─ ui/                # Shared UI elements (Loaders, etc.)
│
├─ _store/
│  └─ inquiryStore.ts    # Zustand global state
│
├─ _lib/
│  ├─ formatDate.ts      # Date formatting utilities
│  └─ api.ts             # Fetch wrappers
│
├─ page.tsx              # Main Kanban Page
└─ types/
   └─ inquiry.ts         # Shared TypeScript interfaces
🔄 Data Flow & Logic
Drag & Drop Logic
The board uses @dnd-kit/core. When a card is dropped into a new column:

The UI updates optimistically via Zustand.

An asynchronous PATCH request is sent to /api/inquiries/[id].

If the request fails, the UI rolls back to the previous state to ensure data integrity.

State Management
Zustand handles the heavy lifting for client-side state. It manages:

The master list of inquiries.

Active filter states.

Global loading and error states.

Why "use client" is Required
This project leverages React Client Components for:

Browser APIs: Drag-and-drop relies on Pointer and Touch events.

Interactivity: Real-time filtering and modal state require useState and useEffect.

Navigation: Using useSearchParams to sync UI state with the URL.

🧪 Mock Backend
The application includes a built-in mock backend using Next.js Route Handlers:

In-Memory Storage: Uses a global variable to simulate a database.

Network Latency: Simulates real-world conditions with a slight delay.

Restful Design: Supports GET for filtered data and PATCH for updates.

📦 Deployment
The easiest way to deploy is via Vercel:

Push your code to GitHub.

Import the project into Vercel.

Vercel will automatically detect Next.js and deploy.

For more details, see the Next.js Deployment Documentation.

📚 Learn More
Next.js Documentation

Dnd Kit

Zustand Github

Tailwind CSS Documentation