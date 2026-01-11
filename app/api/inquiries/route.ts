import { NextResponse } from "next/server";
import { getDb } from "./db";

export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase();
  const minValue = Number(searchParams.get("minValue") || 0);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  await new Promise((r) => setTimeout(r, 500));

  let data = getDb();

  if (search)
    data = data.filter((i) => i.clientName.toLowerCase().includes(search));
  if (minValue) data = data.filter((i) => i.potentialValue >= minValue);
  if (from) data = data.filter((i) => new Date(i.eventDate) >= new Date(from));
  if (to) data = data.filter((i) => new Date(i.eventDate) <= new Date(to));

  return NextResponse.json(data);
}
