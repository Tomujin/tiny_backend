-- CreateTable
CREATE TABLE `CurriculumScores` (
    `id` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL,
    `curriculumId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CurriculumScores` ADD FOREIGN KEY (`curriculumId`) REFERENCES `Curriculum`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
