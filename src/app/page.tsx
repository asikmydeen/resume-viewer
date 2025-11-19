"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { StatsSection } from "@/components/stats-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { VibeProjectsSection } from "@/components/vibe-projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { AwardsSection } from "@/components/awards-section";
import { PublicationsSection } from "@/components/publications-section";
import { LanguagesSection } from "@/components/languages-section";
import { InterestsSection } from "@/components/interests-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { BlogSection } from "@/components/blog-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { EditModeToggle } from "@/components/edit-mode-toggle";
import { ResumeEditor } from "@/components/resume-editor";
import { useState } from "react";
import { useResume } from "@/lib/resume-context";
import { OnboardingModal } from "@/components/onboarding-modal";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

// Dynamically import Clerk components to avoid build errors
import dynamic from "next/dynamic";

const ClerkAuth = dynamic(
  () => import("@clerk/nextjs").then((mod) => ({
    default: ({ children }: { children: React.ReactNode }) => children,
    useUser: mod.useUser,
    SignInButton: mod.SignInButton,
    UserButton: mod.UserButton,
  })),
  { ssr: false }
);

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const { username, setUsername, isLoaded: isDataLoaded } = useResume();
  
  // Check if Clerk is configured
  const hasClerkKeys = typeof window !== 'undefined' && 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <div className="min-h-screen">
      {/* Auth Header Overlay for Main Page - Only show if Clerk is configured */}
      {hasClerkKeys && (
        <div className="fixed top-4 right-4 z-[60] flex gap-2">
          <ClerkAuthButtons />
        </div>
      )}

      {hasClerkKeys && <OnboardingModalWrapper username={username} setUsername={setUsername} isDataLoaded={isDataLoaded} />}

      {isEditing ? (
        <div className="container mx-auto py-8 px-4">
          <ResumeEditor />
        </div>
      ) : (
        <>
          <Navigation />
          <HeroSection />
          <AboutSection />
          <StatsSection />
          <SkillsSection />
          <ProjectsSection />
          <VibeProjectsSection />
          <ExperienceSection />
          <AwardsSection />
          <PublicationsSection />
          <LanguagesSection />
          <InterestsSection />
          <TestimonialsSection />
          <BlogSection />
          <NewsletterSection />
          <ContactSection />
          <Footer />
          <MadeWithDyad />
        </>
      )}
      
      <EditModeToggle onToggle={setIsEditing} />
    </div>
  );
}

// Separate component for Clerk auth buttons
function ClerkAuthButtons() {
  const { useUser, SignInButton, UserButton } = require("@clerk/nextjs");
  const { isSignedIn } = useUser();

  return (
    <>
      {!isSignedIn && (
        <SignInButton mode="modal">
          <Button variant="default" size="sm" className="shadow-lg">
            <LogIn className="w-4 h-4 mr-2" />
            Login to Save
          </Button>
        </SignInButton>
      )}
      {isSignedIn && <UserButton afterSignOutUrl="/" />}
    </>
  );
}

// Separate component for onboarding modal
function OnboardingModalWrapper({ 
  username, 
  setUsername, 
  isDataLoaded 
}: { 
  username: string | null; 
  setUsername: (name: string) => void; 
  isDataLoaded: boolean;
}) {
  const { useUser } = require("@clerk/nextjs");
  const { isSignedIn } = useUser();
  const showOnboarding = isSignedIn && isDataLoaded && !username;

  return (
    <OnboardingModal 
      isOpen={!!showOnboarding} 
      onComplete={(newUsername) => setUsername(newUsername)} 
    />
  );
}