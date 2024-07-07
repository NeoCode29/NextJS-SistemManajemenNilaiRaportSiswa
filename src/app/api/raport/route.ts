import { getRaportByIdStudent , editRaportNilai } from "@/lib/RaportOperationModule";

export async function POST(req: Request){
    try {
        const data = await req.json();
        const students = await getRaportByIdStudent(data.idStudent, data.tipe ,data.semester);
        return new Response(JSON.stringify(students),{status : 200})
    } catch (error) {
        return new Response(JSON.stringify("gagal mengambil data"),{status : 400})
    }
}

export async function PATCH(req: Request) {
    try {
        const data = await req.json();
        const students = await editRaportNilai(data.id,data.nilai);
        return new Response(JSON.stringify(students),{status : 200})
    } catch (error) {
        return new Response(JSON.stringify("gagal mengambil data"),{status : 400})
    }
}