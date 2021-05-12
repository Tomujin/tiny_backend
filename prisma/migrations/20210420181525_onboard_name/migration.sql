/*
  Warnings:

  - You are about to drop the `UserOnboarding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserOnboarding` DROP FOREIGN KEY `UserOnboarding_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UserOnboarding` DROP FOREIGN KEY `UserOnboarding_ibfk_2`;

-- CreateTable
CREATE TABLE `UserOnboard` (
    `id` VARCHAR(191) NOT NULL,
    `isSeen` BOOLEAN NOT NULL DEFAULT false,
    `isFinish` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `onboardTypeId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- DropTable
DROP TABLE `UserOnboarding`;

-- AddForeignKey
ALTER TABLE `UserOnboard` ADD FOREIGN KEY (`onboardTypeId`) REFERENCES `OnboardType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOnboard` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
