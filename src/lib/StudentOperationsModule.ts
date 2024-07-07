import { PrismaClient, Student } from '@prisma/client';

const prisma = new PrismaClient();

// Interface untuk data student baru
interface NewStudentData {
    id: string;
    name: string;
    class: string;
    gender: string;
    address: string;
}

// Interface untuk data update student
interface UpdateStudentData {
    id: string;
    name: string;
    class: string;
    gender: string;
    address: string;
}

// Fungsi untuk menambah student baru
export async function addStudent(data: NewStudentData): Promise<Student> {
  
try {
    const newStudent = await prisma.student.create({
        data: {
            id: data.id,
            name: data.name,
            class: data.class,
            gender: data.gender == "male" ? "Male" : "Female",
            address: data.address
        }
    });
    console.log('Student baru ditambahkan:', newStudent);
    return newStudent;
  } catch (error) {
    console.error('Error saat menambahkan student:', error);
    throw error;
  }
}

// Fungsi untuk mengedit data student
export async function editStudent(data: UpdateStudentData): Promise<Student> {
  try {
    const updatedStudent = await prisma.student.update({
      where: { id : data.id },
      data : {
            name: data.name,
            class: data.class,
            gender: data.gender == "male" ? "Male" : "Female",
            address: data.address
      },
    });
    console.log('Student yang diperbarui:', updatedStudent);
    return updatedStudent;
  } catch (error) {
    console.error('Error saat memperbarui student:', error);
    throw error;
  }
}

// Fungsi untuk menghapus student
export async function deleteStudent(id: string): Promise<Student> {
  try {
    const deletedStudent = await prisma.student.delete({
      where: { id : id},
    });
    console.log('Student yang dihapus:', deletedStudent);
    return deletedStudent;
  } catch (error) {
    console.error('Error saat menghapus student:', error);
    throw error;
  }
}

// Fungsi untuk menampilkan semua student
export async function getAllStudents(): Promise<Student[]> {
  try {
    const students = await prisma.student.findMany();
    console.log('Semua student:', students);
    return students;
  } catch (error) {
    console.error('Error saat mengambil semua data student:', error);
    throw error;
  }
}

// Fungsi untuk menampilkan satu student berdasarkan ID
export async function getStudentById(id: string): Promise<Student | null> {
  try {
    const student = await prisma.student.findUnique({
      where: { id },
    });
    if (student) {
      console.log('Student yang ditemukan:', student);
      return student;
    } else {
      console.log('Student tidak ditemukan');
      return null;
    }
  } catch (error) {
    console.error('Error saat mengambil data student:', error);
    throw error;
  }
}