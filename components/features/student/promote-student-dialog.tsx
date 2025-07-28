import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClassList } from '@/lib/constants';
import type { Student } from '@/lib/types';
import { usePromoteStudent } from '@/services/students';

export function PromoteStudent({ student }: { student: Student }) {
  const [isOpen, setIsOpen] = useState(false);
  const [promotionType, setPromotionType] = useState<'promote' | 'repeat'>(
    'promote',
  );

  // 1. Find the most recent class record by sorting by year
  const latestClassRecord = useMemo(() => {
    if (!student.classRecords || student.classRecords.length === 0) {
      return null;
    }
    // Sort records by year in descending order and take the first one
    return [...student.classRecords].sort((a, b) => b.year - a.year)[0];
  }, [student.classRecords]);

  // 2. Determine the next class based on the ClassList constant
  const nextClass = useMemo(() => {
    if (!latestClassRecord) {
      return null;
    }
    const currentClassIndex = ClassList.findIndex(
      (c) => c.value === latestClassRecord.className,
    );
    // If the student is not in the last class, return the next one
    if (currentClassIndex > -1 && currentClassIndex < ClassList.length - 1) {
      return ClassList[currentClassIndex + 1];
    }
    // Otherwise, promotion is not possible
    return null;
  }, [latestClassRecord]);

  // 3. Initialize the year state. Default to the year after the latest record.
  const [year, setYear] = useState(() =>
    latestClassRecord ? latestClassRecord.year + 1 : new Date().getFullYear(),
  );
  const [rollNumber, setRollNumber] = useState(() =>
    latestClassRecord ? latestClassRecord.rollNumber : undefined,
  );

  // Reset the year, roll number, and promotion type when the dialog is opened
  useEffect(() => {
    if (isOpen) {
      setYear(
        latestClassRecord
          ? latestClassRecord.year + 1
          : new Date().getFullYear(),
      );
      setRollNumber(
        latestClassRecord ? latestClassRecord.rollNumber : undefined,
      );
      setPromotionType('promote'); // Reset to default promotion type
    }
  }, [isOpen, latestClassRecord]);

  const { mutate: promoteStudent, isPending } = usePromoteStudent();

  const handlePromote = () => {
    let targetClassName = '';
    const targetYear = year;

    if (promotionType === 'promote') {
      if (!nextClass) return; // Should not happen if button is disabled
      targetClassName = nextClass.value;
    } else {
      // Repeat class
      if (!latestClassRecord) return; // Should not happen
      targetClassName = latestClassRecord.className;
    }

    promoteStudent(
      {
        studentId: student.id,
        className: targetClassName,
        year: targetYear,
        // biome-ignore lint/style/noNonNullAssertion: value is guaranteed after previous check
        rollNumber: rollNumber!,
      },
      {
        onSuccess: () => {
          setIsOpen(false); // Close dialog on success
        },
      },
    );
  };

  // 4. Determine if the promotion is valid
  const isPromotionPossible = !!nextClass; // Can only promote if there's a next class
  const isRepeatPossible = !!latestClassRecord; // Can only repeat if there's a current class

  const isYearInvalid = latestClassRecord
    ? year <= latestClassRecord.year && promotionType === 'promote'
    : false;
  const isYearInvalidForRepeat = latestClassRecord
    ? year <= latestClassRecord.year && promotionType === 'repeat'
    : false;

  const canSubmit =
    !isPending &&
    ((promotionType === 'promote' && isPromotionPossible && !isYearInvalid) ||
      (promotionType === 'repeat' &&
        isRepeatPossible &&
        !isYearInvalidForRepeat));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className='w-full text-left'
          disabled={!isPromotionPossible}
          type='button'
        >
          Promote Student
          {!isPromotionPossible && promotionType === 'promote' && (
            <span className='text-muted-foreground text-xs'> (Max class)</span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Promote {student.name}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <Label>Current Class</Label>
            <Input
              disabled
              value={
                latestClassRecord
                  ? `${latestClassRecord.className.replace('_', ' ')} (${
                      latestClassRecord.year
                    })`
                  : 'N/A'
              }
            />
          </div>

          <div>
            <Label>Promotion Type</Label>
            <Select
              onValueChange={(value: 'promote' | 'repeat') =>
                setPromotionType(value)
              }
              value={promotionType}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select promotion type' />
              </SelectTrigger>
              <SelectContent>
                {isPromotionPossible && (
                  <SelectItem value='promote'>Promote to next class</SelectItem>
                )}
                {isRepeatPossible && (
                  <SelectItem value='repeat'>
                    Stay in same class, update year
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>
              {promotionType === 'promote' ? 'New Class' : 'Current Class'}
            </Label>
            <Input
              disabled
              value={
                promotionType === 'promote'
                  ? nextClass
                    ? nextClass.label
                    : 'N/A'
                  : latestClassRecord
                    ? latestClassRecord.className.replace('_', ' ')
                    : 'N/A'
              }
            />
          </div>

          <div>
            <label htmlFor='year' className='text-sm font-medium'>
              Promotion Year
            </label>
            <Input
              id='year'
              type='number'
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10))}
              min={latestClassRecord ? latestClassRecord.year + 1 : undefined}
            />
            {(isYearInvalid || isYearInvalidForRepeat) && (
              <p className='text-xs text-red-600'>
                Year must be after {latestClassRecord?.year}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='rollNumber' className='text-sm font-medium'>
              Roll Number
            </label>
            <Input
              id='rollNumber'
              type='number'
              value={rollNumber}
              onChange={(e) => setRollNumber(parseInt(e.target.value, 10))}
              required
            />
          </div>

          <Button onClick={handlePromote} disabled={!canSubmit}>
            {isPending ? 'Processing...' : 'Confirm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
