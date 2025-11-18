"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Resume, defaultResume } from "@/lib/resume-schema";

interface ResumeContextType {
  resume: Resume;
  updateResume: (resume: Resume) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<Resume>(defaultResume);

  // Load resume from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("resume");
    if (stored) {
      try {
        setResume(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored resume:", error);
      }
    }
  }, []);

  const updateResume = (newResume: Resume) => {
    setResume(newResume);
    localStorage.setItem("resume", JSON.stringify(newResume));
  };

  const resetResume = () => {
    setResume(defaultResume);
    localStorage.removeItem("resume");
  };

  return (
    <ResumeContext.Provider value={{ resume, updateResume, resetResume }}>
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