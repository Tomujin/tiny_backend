/*
  Warnings:

  - You are about to drop the column `mediaType` on the `PostView` table. All the data in the column will be lost.
  - Added the required column `postType` to the `PostView` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PostView` DROP COLUMN `mediaType`,
    ADD COLUMN     `postType` ENUM('Assessment', 'Practice', 'Learning') NOT NULL,
    MODIFY `watchDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
