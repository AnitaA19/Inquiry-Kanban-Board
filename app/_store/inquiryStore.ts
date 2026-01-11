"use client";

import { create } from "zustand";
import { Inquiry, InquiryPhase } from "@/types/inquiry";

interface Filters {
  search: string;
  minValue: number;
  dateFrom: string;
  dateTo: string;
}

interface InquiryState {
  inquiries: Inquiry[];
  loading: boolean;
  selected?: Inquiry;
  filters: Filters;
  selectInquiry: (inquiry?: Inquiry) => void;
  setFilter: (key: keyof Filters, value: any) => void;
  resetFilters: () => void;
  fetchInquiries: (params: string) => Promise<void>;
  moveInquiry: (id: string, phase: InquiryPhase) => Promise<void>;
}

export const useInquiryStore = create<InquiryState>((set, get) => ({
  inquiries: [],
  loading: false,
  selected: undefined,
  filters: { search: "", minValue: 0, dateFrom: "", dateTo: "" },

  selectInquiry: (inquiry) => set({ selected: inquiry }),

  setFilter: (key, value) => {
    set((state) => {
      const newFilters = { ...state.filters, [key]: value };
      if (key === "dateFrom" && value && newFilters.dateTo && newFilters.dateTo < value) {
        newFilters.dateTo = value; 
      }
      if (key === "dateTo" && value && newFilters.dateFrom && newFilters.dateFrom > value) {
        newFilters.dateFrom = value;
      }
      return { filters: newFilters };
    });
  },

  resetFilters: () =>
    set({ filters: { search: "", minValue: 0, dateFrom: "", dateTo: "" } }),

  fetchInquiries: async (params) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/inquiries?${params}`);
      const data = await res.json();
      set({ inquiries: data });
    } finally {
      set({ loading: false });
    }
  },

  moveInquiry: async (id, phase) => {
    const prevInquiries = get().inquiries;
    const now = new Date().toISOString();
    
    const updatedInquiries = prevInquiries.map((i) =>
      i.id === id ? { ...i, phase, updatedAt: now } : i
    );

    set({
      inquiries: updatedInquiries,
      loading: true, 
      selected: get().selected?.id === id 
        ? { ...get().selected!, phase, updatedAt: now } 
        : get().selected,
    });

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phase }),
      });
      if (!res.ok) throw new Error();
    } catch {
      set({ inquiries: prevInquiries, selected: get().selected });
    } finally {
      set({ loading: false });
    }
  },
}));