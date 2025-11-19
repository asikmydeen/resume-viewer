"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const AwardsSection = () => {
  const { resume } = useResume();

  if (resume.awards.length === 0) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    
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
    <section id="awards" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold mb-4">Awards & Recognition</h2>
          <p className="text-muted-foreground text-lg">Achievements and honors I've received</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.awards.map((award, index) => (
            <Card 
              key={`${award.title}-${index}`}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  {award.date && (
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(award.date)}
                    </Badge>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {award.title}
                </CardTitle>
                <CardDescription className="font-medium">
                  {award.awarder}
                </CardDescription>
              </CardHeader>
              {award.summary && (
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {award.summary}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};