/*
  Warnings:

  - You are about to drop the column `id_projeto` on the `Empregado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Empregado" DROP CONSTRAINT "Empregado_id_projeto_fkey";

-- AlterTable
ALTER TABLE "Empregado" DROP COLUMN "id_projeto";

-- CreateTable
CREATE TABLE "EmpregadoProjeto" (
    "id" TEXT NOT NULL,
    "id_empregado" TEXT NOT NULL,
    "id_projeto" TEXT NOT NULL,

    CONSTRAINT "EmpregadoProjeto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmpregadoProjeto_id_empregado_id_projeto_key" ON "EmpregadoProjeto"("id_empregado", "id_projeto");

-- AddForeignKey
ALTER TABLE "EmpregadoProjeto" ADD CONSTRAINT "EmpregadoProjeto_id_empregado_fkey" FOREIGN KEY ("id_empregado") REFERENCES "Empregado"("id_empregado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpregadoProjeto" ADD CONSTRAINT "EmpregadoProjeto_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto"("id_projeto") ON DELETE RESTRICT ON UPDATE CASCADE;
