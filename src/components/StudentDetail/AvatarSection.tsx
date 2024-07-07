import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const AvatarEditComponent = () => {
  const handleEditPhoto = () => {
    // Implementasi logika untuk mengedit foto
    console.log("Edit foto diklik");
  };

  return (
    <div className="flex flex-col items-center space-y-4 px-12">
      <Avatar className="w-32 h-32">
        <AvatarImage src="/api/placeholder/320/320" alt="Foto Profil" />
        <AvatarFallback>SS</AvatarFallback>
      </Avatar>
      <Button onClick={handleEditPhoto} variant="outline" className="flex items-center space-x-2">
        <Camera className="w-4 h-4" />
        <span>Edit Foto</span>
      </Button>
    </div>
  );
};

export default AvatarEditComponent;