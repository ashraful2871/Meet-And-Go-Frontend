/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus, Tag } from "lucide-react";
import { createCategory } from "@/service/admin/create-category";
import { toast } from "sonner";

interface CreateCategoryFormProps {
  onSuccess?: () => void;
}

const CreateCategoryForm = ({ onSuccess }: CreateCategoryFormProps) => {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createCategory, null);

  useEffect(() => {
    if (state && state.success) {
      toast.success(state.message || "Category created successfully");
      setOpen(false);
      // Call parent callback to refresh the table
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [state, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new event category to organize your events
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {/* Error Alert */}
          {state && !state.success && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Category Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="e.g., Hiking, Music, Sports"
                className="pl-10"
                required
                disabled={isPending}
                autoFocus
                minLength={2}
                maxLength={50}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Choose a clear, descriptive name for the category (2-50
              characters)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryForm;
