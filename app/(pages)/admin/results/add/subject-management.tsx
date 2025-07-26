import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, X } from "lucide-react";

import { ClassNineTenSubjects, ClassSixSevenEightSubjects } from "./data";

interface SubjectManagementProps {
	className: string;
	selectedSubjects: string[];
	setSelectedSubjects: (subjects: string[]) => void;
	removeSubject: (subject: string) => void;
}

export const SubjectManagement = ({
	selectedSubjects,
	setSelectedSubjects,
	removeSubject,
	className,
}: SubjectManagementProps) => {
	const availableSubjects =
		className === "class_9" || className === "class_10"
			? ClassNineTenSubjects
			: ClassSixSevenEightSubjects;

	const remainingSubjects = availableSubjects.filter(
		(subject) => !selectedSubjects.includes(subject),
	);

	return (
		<Card className="shadow-sm">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
					<BookOpen className="h-5 w-5" />
					Subjects ({selectedSubjects.length})
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Select
						value=""
						onValueChange={(value) => {
							if (value === "__ADD_ALL__") {
								setSelectedSubjects([
									...selectedSubjects,
									...remainingSubjects,
								]);
							} else if (value === "__REMOVE_ALL__") {
								setSelectedSubjects([]);
							} else if (value && !selectedSubjects.includes(value)) {
								setSelectedSubjects([...selectedSubjects, value]);
							}
						}}
					>
						<SelectTrigger className="h-9 flex-1 text-sm">
							<SelectValue placeholder="Select subject to add" />
						</SelectTrigger>
						<SelectContent>
							{/* Bulk actions */}
							{remainingSubjects.length > 0 && (
								<SelectItem value="__ADD_ALL__">Add All Subjects</SelectItem>
							)}
							{selectedSubjects.length > 0 && (
								<SelectItem value="__REMOVE_ALL__">
									Remove All Subjects
								</SelectItem>
							)}

							{(remainingSubjects.length > 0 ||
								selectedSubjects.length > 0) && (
								<div className="bg-muted my-1 h-px" />
							)}

							{/* Individual subjects */}
							{remainingSubjects.map((subject) => (
								<SelectItem key={subject} value={subject}>
									{subject}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{selectedSubjects.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{selectedSubjects.map((subject) => (
							<Badge
								key={subject}
								variant="secondary"
								className="px-2 py-1 text-xs"
							>
								{subject}
								<Button
									variant="ghost"
									size="sm"
									className="ml-1 h-4 w-4 p-0 hover:bg-red-100"
									onClick={() => removeSubject(subject)}
								>
									<X className="h-3 w-3" />
								</Button>
							</Badge>
						))}
					</div>
				) : (
					<Alert className="border-yellow-200 bg-yellow-50">
						<AlertDescription className="text-sm text-yellow-800">
							Please add subjects first. You can still add students, but marks
							entry will be available after adding subjects.
						</AlertDescription>
					</Alert>
				)}
			</CardContent>
		</Card>
	);
};
