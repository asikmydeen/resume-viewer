"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Code, Users, Coffee, Award } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Code,
      value: "50+",
      label: "Projects Completed",
    },
    {
      icon: Users,
      value: "30+",
      label: "Happy Clients",
    },
    {
      icon: Coffee,
      value: "1000+",
      label: "Cups of Coffee",
    },
    {
      icon: Award,
      value: "15+",
      label: "Awards Won",
    },
  ];

  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};