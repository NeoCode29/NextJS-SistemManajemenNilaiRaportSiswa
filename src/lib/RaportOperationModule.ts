import { PrismaClient, Raport, Tipe, Semester } from '@prisma/client';

const prisma = new PrismaClient();

function generateID(sufix : number) {
    const prefix = "RP";
    const timestamp = Date.now().toString().slice(-8); // Ambil 8 digit dari timestamp
    const id = prefix + timestamp + sufix;
    return id;
}

// Handler untuk membuat 4 raport sekaligus
export async function createFourRaports(studentId: string) {
  try {
    const raports = await prisma.raport.createMany({
        data: [
            {
                id : generateID(1),
                studentId : studentId,
                semester : Semester.Ganjil,
                tipe : Tipe.UTS,
                matematika: 0,
                bahasa_indonesia: 0,
                bahasa_inggris: 0,
                ipa: 0,
                ips: 0,
                agama: 0,
                ipk: 0,
            },
            {
              id : generateID(2),
              studentId : studentId,
              semester : Semester.Ganjil,
              tipe : Tipe.UAS,
              matematika: 0,
              bahasa_indonesia: 0,
              bahasa_inggris: 0,
              ipa: 0,
              ips: 0,
              agama: 0,
              ipk: 0,
          },
          {
            id : generateID(3),
            studentId : studentId,
            semester : Semester.Genap,
            tipe : Tipe.UTS,
            matematika: 0,
            bahasa_indonesia: 0,
            bahasa_inggris: 0,
            ipa: 0,
            ips: 0,
            agama: 0,
            ipk: 0,
        },
        {
          id : generateID(4),
          studentId : studentId,
          semester : Semester.Genap,
          tipe : Tipe.UAS,
          matematika: 0,
          bahasa_indonesia: 0,
          bahasa_inggris: 0,
          ipa: 0,
          ips: 0,
          agama: 0,
          ipk: 0,
        }
      ]
    })
    return raports;
  } catch (error) {
    console.error('Error creating raports:', error);
    throw error;
  }
}

// Handler untuk membuat 4 raport sekaligus
export async function getRaportByIdStudent(studentId: string, tipe : string , semester : string) {
    try{
      const raport = await prisma.raport.findFirst({where : {
        studentId,
        tipe : (tipe == "uts" ? "UTS" : "UAS"),
        semester : (semester == "ganjil" ? "Ganjil" : "Genap"),
      }});
      return raport;
    }catch (error) {
      console.error('Error creating raports:', error);
      throw error;
    }
}


// Handler untuk mengedit nilai raport
export async function editRaportNilai(
  raportId: string,
  nilai: {
    matematika?: number;
    bahasa_indonesia?: number;
    bahasa_inggris?: number;
    ipa?: number;
    ips?: number;
    agama?: number;
  }
) {
  try {
    const updatedRaport = await prisma.raport.update({
      where: { id: raportId },
      data: {
        ...nilai,
        ipk: calculateIPK(nilai),
      },
    });

    return updatedRaport;
  } catch (error) {
    console.error('Error updating raport:', error);
    throw error;
  }
}

// Fungsi helper untuk menghitung IPK
function calculateIPK(nilai: {
  matematika?: number;
  bahasa_indonesia?: number;
  bahasa_inggris?: number;
  ipa?: number;
  ips?: number;
  agama?: number;
}): number {
  const values = Object.values(nilai).filter((v): v is number => typeof v === 'number');
  const sum = values.reduce((a, b) => a + b, 0);
  return values.length > 0 ? parseFloat((sum / values.length).toFixed(2)): 0;


}

// Handler untuk membuat 4 raport sekaligus
export async function deleteFourRaports(studentId: string) {
  try {
    const raports = await prisma.raport.deleteMany({where : { studentId}})
    return raports;
  } catch (error) {
    console.error('Error creating raports:', error);
    throw error;
  }
}