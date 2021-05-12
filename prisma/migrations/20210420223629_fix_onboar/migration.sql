/*
  Warnings:

  - You are about to drop the column `index` on the `UserOnboard` table. All the data in the column will be lost.
  - You are about to drop the column `postType` on the `UserOnboard` table. All the data in the column will be lost.
  - Added the required column `index` to the `OnboardType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postType` to the `OnboardType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OnboardType` ADD COLUMN     `index` INTEGER NOT NULL,
    ADD COLUMN     `postType` ENUM('Assessment', 'Practice', 'Learning', 'Medidation', 'Rank', 'TargetExam', 'TargetPoint', 'InviteFriends', 'FollowMembers', 'TargetSchool', 'Community') NOT NULL;

-- AlterTable
ALTER TABLE `UserOnboard` DROP COLUMN `index`,
    DROP COLUMN `postType`;
