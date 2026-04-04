/*
  Warnings:

  - Added the required column `ds_cpf` to the `Empregado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ds_password` to the `Empregado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empregado" ADD COLUMN     "ds_cpf" TEXT NOT NULL,
ADD COLUMN     "ds_password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';
