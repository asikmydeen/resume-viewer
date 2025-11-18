"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResume } from "@/lib/resume-context";

export const SkillsSection = () => {
  const { resume } = useResume();

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {resume.skills.map((skillCategory, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{skillCategory.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.keywords.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};