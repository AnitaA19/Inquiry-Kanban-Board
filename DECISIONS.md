# DECISIONS.md

This document explains the main technical and UX decisions made while building the **Inquiry Kanban Board**, why certain tools were chosen, and what could be improved with more time.

---

## Drag-and-Drop

### Why I chose `@dnd-kit`

I used **`@dnd-kit`** because it gives a lot of control without forcing a strict structure.

Reasons:
- It is **modern and actively maintained**
- It works well with **custom layouts** like a Kanban board
- It provides low-level hooks (`useDraggable`, `useDroppable`, `DragOverlay`)
- Drag performance and UX feel smooth and predictable

I avoided `react-beautiful-dnd` because it is no longer maintained and is more restrictive.

---

### How drag-and-drop works

- Each inquiry card uses `useDraggable`
- Each column uses `useDroppable`
- The column phase is used as the drop target ID
- On drop:
  - The inquiry is updated immediately (optimistic update)
  - A PATCH request updates the backend
  - If the request fails, the UI rolls back

UX improvements:
- A placeholder appears while dragging
- A floating drag preview is shown using `DragOverlay`
- Drag starts only after small movement (`distance: 5`) to avoid accidental drags

---

## State Management

### Why Zustand

I chose **Zustand** because it is simple, lightweight, and fits UI-driven state very well.

Benefits:
- No boilerplate
- Easy async actions
- No providers or complex setup
- Easy to read and maintain

---

### What the store handles

`useInquiryStore` is the main source of truth and manages:
- Inquiry data
- Loading state
- Selected inquiry (modal)
- Filters
- Optimistic drag-and-drop updates

Important decisions:
- Optimistic UI updates for better responsiveness
- Rollback if the API request fails
- Filters stored globally so all components stay in sync
- Date filters auto-correct invalid ranges

---

### Why not local component state

Local state was avoided for:
- Filters
- Selected inquiry
- Drag updates

Because these states:
- Are shared across many components
- Affect API requests
- Are reflected in the URL

Using a global store keeps the logic consistent and avoids prop drilling.

---

## Filters & URL Sync

### How it works

- Filters are stored in Zustand
- A debounced effect updates the URL query params
- Changing the URL triggers data refetch

Benefits:
- Filters are shareable via URL
- Refreshing the page keeps the current state
- Browser back/forward works naturally

---

### Alternatives considered

- Local state with manual syncing → harder to maintain
- Server-only filtering → slower and worse UX

---

## UX Decisions

### Kanban Board

- Clear column separation using colors
- Each column shows:
  - Number of inquiries
  - Total potential value
- Friendly empty states instead of blank columns

### Inquiry Cards

- Compact but readable
- Highlight high-value inquiries
- Clear hover and focus states
- Click and drag actions don’t conflict

### Drag Experience

- Cursor changes (`grab`, `grabbing`)
- Slight scale and shadow during drag
- Column highlights when hovering

### Detail Modal

- Opens on card click
- Phase can be changed via dropdown or drag-and-drop
- Important info is visible at a glance
- Loading overlay prevents double actions

---

## Why `"use client"` Is Used

This project is highly interactive and relies on:
- Client-side state
- Drag-and-drop
- Modals and animations
- DOM interactions

Because of that:
- All interactive components use `"use client"`
- Server Components were intentionally not used
- Data fetching is simple and client-driven

This fits well for an internal dashboard / ERP-style tool.

---

## What I Would Improve With More Time

- Replace the mock in-memory DB with a real database
- Improve keyboard accessibility
- Add smoother animations between columns
- Optimize performance for very large boards
- Add user roles and permissions
- Add unit and E2E tests

---

## Final Thoughts

The focus of this implementation was to:
- Keep things simple and readable
- Avoid unnecessary abstractions
- Provide a smooth and intuitive UX
- Make the codebase easy to extend

All decisions were made with real-world usage and maintainability in mind.
