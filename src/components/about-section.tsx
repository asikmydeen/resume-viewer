"use client";

import { Card, CardContent } from "@/components/ui/card";
import { User, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const AboutSection = () => {
  const { resume } = useResume();
  const education = resume.education[0];
  const yearsOfExperience = resume.work.length > 0 ? "5+" : "0";

  return (
    <section id="about" className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg">Get to know me better</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {resume.basics.summary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <MapPin className="h-4 w-4" />
                {resume.basics.location.city}, {resume.basics.location.region}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Briefcase className="h-4 w-4" />
                {yearsOfExperience} years experience
              </div>
            </div>
          </div>

          <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-lg">Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    {yearsOfExperience} years in web development
                  </p>
                </div>
              </CardContent>
            </Card>

            {education && (
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Education</h3>
                    <p className="text-sm text-muted-foreground">
                      {education.studyType} in {education.area}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {education.institution}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-lg">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {resume.basics.location.city}, {resume.basics.location.region}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {resume.basics.location.countryCode}
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