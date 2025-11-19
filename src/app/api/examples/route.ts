import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET() {
  try {
    const db = await getDb();
    const examples = db.data?.examples || [];
    return NextResponse.json(examples);
  } catch (error: any) {
    console.error('Database operation failed:', error.message || error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    const examples = db.data?.examples || [];
    const newId = examples.length > 0 ? Math.max(...examples.map(e => e.id)) + 1 : 1;

    const newExample = {
      id: newId,
      name,
      createdAt: new Date().toISOString(),
    };

    db.data?.examples.push(newExample);
    await db.write();

    return NextResponse.json(newExample, { status: 201 });
  } catch (error: any) {
    console.error('Database operation failed:', error.message || error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}