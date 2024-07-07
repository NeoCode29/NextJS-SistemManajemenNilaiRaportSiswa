"use client"
import AvatarEditComponent from "@/components/StudentDetail/AvatarSection";
import ReportList from "@/components/StudentDetail/ReportListSection";
import StudentProfile from "@/components/StudentDetail/StudentProfile";
import { useParams } from 'next/navigation';

export default function StudentDetail({}){
    const useParam = useParams();
    const {id} = useParam;
    const idStudent = Array.isArray(id) ? id[0] : id;
    return(
        <main className="flex items-center p-10 flex-col gap-4">
            <StudentProfile idStudent={idStudent}/>
            <ReportList idStudent={idStudent}/>
        </main>
    )
}