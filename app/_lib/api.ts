import { Inquiry } from "@/types/inquiry";

export async function fetchInquiries(filters?: {
  search?: string;
  minValue?: number;
  dateFrom?: string;
  dateTo?: string;
}): Promise<Inquiry[]> {
  const params = new URLSearchParams();
  if (filters?.search) params.set("search", filters.search);
  if (filters?.minValue) params.set("minValue", String(filters.minValue));
  if (filters?.dateFrom) params.set("from", filters.dateFrom);
  if (filters?.dateTo) params.set("to", filters.dateTo);

  const res = await fetch(`/api/inquiries?${params.toString()}`);
  return res.json();
}

export async function patchInquiry(
  id: string,
  data: Partial<Inquiry>
): Promise<Inquiry> {
  const res = await fetch(`/api/inquiries/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
