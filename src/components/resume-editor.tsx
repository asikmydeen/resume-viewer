"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResume } from "@/lib/resume-context";
import { Upload, Download, RotateCcw, Save, Plus, Trash2, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { resumeSchema } from "@/lib/resume-schema";

export function ResumeEditor() {
  const { resume, updateResume, resetResume, autoRefresh, setAutoRefresh, generateRandom } = useResume();
  const [editedResume, setEditedResume] = useState(resume);

  useEffect(() => {
    setEditedResume(resume);
  }, [resume]);

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
      toast.success("Resume reset to defaults");
    }
  };

  const handleGenerateRandom = () => {
    generateRandom();
    toast.success("Random resume generated!");
  };

  // Work handlers
  const addWork = () => {
    setEditedResume({
      ...editedResume,
      work: [...editedResume.work, { name: "", position: "", startDate: "", summary: "", highlights: [] }],
    });
  };

  const updateWork = (index: number, field: string, value: any) => {
    const newWork = [...editedResume.work];
    newWork[index] = { ...newWork[index], [field]: value };
    setEditedResume({ ...editedResume, work: newWork });
  };

  const removeWork = (index: number) => {
    setEditedResume({ ...editedResume, work: editedResume.work.filter((_, i) => i !== index) });
  };

  // Education handlers
  const addEducation = () => {
    setEditedResume({
      ...editedResume,
      education: [...editedResume.education, { institution: "", area: "", studyType: "" }],
    });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const newEducation = [...editedResume.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEditedResume({ ...editedResume, education: newEducation });
  };

  const removeEducation = (index: number) => {
    setEditedResume({ ...editedResume, education: editedResume.education.filter((_, i) => i !== index) });
  };

  // Skills handlers
  const addSkill = () => {
    setEditedResume({
      ...editedResume,
      skills: [...editedResume.skills, { name: "", keywords: [] }],
    });
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const newSkills = [...editedResume.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setEditedResume({ ...editedResume, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    setEditedResume({ ...editedResume, skills: editedResume.skills.filter((_, i) => i !== index) });
  };

  // Projects handlers
  const addProject = () => {
    setEditedResume({
      ...editedResume,
      projects: [...editedResume.projects, { name: "", description: "", keywords: [] }],
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const newProjects = [...editedResume.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setEditedResume({ ...editedResume, projects: newProjects });
  };

  const removeProject = (index: number) => {
    setEditedResume({ ...editedResume, projects: editedResume.projects.filter((_, i) => i !== index) });
  };

  // Vibe Projects handlers
  const addVibeProject = () => {
    setEditedResume({
      ...editedResume,
      vibeProjects: [...(editedResume.vibeProjects || []), { name: "", description: "", status: "Inflight", tools: [] }],
    });
  };

  const updateVibeProject = (index: number, field: string, value: any) => {
    const newVibeProjects = [...(editedResume.vibeProjects || [])];
    newVibeProjects[index] = { ...newVibeProjects[index], [field]: value };
    setEditedResume({ ...editedResume, vibeProjects: newVibeProjects });
  };

  const removeVibeProject = (index: number) => {
    setEditedResume({ ...editedResume, vibeProjects: (editedResume.vibeProjects || []).filter((_, i) => i !== index) });
  };

  // Awards handlers
  const addAward = () => {
    setEditedResume({
      ...editedResume,
      awards: [...editedResume.awards, { title: "", awarder: "" }],
    });
  };

  const updateAward = (index: number, field: string, value: any) => {
    const newAwards = [...editedResume.awards];
    newAwards[index] = { ...newAwards[index], [field]: value };
    setEditedResume({ ...editedResume, awards: newAwards });
  };

  const removeAward = (index: number) => {
    setEditedResume({ ...editedResume, awards: editedResume.awards.filter((_, i) => i !== index) });
  };

  // Publications handlers
  const addPublication = () => {
    setEditedResume({
      ...editedResume,
      publications: [...editedResume.publications, { name: "", publisher: "" }],
    });
  };

  const updatePublication = (index: number, field: string, value: any) => {
    const newPublications = [...editedResume.publications];
    newPublications[index] = { ...newPublications[index], [field]: value };
    setEditedResume({ ...editedResume, publications: newPublications });
  };

  const removePublication = (index: number) => {
    setEditedResume({ ...editedResume, publications: editedResume.publications.filter((_, i) => i !== index) });
  };

  // Languages handlers
  const addLanguage = () => {
    setEditedResume({
      ...editedResume,
      languages: [...editedResume.languages, { language: "", fluency: "" }],
    });
  };

  const updateLanguage = (index: number, field: string, value: any) => {
    const newLanguages = [...editedResume.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setEditedResume({ ...editedResume, languages: newLanguages });
  };

  const removeLanguage = (index: number) => {
    setEditedResume({ ...editedResume, languages: editedResume.languages.filter((_, i) => i !== index) });
  };

  // Interests handlers
  const addInterest = () => {
    setEditedResume({
      ...editedResume,
      interests: [...editedResume.interests, { name: "" }],
    });
  };

  const updateInterest = (index: number, field: string, value: any) => {
    const newInterests = [...editedResume.interests];
    newInterests[index] = { ...newInterests[index], [field]: value };
    setEditedResume({ ...editedResume, interests: newInterests });
  };

  const removeInterest = (index: number) => {
    setEditedResume({ ...editedResume, interests: editedResume.interests.filter((_, i) => i !== index) });
  };

  // References handlers
  const addReference = () => {
    setEditedResume({
      ...editedResume,
      references: [...editedResume.references, { name: "", reference: "" }],
    });
  };

  const updateReference = (index: number, field: string, value: any) => {
    const newReferences = [...editedResume.references];
    newReferences[index] = { ...newReferences[index], [field]: value };
    setEditedResume({ ...editedResume, references: newReferences });
  };

  const removeReference = (index: number) => {
    setEditedResume({ ...editedResume, references: editedResume.references.filter((_, i) => i !== index) });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div>
            <CardTitle className="text-2xl">Resume Editor</CardTitle>
            <CardDescription className="mt-2">
              Edit your resume information following JSON Resume schema
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload JSON
            </Button>
            <input id="file-upload" type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
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
              <Label htmlFor="auto-refresh" className="text-sm whitespace-nowrap">Auto-refresh (10s)</Label>
              <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="basics" className="w-full">
            <div className="mb-6">
              <TabsList className="w-full h-auto flex-wrap justify-start gap-1">
                <TabsTrigger value="basics" className="flex-shrink-0">Basics</TabsTrigger>
                <TabsTrigger value="work" className="flex-shrink-0">Work</TabsTrigger>
                <TabsTrigger value="education" className="flex-shrink-0">Education</TabsTrigger>
                <TabsTrigger value="skills" className="flex-shrink-0">Skills</TabsTrigger>
                <TabsTrigger value="projects" className="flex-shrink-0">Projects</TabsTrigger>
                <TabsTrigger value="vibe" className="flex-shrink-0">Vibe Coding</TabsTrigger>
                <TabsTrigger value="awards" className="flex-shrink-0">Awards</TabsTrigger>
                <TabsTrigger value="publications" className="flex-shrink-0">Publications</TabsTrigger>
                <TabsTrigger value="languages" className="flex-shrink-0">Languages</TabsTrigger>
                <TabsTrigger value="interests" className="flex-shrink-0">Interests</TabsTrigger>
                <TabsTrigger value="references" className="flex-shrink-0">References</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="basics" className="space-y-4 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    value={editedResume.basics.url || ""}
                    onChange={(e) => setEditedResume({
                      ...editedResume,
                      basics: { ...editedResume.basics, url: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={editedResume.basics.image || ""}
                    onChange={(e) => setEditedResume({
                      ...editedResume,
                      basics: { ...editedResume.basics, image: e.target.value }
                    })}
                  />
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={editedResume.basics.location.address || ""}
                    onChange={(e) => setEditedResume({
                      ...editedResume,
                      basics: {
                        ...editedResume.basics,
                        location: { ...editedResume.basics.location, address: e.target.value }
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={editedResume.basics.location.postalCode || ""}
                    onChange={(e) => setEditedResume({
                      ...editedResume,
                      basics: {
                        ...editedResume.basics,
                        location: { ...editedResume.basics.location, postalCode: e.target.value }
                      }
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
                <div className="space-y-2">
                  <Label htmlFor="countryCode">Country Code</Label>
                  <Input
                    id="countryCode"
                    value={editedResume.basics.location.countryCode}
                    onChange={(e) => setEditedResume({
                      ...editedResume,
                      basics: {
                        ...editedResume.basics,
                        location: { ...editedResume.basics.location, countryCode: e.target.value }
                      }
                    })}
                    placeholder="US"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="work" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input value={work.name} onChange={(e) => updateWork(index, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Input value={work.position} onChange={(e) => updateWork(index, "position", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Company URL</Label>
                        <Input value={work.url || ""} onChange={(e) => updateWork(index, "url", e.target.value)} placeholder="https://company.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date (YYYY-MM)</Label>
                        <Input value={work.startDate} onChange={(e) => updateWork(index, "startDate", e.target.value)} placeholder="2022-01" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date (YYYY-MM)</Label>
                        <Input value={work.endDate || ""} onChange={(e) => updateWork(index, "endDate", e.target.value || undefined)} placeholder="Present" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Summary</Label>
                      <Textarea value={work.summary} onChange={(e) => updateWork(index, "summary", e.target.value)} rows={3} />
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

            <TabsContent value="education" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Education</h3>
                <Button onClick={addEducation} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
              {editedResume.education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Education {index + 1}</CardTitle>
                      <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input value={edu.institution} onChange={(e) => updateEducation(index, "institution", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Institution URL</Label>
                        <Input value={edu.url || ""} onChange={(e) => updateEducation(index, "url", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Area of Study</Label>
                        <Input value={edu.area} onChange={(e) => updateEducation(index, "area", e.target.value)} placeholder="Computer Science" />
                      </div>
                      <div className="space-y-2">
                        <Label>Study Type</Label>
                        <Input value={edu.studyType} onChange={(e) => updateEducation(index, "studyType", e.target.value)} placeholder="Bachelor's" />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date (YYYY-MM)</Label>
                        <Input value={edu.startDate || ""} onChange={(e) => updateEducation(index, "startDate", e.target.value)} placeholder="2018-09" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date (YYYY-MM)</Label>
                        <Input value={edu.endDate || ""} onChange={(e) => updateEducation(index, "endDate", e.target.value)} placeholder="2022-06" />
                      </div>
                      <div className="space-y-2">
                        <Label>GPA/Score</Label>
                        <Input value={edu.score || ""} onChange={(e) => updateEducation(index, "score", e.target.value)} placeholder="3.8 GPA" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Courses (comma-separated)</Label>
                      <Input
                        value={edu.courses?.join(", ") || ""}
                        onChange={(e) => updateEducation(index, "courses", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        placeholder="Data Structures, Algorithms, Database Systems"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="skills" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
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
                      <Input value={skill.name} onChange={(e) => updateSkill(index, "name", e.target.value)} placeholder="Frontend" />
                    </div>
                    <div className="space-y-2">
                      <Label>Level</Label>
                      <Input value={skill.level || ""} onChange={(e) => updateSkill(index, "level", e.target.value)} placeholder="Expert" />
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

            <TabsContent value="projects" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input value={project.name} onChange={(e) => updateProject(index, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input value={project.url || ""} onChange={(e) => updateProject(index, "url", e.target.value)} placeholder="https://example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Entity</Label>
                        <Input value={project.entity || ""} onChange={(e) => updateProject(index, "entity", e.target.value)} placeholder="Personal Project" />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Input value={project.type || ""} onChange={(e) => updateProject(index, "type", e.target.value)} placeholder="Application" />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Date (YYYY-MM)</Label>
                        <Input value={project.startDate || ""} onChange={(e) => updateProject(index, "startDate", e.target.value)} placeholder="2023-01" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date (YYYY-MM)</Label>
                        <Input value={project.endDate || ""} onChange={(e) => updateProject(index, "endDate", e.target.value)} placeholder="2023-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={project.description} onChange={(e) => updateProject(index, "description", e.target.value)} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Roles (comma-separated)</Label>
                      <Input
                        value={project.roles?.join(", ") || ""}
                        onChange={(e) => updateProject(index, "roles", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        placeholder="Developer, Team Lead"
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
                    <div className="space-y-2">
                      <Label>Highlights (comma-separated)</Label>
                      <Textarea
                        value={project.highlights?.join(", ") || ""}
                        onChange={(e) => updateProject(index, "highlights", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        rows={2}
                        placeholder="Increased performance by 50%, Reduced costs by 30%"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Vibe Projects Tab Content */}
            <TabsContent value="vibe" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Vibe Coding Projects</h3>
                <Button onClick={addVibeProject} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vibe Project
                </Button>
              </div>
              {(editedResume.vibeProjects || []).map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Vibe Project {index + 1}</CardTitle>
                      <Button variant="destructive" size="sm" onClick={() => removeVibeProject(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input value={project.name} onChange={(e) => updateVibeProject(index, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={project.status} onValueChange={(value) => updateVibeProject(index, "status", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inflight">Inflight</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Ideation">Ideation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Vibe</Label>
                        <Input value={project.vibe || ""} onChange={(e) => updateVibeProject(index, "vibe", e.target.value)} placeholder="Chill, Chaotic, etc." />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input value={project.url || ""} onChange={(e) => updateVibeProject(index, "url", e.target.value)} placeholder="https://..." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={project.description} onChange={(e) => updateVibeProject(index, "description", e.target.value)} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Tools (comma-separated)</Label>
                      <Input
                        value={project.tools?.join(", ") || ""}
                        onChange={(e) => updateVibeProject(index, "tools", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        placeholder="OpenAI, Python, etc."
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="awards" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Awards</h3>
                <Button onClick={addAward} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Award
                </Button>
              </div>
              {editedResume.awards.map((award, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Award {index + 1}</CardTitle>
                      <Button variant="destructive" size="sm" onClick={() => removeAward(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input value={award.title} onChange={(e) => updateAward(index, "title", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Awarder</Label>
                        <Input value={award.awarder} onChange={(e) => updateAward(index, "awarder", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Date (YYYY-MM)</Label>
                        <Input value={award.date || ""} onChange={(e) => updateAward(index, "date", e.target.value)} placeholder="2023-06" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Summary</Label>
                      <Textarea value={award.summary || ""} onChange={(e) => updateAward(index, "summary", e.target.value)} rows={2} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="publications" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Publications</h3>
                <Button onClick={addPublication} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Publication
                </Button>
              </div>
              {editedResume.publications.map((pub, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Publication {index + 1}</CardTitle>
                      <Button variant="destructive" size="sm" onClick={() => removePublication(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={pub.name} onChange={(e) => updatePublication(index, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Publisher</Label>
                        <Input value={pub.publisher} onChange={(e) => updatePublication(index, "publisher", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Release Date (YYYY-MM)</Label>
                        <Input value={pub.releaseDate || ""} onChange={(e) => updatePublication(index, "releaseDate", e.target.value)} placeholder="2023-03" />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input value={pub.url || ""} onChange={(e) => updatePublication(index, "url", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Summary</Label>
                      <Textarea value={pub.summary || ""} onChange={(e) => updatePublication(index, "summary", e.target.value)} rows={2} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="languages" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Languages</h3>
                <Button onClick={addLanguage} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Language
                </Button>
              </div>
              {editedResume.languages.map((lang, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Language {index + 1}</CardTitle>
                      <Button variant="destructive" size="sm" onClick={() => removeLanguage(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Input value={lang.language} onChange={(e) => updateLanguage(index, "language", e.target.value)} placeholder="English" />
                      </div>
                      <div className="space-y-2">
                        <Label>Fluency</Label>
                        <Input value={lang.fluency} onChange={(e) => updateLanguage(index, "fluency", e.target.value)} placeholder="Native" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="interests" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Interests</h3>
                <Button onClick={addInterest} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Interest
                </Button>
              </div>
              {editedResume.interests.map((interest, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Interest {index + 1}</CardTitle>
                      <Button variant="destructive" size="sm" onClick={() => removeInterest(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value={interest.name} onChange={(e) => updateInterest(index, "name", e.target.value)} placeholder="Open Source" />
                    </div>
                    <div className="space-y-2">
                      <Label>Keywords (comma-separated)</Label>
                      <Input
                        value={interest.keywords?.join(", ") || ""}
                        onChange={(e) => updateInterest(index, "keywords", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        placeholder="Contributing, Community, Learning"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="references" className="space-y-6 mt-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">References</h3>
                <Button onClick={addReference} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reference
                </Button>
              </div>
              {editedResume.references.map((ref, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Reference {index + 1}</CardTitle>
                      <Button variant="destructive" size="sm" onClick={() => removeReference(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value={ref.name} onChange={(e) => updateReference(index, "name", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Reference</Label>
                      <Textarea value={ref.reference} onChange={(e) => updateReference(index, "reference", e.target.value)} rows={3} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}