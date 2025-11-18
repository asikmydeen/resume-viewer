"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const ExperienceSection = () => {
  const { resume } = useResume();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    
    // Parse the date string (expected format: YYYY-MM or YYYY-MM-DD)
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1] ? parseInt(parts[1], 10) : 1;
    
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    return `${monthNames[month - 1]} ${year}`;
  };

  return (
    <section id="experience" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
        
        <div className="space-y-6">
          {resume.work.map((exp, index) => (
            <Card key={index} className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg" />
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.position}
                    </CardTitle>
                    <CardDescription className="text-base font-medium mt-1">
                      {exp.name}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.summary}</p>
                {exp.highlights && (
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};