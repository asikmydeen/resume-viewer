"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { claimUsername } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (username: string) => void;
}

export function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await claimUsername(username);
    
    setLoading(false);
    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success("Username claimed!");
      onComplete(result.username!);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Welcome! Claim your URL</DialogTitle>
          <DialogDescription>
            Choose a unique username. Your resume will be hosted at <strong>{username || "username"}.ceve.info</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="e.g. asik"
                required
                minLength={3}
                maxLength={20}
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">.ceve.info</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || username.length < 3}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Claim & Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}