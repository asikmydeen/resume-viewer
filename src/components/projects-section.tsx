"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Folder, ArrowUpRight } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const ProjectsSection = () => {
  const { resume } = useResume();

  return (
    <section id="projects" className="py-24 px-4 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              A selection of projects that showcase my passion for building impactful solutions.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
            <Github className="h-4 w-4" />
            View All on GitHub
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resume.projects.map((project, index) => (
            <Card 
              key={`${project.name}-${index}`} 
              className="group flex flex-col h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
            >
              {/* Browser-like header for decoration */}
              <div className="h-3 w-full bg-muted/50 border-b flex items-center px-4 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                <div className="w-2 h-2 rounded-full bg-green-400/50" />
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Folder className="h-5 w-5" />
                  </div>
                  <div className="flex gap-2">
                    {project.type && (
                      <Badge variant="outline" className="rounded-full px-3">
                        {project.type}
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                  {project.name}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                </CardTitle>
                <CardDescription className="line-clamp-2 text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.keywords.slice(0, 5).map((tech, techIndex) => (
                    <Badge 
                      key={`${project.name}-${tech}-${techIndex}`} 
                      variant="secondary" 
                      className="bg-secondary/50 hover:bg-secondary text-xs font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.keywords.length > 5 && (
                    <Badge variant="secondary" className="bg-secondary/50 text-xs">
                      +{project.keywords.length - 5}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-0 gap-3">
                {project.url && (
                  <Button 
                    className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-none hover:shadow-lg" 
                    asChild
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="icon"
                  className="hover:bg-foreground hover:text-background transition-colors"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="View Code">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};