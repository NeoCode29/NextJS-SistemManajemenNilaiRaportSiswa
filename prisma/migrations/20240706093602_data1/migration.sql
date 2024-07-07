/*
  Warnings:

  - You are about to alter the column `semester` on the `raport` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(2))`.
  - Added the required column `tipe` to the `Raport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `raport` ADD COLUMN `tipe` ENUM('UTS', 'UAS') NOT NULL,
    MODIFY `semester` ENUM('GANJIL', 'GENAP') NOT NULL;
