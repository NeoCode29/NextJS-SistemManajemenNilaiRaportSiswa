import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import DropdownMenuStudent from "./DropdownMenuStudent" 
  
interface Student {
  id: string;
  name: string;
  class: string;
  gender: string;
  address: string;
}

export default function TableAllStudent({dataStudent} : {dataStudent : Array<Student>}) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Siswa</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataStudent.map((data) => (
            <TableRow key={data["id"]}>
                <TableCell className="font-medium">{data["name"]}</TableCell>
                <TableCell>{data["class"]}</TableCell>
                <TableCell>{data["gender"]}</TableCell>
                <TableCell>{data["address"]}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenuStudent student={data}/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  