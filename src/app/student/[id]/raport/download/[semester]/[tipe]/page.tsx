"use client";
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {useReactToPrint} from "react-to-print"

interface RaportData {
  matematika: number,
  bahasaIndonesia: number,
  bahasaInggris: number,
  ipa: number,
  ips: number,
  agama: number,
  average: number
}

interface StudentData{
  nama : string;
  kelas: string;
  gender: string; 
  address: string;
}

export default function DownloadReportPage(){
  const useParam = useParams();
  const {id, semester, tipe} = useParam;
  const reportRef = useRef<HTMLDivElement>(null);

  const [studentData, setStudentData] = useState<StudentData>({
    nama : "",
    kelas: "",
    gender: "", 
    address: "",
  })

  const [raportData , setRaportData ] = useState<RaportData>({
    matematika: 0,
    bahasaIndonesia: 0,
    bahasaInggris: 0,
    ipa: 0,
    ips: 0,
    agama: 0,
    average: 0
  })

  useEffect(() => {
    fetch('http://localhost:3000/api/raport',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idStudent : useParam.id, tipe,semester})
    })
    .then(res => res.json()).then(res => {
      setRaportData({
        matematika: res.matematika,
        bahasaIndonesia: res.bahasa_indonesia,
        bahasaInggris: res.bahasa_inggris,
        ipa: res.ipa,
        ips: res.ips,
        agama: res.agama,
        average: res.ipk
      })
    })
    .catch(res => console.log(res));

    fetch('http://localhost:3000/api/student/' + id)
    .then(res => res.json()).then(res => {
      setStudentData({
        nama : res.name,
        gender : res.gender,
        kelas : res.class,
        address : res.address
      });
      console.log(res);
    })
    .catch(res => console.log(res));

  },[]);

  const handlePrintPDF = useReactToPrint({
    content: () => reportRef.current,
    documentTitle : "Raport_" + studentData.nama
  })

  return(
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <div ref={reportRef} className='w-[600px] p-8 flex flex-col justify-center items-center'>
        <h1 className="text-2xl font-bold mb-4">Raport Siswa</h1>
        <Table className='mb-4 border'>
          <TableBody>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>:</TableCell>
              <TableCell>{studentData.nama}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kelas</TableCell>
              <TableCell>:</TableCell>
              <TableCell>{studentData.kelas}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>:</TableCell>
              <TableCell>{studentData.gender == "Male" ? "Laki - laki" : "Perempuan"}</TableCell>

            </TableRow>
            <TableRow>
              <TableCell>Alamat</TableCell>
              <TableCell>:</TableCell>
              <TableCell>{studentData.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tipe</TableCell>
              <TableCell>:</TableCell>
              <TableCell className='uppercase'>{tipe}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Semester</TableCell>
              <TableCell>:</TableCell>
              <TableCell className='capitalize'>{semester}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table className='border'>
          <TableHeader>
            <TableRow className='bg-slate-200'>
              <TableHead>Mata Pelajaran</TableHead>
              <TableHead>Nilai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Matematika</TableCell>
              <TableCell>{raportData.matematika}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bahasa Indonesia</TableCell>
              <TableCell>{raportData.bahasaIndonesia}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bahasa Inggris</TableCell>
              <TableCell>{raportData.bahasaInggris}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IPA</TableCell>
              <TableCell>{raportData.ipa}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IPS</TableCell>
              <TableCell>{raportData.ips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Agama</TableCell>
              <TableCell>{raportData.agama}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Rata-rata</TableCell>
              <TableCell className="font-bold">{raportData.average}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Button onClick={handlePrintPDF} className="mt-4">
        Cetak PDF
      </Button>
    </div>
  )
}