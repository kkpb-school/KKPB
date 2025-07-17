import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="p-6 space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {session?.user?.name ?? "Administrator"}!
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button asChild className="w-full">
          <Link href="/admin/results">View All Results</Link>
        </Button>
        <Button asChild className="w-full" variant="secondary">
          <Link href="/admin/results/add">Add Student Result</Link>
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link href="/admin/students">Manage Students</Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
            <CardDescription>Enrolled in all classes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">256</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Tests</CardTitle>
            <CardDescription>Across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>In the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
          <CardDescription>Latest 5 uploaded results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Marks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Rahim", class: "8", test: "Mid-Term", marks: 82 },
                { name: "Karim", class: "9", test: "Final", marks: 76 },
                { name: "Hasan", class: "10", test: "Quiz", marks: 90 },
                { name: "Rina", class: "7", test: "Mid-Term", marks: 88 },
                { name: "Lima", class: "6", test: "Quiz", marks: 92 },
              ].map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.class}</TableCell>
                  <TableCell>{item.test}</TableCell>
                  <TableCell>{item.marks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Session / Info Box */}
      <Card>
        <CardHeader>
          <CardTitle>Session Info</CardTitle>
          <CardDescription>Details about your admin account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Username:</strong> {session?.user?.name ?? "admin"}
          </p>
          <p>
            <strong>Email:</strong> {session?.user?.email ?? "N/A"}
          </p>
          <p>
            <strong>Role:</strong> Administrator
          </p>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="flex justify-end gap-4 text-sm text-muted-foreground">
        <Link href="/admin/settings" className="hover:underline">
          Settings
        </Link>
        <Link
          href="https://wa.me/your-support"
          target="_blank"
          className="hover:underline"
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
