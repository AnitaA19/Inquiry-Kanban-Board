"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { useInquiryStore } from "@/app/_store/inquiryStore";
import KanbanColumn from "./KanbanColumn";
import InquiryCard from "./InquiryCard";
import { INQUIRY_PHASES, InquiryPhase, Inquiry } from "@/types/inquiry";
import Loader from "../ui/Loader";

export default function KanbanBoard() {
  const searchParams = useSearchParams();
  const { inquiries, moveInquiry, fetchInquiries, loading } = useInquiryStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { 
      activationConstraint: { distance: 8 } 
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 }
    })
  );

  useEffect(() => {
    fetchInquiries(searchParams.toString());
  }, [searchParams, fetchInquiries]);

  const groupedInquiries = useMemo(() => {
    return inquiries.reduce((acc, inquiry) => {
      const phase = inquiry.phase;
      if (!acc[phase]) acc[phase] = [];
      acc[phase].push(inquiry);
      return acc;
    }, {} as Record<InquiryPhase, Inquiry[]>);
  }, [inquiries]);

  const activeInquiry = useMemo(
    () => inquiries.find((i) => i.id === activeId),
    [activeId, inquiries]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveInquiry(active.id as string, over.id as InquiryPhase);
    }
    setActiveId(null);
  };

  return (
    <div className="relative min-h-[70vh]">
      {loading && <Loader variant="container" message="Loading..." />}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INQUIRY_PHASES.map((p) => (
            <KanbanColumn
              key={p.id}
              phase={p.id}
              title={p.label}
              color={p.color}
              inquiries={groupedInquiries[p.id] || []}
            />
          ))}
        </div>

        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: { active: { opacity: "0.5" } },
            }),
          }}
        >
          {activeInquiry ? (
            <div className="w-[300px] rotate-2 scale-105 pointer-events-none">
              <InquiryCard inquiry={activeInquiry} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}