"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, Building2 } from "lucide-react";
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
    <section id="experience" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Professional Journey</h2>
          <p className="text-muted-foreground text-lg">
            My career path and the value I've delivered along the way.
          </p>
        </div>
        
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
          {resume.work.map((exp, index) => (
            <div key={`${exp.name}-${index}`} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/30 z-10 -translate-x-1/2 md:translate-x-[-50%]">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] ml-14 md:ml-0">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background/80 backdrop-blur overflow-hidden group-hover:ring-2 group-hover:ring-primary/10">
                  <div className="h-1 w-full bg-gradient-to-r from-primary/50 to-purple-500/50" />
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold text-primary">
                          {exp.position}
                        </CardTitle>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 font-medium text-foreground">
                          <Building2 className="w-4 h-4" />
                          {exp.name}
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary">
                          <Calendar className="w-3 h-3" />
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {exp.summary}
                    </p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                        {exp.highlights.slice(0, 4).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="text-xs font-medium text-primary/80 bg-primary/5 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};