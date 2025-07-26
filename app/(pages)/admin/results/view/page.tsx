"use client";

import { useState, useMemo } from "react";
import { format, isThisYear, isPast, startOfYear, endOfYear } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	GraduationCap,
	BookOpen,
	Calendar,
	Users,
	Search,
	ChevronRight,
	Clock,
	Award,
	FileText,
	TrendingUp,
	Settings,
	CheckCircle,
	AlertCircle,
	Plus,
	X,
} from "lucide-react";
import Link from "next/link";

// Enhanced data structure with proper typing
interface ClassData {
	id: number;
	name: string;
	displayName: string;
	students: number;
	color: string;
	sections: string[];
}

interface ExamType {
	id: string;
	name: string;
	shortName: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any;
	description: string;
	color: string;
	months: string[];
	isActive: boolean;
}

interface AcademicYear {
	year: number;
	startDate: Date;
	endDate: Date;
	status: "current" | "upcoming" | "completed";
	totalResults: number;
	completedExams: number;
	totalExams: number;
}

// Mock data with proper structure
const classes: ClassData[] = [
	{
		id: 6,
		name: "Six",
		displayName: "Class Six",
		students: 45,
		color: "bg-blue-500",
		sections: ["A", "B"],
	},
	{
		id: 7,
		name: "Seven",
		displayName: "Class Seven",
		students: 52,
		color: "bg-green-500",
		sections: ["A", "B", "C"],
	},
	{
		id: 8,
		name: "Eight",
		displayName: "Class Eight",
		students: 48,
		color: "bg-purple-500",
		sections: ["A", "B"],
	},
	{
		id: 9,
		name: "Nine",
		displayName: "Class Nine",
		students: 41,
		color: "bg-orange-500",
		sections: ["A", "B"],
	},
	{
		id: 10,
		name: "Ten",
		displayName: "Class Ten",
		students: 38,
		color: "bg-red-500",
		sections: ["A", "B"],
	},
];

const examTypes: ExamType[] = [
	{
		id: "mid-term",
		name: "Mid Term",
		shortName: "Mid",
		icon: BookOpen,
		description: "Mid-year examination (June-July)",
		color: "bg-blue-600",
		months: ["June", "July"],
		isActive: true,
	},
	{
		id: "final",
		name: "Final Term",
		shortName: "Final",
		icon: Award,
		description: "Final examination (November-December)",
		color: "bg-green-600",
		months: ["November", "December"],
		isActive: true,
	},
];

// Generate academic years with proper date handling
const generateAcademicYears = (): AcademicYear[] => {
	const currentYear = new Date().getFullYear();
	const years: AcademicYear[] = [];

	for (let i = 0; i < 5; i++) {
		const year = currentYear - i;
		const startDate = startOfYear(new Date(year, 0, 1));
		const endDate = endOfYear(new Date(year, 11, 31));

		let status: "current" | "upcoming" | "completed";
		if (isThisYear(startDate)) {
			status = "current";
		} else if (isPast(endDate)) {
			status = "completed";
		} else {
			status = "upcoming";
		}

		years.push({
			year,
			startDate,
			endDate,
			status,
			totalResults: Math.floor(Math.random() * 300) + 200,
			completedExams:
				status === "completed" ? 12 : Math.floor(Math.random() * 12),
			totalExams: 12, // 6 classes × 2 exams
		});
	}

	return years.sort((a, b) => b.year - a.year);
};

const academicYears = generateAcademicYears();

export default function AdminNavigation() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedYear, setSelectedYear] = useState(academicYears[0].year);
	const [selectedExam, setSelectedExam] = useState<string | null>(null);

	// Memoized calculations
	const currentAcademicYear = useMemo(
		() => academicYears.find((year) => year.year === selectedYear),
		[selectedYear],
	);

	const filteredClasses = useMemo(
		() =>
			classes.filter(
				(cls) =>
					cls.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
					cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					cls.id.toString().includes(searchQuery),
			),
		[searchQuery],
	);

	const quickStats = useMemo(
		() => [
			{
				label: "Total Students",
				value: classes.reduce((sum, cls) => sum + cls.students, 0).toString(),
				icon: Users,
				color: "bg-blue-500",
			},
			{
				label: "Active Classes",
				value: classes.length.toString(),
				icon: GraduationCap,
				color: "bg-green-500",
			},
			{
				label: "Exam Types",
				value: examTypes.filter((e) => e.isActive).length.toString(),
				icon: FileText,
				color: "bg-purple-500",
			},
			{
				label: "Academic Years",
				value: academicYears.length.toString(),
				icon: Calendar,
				color: "bg-orange-500",
			},
		],
		[],
	);

	const getExamStatus = (classId: number, examId: string, year: number) => {
		// Mock logic for exam status
		const isCompleted = Math.random() > 0.3;
		const hasResults = Math.random() > 0.2;

		if (year < new Date().getFullYear()) {
			return { status: "completed", hasResults: true, color: "bg-green-500" };
		} else if (isCompleted) {
			return {
				status: "completed",
				hasResults,
				color: hasResults ? "bg-green-500" : "bg-yellow-500",
			};
		} else {
			return { status: "pending", hasResults: false, color: "bg-gray-400" };
		}
	};

	const clearSearch = () => {
		setSearchQuery("");
	};

	const resetAll = () => {
		setSearchQuery("");
		setSelectedExam(null);
		setSelectedYear(academicYears[0].year);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			<div className="mx-auto max-w-7xl p-4 sm:p-6">
				{/* Enhanced Header */}
				<div className="mb-8">
					<div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
						<div>
							<h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
								Result Management Dashboard
							</h1>
							<p className="text-base text-gray-600 sm:text-lg">
								Navigate and manage examination results • Academic Year{" "}
								{selectedYear}
							</p>
							{currentAcademicYear && (
								<p className="mt-1 text-sm text-gray-500">
									{format(currentAcademicYear.startDate, "MMM yyyy")} -{" "}
									{format(currentAcademicYear.endDate, "MMM yyyy")} •
									{currentAcademicYear.status === "current" && " Current Year"}
									{currentAcademicYear.status === "completed" && " Archived"}
									{currentAcademicYear.status === "upcoming" && " Upcoming"}
								</p>
							)}
						</div>
						<div className="flex items-center gap-3">
							<Button variant="outline" className="gap-2 bg-white/80">
								<Plus className="h-4 w-4" />
								Add Results
							</Button>
							<Button variant="outline" className="gap-2 bg-white/80">
								<Settings className="h-4 w-4" />
								Settings
							</Button>
							<Button className="gap-2 bg-blue-600 hover:bg-blue-700">
								<TrendingUp className="h-4 w-4" />
								Analytics
							</Button>
						</div>
					</div>

					{/* Enhanced Quick Stats */}
					<div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
						{quickStats.map((stat, index) => (
							<Card
								key={index}
								className="border-0 bg-white/90 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
							>
								<CardContent className="p-4 sm:p-6">
									<div className="flex items-center gap-3 sm:gap-4">
										<div className={`${stat.color} rounded-xl p-2 sm:p-3`}>
											<stat.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
										</div>
										<div>
											<p className="text-xl font-bold text-gray-900 sm:text-2xl">
												{stat.value}
											</p>
											<p className="text-xs text-gray-600 sm:text-sm">
												{stat.label}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Step 1: Select Academic Year */}
				<Card className="mb-6 border-0 bg-white/90 shadow-sm backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Calendar className="h-5 w-5" />
							Step 1: Select Academic Year
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
							{academicYears.map((year) => (
								<Button
									key={year.year}
									variant={selectedYear === year.year ? "default" : "outline"}
									onClick={() => setSelectedYear(year.year)}
									className={`flex h-auto flex-col items-center gap-2 p-4 ${
										selectedYear === year.year
											? "bg-blue-600 hover:bg-blue-700"
											: "bg-white hover:bg-gray-50"
									}`}
								>
									<span className="text-lg font-bold">{year.year}</span>
									<Badge
										variant={
											year.status === "current" ? "default" : "secondary"
										}
										className={`text-xs ${
											selectedYear === year.year && year.status === "current"
												? "bg-blue-800"
												: ""
										}`}
									>
										{year.status === "current"
											? "Current"
											: year.status === "completed"
												? "Archived"
												: "Upcoming"}
									</Badge>
									<span className="text-xs opacity-75">
										{year.totalResults} Results
									</span>
								</Button>
							))}
						</div>

						{/* Year Progress */}
						{currentAcademicYear && (
							<div className="mt-6 rounded-lg bg-gray-50 p-4">
								<div className="mb-2 flex items-center justify-between">
									<span className="text-sm font-medium text-gray-700">
										Academic Year Progress
									</span>
									<span className="text-sm text-gray-600">
										{currentAcademicYear.completedExams}/
										{currentAcademicYear.totalExams} Exams Completed
									</span>
								</div>
								<div className="h-2 w-full rounded-full bg-gray-200">
									<div
										className="h-2 rounded-full bg-blue-600 transition-all duration-300"
										style={{
											width: `${(currentAcademicYear.completedExams / currentAcademicYear.totalExams) * 100}%`,
										}}
									></div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Step 2: Select Exam Type */}
				<Card className="mb-6 border-0 bg-white/90 shadow-sm backdrop-blur-sm">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 text-lg">
							<FileText className="h-5 w-5" />
							Step 2: Select Exam Type
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
							{examTypes.map((exam) => (
								<Button
									key={exam.id}
									variant="outline"
									onClick={() =>
										setSelectedExam(selectedExam === exam.id ? null : exam.id)
									}
									className={`flex h-auto items-center justify-start gap-4 p-6 transition-all duration-200 ${
										selectedExam === exam.id
											? "border-blue-200 bg-blue-50 ring-2 ring-blue-500"
											: "bg-white hover:bg-gray-50 hover:shadow-md"
									}`}
								>
									<div className={`${exam.color} rounded-xl p-3`}>
										<exam.icon className="h-6 w-6 text-white" />
									</div>
									<div className="flex-1 text-left">
										<h3 className="mb-1 text-lg font-bold text-gray-900">
											{exam.name}
										</h3>
										<p className="mb-2 text-sm text-gray-600">
											{exam.description}
										</p>
										<div className="flex items-center gap-2">
											<Badge variant="outline" className="gap-1">
												<Clock className="h-3 w-3" />
												{exam.months.join(" - ")}
											</Badge>
											<Badge variant="secondary">
												{classes.length} Classes
											</Badge>
										</div>
									</div>
									<div className="flex items-center">
										{selectedExam === exam.id && (
											<CheckCircle className="h-5 w-5 text-blue-600" />
										)}
									</div>
								</Button>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Step 3: Search and Select Class (only show when exam is selected) */}
				{selectedExam && (
					<Card className="mb-6 border-0 bg-white/95 shadow-lg backdrop-blur-sm">
						<CardHeader className="pb-4">
							<CardTitle className="flex items-center gap-2 text-lg">
								<GraduationCap className="h-6 w-6" />
								Step 3: Select Class for{" "}
								{examTypes.find((e) => e.id === selectedExam)?.name} -{" "}
								{selectedYear}
							</CardTitle>
						</CardHeader>
						<CardContent>
							{/* Simple Search Bar */}
							<div className="mb-6">
								<div className="relative max-w-md">
									<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
									<Input
										placeholder="Search by class name or number (e.g., 'Six' or '6')"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="bg-white pr-10 pl-10"
									/>
									{searchQuery && (
										<Button
											variant="ghost"
											size="sm"
											onClick={clearSearch}
											className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 transform p-0 hover:bg-gray-100"
										>
											<X className="h-4 w-4" />
										</Button>
									)}
								</div>
								{searchQuery && (
									<p className="mt-2 text-sm text-gray-600">
										Showing {filteredClasses.length} of {classes.length} classes
									</p>
								)}
							</div>

							{/* Class Grid */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
								{filteredClasses.map((cls) => {
									const examStatus = getExamStatus(
										cls.id,
										selectedExam,
										selectedYear,
									);
									return (
										<Link
											key={cls.id}
											href={`/search-results?class=${cls.name}&test=${examTypes.find((e) => e.id === selectedExam)?.name}&year=${selectedYear}`}
										>
											<Card className="group cursor-pointer border-0 bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
												<CardContent className="p-6">
													<div className="mb-4 flex items-center gap-4">
														<div
															className={`${cls.color} rounded-xl p-3 transition-transform group-hover:scale-110`}
														>
															<BookOpen className="h-6 w-6 text-white" />
														</div>
														<div className="min-w-0 flex-1">
															<h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
																{cls.displayName}
															</h3>
															<p className="text-sm text-gray-600">
																{
																	examTypes.find((e) => e.id === selectedExam)
																		?.name
																}{" "}
																{selectedYear}
															</p>
														</div>
														<div className="flex items-center gap-2">
															{examStatus.hasResults ? (
																<CheckCircle className="h-5 w-5 text-green-500" />
															) : (
																<AlertCircle className="h-5 w-5 text-yellow-500" />
															)}
															<ChevronRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
														</div>
													</div>

													<div className="space-y-3">
														<div className="flex items-center justify-between">
															<span className="text-sm text-gray-600">
																Students
															</span>
															<Badge variant="secondary" className="gap-1">
																<Users className="h-3 w-3" />
																{cls.students}
															</Badge>
														</div>

														<div className="flex items-center justify-between">
															<span className="text-sm text-gray-600">
																Sections
															</span>
															<div className="flex gap-1">
																{cls.sections.map((section) => (
																	<Badge
																		key={section}
																		variant="outline"
																		className="text-xs"
																	>
																		{section}
																	</Badge>
																))}
															</div>
														</div>

														<div className="flex items-center justify-between">
															<span className="text-sm text-gray-600">
																Status
															</span>
															<Badge className={examStatus.color}>
																{examStatus.hasResults
																	? "Results Available"
																	: examStatus.status === "completed"
																		? "Exam Done"
																		: "Pending"}
															</Badge>
														</div>
													</div>

													<div className="mt-4 border-t border-gray-100 pt-4">
														<div className="flex items-center gap-2 text-sm font-medium text-blue-600">
															<FileText className="h-4 w-4" />
															{examStatus.hasResults
																? "View Results"
																: "Manage Exam"}
														</div>
													</div>
												</CardContent>
											</Card>
										</Link>
									);
								})}
							</div>

							{/* No Results Found */}
							{filteredClasses.length === 0 && (
								<div className="py-12 text-center">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
										<Search className="h-8 w-8 text-gray-400" />
									</div>
									<h3 className="mb-2 text-lg font-medium text-gray-900">
										No classes found
									</h3>
									<p className="mb-4 text-gray-600">
										No classes match &#34;{searchQuery}&#34;. Try searching for
										&#34;Six&#34;, &#34;Seven&#34;, or just &#34;6&#34;,
										&#34;7&#34;.
									</p>
									<Button variant="outline" onClick={clearSearch}>
										Clear Search
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{/* Reset All Button */}
				{(selectedExam ||
					searchQuery ||
					selectedYear !== academicYears[0].year) && (
					<div className="mb-6 flex justify-center">
						<Button
							variant="outline"
							onClick={resetAll}
							className="gap-2 bg-transparent"
						>
							<X className="h-4 w-4" />
							Reset All Selections
						</Button>
					</div>
				)}

				{/* Clear Instructions */}
				{!selectedExam && (
					<Card className="border-0 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
						<CardContent className="p-6">
							<div className="flex items-start gap-4">
								<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
									<BookOpen className="h-5 w-5 text-white" />
								</div>
								<div>
									<h3 className="mb-2 text-lg font-semibold text-blue-800">
										How to Navigate Results
									</h3>
									<div className="space-y-2 text-blue-700">
										<p>
											<strong>Step 1:</strong> Choose the academic year you want
											to work with
										</p>
										<p>
											<strong>Step 2:</strong> Select either Mid Term or Final
											Term examination
										</p>
										<p>
											<strong>Step 3:</strong> Pick the class you want to view
											or manage results for
										</p>
									</div>
									<div className="mt-4 border-t border-blue-200 pt-4">
										<p className="text-sm text-blue-600">
											💡 <strong>Tip:</strong> Green checkmarks indicate classes
											with available results, yellow alerts show completed exams
											without results yet.
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
