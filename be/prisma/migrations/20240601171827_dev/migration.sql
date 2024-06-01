-- DropIndex
DROP INDEX `token_token_key` ON `token`;

-- AlterTable
ALTER TABLE `token` MODIFY `token` TEXT NOT NULL;
