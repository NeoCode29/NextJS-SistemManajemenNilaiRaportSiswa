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
  
let data_siswa = [
    {
        "id_siswa": 1,
        "nama": "Ahmad",
        "tanggal_lahir": "2005-01-15",
        "jenis_kelamin": "Laki-laki",
        "alamat": "Jl. Merdeka No. 10, Jakarta",
        "kelas": "10",
        "nomor_telepon": "081234567890"
    },
    {
        "id_siswa": 2,
        "nama": "Budi",
        "tanggal_lahir": "2004-03-22",
        "jenis_kelamin": "Laki-laki",
        "alamat": "Jl. Sudirman No. 20, Bandung",
        "kelas": "11",
        "nomor_telepon": "081234567891"
    },
    {
        "id_siswa": 3,
        "nama": "Citra",
        "tanggal_lahir": "2005-07-30",
        "jenis_kelamin": "Perempuan",
        "alamat": "Jl. Thamrin No. 30, Surabaya",
        "kelas": "10",
        "nomor_telepon": "081234567892"
    },
    {
        "id_siswa": 4,
        "nama": "Dewi",
        "tanggal_lahir": "2003-11-05",
        "jenis_kelamin": "Perempuan",
        "alamat": "Jl. Gatot Subroto No. 40, Yogyakarta",
        "kelas": "12",
        "nomor_telepon": "081234567893"
    },
    {
        "id_siswa": 5,
        "nama": "Eko",
        "tanggal_lahir": "2005-05-17",
        "jenis_kelamin": "Laki-laki",
        "alamat": "Jl. S Parman No. 50, Semarang",
        "kelas": "10",
        "nomor_telepon": "081234567894"
    }
]
  
export default function TableAllStudent() {
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
          {data_siswa.map((data) => (
            <TableRow key={data["id_siswa"]}>
                <TableCell className="font-medium">{data["nama"]}</TableCell>
                <TableCell>{data["kelas"]}</TableCell>
                <TableCell>{data["jenis_kelamin"]}</TableCell>
                <TableCell>{data["alamat"]}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenuStudent/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  