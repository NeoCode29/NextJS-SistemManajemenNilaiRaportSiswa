/*
  Warnings:

  - The values [GANJIL,GENAP] on the enum `Raport_semester` will be removed. If these variants are still used in the database, this will fail.
  - The values [MALE] on the enum `Student_gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `nilai` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `agama` to the `Raport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bahasa_indonesia` to the `Raport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bahasa_inggris` to the `Raport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipa` to the `Raport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipk` to the `Raport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ips` to the `Raport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matematika` to the `Raport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `nilai` DROP FOREIGN KEY `Nilai_raportId_fkey`;

-- AlterTable
ALTER TABLE `raport` ADD COLUMN `agama` INTEGER NOT NULL,
    ADD COLUMN `bahasa_indonesia` INTEGER NOT NULL,
    ADD COLUMN `bahasa_inggris` INTEGER NOT NULL,
    ADD COLUMN `ipa` INTEGER NOT NULL,
    ADD COLUMN `ipk` DOUBLE NOT NULL,
    ADD COLUMN `ips` INTEGER NOT NULL,
    ADD COLUMN `matematika` INTEGER NOT NULL,
    MODIFY `semester` ENUM('Ganjil', 'Genap') NOT NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `gender` ENUM('Male', 'Female') NOT NULL;

-- DropTable
DROP TABLE `nilai`;
