/* Middleware if the data fails to fetch */
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = {
  matcher: ['/fallbackWeekly', '/fallbackHourly'],
};

export async function middleware() {
  const weeklyForecast = await get('weeklyForecast');
  return NextResponse.json(weeklyForecast);
}