import ChangePasswordForm from "@/components/modules/Dashboard/ChangePasswordForm";
import { Shield, Lock, CheckCircle } from "lucide-react";

const ChangePasswordPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold md:text-4xl">Account Security</h1>
        <p className="mt-2 text-muted-foreground">
          Keep your account safe by updating your password regularly
        </p>
      </div>

      {/* Change Password Form */}
      <ChangePasswordForm />

      {/* Additional Security Tips Section */}
      <div className="mx-auto mt-8 max-w-2xl">
        <div className="rounded-lg border bg-muted/50 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Lock className="h-5 w-5 text-primary" />
            Password Best Practices
          </h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-medium">Create a Strong Password</p>
                <p className="text-sm text-muted-foreground">
                  Use at least 12 characters with a mix of uppercase, lowercase,
                  numbers, and special characters
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-medium">Make It Unique</p>
                <p className="text-sm text-muted-foreground">
                  Don&apos;t reuse passwords across different websites or
                  services
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-medium">Avoid Personal Information</p>
                <p className="text-sm text-muted-foreground">
                  Don&apos;t include names, birthdays, or other easily guessable
                  information
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-medium">Use a Password Manager</p>
                <p className="text-sm text-muted-foreground">
                  Consider using a password manager to generate and store
                  complex passwords securely
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-medium">Change Regularly</p>
                <p className="text-sm text-muted-foreground">
                  Update your password every 3-6 months or immediately if you
                  suspect it&apos;s been compromised
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
