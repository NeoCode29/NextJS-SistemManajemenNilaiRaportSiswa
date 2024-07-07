"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoSearchOutline } from "react-icons/io5";
import TableAllStudent from "@/components/TableAllStudent";
import AddStudentDialog from "@/components/AddStudentDialog";
import EditStudentDialog from "@/components/EditStudentDialog";
import {  DialogProvider } from "@/components/provider/DialogProvider";
import { ChangeEvent, useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
  class: string;
  gender: string;
  address: string;
}

export default function Home() {
  const [dataStudent,setDataStudent] = useState<Student[]>([]); 
  const [filterDataStudent, setFilterDataStudent] = useState<Student[]>([]); 
  function changeDataStudent(data : Student[]){
    setDataStudent(data);
    setFilterDataStudent(data);
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/students')
    .then(res => res.json()).then(res => {
      
      setDataStudent(res)
      setFilterDataStudent(res);
    })
    .catch(res => console.log(res));
  },[])

  const handleFilterClass = (value : string) => {
    if(value=="all"){
      setFilterDataStudent(dataStudent);
    }else{
      console.log(value);
      setFilterDataStudent(dataStudent.filter((student) => student.class === value));
    }
  };

  const handleSearcInput = (event : ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if(value != ""){
      const filterData = filterDataStudent.filter((student) => student.name.toLowerCase().includes(value.toLowerCase()));
      setFilterDataStudent(filterData);
    }else{
      setFilterDataStudent(dataStudent);
    }
};

  
  return (
    <main className="container p-8">
      <DialogProvider>
        <div className="flex justify-between">
          <div className="flex lg:w-[320px] border rounded-md">
            <Input 
              className="focus:outline-none border-none" 
              placeholder="mencari siswa..."
              onChange={handleSearcInput}
            />
            <Button variant={"white"}>
              <IoSearchOutline/>
            </Button>
          </div>
          <div className="flex gap-6">
            <Select
              onValueChange={handleFilterClass}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Kelas</SelectLabel>
                  <SelectItem value="1">kelas 1</SelectItem>
                  <SelectItem value="2">kelas 2</SelectItem>
                  <SelectItem value="3">kelas 3</SelectItem>
                  <SelectItem value="4">kelas 4</SelectItem>
                  <SelectItem value="5">kelas 5</SelectItem>
                  <SelectItem value="6">kelas 6</SelectItem>
                  <SelectItem value="all">semua</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <AddStudentDialog onChangeData={changeDataStudent}/>
            <EditStudentDialog onChangeData={changeDataStudent}/>
          </div>
        </div>
        <div className="border rounded-md mt-4">
          <TableAllStudent dataStudent={filterDataStudent}/>
        </div>
      </DialogProvider>
    </main>
  );
}
