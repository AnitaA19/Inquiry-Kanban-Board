"use client";
import { useInquiryStore } from "@/app/_store/inquiryStore";

export default function SearchInput() {
  const { filters, setFilter } = useInquiryStore();
  return (
    <div className="relative w-full lg:flex-1">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        value={filters.search}
        onChange={(e) => setFilter("search", e.target.value)}
        placeholder="Search client..."
        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
      />
    </div>
  );
}