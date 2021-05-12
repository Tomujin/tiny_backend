/*
  Warnings:

  - You are about to alter the column `rate` on the `UserCurriculumRate` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- AlterTable
ALTER TABLE `UserCurriculumRate` MODIFY `rate` DECIMAL(65, 30) NOT NULL;
