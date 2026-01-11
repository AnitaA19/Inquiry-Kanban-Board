import { NextResponse } from "next/server";

import { Inquiry } from "@/types/inquiry";
import { updateDb } from "../db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const body = await req.json();

  await new Promise((r) => setTimeout(r, 500));
  const updated = updateDb(id, body);

  if (!updated)
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  return NextResponse.json(updated);
}
