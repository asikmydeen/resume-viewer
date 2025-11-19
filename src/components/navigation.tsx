"use client";

import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useResume } from "@/lib/resume-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const { resume } = useResume();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // height of nav + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  // Primary items always visible
  const primaryNavItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Vibe Coding", id: "vibe-coding", show: resume.vibeProjects && resume.vibeProjects.length > 0 },
    { label: "Experience", id: "experience" },
  ].filter(item => item.show !== false);

  // Secondary items move to dropdown on desktop
  const secondaryNavItems = [
    { label: "Skills", id: "skills" },
    { label: "Awards", id: "awards", show: resume.awards.length > 0 },
    { label: "Publications", id: "publications", show: resume.publications.length > 0 },
    { label: "Languages", id: "languages", show: resume.languages.length > 0 },
    { label: "Interests", id: "interests", show: resume.interests.length > 0 },
    { label: "Blog", id: "blog" },
  ].filter(item => item.show !== false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              {resume.basics.name.split(" ")[0]}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {primaryNavItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                {item.label}
              </Button>
            ))}

            {secondaryNavItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-1">
                    More <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {secondaryNavItems.map((item) => (
                    <DropdownMenuItem key={item.id} onClick={() => scrollToSection(item.id)}>
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="ml-2 pl-2 border-l flex items-center gap-2">
              <ThemeToggle />
              <Button 
                size="sm" 
                onClick={() => scrollToSection("contact")}
                className="hidden lg:flex"
              >
                Contact
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {[...primaryNavItems, ...secondaryNavItems, { label: "Contact", id: "contact" }].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};