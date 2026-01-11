export type InquiryPhase = "new" | "sent_to_hotels" | "offers_received" | "completed";

export type PhaseColor = "blue" | "purple" | "orange" | "green";

export interface PhaseConfig {
  id: InquiryPhase;
  label: string;
  icon: string;
  color: PhaseColor;
}

export const INQUIRY_PHASES: PhaseConfig[] = [
  { id: "new", label: "New", icon: "🆕", color: "blue" },
  { id: "sent_to_hotels", label: "Sent to Hotels", icon: "📩", color: "purple" },
  { id: "offers_received", label: "Offers Received", icon: "📑", color: "orange" },
  { id: "completed", label: "Completed", icon: "✅", color: "green" },
];

export interface Inquiry {
  id: string;
  clientName: string;
  contactPerson: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  potentialValue: number;
  phase: InquiryPhase;
  hotels: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}