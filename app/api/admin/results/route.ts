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
      const { studentId, subjects, totalMarks } = result;

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

      // Prepare the subjects data with test configuration and total marks
      const subjectsWithTestInfo = {
        ...subjects,
        testConfiguration: {
          writtenMarks: testInfo.writtenMarks,
          mcqMarks: testInfo.mcqMarks,
          totalMarksPerSubject: testInfo.totalMarksPerSubject,
          totalStudentMarks: totalMarks,
        },
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
          } & { testConfiguration?: any }
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
