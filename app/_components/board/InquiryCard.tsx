"use client";

import { useDraggable } from "@dnd-kit/core";
import { Inquiry } from "@/types/inquiry";
import { formatRelativeTime } from "@/app/_lib/formatDate";
import { useInquiryStore } from "@/app/_store/inquiryStore";

export default function InquiryCard({
  inquiry,
  isDragging: isOverlay,
}: {
  inquiry: Inquiry;
  isDragging?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: inquiry.id,
  });
  
  const { selectInquiry } = useInquiryStore();

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    touchAction: "none",
  };

  if (isDragging && !isOverlay) {
    return (
      <div
        ref={setNodeRef}
        className="h-[140px] rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (transform && (Math.abs(transform.x) > 5 || Math.abs(transform.y) > 5)) return;
        selectInquiry(inquiry);
      }}
      className={`
        bg-white p-4 rounded-xl border border-slate-200 shadow-sm 
        hover:shadow-md transition-all hover:border-blue-400 
        cursor-grab active:cursor-grabbing group outline-none 
        focus-visible:ring-2 focus-visible:ring-blue-500
        ${isOverlay ? "shadow-2xl ring-2 ring-blue-500 scale-[1.02] z-50" : ""}
      `}
    >
      <div className="flex justify-between items-start mb-2 pointer-events-none">
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-tight">
          #{inquiry.id.slice(-6).toUpperCase()}
        </span>
        {inquiry.potentialValue > 50000 && (
          <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md uppercase">
            ✨ Priority
          </span>
        )}
      </div>

      <h3 className="font-bold text-slate-900 text-sm mb-1 truncate group-hover:text-blue-600 transition-colors pointer-events-none">
        {inquiry.clientName}
      </h3>

      <div className="mb-3 pointer-events-none">
        <p className="text-[10px] text-slate-500 flex justify-between font-medium">
          <span className="truncate mr-2">{inquiry.eventType}</span>
          <span className="shrink-0">{formatRelativeTime(inquiry.createdAt)}</span>
        </p>
      </div>

      <div className="pt-2 border-t border-slate-50 flex justify-between items-center pointer-events-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          {inquiry.guestCount} Guests
        </span>
        <span className="text-sm font-black text-slate-900">
          CHF {inquiry.potentialValue.toLocaleString()}
        </span>
      </div>
    </div>
  );
}