"use client";

import { Card, CardContent } from "@/components/ui/card";
import { User, Briefcase, GraduationCap } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              I'm a passionate developer with a love for creating beautiful, functional, 
              and user-friendly applications. With years of experience in web development, 
              I specialize in building modern web applications using cutting-edge technologies.
            </p>
            <p className="text-lg text-muted-foreground">
              When I'm not coding, you can find me exploring new technologies, contributing 
              to open-source projects, or sharing my knowledge with the developer community.
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    5+ years in web development
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-sm text-muted-foreground">
                    Bachelor's in Computer Science
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    San Francisco, CA
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};