import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { studentId, className, year, rollNumber } = await req.json();

    if (!studentId || !className || !year || rollNumber === undefined) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Check for duplicate roll number for the given class and year
    const existingRecord = await db.classRecord.findFirst({
      where: {
        className: className,
        year: year,
        rollNumber: rollNumber,
      },
    });

    if (existingRecord) {
      return new NextResponse('Roll number already exists for this class and year', { status: 409 });
    }

    const newClassRecord = await db.classRecord.create({
      data: {
        studentId,
        className: className,
        year,
        rollNumber,
      },
    });

    return NextResponse.json(newClassRecord);
  } catch (error) {
    console.log('[PROMOTE_STUDENT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
