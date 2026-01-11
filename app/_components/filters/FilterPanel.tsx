"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInquiryStore } from "@/app/_store/inquiryStore";
import SearchInput from "./SearchInput";
import ValueSlider from "./ValueSlider";
import DateRangePicker from "./DateRangePicker";

export default function FilterPanel() {
  const router = useRouter();
  const { filters, resetFilters } = useInquiryStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.minValue) params.set("minValue", String(filters.minValue));
      if (filters.dateFrom) params.set("from", filters.dateFrom);
      if (filters.dateTo) params.set("to", filters.dateTo);

      router.push(`?${params.toString()}`, { scroll: false });
    }, 400);
    return () => clearTimeout(timeout);
  }, [filters, router]);

  const activeCount = [
    filters.search !== "",
    filters.minValue > 0,
    filters.dateFrom !== "",
    filters.dateTo !== "",
  ].filter(Boolean).length;

  return (
    <div className="bg-white p-3 md:p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:flex xl:flex-1 gap-4 items-end xl:items-center">
          <SearchInput />
          <ValueSlider />
          <DateRangePicker />
        </div>

        <div className="flex items-center justify-between xl:justify-end gap-4 pt-3 xl:pt-0 border-t xl:border-t-0 xl:border-l border-gray-100 xl:pl-4">
          <div className="flex flex-col items-start xl:items-end">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full whitespace-nowrap">
              {activeCount} Active
            </span>
          </div>
          <button
            onClick={resetFilters}
            className="h-9 px-4 text-xs font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all uppercase tracking-tight whitespace-nowrap"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}