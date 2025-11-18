"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const BlogSection = () => {
  const blogPosts = [
    {
      title: "Building Scalable Web Applications with Next.js",
      excerpt: "Learn how to build performant and scalable web applications using Next.js 14 and the App Router.",
      date: "Jan 15, 2024",
      readTime: "8 min read",
      category: "Web Development",
      slug: "#",
    },
    {
      title: "Mastering TypeScript: Advanced Patterns",
      excerpt: "Dive deep into advanced TypeScript patterns and techniques to write more maintainable code.",
      date: "Jan 10, 2024",
      readTime: "12 min read",
      category: "TypeScript",
      slug: "#",
    },
    {
      title: "The Future of Frontend Development",
      excerpt: "Exploring emerging trends and technologies shaping the future of frontend development.",
      date: "Jan 5, 2024",
      readTime: "6 min read",
      category: "Industry Trends",
      slug: "#",
    },
  ];

  return (
    <section id="blog" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground text-lg">
            Thoughts, tutorials, and insights on web development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <a href={post.slug}>
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" variant="outline">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};