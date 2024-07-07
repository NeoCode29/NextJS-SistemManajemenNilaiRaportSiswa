"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from 'next/navigation';
import { List } from 'postcss/lib/list';


interface ReportData {
  [key: string]:number;
}

export default function EditReportPage (){
  const useParam = useParams();
  const {id, semester, tipe} = useParam;
  const [idRaport , setIdRaport] = useState("");
  const [reportData, setReportData] = useState<ReportData>({
    matematika: 0,
    bahasaIndonesia: 0,
    bahasaInggris: 0,
    ipa: 0,
    ips: 0,
    agama: 0,
    average: 0
  });

  useEffect(() => {
    console.log(id);
    fetch('http://localhost:3000/api/raport',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idStudent : useParam.id, tipe,semester})
    })
    .then(res => res.json()).then(res => {
      setIdRaport(res.id);
      setReportData({
        matematika: res.matematika,
        bahasaIndonesia: res.bahasa_indonesia,
        bahasaInggris: res.bahasa_inggris,
        ipa: res.ipa,
        ips: res.ips,
        agama: res.agama,
        average: res.ipk
      })
      console.log(res);
      console.log(id);
    })
    .catch(res => console.log(res));
    
  },[]);


  const handleSubjectChange = (subject: string, value: number) => {
    let newdata = {...reportData, [subject]: value};
    calculateAverage(Object.values(newdata));
    setReportData(prev => ({
      ...prev,
      [subject]: value
    }));
    
  };

  const calculateAverage = (values : number[]) => {
    let sum = 0;
    for (let i = 0; i < values.length - 1; i++) {
      sum += values[i];
    }
    const avg = values.length > 0 ? sum / (values.length - 1) : 0;
    setReportData(prev => ({
      ...prev,
      average: parseFloat(avg.toFixed(2))
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id : idRaport,
      nilai : {
        matematika: reportData.matematika,
        bahasa_indonesia: reportData.bahasaIndonesia,
        bahasa_inggris: reportData.bahasaInggris,
        ipa: reportData.ipa,
        ips: reportData.ips,
        agama: reportData.agama,
      }
    }
    fetch('http://localhost:3000/api/raport',{
      method : "PATCH",
      body : JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json()).then(res => {console.log(res)})
    .catch(res => console.log(res));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Raport {tipe.toString().toUpperCase()} - Semester {semester}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(Object.keys(reportData)).filter((subject) => subject != "average").map((subject : string) => (
            <div key={subject} className="space-y-2">
              <Label htmlFor={subject}>{subject.charAt(0).toUpperCase() + subject.slice(1)}</Label>
              <Input
                id={subject}
                name={subject}
                value={reportData[subject]}
                onChange={(e) => handleSubjectChange(subject.toString(), parseInt(e.target.value))}
                type="number"
                min="0"
                max="100"
                placeholder="Masukkan nilai"
              />
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="average">Nilai Rata-rata</Label>
            <Input
              id="average"
              name="average"
              value={reportData.average.toString()}
              readOnly
              disabled
            />
          </div>

          <Button type="submit" className="w-full">Simpan Raport</Button>
        </form>
      </CardContent>
    </Card>
  );
};
