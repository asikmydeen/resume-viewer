import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, resumes } from '@/db/schema';
import { eq } from 'drizzle-orm';

type RouteContext = {
  params: Promise<{ username: string }>;
};

// GET /api/public/resume/:username - Get public resume by username
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { username } = await context.params;

    // Find user by username
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's resume
    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.userId, user.id),
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    // Return resume data with cache headers
    return NextResponse.json(resume.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching public resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}