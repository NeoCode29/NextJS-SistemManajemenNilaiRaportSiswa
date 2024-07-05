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
import { FaUserPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import TableAllStudent from "@/components/TableAllStudent";

export default function Home() {
  return (
    <main className="container p-8">
      <div className="flex justify-between">
        <div className="flex lg:w-[320px] border rounded-md">
          <Input className="focus:outline-none border-none" placeholder="mencari siswa..."/>
          <Button variant={"white"}>
            <IoSearchOutline/>
          </Button>
        </div>
        <div className="flex gap-6">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kelas</SelectLabel>
                <SelectItem value="kelas 1">kelas 1</SelectItem>
                <SelectItem value="kelas 2">kelas 2</SelectItem>
                <SelectItem value="kelas 3">kelas 3</SelectItem>
                <SelectItem value="kelas 4">kelas 4</SelectItem>
                <SelectItem value="kelas 5">kelas 5</SelectItem>
                <SelectItem value="kelas 6">kelas 6</SelectItem>
                <SelectItem value="All">semua</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>
            <FaUserPlus className="mr-2"/>
            Menambah Murid
          </Button>
        </div>
      </div>
      <div className="border rounded-md mt-4">
        <TableAllStudent/>
      </div>
    </main>
  );
}
