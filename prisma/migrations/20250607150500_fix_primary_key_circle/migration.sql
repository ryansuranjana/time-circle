/*
  Warnings:

  - You are about to alter the column `group_id` on the `circle_members` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `circles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `circles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `circle_members` DROP FOREIGN KEY `circle_members_group_id_fkey`;

-- DropIndex
DROP INDEX `circle_members_group_id_fkey` ON `circle_members`;

-- AlterTable
ALTER TABLE `circle_members` MODIFY `group_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `circles` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `circle_members` ADD CONSTRAINT `circle_members_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `circles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
