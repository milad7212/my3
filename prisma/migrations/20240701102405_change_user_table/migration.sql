/*
  Warnings:

  - You are about to drop the column `birthday` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `joinDate` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayEjdevag` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayTavalod` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthEjdevag` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthTavalod` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearEjdevag` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearTavalod` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `birthday`,
    DROP COLUMN `joinDate`,
    DROP COLUMN `phone`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dayEjdevag` VARCHAR(191) NOT NULL,
    ADD COLUMN `dayTavalod` VARCHAR(191) NOT NULL,
    ADD COLUMN `monthEjdevag` VARCHAR(191) NOT NULL,
    ADD COLUMN `monthTavalod` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `timeSendMeesage` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `timeTry` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `yearEjdevag` VARCHAR(191) NOT NULL,
    ADD COLUMN `yearTavalod` VARCHAR(191) NOT NULL;
