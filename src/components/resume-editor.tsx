"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResume } from "@/lib/resume-context";
import { Upload, Download, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { resumeSchema } from "@/lib/resume-schema";

export function ResumeEditor() {
  const { resume, updateResume, resetResume } = useResume();
  const [editedResume, setEditedResume] = useState(resume);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        const validated = resumeSchema.parse(json);
        setEditedResume(validated);
        updateResume(validated);
        toast.success("Resume uploaded successfully!");
      } catch (error) {
        toast.error("Invalid JSON Resume format");
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Resume downloaded!");
  };

  const handleSave = () => {
    updateResume(editedResume);
    toast.success("Resume saved!");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset to default values?")) {
      resetResume();
      setEditedResume(resume);
      toast.success("Resume reset to defaults");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resume Editor</CardTitle>
        <CardDescription>
          Edit your resume information or upload a JSON Resume file
        </CardDescription>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
            <Upload className="h-4 w-4 mr-2" />
            Upload JSON
          </Button>
          <input
            id="file-upload"
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="work">Work</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedResume.basics.name}
                onChange={(e) => setEditedResume({
                  ...editedResume,
                  basics: { ...editedResume.basics, name: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label/Title</Label>
              <Input
                id="label"
                value={editedResume.basics.label}
                onChange={(e) => setEditedResume({
                  ...editedResume,
                  basics: { ...editedResume.basics, label: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedResume.basics.email}
                onChange={(e) => setEditedResume({
                  ...editedResume,
                  basics: { ...editedResume.basics, email: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editedResume.basics.phone}
                onChange={(e) => setEditedResume({
                  ...editedResume,
                  basics: { ...editedResume.basics, phone: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                rows={4}
                value={editedResume.basics.summary}
                onChange={(e) => setEditedResume({
                  ...editedResume,
                  basics: { ...editedResume.basics, summary: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={editedResume.basics.location.city}
                onChange={(e) => setEditedResume({
                  ...editedResume,
                  basics: {
                    ...editedResume.basics,
                    location: { ...editedResume.basics.location, city: e.target.value }
                  }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region/State</Label>
              <Input
                id="region"
                value={editedResume.basics.location.region}
                onChange={(e) => setEditedResume({
                  ...editedResume,
                  basics: {
                    ...editedResume.basics,
                    location: { ...editedResume.basics.location, region: e.target.value }
                  }
                })}
              />
            </div>
          </TabsContent>

          <TabsContent value="work" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Work experience is managed through the JSON file. Upload a JSON Resume to edit work history.
            </p>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Skills are managed through the JSON file. Upload a JSON Resume to edit skills.
            </p>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Projects are managed through the JSON file. Upload a JSON Resume to edit projects.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}