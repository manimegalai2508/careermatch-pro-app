'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Loader2 } from "lucide-react";
import { createJobAction } from '@/app/actions';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Post Job
    </Button>
  );
}

export function PostJobDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const initialState = { message: null };
  const [state, formAction] = useFormState(createJobAction, initialState);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Success",
        description: state.message,
      });
      setOpen(false);
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Create New Job Posting</DialogTitle>
          <DialogDescription>
            Fill out the details below to post a new job.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Job Title
              </Label>
              <Input id="title" name="title" className="col-span-3" placeholder="e.g. Senior Frontend Engineer" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input id="location" name="location" className="col-span-3" placeholder="e.g. San Francisco, CA" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" name="description" className="col-span-3" placeholder="Job responsibilities, requirements, etc." />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="requiredSkills" className="text-right">
                Skills
              </Label>
              <Input id="requiredSkills" name="requiredSkills" className="col-span-3" placeholder="Comma-separated, e.g. React, TypeScript" />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
