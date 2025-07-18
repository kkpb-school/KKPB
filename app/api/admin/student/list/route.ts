import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const searchTerm = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const studentClass = searchParams.get('class');

    const where: any = {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { fatherName: { contains: searchTerm, mode: 'insensitive' } },
        { motherName: { contains: searchTerm, mode: 'insensitive' } },
      ],
    };

    if (status && status !== 'all') {
      where.isActive = status === 'active';
    }

    if (studentClass && studentClass !== 'all') {
      where.classRecords = {
        some: {
          className: studentClass,
        },
      };
    }

    const students = await db.student.findMany({
      where,
      include: {
        classRecords: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalStudents = await db.student.count({ where });
    const totalPages = Math.ceil(totalStudents / limit);

    if (students) {
      return NextResponse.json({ students, totalPages }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No students found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
