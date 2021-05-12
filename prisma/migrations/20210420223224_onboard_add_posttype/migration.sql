/*
  Warnings:

  - Added the required column `index` to the `UserOnboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postType` to the `UserOnboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `postType` ENUM('Assessment', 'Practice', 'Learning', 'Medidation', 'Rank', 'TargetExam', 'TargetPoint', 'InviteFriends', 'FollowMembers', 'TargetSchool', 'Community') NOT NULL;

-- AlterTable
ALTER TABLE `PostView` MODIFY `postType` ENUM('Assessment', 'Practice', 'Learning', 'Medidation', 'Rank', 'TargetExam', 'TargetPoint', 'InviteFriends', 'FollowMembers', 'TargetSchool', 'Community') NOT NULL;

-- AlterTable
ALTER TABLE `UserOnboard` ADD COLUMN     `index` INTEGER NOT NULL,
    ADD COLUMN     `postType` ENUM('Assessment', 'Practice', 'Learning', 'Medidation', 'Rank', 'TargetExam', 'TargetPoint', 'InviteFriends', 'FollowMembers', 'TargetSchool', 'Community') NOT NULL;
