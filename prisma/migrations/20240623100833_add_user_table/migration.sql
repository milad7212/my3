-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `codeMeli` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `joinDate` DATETIME(3) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `phoneStatic` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `ostan` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `explain` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
