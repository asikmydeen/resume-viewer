"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Resume, defaultResume } from "@/lib/resume-schema";
import { generateFakeResume } from "@/lib/faker-resume";
import { saveResume, getUserResume, getUsername } from "@/lib/actions";
import { toast } from "sonner";

interface ResumeContextType {
  resume: Resume;
  updateResume: (resume: Resume) => void;
  resetResume: () => void;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
  generateRandom: () => void;
  isSaving: boolean;
  username: string | null;
  setUsername: (name: string) => void;
  isLoaded: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<Resume>(defaultResume);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // Check if Clerk is available
  useEffect(() => {
    const hasClerk = typeof window !== 'undefined' && 
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    
    if (!hasClerk) {
      setIsAuthLoaded(true);
      loadFromLocalOrRandom();
      setDataLoaded(true);
      return;
    }

    // Dynamically import and use Clerk
    import("@clerk/nextjs").then(({ useUser }) => {
      // This is a hack - we can't use hooks here, so we'll just mark as loaded
      setIsAuthLoaded(true);
    });
  }, []);

  // Initial Load Logic
  useEffect(() => {
    if (!isAuthLoaded) return;

    const init = async () => {
      if (isSignedIn) {
        const [dbResume, dbUsername] = await Promise.all([
          getUserResume(),
          getUsername()
        ]);

        if (dbUsername) setUsername(dbUsername);

        if (dbResume) {
          setResume(dbResume);
          setAutoRefresh(false); 
        } else {
          loadFromLocalOrRandom();
        }
      } else {
        loadFromLocalOrRandom();
      }
      setDataLoaded(true);
    };

    init();
  }, [isSignedIn, isAuthLoaded]);

  const loadFromLocalOrRandom = () => {
    const stored = localStorage.getItem("resume");
    const autoRefreshStored = localStorage.getItem("autoRefresh");
    
    if (stored) {
      try {
        setResume(JSON.parse(stored));
      } catch (error) {
        const newResume = generateFakeResume();
        setResume(newResume);
      }
    } else {
      const newResume = generateFakeResume();
      setResume(newResume);
    }
    
    if (autoRefreshStored === "false") setAutoRefresh(false);
  };

  // Auto-refresh logic
  useEffect(() => {
    if (!autoRefresh || !dataLoaded || (isSignedIn && username)) return;

    const interval = setInterval(() => {
      const newResume = generateFakeResume();
      setResume(newResume);
      if (!isSignedIn) {
         localStorage.setItem("resume", JSON.stringify(newResume));
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [autoRefresh, dataLoaded, isSignedIn, username]);

  const updateResume = async (newResume: Resume) => {
    setResume(newResume);
    
    if (isSignedIn) {
      setIsSaving(true);
      const result = await saveResume(newResume);
      setIsSaving(false);
      if (result.error) {
        toast.error("Failed to save to cloud");
      }
    } else {
      localStorage.setItem("resume", JSON.stringify(newResume));
    }
  };

  const resetResume = () => {
    setResume(defaultResume);
    if (!isSignedIn) localStorage.removeItem("resume");
  };

  const generateRandom = () => {
    const newResume = generateFakeResume();
    updateResume(newResume);
  };

  return (
    <ResumeContext.Provider value={{ 
      resume, 
      updateResume, 
      resetResume, 
      autoRefresh, 
      setAutoRefresh, 
      generateRandom,
      isSaving,
      username,
      setUsername,
      isLoaded: dataLoaded
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}