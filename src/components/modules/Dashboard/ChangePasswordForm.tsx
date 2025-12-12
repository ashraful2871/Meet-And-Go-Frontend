/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { changePassword } from "@/service/auth/change-password";
import { toast } from "sonner";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
} from "lucide-react";

const ChangePasswordForm = () => {
  const [state, formAction, isPending] = useActionState(changePassword, null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Success handling
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Password changed successfully");
      // Reset form
      const form = document.getElementById(
        "change-password-form"
      ) as HTMLFormElement;
      if (form) form.reset();
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [state]);

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength === 0) return "";
    if (strength < 40) return "Weak";
    if (strength < 70) return "Medium";
    return "Strong";
  };

  // Password requirements
  const requirements = [
    { label: "At least 6 characters", test: (p: string) => p.length >= 6 },
    {
      label: "Contains uppercase letter",
      test: (p: string) => /[A-Z]/.test(p),
    },
    {
      label: "Contains lowercase letter",
      test: (p: string) => /[a-z]/.test(p),
    },
    { label: "Contains number", test: (p: string) => /[0-9]/.test(p) },
    {
      label: "Contains special character",
      test: (p: string) => /[^a-zA-Z0-9]/.test(p),
    },
  ];

  // Check if passwords match
  const passwordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordsDontMatch =
    newPassword && confirmPassword && newPassword !== confirmPassword;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form
          id="change-password-form"
          action={formAction}
          className="space-y-6"
        >
          {/* Error Alert */}
          {state && !state.success && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {state && state.success && (
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {/* Old Password */}
          <div className="space-y-2">
            <Label htmlFor="oldPassword">
              Current Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="oldPassword"
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="pl-10 pr-10"
                required
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showOldPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">
              New Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="pl-10 pr-10"
                required
                disabled={isPending}
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Password strength
                  </span>
                  <span
                    className={`font-medium ${
                      passwordStrength < 40
                        ? "text-red-600"
                        : passwordStrength < 70
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {getStrengthText(passwordStrength)}
                  </span>
                </div>
                <Progress
                  value={passwordStrength}
                  className="h-2"
                  indicatorClassName={getStrengthColor(passwordStrength)}
                />
              </div>
            )}

            {/* Password Requirements */}
            {newPassword && (
              <div className="space-y-2 rounded-lg border bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Password requirements:
                </p>
                <div className="grid gap-1">
                  {requirements.map((req, index) => {
                    const met = req.test(newPassword);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs"
                      >
                        {met ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <XCircle className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span
                          className={
                            met ? "text-green-600" : "text-muted-foreground"
                          }
                        >
                          {req.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm New Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className={`pl-10 pr-10 ${
                  passwordsMatch
                    ? "border-green-500"
                    : passwordsDontMatch
                    ? "border-red-500"
                    : ""
                }`}
                required
                disabled={isPending}
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className="flex items-center gap-2 text-xs">
                {passwordsMatch ? (
                  <>
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 text-red-600" />
                    <span className="text-red-600">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Security Tips */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Tips:</strong>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
                <li>Use a unique password that you don&apos;t use elsewhere</li>
                <li>Mix uppercase, lowercase, numbers, and symbols</li>
                <li>Avoid common words and personal information</li>
                <li>Consider using a password manager</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => {
                const form = document.getElementById(
                  "change-password-form"
                ) as HTMLFormElement;
                if (form) form.reset();
                setNewPassword("");
                setConfirmPassword("");
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !passwordsMatch}>
              {isPending ? "Changing Password..." : "Change Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
