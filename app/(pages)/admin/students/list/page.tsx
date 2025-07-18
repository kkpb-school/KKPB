'use client';

import { useState } from 'react';
import { useStudentList } from '@/services/students';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Grid,
  List,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  RefreshCw,
  AlertCircle,
  Phone,
  MapPin,
  Calendar,
  Filter,
} from 'lucide-react';
import Link from 'next/link';
import { format, differenceInYears } from 'date-fns';
import type { Student } from '@/lib/types';
import { ClassList, Status } from '@/lib/constants';

type ViewMode = 'table' | 'grid';
type FilterStatus = 'all' | 'active' | 'inactive';

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    isPending,
    data,
    isError,
    refetch,
    isFetching,
  } = useStudentList({
    page,
    limit,
    searchTerm,
    filterStatus,
    filterClass,
  });

  const students = data?.students || [];
  const totalPages = data?.totalPages || 1;

  const calculateAge = (birthDate: string) => {
    return differenceInYears(new Date(), new Date(birthDate));
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  if (isError) {
    return (
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-4xl">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Failed to load students. Please check your connection and try
              again.
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Button onClick={() => refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">Students</h1>
            <p className="text-lg text-slate-600">
              Manage and view all student information
              {!isPending && data && (
                <span className="ml-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium">
                  {students.length} students
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => refetch()}
              variant="outline"
              disabled={isFetching}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
            <Button asChild>
              <Link href="/admin/students/add">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              Search & Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by Student name..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="h-12 pl-12 text-base shadow-sm"
                />
              </div>
              <div className="flex gap-3">
                <Select
                  value={filterStatus}
                  onValueChange={(value: FilterStatus) => {
                    setFilterStatus(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-12 w-40 bg-white shadow-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {Object.entries(Status).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={filterClass}
                  onValueChange={(value) => {
                    setFilterClass(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-12 w-40 bg-white shadow-sm">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {Object.entries(ClassList).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex rounded-lg border bg-white p-1 shadow-sm">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className="h-10 px-4"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-10 px-4"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {isPending ? (
          <StudentListSkeleton viewMode={viewMode} />
        ) : viewMode === 'table' ? (
          <StudentTable
            students={students}
            calculateAge={calculateAge}
            formatDate={formatDate}
          />
        ) : (
          <StudentGrid
            students={students}
            calculateAge={calculateAge}
            formatDate={formatDate}
          />
        )}

        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          itemsPerPage={limit}
          onItemsPerPageChange={setLimit}
        />
      </div>
    </div>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (limit: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600">Rows per page:</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(parseInt(value, 10))}
        >
          <SelectTrigger className="h-9 w-20 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((limit) => (
              <SelectItem key={limit} value={limit.toString()}>
                {limit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// Enhanced Table View Component
function StudentTable({
  students,
  calculateAge,
}: {
  students: Student[];
  calculateAge: (birthDate: string) => number;
  formatDate: (dateString: string) => string;
}) {
  return (
    <Card className="border-0 shadow-xl">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Student</TableHead>
                <TableHead>Class & Roll</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="rounded-full bg-slate-100 p-6">
                        <Users className="h-12 w-12 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-slate-900">
                          No students found
                        </p>
                        <p className="text-slate-500">
                          No student data available at the moment
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow
                    key={student.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-slate-100">
                          <AvatarImage
                            src={student.images.url}
                            alt={student.images.alt}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white">
                            {student.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {student.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            Father: {student.fatherName}
                          </p>
                          <p className="text-sm text-slate-500">
                            Mother: {student.motherName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.classRecords.map((record) => (
                          <div
                            key={record.id}
                            className="flex items-center gap-2"
                          >
                            <Badge
                              variant="outline"
                              className="border-blue-200 bg-blue-50 text-blue-700"
                            >
                              {record.className.replace('CLASS_', 'Class ')}
                            </Badge>
                            <span className="text-sm text-slate-600">
                              Roll {record.rollNumber}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-medium">
                            {student.mobile}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600">
                            {student.address.district}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="font-medium">
                          {calculateAge(student.birthDate)} years
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={student.isActive ? 'default' : 'secondary'}
                        className={
                          student.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {student.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/students/${student.id}`}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/students/${student.id}/edit`}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Student
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Grid View Component
function StudentGrid({
  students,
  calculateAge,
  formatDate,
}: {
  students: Student[];
  calculateAge: (birthDate: string) => number;
  formatDate: (dateString: string) => string;
}) {
  if (students.length === 0) {
    return (
      <Card className="border-0 bg-white shadow-xl">
        <CardContent className="py-20 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-full bg-slate-100 p-8">
              <Users className="h-16 w-16 text-slate-400" />
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-900">
                No students found
              </p>
              <p className="mt-2 text-slate-500">
                No student data available at the moment
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {students.map((student) => (
        <Card
          key={student.id}
          className="border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 ring-4 ring-slate-100">
                <AvatarImage
                  src={student.images.url || '/placeholder.svg'}
                  alt={student.images.alt}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                  {student.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-lg text-slate-900">
                  {student.name}
                </CardTitle>
                <p className="truncate text-sm text-slate-600">
                  Father: {student.fatherName}
                </p>
                <p className="truncate text-sm text-slate-600">
                  Mother: {student.motherName}
                </p>
                <div className="mt-3 flex gap-2">
                  <Badge
                    variant={student.isActive ? 'default' : 'secondary'}
                    className={
                      student.isActive
                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                    }
                  >
                    {student.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Class & Roll
                </p>
                {student.classRecords.map((record) => (
                  <div key={record.id} className="mt-1">
                    <Badge
                      variant="outline"
                      className="border-blue-200 bg-blue-50 text-xs text-blue-700"
                    >
                      {record.className.replace('CLASS_', 'Class ')}
                    </Badge>
                    <p className="mt-1 text-sm text-slate-600">
                      Roll {record.rollNumber}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                  Age
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="font-semibold text-slate-900">
                    {calculateAge(student.birthDate)} years
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                Contact
              </p>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-900">
                  {student.mobile}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  {student.address.district}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                Joined
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {formatDate(student.createdAt)}
              </p>
            </div>

            <div className="flex gap-2 border-t border-slate-100 pt-2">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="flex-1 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <Link href={`/admin/students/${student.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                asChild
                className="flex-1 border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              >
                <Link href={`/admin/students/${student.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-200 bg-slate-50 hover:bg-slate-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Enhanced Loading Skeleton Component
function StudentListSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === 'table') {
    return (
      <Card className="border-0 bg-white shadow-xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Student</TableHead>
                <TableHead>Class & Roll</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="mb-2 h-6 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="mb-1 h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="ml-auto h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i} className="border-0 bg-white shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-3 h-6 w-16" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
