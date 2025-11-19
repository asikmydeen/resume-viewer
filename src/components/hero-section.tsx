"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>
      
      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      
      <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-block">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
              Welcome to my portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient">
              {resume.basics.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            {resume.basics.label}
          </p>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          {resume.basics.summary}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button 
            size="lg" 
            onClick={() => scrollToSection("projects")}
            className="group relative overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => scrollToSection("contact")}
            className="group hover:border-primary hover:text-primary transition-all duration-300"
          >
            Get In Touch
          </Button>
        </div>

        {/* Social links */}
        <div className="flex gap-3 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          {resume.basics.profiles.map((profile) => {
            const Icon = getIconForNetwork(profile.network);
            return (
              <a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        <div className="pt-12 animate-in fade-in duration-1000 delay-500">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full animate-bounce hover:text-primary transition-colors"
            onClick={() => scrollToSection("about")}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};