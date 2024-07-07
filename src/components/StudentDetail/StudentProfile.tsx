"use client"
import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AvatarEditComponent from './AvatarSection';
import { useState } from 'react';

interface Student {
  id: string;
  name: string;
  class: string;
  gender: string;
  address: string;
}

const StudentProfile = ({idStudent} : {idStudent : string}) => {
  const [dataStudent,setDataStudent] = useState<Student>({
    id: '',
    name: '',
    class: '',
    gender: '',
    address: ''
  });
  const handleEditPhoto = () => {
    // Implementasi logika untuk mengedit foto
    console.log("Edit foto diklik");
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/student/' + idStudent)
    .then(res => res.json()).then(res => {
      setDataStudent(res);
    })
    .catch(res => console.log(res));
  },[])


  let student = {
    name : "john doe",
    class: "2",
    gender: "male",
    address: "aruji kartawinata"
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        <div className="flex space-x-6 items-center">
            <AvatarEditComponent/>
            <div >
                <h2 className="text-2xl font-bold mb-4 capitalize">{dataStudent.name}</h2>
                <div className="space-y-2">
                    <table>
                      <tbody>
                      <tr>
                            <td className="font-bold w-[80px]">Kelas</td>
                            <td>: {dataStudent.class}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Gender</td>
                            <td>: {dataStudent.gender}</td>

                        </tr>
                        <tr>
                            <td className="font-bold">Alamat</td>
                            <td>: {dataStudent.address}</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
            </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfile;