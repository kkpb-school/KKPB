import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Invalid or missing student ID' },
        { status: 400 },
      );
    }

    const student = await db.student.findUnique({
      where: { id },
      include: {
        classRecords: {
          include: {
            results: true,
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(student, { status: 200 });
    // biome-ignore lint: unused variable for future use
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
