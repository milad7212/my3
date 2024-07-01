/*
  Warnings:

  - You are about to drop the column `city` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `ostan` on the `user` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ostanId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `city`,
    DROP COLUMN `ostan`,
    ADD COLUMN `cityId` INTEGER NOT NULL,
    ADD COLUMN `ostanId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ostanId_fkey` FOREIGN KEY (`ostanId`) REFERENCES `Province`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
