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
import { cn } from "@/lib/utils";

const CLASSES = ["6", "7", "8", "9", "10"];
const TESTS = ["Mid-Term", "Final"];

// Fake uploaded result count for demonstration
const uploadedResults: Record<string, Record<string, number>> = {
  "6": { "Mid-Term": 40, Final: 40 },
  "7": { "Mid-Term": 38, Final: 0 },
  "8": { "Mid-Term": 0, Final: 39 },
  "9": { "Mid-Term": 35, Final: 35 },
  "10": { "Mid-Term": 40, Final: 40 },
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {session?.user?.name ?? "Administrator"}!
        </p>
      </div>

      {/* Quick Upload Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Upload</CardTitle>
          <CardDescription>
            Jump to the Add Result form for any class/test.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {CLASSES.map((cls) =>
            TESTS.map((test) => (
              <Button
                key={`${cls}-${test}`}
                variant="outline"
                className="text-sm"
                asChild
              >
                <Link
                  href={`/admin/results/add?class=${cls}&test=${encodeURIComponent(
                    test
                  )}`}
                >
                  Class {cls} - {test}
                </Link>
              </Button>
            ))
          )}
        </CardContent>
      </Card>

      {/* Uploaded Results Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Result Upload Status</CardTitle>
          <CardDescription>
            Number of results uploaded for each class/test
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-muted rounded-md">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">Class</th>
                  {TESTS.map((test) => (
                    <th key={test} className="p-2 text-left">
                      {test}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLASSES.map((cls) => (
                  <tr key={cls} className="border-t">
                    <td className="p-2 font-medium">Class {cls}</td>
                    {TESTS.map((test) => {
                      const count = uploadedResults[cls]?.[test] ?? 0;
                      return (
                        <td
                          key={test}
                          className={cn("p-2", count === 0 && "text-red-500")}
                        >
                          {count > 0 ? `${count} results` : "No data"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Missing Result Warnings */}
      <Card>
        <CardHeader>
          <CardTitle>Missing Uploads</CardTitle>
          <CardDescription>
            Classes/tests with incomplete or missing data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {CLASSES.flatMap((cls) =>
            TESTS.map((test) => {
              const count = uploadedResults[cls]?.[test] ?? 0;
              if (count === 0) {
                return (
                  <div key={`${cls}-${test}`} className="text-red-600">
                    ⚠️ Class {cls} - {test} result not uploaded.
                  </div>
                );
              }
              return null;
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
