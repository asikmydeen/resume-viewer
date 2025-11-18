"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Hi, I'm <span className="text-primary">Your Name</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Full Stack Developer | Designer | Problem Solver
          </p>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          I build exceptional digital experiences that make people's lives easier.
          Passionate about creating elegant solutions to complex problems.
        </p>

        <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button size="lg" onClick={() => scrollToSection("projects")}>
            View My Work
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
            Get In Touch
          </Button>
        </div>

        <div className="pt-12 animate-in fade-in duration-1000 delay-500">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full animate-bounce"
            onClick={() => scrollToSection("about")}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};