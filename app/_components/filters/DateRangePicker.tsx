"use client";
import { useInquiryStore } from "@/app/_store/inquiryStore";

export default function DateRangePicker() {
  const { filters, setFilter } = useInquiryStore();
  
  const inputClass = "flex-1 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 outline-none transition-all cursor-pointer min-h-[40px]";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto group">
      <div className="flex flex-col w-full sm:w-auto">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1 mb-1 md:hidden">From</label>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter("dateFrom", e.target.value)}
          className={inputClass}
        />
      </div>
      
      <div className="hidden sm:flex items-center justify-center text-gray-300 px-1 mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>

      <div className="flex flex-col w-full sm:w-auto">
        <label className="text-[10px] font-black uppercase text-gray-400 ml-1 mb-1 md:hidden">To</label>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter("dateTo", e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}