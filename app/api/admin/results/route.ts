import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import type { ResultType } from '@/lib/generated/prisma';

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
        continue;
      }

      // Prepare the subjects data with test configuration and total marks
      const subjectsWithTestInfo = {
        ...subjects,
      };

      const existingResult = await db.result.findFirst({
        where: {
          classRecordId: classRecord.id,
          type: testInfo.testType as ResultType,
        },
      });

      if (existingResult) {
        // Merge new subjects into existing ones, preserving testConfiguration
        const existingSubjects = existingResult.subjects as Record<
          string,
          {
            writtenMark: number;
            mcqMark: number;
            totalMark: number;
            maxWrittenMark: number;
            maxMcqMark: number;
            maxTotalMark: number;
            grade: string;
          }
        >;

        const updatedSubjects = {
          ...existingSubjects,
          ...subjectsWithTestInfo, // Overwrites subject data and updates testConfiguration
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
            subjects: subjectsWithTestInfo,
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
      { status: 200 },
    );
    // biome-ignore lint: unused variable for future use
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong while submitting results.' },
      { status: 500 },
    );
  }
}
