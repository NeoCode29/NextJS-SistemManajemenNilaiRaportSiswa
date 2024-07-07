"use client";
import { useEffect, useState } from "react";
import React, { FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FaUserPlus } from "react-icons/fa";

interface Student {
  id: string;
  name: string;
  class: string;
  gender: string;
  address: string;
}

const AddStudentDialog = ({onChangeData} : {onChangeData:Function}) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState<Student>({
      id:"",
      name: '',
      class: '',
      gender: '',
      address: ''
  });

  useEffect(() => {
    setFormData({...formData, id : generateID()});
  },[open])

  const handleSubmit = async (event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    await fetch('http://localhost:3000/api/students',{
      method : "POST",
      body : JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json()).then(res => {onChangeData(res)})
    .catch(res => console.log(res));

    setOpen(false);
  };

  function generateID() {
    const prefix = "ST";
    const timestamp = Date.now().toString().slice(-8); // Ambil 8 digit dari timestamp
    const id = prefix + timestamp;
    return id;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
    ...prevData,
    [name]: value
    }));
  };

  const handleSelectChange = (name: keyof Student, value: string) => {
    setFormData(prevData => ({
    ...prevData,
    [name]: value
    }));
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <FaUserPlus className='mr-3'/>
            Tambah Siswa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>
                Tambah Siswa Baru
            </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input 
              id="name" 
              name="name"
              placeholder="Masukkan nama siswa" 
              onChange={handleInputChange}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="class">Kelas</Label>
            <Select
              onValueChange={(value) => handleSelectChange('class', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Kelas 1</SelectItem>
                <SelectItem value="2">Kelas 2</SelectItem>
                <SelectItem value="3">Kelas 3</SelectItem>
                <SelectItem value="4">Kelas 4</SelectItem>
                <SelectItem value="5">Kelas 5</SelectItem>
                <SelectItem value="6">Kelas 6</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Jenis Kelamin</Label>
            <Select
              onValueChange={(value) => handleSelectChange('gender', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Laki-laki</SelectItem>
                <SelectItem value="female">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Alamat</Label>
            <Input 
              id="address"
              name="address"
              placeholder="Masukkan alamat siswa" 
              onChange={handleInputChange}  
            />
          </div>
          <Button type="submit" className="w-full">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;