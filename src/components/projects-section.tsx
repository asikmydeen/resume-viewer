"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const ProjectsSection = () => {
  const { resume } = useResume();

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">Some of my recent work and side projects</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.projects.map((project, index) => (
            <Card 
              key={`${project.name}-${index}`} 
              className="flex flex-col group hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  {project.type && (
                    <Badge variant="outline" className="text-xs">
                      {project.type}
                    </Badge>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.keywords.slice(0, 4).map((tech, techIndex) => (
                    <Badge 
                      key={`${project.name}-${tech}-${techIndex}`} 
                      variant="outline" 
                      className="text-xs hover:bg-primary/10 hover:border-primary transition-all duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.keywords.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.keywords.length - 4}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {project.url && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 group/btn hover:bg-primary hover:text-primary-foreground transition-all" 
                      asChild
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 group/btn hover:bg-primary hover:text-primary-foreground transition-all" 
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};