"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const PublicationsSection = () => {
  const { resume } = useResume();

  if (resume.publications.length === 0) {
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
    <section id="publications" className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold mb-4">Publications</h2>
          <p className="text-muted-foreground text-lg">Articles, papers, and content I've published</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {resume.publications.map((pub, index) => (
            <Card 
              key={`${pub.name}-${index}`}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  {pub.releaseDate && (
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(pub.releaseDate)}
                    </Badge>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {pub.name}
                </CardTitle>
                <CardDescription className="font-medium">
                  {pub.publisher}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pub.summary && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {pub.summary}
                  </p>
                )}
                {pub.url && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-all" 
                    asChild
                  >
                    <a href={pub.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Read Publication
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};