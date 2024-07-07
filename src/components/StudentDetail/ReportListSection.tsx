import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download , Edit } from "lucide-react";
import Link from 'next/link';

export default function ReportList({idStudent} : {idStudent : string}){
    const reports = [
        { id: 1, title: "UTS Semester 1", urlEdit : "/student/" + idStudent + "/raport/edit/ganjil/uts", urlDownload : "/student/" + idStudent + "/raport/download/ganjil/uts" , icon: <FileText className="w-6 h-6" /> },
        { id: 2, title: "UAS Semester 1", urlEdit : "/student/" + idStudent + "/raport/edit/ganjil/uas", urlDownload : "/student/" + idStudent + "/raport/download/ganjil/uas",icon: <FileText className="w-6 h-6" /> },
        { id: 3, title: "UTS Semester 2", urlEdit : "/student/" + idStudent + "/raport/edit/genap/uts", urlDownload : "/student/" + idStudent + "/raport/download/genap/uts", icon: <FileText className="w-6 h-6" /> },
        { id: 4, title: "UAS Semester 2", urlEdit : "/student/" + idStudent + "/raport/edit/genap/uas", urlDownload : "/student/" + idStudent + "/raport/download/genap/uas", icon: <FileText className="w-6 h-6" /> },
      ];
    
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Daftar Raport</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1  gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="flex items-center p-4 space-x-4">
                  <div className="flex-shrink-0 text-blue-500">
                    {report.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{report.title}</h3>
                  </div>
                  <Link href={report.urlEdit}>
                    <Button variant="ghost" size="sm" className="flex-shrink-0 text-center">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={report.urlDownload}>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      );
}

