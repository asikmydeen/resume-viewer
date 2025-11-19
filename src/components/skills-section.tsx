"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResume } from "@/lib/resume-context";
import { Code2, Database, Cloud, Smartphone, Brain, Wrench } from "lucide-react";

export const SkillsSection = () => {
  const { resume } = useResume();

  const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('frontend') || name.includes('front-end')) return Code2;
    if (name.includes('backend') || name.includes('back-end')) return Database;
    if (name.includes('cloud') || name.includes('devops')) return Cloud;
    if (name.includes('mobile')) return Smartphone;
    if (name.includes('data') || name.includes('ml') || name.includes('machine')) return Brain;
    return Wrench;
  };

  return (
    <section id="skills" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground text-lg">My technical expertise and tools I work with</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.skills.map((skillCategory, index) => {
            const Icon = getIconForCategory(skillCategory.name);
            return (
              <Card 
                key={`${skillCategory.name}-${index}`}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    {skillCategory.name}
                  </CardTitle>
                  {skillCategory.level && (
                    <p className="text-sm text-muted-foreground">{skillCategory.level}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.keywords.map((skill, skillIndex) => (
                      <Badge 
                        key={`${skillCategory.name}-${skill}-${skillIndex}`} 
                        variant="secondary" 
                        className="text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};