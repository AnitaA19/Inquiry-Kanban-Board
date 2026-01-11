import FilterPanel from "./_components/filters/FilterPanel";
import KanbanBoard from "./_components/board/KanbanBoard";
import InquiryDetailModal from "./_components/modal/InquiryDetailModal";


export default function Home() {
  return (
    <main className="p-12 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-700">Inquiry Kanban Board</h1>
      <FilterPanel />
      <KanbanBoard />
      <InquiryDetailModal />
    </main>
  );
}
