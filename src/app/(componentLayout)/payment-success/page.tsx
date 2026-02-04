"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  Home,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("paymentId");
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setIsVerifying(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Optional: Verify payment status with your backend
  useEffect(() => {
    if (paymentId) {
      // You can add API call here to verify payment status
      console.log("Payment ID:", paymentId);
    }
  }, [paymentId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying your payment...</p>
        </div>
      </div>
    );
  }

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
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950"
            >
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>

            {/* Title */}
            <h1 className="mb-2 text-2xl font-bold text-card-foreground">
              Payment Successful!
            </h1>
            <p className="mb-6 text-muted-foreground">
              You have successfully joined the event. We&apos;ve sent a
              confirmation email with all the details.
            </p>

            {/* Payment Info */}
            {paymentId && (
              <div className="mb-6 rounded-lg bg-muted/50 dark:bg-gray-800/50 p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  Payment Reference
                </p>
                <p className="font-mono text-sm text-card-foreground break-all">
                  {paymentId}
                </p>
              </div>
            )}

            {/* What's Next */}
            <div className="mb-8 space-y-3 text-left">
              <h3 className="font-semibold text-card-foreground">
                What&apos;s Next?
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Check your email for event details and tickets</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Add the event to your calendar</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Connect with other attendees</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link href="/dashboard/my-booked-events">
                  <Calendar className="mr-2 h-4 w-4" />
                  View My Events
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/events">
                  Browse More Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full" size="lg">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
