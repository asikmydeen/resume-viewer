"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useResume } from "@/lib/resume-context";

export const Footer = () => {
  const { resume } = useResume();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const footerLinks = {
    navigation: [
      { label: "Home", id: "hero" },
      { label: "About", id: "about" },
      { label: "Projects", id: "projects" },
      { label: "Blog", id: "blog" },
    ],
    resources: [
      { label: "Skills", id: "skills" },
      { label: "Experience", id: "experience" },
      { label: "Testimonials", id: "testimonials" },
      { label: "Contact", id: "contact" },
    ],
  };

  const getIconForNetwork = (network: string) => {
    const networkLower = network.toLowerCase();
    if (networkLower.includes("github")) return Github;
    if (networkLower.includes("linkedin")) return Linkedin;
    if (networkLower.includes("twitter")) return Twitter;
    return Mail;
  };

  return (
    <footer className="bg-secondary/5 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">{resume.basics.name}</h3>
            <p className="text-sm text-muted-foreground">
              {resume.basics.label}
            </p>
            <div className="flex gap-2">
              {resume.basics.profiles.map((profile) => {
                const Icon = getIconForNetwork(profile.network);
                return (
                  <Button
                    key={profile.network}
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={profile.network}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{resume.basics.location.city}, {resume.basics.location.region}</li>
              <li>{resume.basics.email}</li>
              <li>{resume.basics.phone}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {mounted ? new Date().getFullYear() : "2025"} {resume.basics.name}. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};