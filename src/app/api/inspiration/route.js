import { NextResponse } from 'next/server';
import { checkOrigin, jsonBody } from '@/lib/admin/auth';
import { inspirationSession, inspirationResponse, currentInspirationCoupon } from '@/lib/inspiration-session';
import { claimDraw, drawStatus } from '@/lib/inspiration-draw.mjs';

export const runtime = 'nodejs';

function failure(error) {
  return NextResponse.json({ message: error.status ? error.message : 'Kupony są chwilowo niedostępne. Możesz nadal odkrywać atrakcje.' }, { status: error.status || 503, headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(request) {
  try {
    if (new URL(request.url).searchParams.get("coupon") === "1") return NextResponse.json({ coupon: await currentInspirationCoupon() }, { headers: { "Cache-Control": "private, no-store" } });
    const session = await inspirationSession();
    return inspirationResponse(NextResponse.json(drawStatus(session.record)), request, session);
  } catch (error) { return failure(error); }
}

export async function POST(request) {
  try {
    checkOrigin(request);
    const { requestId } = await jsonBody(request);
    if (typeof requestId !== 'string' || !/^[a-f0-9-]{36}$/.test(requestId)) return failure({ status: 400, message: 'Niepoprawne losowanie.' });
    const session = await inspirationSession();
    const result = await claimDraw(session.collection, session.record._id, requestId);
    return inspirationResponse(NextResponse.json(result), request, session);
  } catch (error) { return failure(error); }
}
