import { getAllRequestedHosts } from "@/service/admin/host/get-all-requested-hosts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Shield } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HostVerificationTable from "@/components/modules/Dashboard/Admin/Hosts-Managements/Hostverificationtable";

// Loading skeleton
function HostVerificationSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </CardHeader>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const HostVerificationsAdminPage = async () => {
  const response = await getAllRequestedHosts();

  // Handle error
  if (!response.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8" />
            <h1 className="text-3xl font-bold md:text-4xl">
              Host Verifications
            </h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Review and approve host verification requests
          </p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Host Requests</AlertTitle>
          <AlertDescription>
            {response.message || "Failed to load host verification requests"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const hosts = response.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold md:text-4xl">Host Verifications</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Review and manage host verification requests to maintain platform
          quality
        </p>
      </div>

      {/* Verification Table */}
      <Suspense fallback={<HostVerificationSkeleton />}>
        <HostVerificationTable hosts={hosts} />
      </Suspense>
    </div>
  );
};

export default HostVerificationsAdminPage;
