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

export default async function DashboardPage() {
  const session = {
    user: {
      name: 'Sejar Parvez',
      email: 'admin@example.com',
    },
  };

  const recentResults = [
    {
      student: 'Rahim',
      class: 'Class 8',
      type: 'Mid Term',
      date: '10 Jul 2025',
    },
    { student: 'Karim', class: 'Class 9', type: 'Final', date: '09 Jul 2025' },
    { student: 'Hasan', class: 'Class 10', type: 'Quiz', date: '07 Jul 2025' },
    {
      student: 'Rina',
      class: 'Class 7',
      type: 'Mid Term',
      date: '05 Jul 2025',
    },
    { student: 'Lima', class: 'Class 6', type: 'Quiz', date: '03 Jul 2025' },
  ];

  const recentStudents = [
    {
      id: 1,
      name: 'Tania Akter',
      class: 'Class 6',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: 2,
      name: 'Nabil Hossain',
      class: 'Class 8',
      photo: 'https://randomuser.me/api/portraits/men/15.jpg',
    },
    {
      id: 3,
      name: 'Sumaiya Jahan',
      class: 'Class 7',
      photo: 'https://randomuser.me/api/portraits/women/40.jpg',
    },
    {
      id: 4,
      name: 'Arif Khan',
      class: 'Class 9',
      photo: 'https://randomuser.me/api/portraits/men/30.jpg',
    },
    {
      id: 5,
      name: 'Mitu Rahman',
      class: 'Class 10',
      photo: 'https://randomuser.me/api/portraits/women/25.jpg',
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, {session.user.name} 👋</h1>
        <p className="text-muted-foreground">
          Manage students, results, and administrative data easily.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Button asChild>
          <Link href="/admin/students/add">➕ Add New Student</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/admin/results">📋 View All Results</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/results/add">📝 Add Result</Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">256</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">842</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inactive Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
          <CardDescription>Latest 5 results uploaded</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResults.map((res, idx) => (
                <TableRow key={idx}>
                  <TableCell>{res.student}</TableCell>
                  <TableCell>{res.class}</TableCell>
                  <TableCell>{res.type}</TableCell>
                  <TableCell>{res.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Students */}
      <Card>
        <CardHeader>
          <CardTitle>New Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentStudents.map((s) => (
            <div key={s.id} className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.photo}
                alt={s.name}
                className="h-10 w-10 rounded-full border object-cover"
              />
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-muted-foreground text-sm">{s.class}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Admin Info */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Info</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-1 text-sm">
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
          <p>
            <strong>Role:</strong> Administrator
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-muted-foreground flex justify-end gap-4 text-sm">
        <Link href="/admin/settings" className="hover:underline">
          Settings
        </Link>
        <Link
          href="https://wa.me/your-support"
          className="hover:underline"
          target="_blank"
        >
          Support
        </Link>
        <Link href="/login" className="hover:underline">
          Logout
        </Link>
      </div>
    </div>
  );
}
