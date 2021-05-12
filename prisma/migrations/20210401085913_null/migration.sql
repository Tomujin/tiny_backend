-- AlterTable
ALTER TABLE `Feedback` MODIFY `screenshot` VARCHAR(191),
    MODIFY `isFixed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `solution` VARCHAR(191);
