// @/app/_lib/db.ts
import { Inquiry } from "@/types/inquiry";

const initialData: Inquiry[] = [
  {
    id: "INQ-2026-0034",
    clientName: "Novartis AG",
    contactPerson: "Anna Mueller",
    eventType: "Conference",
    eventDate: "2026-03-15",
    guestCount: 120,
    potentialValue: 48500,
    phase: "offers_received",
    hotels: ["Grand Hotel Zurich"],
    notes: "City center preferred",
    createdAt: "2026-01-10T09:00:00Z",
    updatedAt: "2026-01-10T09:00:00Z",
  },
  {
    id: "INQ-2026-0035",
    clientName: "Roche",
    contactPerson: "Peter Lang",
    eventType: "Workshop",
    eventDate: "2026-04-02",
    guestCount: 60,
    potentialValue: 62000,
    phase: "new",
    hotels: [],
    notes: "Requires high-speed internet",
    createdAt: "2026-01-11T10:00:00Z",
    updatedAt: "2026-01-11T10:00:00Z",
  },
  {
    id: "INQ-2026-0036",
    clientName: "Nestle",
    contactPerson: "Clara Schmidt",
    eventType: "Seminar",
    eventDate: "2026-05-10",
    guestCount: 200,
    potentialValue: 75000,
    phase: "sent_to_hotels",
    hotels: ["Hotel Palace"],
    notes: "",
    createdAt: "2026-01-09T12:00:00Z",
    updatedAt: "2026-01-10T08:00:00Z",
  }
];

const globalForInquiries = global as unknown as { inquiries: Inquiry[] };
if (!globalForInquiries.inquiries) {
  globalForInquiries.inquiries = initialData;
}

export const getDb = () => globalForInquiries.inquiries;

export const updateDb = (id: string, updates: Partial<Inquiry>) => {
  globalForInquiries.inquiries = globalForInquiries.inquiries.map((i) =>
    i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i
  );
  return globalForInquiries.inquiries.find((i) => i.id === id);
};