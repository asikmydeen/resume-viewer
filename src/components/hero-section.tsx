"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const HeroSection = () => {
  const { resume } = useResume();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const getIconForNetwork = (network: string) => {
    const networkLower = network.toLowerCase();
    if (networkLower.includes("github")) return Github;
    if (networkLower.includes("linkedin")) return Linkedin;
    return Mail;
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm text-sm font-medium text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for work
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            Hello, I'm <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300%">
              {resume.basics.name}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            {resume.basics.label}
          </p>
          
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {resume.basics.summary}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("projects")}
              className="rounded-full px-8 text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              View Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection("contact")}
              className="rounded-full px-8 text-lg border-2 hover:bg-secondary/50 backdrop-blur-sm"
            >
              Contact Me
            </Button>
          </div>

          <div className="flex gap-4 justify-center pt-8">
            {resume.basics.profiles.map((profile) => {
              const Icon = getIconForNetwork(profile.network);
              return (
                <a
                  key={profile.network}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 hover:scale-110 hover:shadow-xl transition-all duration-300 group"
                >
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-12 w-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="h-6 w-6 text-foreground" />
        </Button>
      </div>
    </section>
  );
};