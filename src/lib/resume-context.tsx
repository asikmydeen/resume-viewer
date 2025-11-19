"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Resume, defaultResume } from "@/lib/resume-schema";
import { generateFakeResume } from "@/lib/faker-resume";

interface ResumeContextType {
  resume: Resume;
  updateResume: (resume: Resume) => void;
  resetResume: () => void;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
  generateRandom: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<Resume>(defaultResume);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Load resume from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("resume");
    const autoRefreshStored = localStorage.getItem("autoRefresh");
    
    if (stored) {
      try {
        setResume(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored resume:", error);
      }
    }
    
    if (autoRefreshStored === "true") {
      setAutoRefresh(true);
    }
  }, []);

  // Auto-refresh every 10 seconds when enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const newResume = generateFakeResume();
      setResume(newResume);
      localStorage.setItem("resume", JSON.stringify(newResume));
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const updateResume = (newResume: Resume) => {
    setResume(newResume);
    localStorage.setItem("resume", JSON.stringify(newResume));
  };

  const resetResume = () => {
    setResume(defaultResume);
    localStorage.removeItem("resume");
  };

  const generateRandom = () => {
    const newResume = generateFakeResume();
    setResume(newResume);
    localStorage.setItem("resume", JSON.stringify(newResume));
  };

  useEffect(() => {
    localStorage.setItem("autoRefresh", autoRefresh.toString());
  }, [autoRefresh]);

  return (
    <ResumeContext.Provider value={{ resume, updateResume, resetResume, autoRefresh, setAutoRefresh, generateRandom }}>
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