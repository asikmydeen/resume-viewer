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
import { useState, useEffect } from "react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useResume } from "@/lib/resume-context";
import { OnboardingModal } from "@/components/onboarding-modal";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const { username, setUsername, isLoaded: isDataLoaded } = useUserResumeHook();
  
  // Helper hook usage
  function useUserResumeHook() {
     return useResume();
  }

  const showOnboarding = isSignedIn && isDataLoaded && !username;

  return (
    <div className="min-h-screen">
      {/* Auth Header Overlay for Main Page */}
      <div className="fixed top-4 right-4 z-[60] flex gap-2">
        {!isSignedIn && (
           <SignInButton mode="modal">
             <Button variant="default" size="sm" className="shadow-lg">
               <LogIn className="w-4 h-4 mr-2" />
               Login to Save
             </Button>
           </SignInButton>
        )}
        {isSignedIn && <UserButton afterSignOutUrl="/" />}
      </div>

      <OnboardingModal 
        isOpen={!!showOnboarding} 
        onComplete={(newUsername) => setUsername(newUsername)} 
      />

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
      
      {/* Only allow editing if logged in, or show it but it won't save to cloud */}
      <EditModeToggle onToggle={setIsEditing} />
    </div>
  );
}