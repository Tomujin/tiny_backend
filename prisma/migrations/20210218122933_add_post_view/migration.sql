-- CreateTable
CREATE TABLE `PostView` (
    `id` VARCHAR(191) NOT NULL,
    `mediaType` ENUM('Video', 'Image', 'Voice', 'Text', 'Latex') NOT NULL,
    `watchDate` DATETIME(3) NOT NULL,
    `watchIndex` INT NOT NULL,
    `visiblePercent` DECIMAL(65,30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostView` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostView` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
