-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'Female') NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nilai` (
    `id` VARCHAR(191) NOT NULL,
    `mataPelajaran` VARCHAR(191) NOT NULL,
    `nilai` INTEGER NOT NULL,
    `raportId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Raport` (
    `id` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,
    `tahunAjaran` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_raportId_fkey` FOREIGN KEY (`raportId`) REFERENCES `Raport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Raport` ADD CONSTRAINT `Raport_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
