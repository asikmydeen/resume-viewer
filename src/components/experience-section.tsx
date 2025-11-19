"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const ExperienceSection = () => {
  const { resume } = useResume();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    
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
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg">My professional journey and achievements</p>
        </div>
        
        <div className="space-y-6">
          {resume.work.map((exp, index) => (
            <Card 
              key={`${exp.name}-${exp.position}-${index}`} 
              className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-left-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/70 to-primary/40 rounded-l-lg transition-all duration-300 group-hover:w-2" />
              <CardHeader className="pl-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2 text-xl group-hover:text-primary transition-colors">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      {exp.position}
                    </CardTitle>
                    <CardDescription className="text-base font-medium flex items-center gap-2">
                      <span className="text-foreground">{exp.name}</span>
                      {exp.url && (
                        <a 
                          href={exp.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Visit →
                        </a>
                      )}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit whitespace-nowrap">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pl-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">{exp.summary}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((tech, techIndex) => (
                      <Badge 
                        key={`${exp.name}-${exp.position}-${tech}-${techIndex}`} 
                        variant="outline" 
                        className="text-xs hover:bg-primary/10 hover:border-primary transition-all duration-200 cursor-default"
                      >
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