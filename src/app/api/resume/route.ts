import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { resumes, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { resumeSchema } from '@/lib/resume-schema';

// GET /api/resume - Get current user's resume
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.userId, userId),
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(resume.data);
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/resume - Create or update resume
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate resume data
    const validatedData = resumeSchema.parse(body);

    // Upsert resume
    await db
      .insert(resumes)
      .values({
        userId: userId,
        data: validatedData as any,
      })
      .onConflictDoUpdate({
        target: resumes.userId,
        set: {
          data: validatedData as any,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json(
      { success: true, message: 'Resume saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving resume:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid resume data', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/resume - Delete current user's resume
export async function DELETE() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await db.delete(resumes).where(eq(resumes.userId, userId));

    return NextResponse.json(
      { success: true, message: 'Resume deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}