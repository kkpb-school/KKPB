import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	BookOpen,
	GraduationCap,
	FileText,
	Calendar,
	Users,
	Award,
	TrendingUp,
	Clock,
	CheckCircle,
} from "lucide-react";

const classes = [
	{
		id: "Class_6",
		name: "Class 6",
		students: 45,
		color: "from-blue-500 to-blue-600",
	},
	{
		id: "Class_7",
		name: "Class 7",
		students: 42,
		color: "from-green-500 to-green-600",
	},
	{
		id: "Class_8",
		name: "Class 8",
		students: 38,
		color: "from-purple-500 to-purple-600",
	},
	{
		id: "Class_9",
		name: "Class 9",
		students: 35,
		color: "from-orange-500 to-orange-600",
	},
	{
		id: "Class_10",
		name: "Class 10",
		students: 40,
		color: "from-red-500 to-red-600",
	},
];

const testTypes = [
	{
		id: "Mid_Term",
		name: "Mid Term",
		description: "Mid-semester examination results",
		icon: Clock,
		color: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
	},
	{
		id: "Final",
		name: "Year Final",
		description: "Final examination results",
		icon: Award,
		color: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
	},
];

export default function AddResults() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6">
				{/* Header Section */}
				<div className="space-y-4 text-center">
					<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
						<FileText className="h-8 w-8 text-white" />
					</div>
					<h1 className="text-4xl font-bold text-slate-900">
						Add Examination Results
					</h1>
					<p className="mx-auto max-w-2xl px-4 text-lg leading-relaxed text-slate-600">
						Select the class and examination type to add student results. Choose
						from Mid Term or Year Final examinations for classes 6 through 10.
					</p>
				</div>

				{/* Statistics Cards */}
				<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
					<Card className="border-0 bg-white shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center gap-4">
								<div className="rounded-full bg-blue-100 p-3">
									<Users className="h-6 w-6 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-500">
										Total Students
									</p>
									<p className="text-2xl font-bold text-slate-900">200</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 bg-white shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center gap-4">
								<div className="rounded-full bg-green-100 p-3">
									<GraduationCap className="h-6 w-6 text-green-600" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-500">
										Active Classes
									</p>
									<p className="text-2xl font-bold text-slate-900">5</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-0 bg-white shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center gap-4">
								<div className="rounded-full bg-purple-100 p-3">
									<TrendingUp className="h-6 w-6 text-purple-600" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-500">
										Exam Types
									</p>
									<p className="text-2xl font-bold text-slate-900">2</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Content */}
				<div className="space-y-8">
					<div className="text-center">
						<h2 className="mb-2 text-2xl font-semibold text-slate-900">
							Select Class & Examination Type
						</h2>
						<p className="text-slate-600">
							Choose the class and examination type to proceed with result entry
						</p>
					</div>

					{/* Classes Grid */}
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
						{classes.map((classItem) => (
							<Card
								key={classItem.id}
								className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
							>
								<CardHeader className="pb-4">
									<div
										className={`h-24 w-full bg-gradient-to-r ${classItem.color} mb-4 flex items-center justify-center rounded-lg`}
									>
										<BookOpen className="h-12 w-12 text-white" />
									</div>
									<CardTitle className="truncate px-2 text-center text-xl text-slate-900">
										{classItem.name}
									</CardTitle>
									<div className="text-center">
										<Badge variant="outline" className="bg-slate-50">
											{classItem.students} Students
										</Badge>
									</div>
								</CardHeader>
								<CardContent className="space-y-3">
									{testTypes.map((testType) => {
										const IconComponent = testType.icon;
										return (
											<Button
												key={testType.id}
												asChild
												variant="outline"
												className={`h-auto w-full p-4 ${testType.color} transition-all duration-200`}
											>
												<Link
													href={`/admin/results/add/?class=${classItem.id}&test=${testType.id}`}
												>
													<div className="flex w-full min-w-0 items-center gap-3">
														<IconComponent className="h-5 w-5 flex-shrink-0" />
														<div className="min-w-0 flex-1 text-left">
															<p className="truncate font-semibold">
																{testType.name}
															</p>
															<p className="truncate text-xs opacity-75">
																{testType.description}
															</p>
														</div>
													</div>
												</Link>
											</Button>
										);
									})}
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Quick Actions Section */}
				<Card className="border-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
					<CardContent className="p-8">
						<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
							<div className="min-w-0 flex-1 text-center md:text-left">
								<h3 className="mb-2 text-xl font-semibold">Need Help?</h3>
								<p className="leading-relaxed text-slate-300">
									Learn how to efficiently add and manage examination results
									for your students.
								</p>
							</div>
							<div className="flex gap-3">
								<Button
									variant="outline"
									className="bg-white text-slate-900 hover:bg-slate-100"
								>
									<BookOpen className="mr-2 h-4 w-4" />
									View Guide
								</Button>
								<Button
									variant="outline"
									className="bg-white text-slate-900 hover:bg-slate-100"
								>
									<FileText className="mr-2 h-4 w-4" />
									Templates
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Recent Activity */}
				<Card className="border-0 bg-white shadow-lg">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5 text-blue-600" />
							Recent Result Entries
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{
									class: "Class 10",
									type: "Year Final",
									date: "2 hours ago",
									status: "completed",
								},
								{
									class: "Class 9",
									type: "Mid Term",
									date: "1 day ago",
									status: "completed",
								},
								{
									class: "Class 8",
									type: "Year Final",
									date: "2 days ago",
									status: "completed",
								},
								{
									class: "Class 7",
									type: "Mid Term",
									date: "3 days ago",
									status: "completed",
								},
							].map((activity, index) => (
								<div
									key={index}
									className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
								>
									<div className="flex min-w-0 flex-1 items-center gap-4">
										<div className="flex-shrink-0 rounded-full bg-green-100 p-2">
											<CheckCircle className="h-4 w-4 text-green-600" />
										</div>
										<div className="min-w-0 flex-1">
											<p className="truncate font-medium text-slate-900">
												{activity.class} - {activity.type}
											</p>
											<p className="truncate text-sm text-slate-500">
												Results added {activity.date}
											</p>
										</div>
									</div>
									<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
										Completed
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
