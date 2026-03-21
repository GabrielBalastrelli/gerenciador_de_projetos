-- CreateTable
CREATE TABLE "Empregado" (
    "id_empregado" TEXT NOT NULL,
    "ds_nome" TEXT NOT NULL,
    "ds_email" TEXT NOT NULL,
    "dt_nascimento" TIMESTAMP(3) NOT NULL,
    "ds_profissao" TEXT NOT NULL,
    "vl_salario" DOUBLE PRECISION NOT NULL,
    "dt_admissao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_transacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_projeto" TEXT NOT NULL,

    CONSTRAINT "Empregado_pkey" PRIMARY KEY ("id_empregado")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id_projeto" TEXT NOT NULL,
    "ds_nome" TEXT NOT NULL,
    "ds_descricao" TEXT NOT NULL,
    "orcamento" DOUBLE PRECISION NOT NULL,
    "dt_inicio" TIMESTAMP(3) NOT NULL,
    "dt_fim" TIMESTAMP(3) NOT NULL,
    "dt_transacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id_projeto")
);

-- CreateTable
CREATE TABLE "Demanda" (
    "id_demanda" TEXT NOT NULL,
    "id_projeto" TEXT NOT NULL,
    "id_empregado" TEXT NOT NULL,
    "ds_nome" TEXT NOT NULL,
    "ds_descricao" TEXT NOT NULL,
    "dt_inicio" TIMESTAMP(3) NOT NULL,
    "dt_fim" TIMESTAMP(3) NOT NULL,
    "dt_transacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Demanda_pkey" PRIMARY KEY ("id_demanda")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empregado_ds_email_key" ON "Empregado"("ds_email");

-- CreateIndex
CREATE INDEX "Empregado_ds_nome_idx" ON "Empregado"("ds_nome");

-- CreateIndex
CREATE INDEX "Empregado_ds_email_idx" ON "Empregado"("ds_email");

-- CreateIndex
CREATE INDEX "Projeto_ds_nome_idx" ON "Projeto"("ds_nome");

-- AddForeignKey
ALTER TABLE "Empregado" ADD CONSTRAINT "Empregado_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto"("id_projeto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto"("id_projeto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demanda" ADD CONSTRAINT "Demanda_id_empregado_fkey" FOREIGN KEY ("id_empregado") REFERENCES "Empregado"("id_empregado") ON DELETE RESTRICT ON UPDATE CASCADE;
