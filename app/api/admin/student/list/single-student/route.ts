import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ message: "Invalid or missing student ID" },
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
				{ message: "Student not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(student, { status: 200 });
	} catch (error) {
		console.error("Error fetching student:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
