"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResume } from "@/lib/resume-context";
import { Code2, Database, Cloud, Smartphone, Brain, Wrench, Zap } from "lucide-react";

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

  const getGradientForIndex = (index: number) => {
    const gradients = [
      "from-purple-500/20 to-blue-500/20",
      "from-pink-500/20 to-rose-500/20",
      "from-orange-500/20 to-yellow-500/20",
      "from-green-500/20 to-emerald-500/20",
      "from-blue-500/20 to-cyan-500/20",
      "from-indigo-500/20 to-violet-500/20",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="skills" className="py-24 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-xl mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive look at the technologies and tools I work with to build digital products.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.skills.map((skillCategory, index) => {
            const Icon = getIconForCategory(skillCategory.name);
            const gradient = getGradientForIndex(index);
            
            return (
              <Card 
                key={`${skillCategory.name}-${index}`}
                className="group border-0 bg-background/60 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient.replace('/20', '')}`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    {skillCategory.level && (
                      <Badge variant="secondary" className="font-medium">
                        {skillCategory.level}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-4">{skillCategory.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skillCategory.keywords.map((skill, skillIndex) => (
                      <div 
                        key={`${skillCategory.name}-${skill}-${skillIndex}`} 
                        className="px-3 py-1 rounded-md bg-secondary/50 border border-border/50 text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors cursor-default"
                      >
                        {skill}
                      </div>
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