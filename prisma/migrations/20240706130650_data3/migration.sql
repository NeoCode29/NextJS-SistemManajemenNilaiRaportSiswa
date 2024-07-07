/*
  Warnings:

  - You are about to drop the column `mataPelajaran` on the `nilai` table. All the data in the column will be lost.
  - You are about to drop the column `nilai` on the `nilai` table. All the data in the column will be lost.
  - Added the required column `agama` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bahasa_indonesia` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bahasa_inggris` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipa` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipk` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ips` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matematika` to the `Nilai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nilai` DROP COLUMN `mataPelajaran`,
    DROP COLUMN `nilai`,
    ADD COLUMN `agama` INTEGER NOT NULL,
    ADD COLUMN `bahasa_indonesia` INTEGER NOT NULL,
    ADD COLUMN `bahasa_inggris` INTEGER NOT NULL,
    ADD COLUMN `ipa` INTEGER NOT NULL,
    ADD COLUMN `ipk` DOUBLE NOT NULL,
    ADD COLUMN `ips` INTEGER NOT NULL,
    ADD COLUMN `matematika` INTEGER NOT NULL;
