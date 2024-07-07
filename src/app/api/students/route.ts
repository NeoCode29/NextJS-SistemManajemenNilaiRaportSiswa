import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllStudents , addStudent , editStudent , deleteStudent} from '@/lib/StudentOperationsModule'
import { createFourRaports , deleteFourRaports } from '@/lib/RaportOperationModule';

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const students = await getAllStudents();
        return new Response(JSON.stringify(students),{status : 200})
    } catch (error) {
        return new Response(JSON.stringify("gagal mengambil data"),{status : 400})
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        await addStudent(data);
        await createFourRaports(data.id);
        const students = await getAllStudents();
        return new Response(JSON.stringify(students),{status: 201});
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Gagal menambahkan student baru' }),{status: 500});
    }
} 

export async function PATCH(req: Request) {
    try {
        const data = await req.json();
        await editStudent(data);
        const students = await getAllStudents();
        return new Response(JSON.stringify(students),{status: 201});
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Gagal menambahkan student baru' }),{status: 500});
    }
}

export async function DELETE(req: Request) {
    try {
        const data = await req.json();
        console.log(data);
        await deleteFourRaports(data.id);
        await deleteStudent(data.id);
        const students = await getAllStudents();
        return new Response(JSON.stringify(students),{status: 201});
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Gagal menambahkan student baru' }),{status: 500});
    }
}