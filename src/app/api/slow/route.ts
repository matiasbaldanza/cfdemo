import { NextResponse } from "next/server";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function GET() {
  // Simular costo (para demo de rate limiting / resource exhaustion)
  await sleep(1500);
  return NextResponse.json({ ok: true, simulatedLatencyMs: 1500 });
}