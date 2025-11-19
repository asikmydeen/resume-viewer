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

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen">
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