import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useDialog } from './provider/DialogProvider';


interface Student {
    id: string;
    name: string;
    class: string;
    gender: string;
    address: string;
}


const EditStudentDialog = ({onChangeData} : {onChangeData:Function}) => {
    const { isOpen, closeDialog, dialogData: student } = useDialog();
    const [formData, setFormData] = useState<Student>({
        id:"",
        name: '',
        class: '',
        gender: '',
        address: ''
    });

    useEffect(() => {
        if (student) {
        console.log(student.id);
        setFormData({
            id: student.id || '',
            name: student.name || '',
            class: student.class || '',
            gender: student.gender || '',
            address: student.address || ''
        });
        }
    }, [student]);

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

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await fetch('http://localhost:3000/api/students',{
            method : "PATCH",
            body : JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(res => res.json()).then(res => {onChangeData(res)})
        .catch(res => console.log(res));
        closeDialog();
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Edit Data Siswa</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama siswa" 
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="class">Kelas</Label>
                <Select 
                value={formData.class}
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
                value={formData.gender}
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
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Masukkan alamat siswa" 
                />
            </div>
            <Button type="submit" className="w-full">Simpan Perubahan</Button>
            </form>
        </DialogContent>
        </Dialog>
  );
};

export default EditStudentDialog;