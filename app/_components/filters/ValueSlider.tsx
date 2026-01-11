"use client";
import { useInquiryStore } from "@/app/_store/inquiryStore";

export default function ValueSlider() {
  const { filters, setFilter } = useInquiryStore();
  return (
    <div className="flex items-center gap-3 w-full lg:w-auto bg-gray-50 border border-gray-100 p-2 lg:p-0 lg:bg-transparent lg:border-none rounded-lg h-[40px]">
      <div className="flex-1 flex items-center gap-3 px-2">
        <input
          type="range"
          min="0"
          max="100000"
          step="5000"
          value={filters.minValue}
          onChange={(e) => setFilter("minValue", Number(e.target.value))}
          className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
      <div className="flex items-center gap-1 bg-white px-2 h-8 rounded-md border border-gray-200 shadow-sm min-w-[65px] justify-center">
        <span className="text-[10px] font-bold text-gray-400">CHF</span>
        <span className="text-xs font-mono font-bold text-gray-900">
          {Math.floor(filters.minValue / 1000)}k
        </span>
      </div>
    </div>
  );
}