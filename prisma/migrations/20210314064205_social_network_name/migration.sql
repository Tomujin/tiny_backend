/*
  Warnings:

  - Added the required column `userName` to the `UserSocialNetwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserSocialNetwork` ADD COLUMN     `userName` VARCHAR(191) NOT NULL;
