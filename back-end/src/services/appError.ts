import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';

const LOG_DIR = path.resolve('./log');
const LOG_FILE = path.join(LOG_DIR, 'error.log');

export async function errorHandler(
  erro: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const statusCode = typeof erro?.statusCode === 'number' ? erro.statusCode : 500;

  const message = typeof erro?.message === 'string' ? erro.message : 'Erro Interno do Servidor!';

  try {
    await fs.mkdir(LOG_DIR, { recursive: true });

    const logContent = `
[${new Date().toISOString()}]
${req.method} ${req.originalUrl}

${erro instanceof Error ? erro.stack || erro.message : JSON.stringify(erro, null, 2)}

----------------------------------------
`;

    await fs.appendFile(LOG_FILE, logContent, 'utf-8');
  } catch (logError) {
    console.error('Erro ao salvar log:', logError);
  }

  console.error(erro);

  res.status(statusCode).json({
    error: message,
  });
}
