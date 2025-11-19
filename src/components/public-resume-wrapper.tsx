"use client";

import { ResumeProvider, useResume } from "@/lib/resume-context";
import { Resume } from "@/lib/resume-schema";
import { useEffect } from "react";

// Inner component to actually set the state
const ResumeHydrator = ({ resume, children }: { resume: Resume, children: React.ReactNode }) => {
  const { updateResume, setAutoRefresh } = useResume();
  
  useEffect(() => {
    updateResume(resume);
    setAutoRefresh(false);
  }, []); // Run once on mount

  return <>{children}</>;
};

export function PublicResumeWrapper({ initialResume, children }: { initialResume: Resume, children: React.ReactNode }) {
  return (
    <ResumeProvider>
      <ResumeHydrator resume={initialResume}>
        {children}
      </ResumeHydrator>
    </ResumeProvider>
  );
}