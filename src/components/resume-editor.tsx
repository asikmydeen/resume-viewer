"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useResume } from "@/lib/resume-context";
import { Upload, Download, RotateCcw, Save, Plus, Trash2, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { resumeSchema } from "@/lib/resume-schema";

export function ResumeEditor() {
  const { resume, updateResume, resetResume, autoRefresh, setAutoRefresh, generateRandom } = useResume();
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

  const handleGenerateRandom = () => {
    generateRandom();
    setEditedResume(resume);
    toast.success("Random resume generated!");
  };

  // Work experience handlers
  const addWork = () => {
    setEditedResume({
      ...editedResume,
      work: [
        ...editedResume.work,
        {
          name: "",
          position: "",
          startDate: "",
          summary: "",
          highlights: [],
        },
      ],
    });
  };

  const updateWork = (index: number, field: string, value: any) => {
    const newWork = [...editedResume.work];
    newWork[index] = { ...newWork[index], [field]: value };
    setEditedResume({ ...editedResume, work: newWork });
  };

  const removeWork = (index: number) => {
    setEditedResume({
      ...editedResume,
      work: editedResume.work.filter((_, i) => i !== index),
    });
  };

  // Skills handlers
  const addSkill = () => {
    setEditedResume({
      ...editedResume,
      skills: [
        ...editedResume.skills,
        {
          name: "",
          keywords: [],
        },
      ],
    });
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const newSkills = [...editedResume.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setEditedResume({ ...editedResume, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    setEditedResume({
      ...editedResume,
      skills: editedResume.skills.filter((_, i) => i !== index),
    });
  };

  // Projects handlers
  const addProject = () => {
    setEditedResume({
      ...editedResume,
      projects: [
        ...editedResume.projects,
        {
          name: "",
          description: "",
          keywords: [],
        },
      ],
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const newProjects = [...editedResume.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setEditedResume({ ...editedResume, projects: newProjects });
  };

  const removeProject = (index: number) => {
    setEditedResume({
      ...editedResume,
      projects: editedResume.projects.filter((_, i) => i !== index),
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resume Editor</CardTitle>
        <CardDescription>
          Edit your resume information or upload a JSON Resume file
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
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
          <Button variant="outline" size="sm" onClick={handleGenerateRandom}>
            <Shuffle className="h-4 w-4 mr-2" />
            Generate Random
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <div className="flex items-center gap-2 ml-auto">
            <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh (10s)</Label>
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
          </div>
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <Button onClick={addWork} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Work
              </Button>
            </div>
            {editedResume.work.map((work, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Position {index + 1}</CardTitle>
                    <Button variant="destructive" size="sm" onClick={() => removeWork(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input
                      value={work.name}
                      onChange={(e) => updateWork(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={work.position}
                      onChange={(e) => updateWork(index, "position", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Start Date (YYYY-MM)</Label>
                      <Input
                        value={work.startDate}
                        onChange={(e) => updateWork(index, "startDate", e.target.value)}
                        placeholder="2022-01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date (YYYY-MM)</Label>
                      <Input
                        value={work.endDate || ""}
                        onChange={(e) => updateWork(index, "endDate", e.target.value || undefined)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Summary</Label>
                    <Textarea
                      value={work.summary}
                      onChange={(e) => updateWork(index, "summary", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Technologies (comma-separated)</Label>
                    <Input
                      value={work.highlights?.join(", ") || ""}
                      onChange={(e) => updateWork(index, "highlights", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                      placeholder="React, Node.js, AWS"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Skills</h3>
              <Button onClick={addSkill} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill Category
              </Button>
            </div>
            {editedResume.skills.map((skill, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Skill Category {index + 1}</CardTitle>
                    <Button variant="destructive" size="sm" onClick={() => removeSkill(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input
                      value={skill.name}
                      onChange={(e) => updateSkill(index, "name", e.target.value)}
                      placeholder="Frontend"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Skills (comma-separated)</Label>
                    <Input
                      value={skill.keywords.join(", ")}
                      onChange={(e) => updateSkill(index, "keywords", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                      placeholder="React, Vue.js, Angular"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Projects</h3>
              <Button onClick={addProject} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
            {editedResume.projects.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Project {index + 1}</CardTitle>
                    <Button variant="destructive" size="sm" onClick={() => removeProject(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => updateProject(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, "description", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={project.url || ""}
                      onChange={(e) => updateProject(index, "url", e.target.value || undefined)}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Technologies (comma-separated)</Label>
                    <Input
                      value={project.keywords.join(", ")}
                      onChange={(e) => updateProject(index, "keywords", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                      placeholder="Next.js, TypeScript, PostgreSQL"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}