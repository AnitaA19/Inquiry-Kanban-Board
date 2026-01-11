"use client";

import { useInquiryStore } from "@/app/_store/inquiryStore";
import { formatDate } from "@/app/_lib/formatDate";
import { INQUIRY_PHASES, InquiryPhase } from "@/types/inquiry";
import Loader from "../ui/Loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function InquiryDetailModal() {
  const { selected, selectInquiry, moveInquiry, loading } = useInquiryStore();

  const isOpen = !!selected;
  const onOpenChange = (open: boolean) => {
    if (!open) selectInquiry(undefined);
  };

  if (!selected) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none sm:rounded-3xl shadow-2xl bg-background flex flex-col h-[95vh] md:h-auto">
        
        <div className="relative p-5 md:p-8 border-b border-border bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-background shrink-0">
          <DialogHeader className="text-left">
            <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
              <span className="bg-blue-600 text-white text-[9px] md:text-[10px] font-black px-2 py-0.5 md:py-1 rounded-lg uppercase">
                ID: {selected.id.slice(-6).toUpperCase()}
              </span>
              <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 md:py-1 rounded-lg flex items-center gap-1.5 md:gap-2">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <DialogTitle className="text-xl md:text-3xl font-black text-foreground tracking-tight leading-tight">
              {selected.clientName}
            </DialogTitle>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Contact: {selected.contactPerson}</p>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-white dark:bg-slate-950/50">
          
          <div className="space-y-6">
            <section>
              <h4 className="text-[10px] md:text-[11px] font-black uppercase text-muted-foreground tracking-widest mb-3">
                Event Overview
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-foreground">
                  <span className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-base md:text-lg shadow-sm shrink-0">📅</span>
                  <div>
                    <p>{selected.eventType}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground font-normal">{formatDate(selected.eventDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-foreground">
                  <span className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-base md:text-lg shadow-sm shrink-0">👥</span>
                  <p>{selected.guestCount} Expected Guests</p>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-[10px] md:text-[11px] font-black uppercase text-muted-foreground tracking-widest mb-3">Hotels</h4>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {selected.hotels?.map((hotel) => (
                  <span key={hotel} className="bg-secondary border border-border px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-[11px] font-bold text-secondary-foreground shadow-sm">
                    🏢 {hotel}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-muted/50 p-5 md:p-6 rounded-2xl border border-border relative overflow-hidden">
              {loading && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <Loader variant="container" className="scale-75" />
                </div>
              )}
              <h4 className="text-[10px] md:text-[11px] font-black uppercase text-muted-foreground mb-4 text-center tracking-widest">
                Status
              </h4>
              
              <div className="relative">
                <select
                  disabled={loading}
                  value={selected.phase}
                  onChange={(e) => moveInquiry(selected.id, e.target.value as InquiryPhase)}
                  className="w-full appearance-none bg-background border-2 border-border rounded-xl p-3 pr-10 text-xs md:text-sm font-bold outline-none focus:border-blue-500 transition-all cursor-pointer disabled:opacity-50 shadow-sm bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                >
                  {INQUIRY_PHASES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.icon} {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Potential Value</p>
                <p className="text-2xl md:text-3xl font-black text-blue-600">
                  CHF {selected.potentialValue.toLocaleString()}
                </p>
              </div>
            </section>
          </div>
        </div>
        
        <div className="px-5 md:px-8 py-4 md:py-6 bg-slate-950 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
          <div className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase flex gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-start">
            <div className="flex flex-col gap-0.5 md:gap-1">
              <span className="text-slate-600">Created</span>
              <span className="text-slate-200">{new Date(selected.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-col gap-0.5 md:gap-1 text-right md:text-left">
              <span className="text-slate-600">Last Update</span>
              <span className="text-slate-200">
                {new Date(selected.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          <button
            onClick={() => selectInquiry(undefined)}
            className="w-full md:w-auto text-[10px] md:text-[11px] font-black text-white uppercase bg-white/10 hover:bg-white/20 px-8 py-2.5 md:py-3 rounded-xl transition-all active:scale-95 border border-white/10"
          >
            Close Details
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}