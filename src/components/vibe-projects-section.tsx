"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, ExternalLink, Sparkles, Zap, Loader2, Lightbulb } from "lucide-react";
import { useResume } from "@/lib/resume-context";

export const VibeProjectsSection = () => {
  const { resume } = useResume();

  if (!resume.vibeProjects || resume.vibeProjects.length === 0) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Inflight":
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case "Completed":
        return <Zap className="h-3 w-3 fill-yellow-400 text-yellow-400" />;
      case "Ideation":
        return <Lightbulb className="h-3 w-3" />;
      default:
        return <Bot className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Inflight":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Ideation":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section id="vibe-coding" className="py-24 px-4 bg-black/5 dark:bg-white/5 relative overflow-hidden">
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#4ade80_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4 ring-1 ring-primary/20 animate-pulse">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Vibe Coding & AI Workflows
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Exploring the frontier of AI-assisted development. From prompt engineering to full-blown autonomous agents.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.vibeProjects.map((project, index) => (
            <Card 
              key={`${project.name}-${index}`}
              className="group bg-background/40 backdrop-blur-md border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className={`gap-1.5 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    {project.status}
                  </Badge>
                  {project.vibe && (
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1 opacity-70">
                      <Sparkles className="h-3 w-3" />
                      {project.vibe} Vibe
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-border bg-background/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </CardContent>

              {project.url && (
                <CardFooter className="pt-0">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full hover:bg-primary/10 hover:text-primary group/btn"
                    asChild
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      View Experiment
                      <ExternalLink className="h-3 w-3 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};