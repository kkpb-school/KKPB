import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen } from 'lucide-react';

interface TestConfigurationProps {
  className: string;
  testType: string;
  writtenMarks: number;
  mcqMarks: number;
  setWrittenMarks: (value: number) => void;
  setMcqMarks: (value: number) => void;
}

export const TestConfiguration = ({
  className,
  testType,
  writtenMarks,
  mcqMarks,
  setWrittenMarks,
  setMcqMarks,
}: TestConfigurationProps) => (
  <Card className="shadow-sm">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
        <BookOpen className="h-5 w-5" />
        Test Configuration
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div>
          <Label className="text-xs font-medium text-gray-600">Class</Label>
          <div className="mt-1">
            <Badge variant="secondary" className="px-2 py-1 text-sm">
              {className}
            </Badge>
          </div>
        </div>
        <div>
          <Label className="text-xs font-medium text-gray-600">Test Type</Label>
          <div className="mt-1">
            <Badge variant="outline" className="px-2 py-1 text-sm">
              {testType}
            </Badge>
          </div>
        </div>
        <div>
          <Label
            htmlFor="writtenMarks"
            className="text-xs font-medium text-gray-600"
          >
            Written Marks
          </Label>
          <Input
            id="writtenMarks"
            type="number"
            value={writtenMarks}
            onChange={(e) => setWrittenMarks(Number(e.target.value))}
            className="mt-1 h-8 text-sm"
          />
        </div>
        <div>
          <Label
            htmlFor="mcqMarks"
            className="text-xs font-medium text-gray-600"
          >
            MCQ Marks
          </Label>
          <Input
            id="mcqMarks"
            type="number"
            value={mcqMarks}
            onChange={(e) => setMcqMarks(Number(e.target.value))}
            className="mt-1 h-8 text-sm"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);
