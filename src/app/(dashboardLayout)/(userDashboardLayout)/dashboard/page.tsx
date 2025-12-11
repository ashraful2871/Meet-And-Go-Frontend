import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDashboardStats } from "@/service/dashboard/dashboard-stats";
import UserDashboardStats from "@/components/modules/Dashboard/User/UserDashboardStats";

// Loading skeleton (same as above)
function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-2 h-4 w-96" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const UserDashboardPage = async () => {
  const response = await getDashboardStats();

  // Handle error
  if (!response.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Dashboard</AlertTitle>
          <AlertDescription>
            {response.message || "Failed to load dashboard statistics"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<DashboardSkeleton />}>
        <UserDashboardStats data={response.data} />
      </Suspense>
    </div>
  );
};

export default UserDashboardPage;
