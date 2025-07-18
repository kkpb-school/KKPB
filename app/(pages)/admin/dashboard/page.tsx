import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  FileText,
  UserX,
  Upload,
  Plus,
  Eye,
  PenTool,
  TrendingUp,
  Settings,
  MessageCircle,
  LogOut,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Award,
} from 'lucide-react';
import { auth } from '@/auth';

export default async function DashboardPage() {
  const user = await auth();

  const recentResults = [
    {
      student: 'Rahim Ahmed',
      class: 'Class 8',
      type: 'Mid Term',
      date: '10 Jul 2025',
      score: '85%',
      status: 'excellent',
    },
    {
      student: 'Karim Hassan',
      class: 'Class 9',
      type: 'Final',
      date: '09 Jul 2025',
      score: '92%',
      status: 'excellent',
    },
    {
      student: 'Hasan Ali',
      class: 'Class 10',
      type: 'Quiz',
      date: '07 Jul 2025',
      score: '78%',
      status: 'good',
    },
    {
      student: 'Rina Begum',
      class: 'Class 7',
      type: 'Mid Term',
      date: '05 Jul 2025',
      score: '88%',
      status: 'excellent',
    },
    {
      student: 'Lima Khatun',
      class: 'Class 6',
      type: 'Quiz',
      date: '03 Jul 2025',
      score: '74%',
      status: 'good',
    },
  ];

  const recentStudents = [
    {
      id: 1,
      name: 'Tania Akter',
      class: 'Class 6',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
      status: 'active',
    },
    {
      id: 2,
      name: 'Nabil Hossain',
      class: 'Class 8',
      photo: 'https://randomuser.me/api/portraits/men/15.jpg',
      status: 'active',
    },
    {
      id: 3,
      name: 'Sumaiya Jahan',
      class: 'Class 7',
      photo: 'https://randomuser.me/api/portraits/women/40.jpg',
      status: 'active',
    },
    {
      id: 4,
      name: 'Arif Khan',
      class: 'Class 9',
      photo: 'https://randomuser.me/api/portraits/men/30.jpg',
      status: 'active',
    },
    {
      id: 5,
      name: 'Mitu Rahman',
      class: 'Class 10',
      photo: 'https://randomuser.me/api/portraits/women/25.jpg',
      status: 'active',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Excellent
          </Badge>
        );
      case 'good':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Good
          </Badge>
        );
      case 'average':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Average
          </Badge>
        );
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome back, {user?.user?.name} 👋
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Here&apos;s what&#39;s happening with your school today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Frequently used actions for efficient management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button asChild className="h-auto flex-col gap-2 p-6">
                <Link href="/admin/students/add">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm font-medium">Add Student</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-auto flex-col gap-2 p-6"
              >
                <Link href="/admin/students/list">
                  <Users className="h-6 w-6" />
                  <span className="text-sm font-medium">Student List</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-6"
              >
                <Link href="/admin/results">
                  <Eye className="h-6 w-6" />
                  <span className="text-sm font-medium">View Results</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-6"
              >
                <Link href="/admin/results">
                  <PenTool className="h-6 w-6" />
                  <span className="text-sm font-medium">Add Result</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Students</p>
                  <p className="text-3xl font-bold">256</p>
                  <p className="text-sm text-blue-100">+12 this month</p>
                </div>
                <Users className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Results</p>
                  <p className="text-3xl font-bold">842</p>
                  <p className="text-sm text-green-100">+45 this week</p>
                </div>
                <FileText className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Inactive Students</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm text-orange-100">-3 from last month</p>
                </div>
                <UserX className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Recent Uploads</p>
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-sm text-purple-100">this week</p>
                </div>
                <Upload className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Results */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Recent Results
                    </CardTitle>
                    <CardDescription>
                      Latest exam results and assessments
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/results">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentResults.map((result, idx) => (
                      <TableRow key={idx} className="hover:bg-slate-50">
                        <TableCell className="font-medium">
                          {result.student}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{result.class}</Badge>
                        </TableCell>
                        <TableCell>{result.type}</TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {result.score}
                        </TableCell>
                        <TableCell>{getStatusBadge(result.status)}</TableCell>
                        <TableCell className="text-slate-500">
                          {result.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Students */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    New Students
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/students">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>Recently enrolled students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center gap-3 rounded-lg border p-3 hover:bg-slate-50"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={student.photo || '/placeholder.svg'}
                        alt={student.name}
                      />
                      <AvatarFallback>
                        {student.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        {student.name}
                      </p>
                      <p className="text-sm text-slate-500">{student.class}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Active
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Admin Profile */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  Admin Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={user?.user?.image || ''}
                      alt={user?.user?.name || ''}
                    />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {user?.user?.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('') || 'AD'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {user?.user?.name}
                    </p>
                    <p className="text-sm text-slate-500">Administrator</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="font-medium">{user?.user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Role:</span>
                    <Badge>Administrator</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last Login:</span>
                    <span className="font-medium">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card className="border-0 bg-slate-900 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">School Management System</p>
                <p className="text-sm text-slate-400">
                  Manage your institution efficiently
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-slate-800"
                  asChild
                >
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-slate-800"
                  asChild
                >
                  <Link href="https://wa.me/your-support" target="_blank">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Support
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-slate-800"
                  asChild
                >
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
