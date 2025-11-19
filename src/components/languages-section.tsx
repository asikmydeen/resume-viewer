"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const LanguagesSection = () => {
  const { resume } = useResume();

  if (resume.languages.length === 0) {
    return null;
  }

  const getFluencyColor = (fluency: string) => {
    const fluencyLower = fluency.toLowerCase();
    if (fluencyLower.includes('native') || fluencyLower.includes('fluent')) {
      return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
    }
    if (fluencyLower.includes('professional') || fluencyLower.includes('advanced')) {
      return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
    }
    if (fluencyLower.includes('intermediate')) {
      return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    }
    return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
  };

  return (
    <section id="languages" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold mb-4">Languages</h2>
          <p className="text-muted-foreground text-lg">Languages I speak and write</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resume.languages.map((lang, index) => (
            <Card 
              key={`${lang.language}-${index}`}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="flex items-center justify-between pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Languages className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{lang.language}</h3>
                  </div>
                </div>
                <Badge variant="outline" className={getFluencyColor(lang.fluency)}>
                  {lang.fluency}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};