"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDialog } from "./provider/DialogProvider";
import Link from "next/link";

interface student {
  id: string;
  name: string;
  class: string;
  gender: string;
  address: string;
}

const DropdownMenuStudent = ({student} : {student : student}) => {
    const { openDialog } = useDialog();
  
    const handleDelete = async() => {
      await fetch('http://localhost:3000/api/students',{
          method : "Delete",
          body : JSON.stringify({id : student.id}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      .then(res => res.json()).then(res => {window.location.reload()})
      .catch(res => console.log(res));
    };
    
    return <DropdownMenu>
      <DropdownMenuTrigger>
        <HiOutlineDotsVertical/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"/student/" + student.id}>
            Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=> {
          openDialog(student);
        }}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}

export default DropdownMenuStudent;