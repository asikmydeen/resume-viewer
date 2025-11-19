import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/username/check?username=asik - Check if username is available
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Username parameter is required' },
        { status: 400 }
      );
    }

    // Validate username format
    const validUsername = /^[a-z0-9-]+$/.test(username);
    if (!validUsername) {
      return NextResponse.json(
        { 
          available: false, 
          error: 'Invalid username format. Use lowercase letters, numbers, and hyphens only.' 
        },
        { status: 200 }
      );
    }

    // Check if username exists
    const existing = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    return NextResponse.json({
      available: !existing,
      username,
    });
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}