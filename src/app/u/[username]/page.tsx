import { getResumeByUsername } from "@/lib/actions";
import { Navigation } from "@/components/navigation"; // We might need a read-only nav
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
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ResumeProvider } from "@/lib/resume-context"; // We need a read-only context approach or just hydrate it
import { notFound } from "next/navigation";
import { Resume } from "@/lib/resume-schema";
import { Metadata } from "next";

// Client component wrapper to inject data into context
import { PublicResumeWrapper } from "@/components/public-resume-wrapper";

type Props = {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const resume = await getResumeByUsername(username);
  if (!resume) return { title: "User Not Found" };
  
  return {
    title: `${resume.basics.name} - Portfolio`,
    description: resume.basics.summary,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const resume = await getResumeByUsername(username);

  if (!resume) {
    return notFound();
  }

  return (
    <PublicResumeWrapper initialResume={resume}>
       {/* Read-only view reuse */}
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
    </PublicResumeWrapper>
  );
}