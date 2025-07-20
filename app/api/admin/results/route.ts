import { auth } from '@/auth';
import { db } from '@/lib/db';
import { ResultType } from '@/lib/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const user = await auth();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { testInfo, results } = body;

    const currentYear = new Date().getFullYear();
    let updatedCount = 0;
    let createdCount = 0;

    for (const result of results) {
      const { studentId, subjects } = result;

      const classRecord = await db.classRecord.findFirst({
        where: {
          studentId,
          className: testInfo.className,
          year: currentYear,
        },
      });

      if (!classRecord) {
        console.warn(`No class record found for student ${studentId}`);
        continue;
      }

      const existingResult = await db.result.findFirst({
        where: {
          classRecordId: classRecord.id,
          type: testInfo.testType as ResultType,
        },
      });

      if (existingResult) {
        // Merge new subjects into existing ones
        const existingSubjects = existingResult.subjects as Record<
          string,
          { written: number; mcq: number; total: number }
        >;

        const updatedSubjects = {
          ...existingSubjects,
          ...subjects, // overwrites if same subject is included again
        };

        await db.result.update({
          where: { id: existingResult.id },
          data: {
            subjects: updatedSubjects,
          },
        });

        updatedCount++;
      } else {
        await db.result.create({
          data: {
            classRecordId: classRecord.id,
            type: testInfo.testType as ResultType,
            subjects,
          },
        });

        createdCount++;
      }
    }

    return NextResponse.json(
      {
        message: 'Results processed successfully!',
        created: createdCount,
        updated: updatedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[RESULT_SUBMIT_ERROR]', error);
    return NextResponse.json(
      { error: 'Something went wrong while submitting results.' },
      { status: 500 }
    );
  }
}
