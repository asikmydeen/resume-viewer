"use client";

import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { useState } from "react";

interface EditModeToggleProps {
  onToggle: (isEditing: boolean) => void;
}

export function EditModeToggle({ onToggle }: EditModeToggleProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    const newState = !isEditing;
    setIsEditing(newState);
    onToggle(newState);
  };

  return (
    <Button
      onClick={handleToggle}
      variant={isEditing ? "default" : "outline"}
      size="lg"
      className="fixed bottom-8 right-8 z-50 shadow-lg"
    >
      {isEditing ? (
        <>
          <Eye className="h-5 w-5 mr-2" />
          Preview
        </>
      ) : (
        <>
          <Edit className="h-5 w-5 mr-2" />
          Edit Resume
        </>
      )}
    </Button>
  );
}