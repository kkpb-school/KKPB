import { auth } from "@/auth";
import { UploadImage } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { ClassName, BloodGroup } from "@/lib/generated/prisma";
import { getFormNumberValue, getFormStringValue } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const user = await auth();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await req.formData();

		// Extract and validate form values
		const name = getFormStringValue(formData, "name");
		const fatherName = getFormStringValue(formData, "fatherName");
		const motherName = getFormStringValue(formData, "motherName");
		const mobile = getFormStringValue(formData, "mobile");
		const gender = getFormStringValue(formData, "gender");
		const rollNumber = getFormNumberValue(formData, "rollNumber");
		const className = getFormStringValue(formData, "className");
		const year = getFormNumberValue(formData, "year");
		const bloodGroup = getFormStringValue(formData, "bloodGroup");
		const birthDate = getFormStringValue(formData, "birthDate");
		const houseOrRoad = getFormStringValue(formData, "houseOrRoad");
		const villageOrArea = getFormStringValue(formData, "villageOrArea");
		const postOffice = getFormStringValue(formData, "postOffice");
		const upazila = getFormStringValue(formData, "upazila");
		const district = getFormStringValue(formData, "district");
		const division = getFormStringValue(formData, "division");
		const postalCode = getFormStringValue(formData, "postalCode");

		if (!className || rollNumber === null || year === null) {
			return NextResponse.json(
				{ error: "Missing required fields: className, rollNumber, or year" },
				{ status: 400 },
			);
		}

		const classNameEnum = className as ClassName;

		const existingStudent = await db.student.findFirst({
			where: {
				classRecords: {
					some: {
						year,
						className: classNameEnum,
						rollNumber,
					},
				},
			},
		});

		if (existingStudent) {
			return NextResponse.json(
				{
					error:
						"A student with the same roll number in this class and year already exists.",
				},
				{ status: 409 },
			);
		}

		let uploadedImage = { secure_url: "", public_id: "" };
		const imageFile = formData.get("image") as Blob;

		if (imageFile) {
			try {
				uploadedImage = await UploadImage(imageFile, "application-images/");
			} catch (uploadError) {
				console.error("Image upload failed:", uploadError);
				return NextResponse.json(
					{ message: "Image upload failed" },
					{ status: 500 },
				);
			}
		}

		const student = await db.student.create({
			data: {
				name,
				fatherName,
				motherName,
				mobile,
				bloodGroup: bloodGroup ? (bloodGroup as BloodGroup) : undefined,
				birthDate: birthDate ? new Date(birthDate) : undefined,
				status: "Active",
				gender: gender as "Male" | "Female" | "Other",
				address: {
					houseOrRoad,
					villageOrArea,
					postOffice,
					upazila,
					district,
					division,
					postalCode,
				},
				images: {
					url: uploadedImage.secure_url,
					publicId: uploadedImage.public_id,
					alt: `${name}'s photo`,
				},
				classRecords: {
					create: {
						className: classNameEnum,
						rollNumber,
						year,
					},
				},
			},
		});

		return NextResponse.json({ student }, { status: 201 });
	} catch (error) {
		console.error("API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
