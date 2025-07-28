import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { ClassName, ResultType } from '@/lib/generated/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const className = searchParams.get('class') || '';
    const roll = searchParams.get('roll') || '';
    const test = searchParams.get('test') || '';
    const year = searchParams.get('year') || '';
    if (!className || !roll || !test) {
      return NextResponse.json('Missing required parameters', { status: 400 });
    }

    const results = await db.result.findFirst({
      where: {
        classRecord: {
          className: className as ClassName,
          rollNumber: parseInt(roll),
          year: parseInt(year),
        },
        type: test as ResultType,
      },
      include: {
        classRecord: {
          include: {
            student: true,
          },
        },
      },
    });

    return NextResponse.json(results, { status: 200 });
    // biome-ignore lint: unused variable for future use
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
