/* Middleware if the data fails to fetch */
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/fallbackWeekly' };

export async function middleware() {
  const weatherBitData = await get('weatherBitData');
  return NextResponse.json(weatherBitData);
}