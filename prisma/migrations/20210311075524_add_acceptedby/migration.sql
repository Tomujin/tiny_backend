/*
  Warnings:

  - Added the required column `acceptedUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN     `acceptedUserId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`acceptedUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
