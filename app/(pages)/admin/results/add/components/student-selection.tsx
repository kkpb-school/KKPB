import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Users } from 'lucide-react';
import { Student } from '../types';

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

      <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <Button
              key={student.id}
              variant="outline"
              size="sm"
              className="h-auto justify-start bg-transparent p-2 text-left"
              onClick={() => addStudentResult(student)}
            >
              <div className="w-full">
                <div className="truncate text-xs font-medium">
                  {student.name}
                </div>
                <div className="text-xs text-gray-500">
                  Roll: {student.rollNumber}
                </div>
              </div>
            </Button>
          ))
        ) : (
          <div className="col-span-full py-4 text-center text-sm text-gray-500">
            {searchQuery ? 'No students found' : 'All students added'}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
