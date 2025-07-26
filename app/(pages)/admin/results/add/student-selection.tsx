import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { Student } from "./types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface StudentSelectionProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	filteredStudents: Student[];
	addStudentResult: (student: Student) => void;
}

export const StudentSelection = ({
	searchQuery,
	setSearchQuery,
	filteredStudents,
	addStudentResult,
}: StudentSelectionProps) => (
	<Card className="shadow-sm">
		<CardHeader className="pb-3">
			<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
				<Users className="h-5 w-5" />
				Add Students
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="relative">
				<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
				<Input
					placeholder="Search students..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="h-9 pl-9 text-sm"
				/>
			</div>

			<div className="grid max-h-80 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredStudents.length > 0 ? (
					filteredStudents.map((student) => (
						<Button
							key={student.id}
							variant="outline"
							className="h-auto transform rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 transition-all duration-200 hover:border-purple-300 hover:from-purple-50 hover:to-pink-50"
							onClick={() => addStudentResult(student)}
						>
							<div className="space-y-2 text-center">
								<Avatar className="mx-auto flex h-12 w-12 items-center justify-center">
									<AvatarImage src={student.images.url} />
									<AvatarFallback className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white">
										{student.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className="font-semibold text-gray-800">
									{student.name}
								</div>
								<Badge variant="secondary" className="text-xs">
									Roll: {student.classRecords[0].rollNumber}
								</Badge>
							</div>
						</Button>
					))
				) : (
					<div className="col-span-full py-4 text-center text-sm text-gray-500">
						{searchQuery ? "No students found" : "All students added"}
					</div>
				)}
			</div>
		</CardContent>
	</Card>
);
