import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const students = await db.student.findMany({
      include: {
        classRecords: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (students) {
      return NextResponse.json(students, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No students found' }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
