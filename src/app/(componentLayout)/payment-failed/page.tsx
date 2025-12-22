"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  XCircle,
  RefreshCw,
  ArrowLeft,
  Home,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("paymentId");

  const handleRetry = () => {
    // Go back to the event page to retry
    router.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border bg-card shadow-xl dark:shadow-black/30">
          <CardContent className="p-8 text-center">
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950"
            >
              <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </motion.div>

            {/* Title */}
            <h1 className="mb-2 text-2xl font-bold text-card-foreground">
              Payment Failed
            </h1>
            <p className="mb-6 text-muted-foreground">
              We couldn&apos;t process your payment. Don&apos;t worry, you
              haven&apos;t been charged.
            </p>

            {/* Payment Info */}
            {paymentId && (
              <div className="mb-6 rounded-lg bg-muted/50 dark:bg-gray-800/50 p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  Reference ID
                </p>
                <p className="font-mono text-sm text-card-foreground break-all">
                  {paymentId}
                </p>
              </div>
            )}

            {/* Possible Reasons */}
            <div className="mb-8 space-y-3 text-left">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Possible Reasons
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Insufficient funds in your account</li>
                <li>Card details entered incorrectly</li>
                <li>Your bank declined the transaction</li>
                <li>Payment session expired</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleRetry} className="w-full" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Link>
              </Button>
              <div className="flex gap-3">
                <Button asChild variant="ghost" className="flex-1" size="lg">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="flex-1" size="lg">
                  <Link href="/contact">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Support
                  </Link>
                </Button>
              </div>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-xs text-muted-foreground">
              If you continue to experience issues, please{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact our support team
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
