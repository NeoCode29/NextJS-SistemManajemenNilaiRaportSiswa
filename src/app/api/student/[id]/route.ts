import { NextApiRequest } from "next";
import { getStudentById } from "@/lib/StudentOperationsModule";

export const GET = async (req: Request , context : any) => {
    const { params } = context;
    console.log(params.id);
    try {
        const students = await getStudentById(params.id);
        return new Response(JSON.stringify(students),{status : 200});
    } catch (error) {
        return new Response(JSON.stringify(error),{status : 500});
    }
} 