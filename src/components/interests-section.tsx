"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const InterestsSection = () => {
  const { resume } = useResume();

  if (resume.interests.length === 0) {
    return null;
  }

  return (
    <section id="interests" className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold mb-4">Interests & Hobbies</h2>
          <p className="text-muted-foreground text-lg">What I'm passionate about outside of work</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.interests.map((interest, index) => (
            <Card 
              key={`${interest.name}-${index}`}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  {interest.name}
                </CardTitle>
              </CardHeader>
              {interest.keywords && interest.keywords.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {interest.keywords.map((keyword, keywordIndex) => (
                      <Badge 
                        key={`${interest.name}-${keyword}-${keywordIndex}`} 
                        variant="secondary" 
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};