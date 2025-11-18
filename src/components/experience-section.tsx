"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

export const ExperienceSection = () => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      description: "Leading development of scalable web applications, mentoring junior developers, and implementing best practices across the team.",
      technologies: ["React", "Node.js", "AWS", "TypeScript"],
    },
    {
      title: "Full Stack Developer",
      company: "Startup Solutions",
      period: "2020 - 2022",
      description: "Built and maintained multiple client projects, implemented CI/CD pipelines, and improved application performance by 40%.",
      technologies: ["Next.js", "PostgreSQL", "Docker", "GraphQL"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2018 - 2020",
      description: "Developed responsive web applications, collaborated with designers to implement pixel-perfect UIs, and optimized for SEO.",
      technologies: ["React", "JavaScript", "Sass", "Webpack"],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg" />
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.title}
                    </CardTitle>
                    <CardDescription className="text-base font-medium mt-1">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    <Calendar className="h-3 w-3 mr-1" />
                    {exp.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
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