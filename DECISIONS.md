# DECISIONS.md

## Drag-and-Drop

### Why I chose `@dnd-kit`
- **Modern and Modular:** Unlike `react-beautiful-dnd`, it doesn't force a specific DOM structure.
- **Touch Support:** I implemented `TouchSensor` with a `250ms` delay, making the Kanban board usable on tablets/mobile.
- **Performance:** Using `DragOverlay` ensures that the card being dragged is moved to the document body, preventing layout shift or "clipping" issues within overflow-hidden columns.

### How drag-and-drop works
- **Sensors:** I set a `distance: 8` constraint for pointers. This is crucial because it allows the `onClick` event (to open the modal) to fire without being intercepted by a "micro-drag."
- **Visual Feedback:** - A dashed placeholder appears in the source column.
  - The `DragOverlay` uses a slight rotation (`rotate-2`) and scale to feel "lifted" off the page.
- **Logic:** On `onDragEnd`, we check if the `over` ID (the column) is different from the current phase before triggering the store update.

---

## State Management (Zustand)

### Why Zustand?
- **Boilerplate-free:** It allowed me to combine the API logic (fetching/patching) with the UI state in under 100 lines of code.
- **Optimistic Updates:** In `moveInquiry`, the UI updates instantly. I saved the previous state in a variable (`prevInquiries`) so that if the `fetch` fails, I can perform a transparent rollback.

### Store Logic Fixes
- **Auto-Correction:** I added logic in `setFilter` to ensure `dateFrom` cannot be after `dateTo`, preventing "empty" states caused by user error in the range picker.

---

## Filters & URL Sync

### How it works
- **Debounced Sync:** I used a `400ms` timeout in the `FilterPanel` effect. This prevents the Next.js router from being hammered with URL updates while a user is typing a search query.
- **Single Source of Truth:** The board component listens to `searchParams`. When the URL changes (via the FilterPanel), the board automatically re-fetches data. This makes the "Clear All" button simple: it just resets the Zustand state, which then resets the URL.

---

## UX Decisions

### Design Language
- **High-Value Indicators:** Inquiries > CHF 50,000 get a "✨ Priority" badge. This helps sales teams prioritize their workflow at a glance.
- **Relative Time:** I implemented `formatRelativeTime` (e.g., "2h ago") because for a fast-moving inquiry board, the *recency* of the lead is more important than the specific date.
- **Column Feedback:** Added `isOver` styling in `KanbanColumn` to highlight the drop zone, providing clear intent to the user.

---

## Technical Constraints & "use client"
- **Interactivity First:** While Next.js promotes Server Components, a Kanban board is an "Application" pattern, not a "Content" pattern. Every part of this UI requires stateful interaction, making `"use client"` the correct architectural choice here.

---

## What I Would Improve With More Time
1. **Persistence:** Connect to a real Postgres/Prisma backend.
2. **Sort Order:** Currently, items are grouped by phase but not ordered within the column. I would add a `position` field to allow manual reordering (top-to-bottom).
3. **Keyboard Navigation:** Allow moving cards between columns using arrow keys + Enter for full accessibility (A11Y).
4. **Toast Notifications:** Add a notification (e.g., Sonner) to alert the user if an optimistic update fails and a rollback occurs.