import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  if (!db) {
    return Response.json({ ok: true, mock: true });
  }
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
