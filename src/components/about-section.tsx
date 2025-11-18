"use client";

import { Card, CardContent } from "@/components/ui/card";
import { User, Briefcase, GraduationCap } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const AboutSection = () => {
  const { resume } = useResume();
  const education = resume.education[0];
  const yearsOfExperience = resume.work.length > 0 ? "5+" : "0";

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              {resume.basics.summary}
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
                    {yearsOfExperience} years in web development
                  </p>
                </div>
              </CardContent>
            </Card>

            {education && (
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Education</h3>
                    <p className="text-sm text-muted-foreground">
                      {education.studyType} in {education.area}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {resume.basics.location.city}, {resume.basics.location.region}
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