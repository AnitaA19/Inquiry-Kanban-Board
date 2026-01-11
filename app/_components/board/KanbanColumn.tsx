"use client";
import { useDroppable } from "@dnd-kit/core";
import { Inquiry, PhaseColor } from "@/types/inquiry";
import InquiryCard from "./InquiryCard";

interface Props {
  title: string;
  inquiries: Inquiry[];
  color: PhaseColor;
  phase: string;
}

const colorStyles: Record<PhaseColor, string> = {
  blue: "bg-blue-50/40 border-t-blue-500",
  purple: "bg-purple-50/40 border-t-purple-500",
  orange: "bg-orange-50/40 border-t-orange-500",
  green: "bg-emerald-50/40 border-t-emerald-500",
};

const textStyles: Record<PhaseColor, string> = {
  blue: "text-blue-700",
  purple: "text-purple-700",
  orange: "text-orange-700",
  green: "text-emerald-700",
};

export default function KanbanColumn({ title, inquiries, color, phase }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: phase });
  const totalValue = inquiries.reduce((sum, i) => sum + i.potentialValue, 0);

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-2xl border-t-4 p-4 transition-all ${
        isOver ? "bg-gray-200/60 scale-[1.02]" : colorStyles[color]
      }`}
    >
      <div className="mb-4 px-1">
        <h2 className={`font-black text-sm uppercase tracking-wider ${textStyles[color]}`}>
          {title}
        </h2>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[11px] text-gray-400 font-bold uppercase">
            {inquiries.length} Inquiries
          </span>
          <span className={`text-xs font-black ${textStyles[color]}`}>
            CHF {totalValue.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-20rem)] pr-1 custom-scrollbar">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50">
            <span className="text-xl mb-1 grayscale opacity-50">📥</span>
            <p className="text-[10px] text-gray-400 font-black uppercase">Empty</p>
          </div>
        )}
      </div>
    </div>
  );
}